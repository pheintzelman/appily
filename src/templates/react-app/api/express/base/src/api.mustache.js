import express from 'express';
import { StatusCodes } from "http-status-codes";
{{#models}}
import { {{modelNameCamel}}Routes } from './rest/{{modelNamePascal}}.js';
import { {{pluralModelNameCamel}}Routes } from './rest/{{pluralModelNameCamel}}.js';
{{/models}}

function setHeaders(request, response, next) {
  response.header("Access-Control-Allow-Origin", "http://localhost:3000");
  response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  response.header("Access-Control-Allow-Headers", "Content-Type");
  next();
}

const app = express();
const port = 3001;
app.use(express.json());
app.use(setHeaders);

app.options("*", (request, response) => {
  response.status(StatusCodes.NO_CONTENT);
  response.send();
});
{{#models}}
app.use("/{{modelNamePascal}}", {{modelNameCamel}}Routes);
app.use("/{{pluralModelNameCamel}}", {{pluralModelNameCamel}}Routes);
{{/models}}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
