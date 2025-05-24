import dynamoose from 'dynamoose';

// stationID | name | timeZone | elevation | latitude | longitude | stateCode
const stationSchema = new dynamoose.Schema({
  // KBOI
  stationId: {
    type: String,
    hashKey: true,
  },
  // Boise Air Terminal
  name: {
    type: String,
    required: true,
  },
  // America/Boise
  timeZone: {
    type: String,
    required: false,
  },
  // 860
  elevation_m: {
    type: String,
    required: false,
  },
  // 43.56704
  latitude: {
    type: String,
    required: false,
  },
  // -116.24053
  longitude: {
    type: String,
    required: false,
  },
  // ID
  stateCode: {
    type: String,
    required: false,
  },
});

export default dynamoose.model('stations', stationSchema);
