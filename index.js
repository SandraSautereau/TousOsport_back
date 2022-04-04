require('dotenv').config();
const express = require('express');

const app = express();
const router = require('./app/router');

const port = process.env.PORT || 4000;

// middlewares - sanitizer
const {cleaner} =  require('./app/middlewares/');

//---EXPRESS-JSDOC-SWAGGER
const expressJSDocSwagger = require('express-jsdoc-swagger');

const options = {
  info: {
    version: '1.0.0',
    title: 'Tous O sport API',
    description: 'An API to help sport enthusiasts find group coaching',
    license: {
      name: 'MIT',
    },
  },
  security: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic',
    },
  },
  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: './**/*.js',
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/docs',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: false,
  // Open API JSON Docs endpoint.
  apiDocsPath: '/v3/api-docs',
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
  // You can customize your UI options.
  // you can extend swagger-ui-express config. You can checkout an example of this
  // in the `example/configuration/swaggerOptions.js`
  swaggerUiOptions: {},
};

(expressJSDocSwagger(app))(options);
//----


//---CORS
const cors = require('cors');
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  "maxAge": 3600
}));
//---

//---SANITIZER PROTECTION XSS INJECTIONS
app.use(cleaner);

app.use(express.json());

app.use('/v1', router);

app.use((_, response) => {
  response.status(404).json({error: 'Error 404, nothing here!'})
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

