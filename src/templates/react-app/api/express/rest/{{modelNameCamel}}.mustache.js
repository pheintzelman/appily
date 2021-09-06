import express from "express";
import { StatusCodes } from "http-status-codes";

export const {{modelNameCamel}}Routes = express.Router();

{{modelNameCamel}}Routes.post("/", (request, response) => {
  const {{modelNameCamel}} = request.body;
  console.log(`POST {{modelNamePascal}} ${JSON.stringify({{modelNameCamel}})}`);
  response.status(StatusCodes.NOT_IMPLEMENTED).send("Not Implemented");
});

{{modelNameCamel}}Routes.get("/:{{modelNameCamel}}Id", (request, response) => {
  const { {{modelNameCamel}}Id } = request.params;
  console.log(`GET {{modelNamePascal}} {{=<% %>=}}${<%modelNameCamel%>Id}<%={{ }}=%>`);
  response.status(StatusCodes.NOT_IMPLEMENTED).send("Not Implemented");
});

{{modelNameCamel}}Routes.put("/:{{modelNameCamel}}Id", (request, response) => {
  const { {{modelNameCamel}}Id } = request.params;
  const {{modelNameCamel}} = request.body;

  console.log(`Put {{modelNamePascal}} {{=<% %>=}}${<%modelNameCamel%>Id}<%={{ }}=%> : ${JSON.stringify({{modelNameCamel}})}`);
  response.status(StatusCodes.NOT_IMPLEMENTED).send("Not Implemented");
});

{{modelNameCamel}}Routes.delete("/:{{modelNameCamel}}Id", (request, response) => {
  const { {{modelNameCamel}}Id } = request.params;

  console.log(`Delete {{modelNamePascal}} {{=<% %>=}}${<%modelNameCamel%>Id}<%={{ }}=%>`);
  response.status(StatusCodes.NOT_IMPLEMENTED).send("Not Implemented");
});
