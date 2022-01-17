import express from "express";
import { StatusCodes } from "http-status-codes";
import { useInMemoryDb, getRepository } from "../../lib/inMemoryDb.js";
import { getRepository as getSequelizeRepository } from "../../db/sequelizeDb.js";
import { {{modelNamePascal}} } from "../../db/models/{{modelNamePascal}}.js";

export const {{pluralModelNameCamel}}Routes = express.Router();

function getDb(request) {
  if (useInMemoryDb(request)) {
    console.log({ mode: `InMemory` });
    return getRepository("{{modelNameCamel}}");
  }

  return getSequelizeRepository({{modelNamePascal}});
}

{{pluralModelNameCamel}}Routes.get("/", async (request, response, next) => {
  try {
    const db = getDb(request, "{{modelNameCamel}}");
    console.log("GET {{pluralModelNameCamel}}");

    const records = await db.retrieveAll();
    return response.status(StatusCodes.OK).send(records);
  } catch (error) {
    next(error);
  }
});
