import stations from '../db/models/station.js';

// format the return
const formatStationResponse = (station) => ({
  stationId: station.stationId,
  name: station.name,
  timeZone: station.timeZone,
  elevation_m: station.elevation_m,
  latitude: station.latitude,
  longitude: station.longitude,
  stateCode: station.stateCode,
});

// GET ALL (GET)

export const getAllStations = async (req, res) => {
  const allStations = await stations.scan().exec();
  try {
    if (!allStations || allStations.length === 0) {
      return res.status(404).json({ error: 'No stations found' });
    }
    const formattedStations = allStations.map(formatStationResponse);
    res.json(formattedStations);
  } catch (error) {
    res.status(500).json({ error: 'Error finding any stations.' });
  }
};

// GET SINGLE STATION (GET)
export const getStation = async (req, res) => {
  const stationId = req.params.stationId;
  try {
    if (!stationId) {
      return res.status(400).json({ error: 'stationId is required' });
    }

    const station = await stations.get(stationId);
    if (!station) {
      return res.status(404).json({ error: 'stations not found' });
    }

    res.json(formatStationResponse(station));
  } catch (error) {
    res.status(500).json({ error: `Error finding any station with ID ${stationId}.` });
  }
};

// CREATE NEW STATION (POST)
export const createStation = async (req, res) => {
  const stationId = req.body.stationId;
  try {
    if (!stationId) {
      return res.status(400).json({ error: 'stationId is required' });
    }

    // need to check to see if it exists firsts
    const existingStation = await stations.get(stationId);
    if (existingStation) {
      return res.status(409).json({ error: `stations already exists with ID ${stationId}` });
    }

    // else create new station
    const newStation = new stations(req.body);
    const savedStation = await newStation.save();

    res.status(201).json({
      message: `Created new station with ID ${savedStation.stationId}`,
      station: formatStationResponse(savedStation),
    });
  } catch (error) {
    res.status(500).json({ error: `Error creating station: ${error.message}` });
  }
};

// UPDATE STATION BY ID (PUT)
export const updateStation = async (req, res) => {
  const stationId = req.params.stationId;
  try {
    if (!stationId) {
      return res.status(400).json({ error: 'stationId is required' });
    }

    const existingStation = await stations.get(stationId);
    if (!existingStation) {
      return res.status(404).json({ error: `No station exists with ID ${stationId}` });
    }

    const updatedStation = await stations.update({ stationId: stationId }, req.body, {
      returnValues: 'ALL_NEW',
      upsert: false,
    });
    res.json({
      message: `Updated station ${stationId}`,
      station: formatStationResponse(updatedStation),
    });
  } catch (error) {
    res.status(500).json({ error: `Error. Could not update ID: ${stationId}: ${error.message}` });
  }
};
// DELETE STATION BY ID (DELETE)
export const deleteStation = async (req, res) => {
  const stationId = req.params.stationId;
  try {
    if (!stationId) {
      return res.status(400).json({ error: 'stationId is required' });
    }
    const existingStation = await stations.get(stationId);
    if (!existingStation) {
      return res.status(404).json({ error: `No station exists with ID ${stationId}` });
    }
    if (existingStation) {
      const deletedStation = await stations.delete(existingStation);
      res.status(200).json({
        message: `Deleted station: ${stationId}`,
        station: formatStationResponse(existingStation),
      });
    }
  } catch (error) {
    res.status(500).json({ error: `Error. Could not delete ID: ${stationId} | ${error.message}` });
  }
};
