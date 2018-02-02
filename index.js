'use strict';

// Корневой каталог
global.__rootdir = __dirname;

const config = require('./config.json'),
	  express = require('express'),
	  bodyParser = require('body-parser'),
	  methodOverride = require('method-override'),
	  morgan = require('morgan');
	  //routes = require('./routes');

const app = express();

// Обработчики
app.use(express.static('public'));
app.use(morgan('dev', { immediate: true }));
app.use(bodyParser.urlencoded({'extended': 'true'}));			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));	// parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override'));				// override with the X-HTTP-Method-Override header in the request

// Маршруты
//routes(app);

app.get('/', function(req, res) {
	res.sendfile('./public/index.html');
});

app.listen(config.server.port, () => {
	console.log('Server listening at http://localhost:%s', config.server.port);
})