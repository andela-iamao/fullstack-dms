import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';

import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackMiddleware from 'webpack-dev-middleware';

import webpackConfig from '../webpack.conf';

import routes from './routes';

dotenv.load();

// Set up the express app
const app = express();

app.use(bodyParser.json());

routes(app);

const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

export default app;
