import station_data from '../db/models/stationData.js';

// format for return - // stationId | date | time | temperature_f | wind_speed_kmh | humidity_percent
const formatStationDataResponse = (stationData) => ({
  stationId: stationData.stationId,
  date: stationData.date,
  time: stationData.time,
  temperature_f: stationData.temperature_f,
  wind_speed_kmh: stationData.wind_speed_kmh,
  humidity_percent: stationData.humidity_percent,
});

// GET ALL DATA FOR A STATION (GET)
export const getStationData = async (req, res) => {
  try {
    const stationId = req.params.stationId;
    if (!stationId) {
      return res.status(400).json({ error: 'stationId is required' });
    }

    const stationData = await station_data.query('stationId').eq(stationId).exec();

    if (!stationData || stationData.length === 0) {
      return res.status(404).json({ error: `No data found for station ${stationId}` });
    }

    const formattedStationData = stationData.map(formatStationDataResponse);
    res.json(formattedStationData);
  } catch (error) {
    return res.status(500).json({ error: `Error finding any stations. ${error.message}` });
  }
};

// GET DATA FOR STATION ON DATE (GET)
export const getStationDataByDate = async (req, res) => {
  const stationId = req.params.stationId;
  const date = req.params.date;
  try {
    if (!stationId || !date) {
      return res.status(400).json({ error: `stationId and date are required` });
    }

    const stationData = await station_data.get({ stationId: stationId, date: date });
    if (!stationData) {
      return res
        .status(404)
        .json({ error: `No data found for station ${stationId} on date ${date}` });
    }

    res.json(formatStationDataResponse(stationData));
  } catch (error) {
    return res.status(500).json({ error: `Error finding any station with ID ${stationId}.` });
  }
};

// CREATE NEW STATION DATA BY DATE (POST)
export const createStationDataByDate = async (req, res) => {
  const stationId = req.params.stationId;
  const date = req.params.date;
  try {
    if (!stationId || !date) {
      return res.status(400).json({ error: 'stationId and date is required' });
    }

    const stationDataBody = { ...req.body, stationId: stationId, date: date };

    const existingData = await station_data.get({ stationId: stationId, date: date });
    if (existingData) {
      return res
        .status(409)
        .json({ error: `Data already exists for station ${stationId} on date ${date}` });
    }

    const newStationData = new station_data(stationDataBody);
    const savedStationData = await newStationData.save();

    res.status(201).json({
      message: `Created new data for station ${stationId} on ${date}`,
      stationData: formatStationDataResponse(savedStationData),
    });
  } catch (error) {
    return res.status(500).json({ error: `Error finding any station with ID ${stationId}.` });
  }
};

// UPDATE STATION BY ID (PUT)
export const updateStationDataByDate = async (req, res) => {
  const stationId = req.params.stationId;
  const date = req.params.date;
  try {
    if (!stationId || !date) {
      return res.status(400).json({ error: 'stationId and date are required' });
    }

    const existingData = await station_data.get({ stationId: stationId, date: date });
    if (!existingData) {
      return res
        .status(404)
        .json({ error: `No existing date for station ${stationId} on date ${req.body.date}` });
    }

    const updatedStationData = await station_data.update({ stationId, date }, req.body, {
      returnValues: 'ALL_NEW', // returns item after update
      upsert: false, // do not create an item if the item does not exist
    });

    res.json({
      message: `Updated station ${stationId} on date ${date}`,
      stationData: formatStationDataResponse(updatedStationData),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error updating station: ${stationId} ${error.message}.` });
  }
};
// DELETE STATION DATA BY ID (DELETE)
export const deleteStationData = async (req, res) => {
  const stationId = req.params.stationId;
  try {
    if (!stationId) {
      return res.status(400).json({ error: 'stationId is required' });
    }

    const stationData = await station_data.query('stationId').eq(stationId).exec();
    if (!stationData || stationData.length === 0) {
      return res.status(404).json({ error: `No data found for station ${stationId}` });
    }

    // need to batch deletes
    const batchDeletedData = stationData.map((data) =>
      station_data.delete({ stationId: data.stationId, date: data.date })
    );
    await Promise.all(batchDeletedData);

    res.status(200).json({
      message: `Deleted all data records for ${stationId}`,
      deletedRecordCount: stationData.length,
    });
  } catch (error) {
    return res.status(500).json({ error: `Error. Could not delete ID: ${stationId}.` });
  }
};

export const deleteStationDataByDate = async (req, res) => {
  const stationId = req.params.stationId;
  const date = req.params.date;
  try {
    if (!stationId || !date) {
      return res.status(400).json({ error: 'stationId and date are required' });
    }

    const existingData = await station_data.get({ stationId: stationId, date: date });
    if (!existingData) {
      return res
        .status(404)
        .json({ error: `No existing date for station ${stationId} on date ${date}` });
    }

    const expectedResponse = formatStationDataResponse(existingData);

    await station_data.delete({ stationId: stationId, date: date });

    return res.status(200).json({
      message: `Deleted data for station ${stationId} on ${date}`,
      stationData: expectedResponse,
    });
  } catch (error) {
    return res.status(500).json({ error: `Error. Could not delete ID: ${stationId}.` });
  }
};
