var express = require('express');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('./config/database');
let jwt = require('jsonwebtoken');
const schema = require('./graphql/schema');
const port = process.env.PORT || 3000;
const apollo = new ApolloServer({ 
    schema,
    playground: true, 
});
let app = express();
let server = http.createServer(app);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(cors());

//Your secretKey
app.set('secretKey', 'secret@123');

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json({limit: '1mb'}));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.json({"Home" : "GraphQL API"});
});

apollo.applyMiddleware({ app });
apollo.installSubscriptionHandlers(server)

server.listen({ port: port }, () =>
  console.log(`🚀 Server ready on port : ${port}`)
)