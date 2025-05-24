# Overview

The Idaho Weather Station DB application is a backend server, built using Express Node.js and Amazon DynamoDB which holds a collection of local weather station data, as well as data collected by each data station. The application includes a robust REST api that is documented using Swagger. It contains all basic CRUD functionality, including GET, POST, PUT and DELETE for both weather stations as well as weather station data. I designed it to accept data as formatted by the public National Weather Service API.

I created this application to create a central repository of weather information that would be easily accessible via an API. With a few more steps, it can easily integrate with the public National Weather Service API (which it is designed around).

{Provide a link to your YouTube demonstration. It should be a 4-5 minute demo of the software running, a walkthrough of the code, and a view of the cloud database.}

[Software Demo Video](http://youtube.link.goes.here)

# Cloud Database

For the database, I chose to use Amazon DynamoDB as well as the helpful related library Dynamoose (similar to MongoDB's Mongoose).

The database structure itself is very straightforward. It consists of two tables, "stations" and "station_data". The "stations" database contains the stationId partition key which acts as it's unique primary key. The "station_data" table consists of the same partition key, but also includes a unique Sort key using the "date" property. This allows specific stations to have their data easily sorted via the date, and ensures only 1 data item can exist per station per day.

# Development Environment

I used Visual Studio Code along with a host of extensions, including ESLint, Spellchecker, and Prettier.

For this application, I chose to use Javascript ES6 along with a variety of libraries including:

- cors
- dotenv
- dynamoose
- express
- swagger-ui-express
- yamljs
- nodemon

# Useful Websites

{Make a list of websites that you found helpful in this project}

- [DynamoDB Docs](https://docs.aws.amazon.com/dynamodb/)
- [Dynamoose Docs](https://dynamoosejs.com/getting_started/Introduction)
- [AWS CLI > DynamoDB](https://www.youtube.com/watch?v=QoLlM5ax568)
- [DynamoDB Overview](https://www.youtube.com/watch?v=2k2GINpO308&t=1881s)
- [Node Docs](https://nodejs.org/docs/latest/api/)
- [Express Docs](https://expressjs.com/en/5x/api.html)

# Future Work

- Create an outgoing scheduled fetch request that connects with https://api.weather.gov/stations/{station}/observations?start={start_encoded}&end={end_encoded}
  - This will allow receiving updated weather information for each station we include
- Schedule the above item to get station data everyday
- Creating a front-end with a simple and clean analytics dashboard that allows filtering stations / dates / locations
