import dynamoose from 'dynamoose';

// stationId | date | time | temperature_f | wind_speed_kmh | humidity_percent
const stationDataSchema = new dynamoose.Schema({
  stationId: {
    type: String,
    required: true,
  },
  // (2025-21-25)
  date: {
    type: String,
    rangeKey: true,
  },
  // 15:00
  time: {
    type: String,
    required: true,
  },
  // 72.3
  temperature_f: {
    type: String,
    required: true,
  },
  // 11.96
  wind_speed_kmh: {
    type: String,
    required: false,
  },
  // 55.7
  humidity_percent: {
    type: String,
    required: false,
  },
});

export default dynamoose.model('station_data', stationDataSchema);
