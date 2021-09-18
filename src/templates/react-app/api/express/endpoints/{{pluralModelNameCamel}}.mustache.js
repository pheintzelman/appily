import express from "express";
import { StatusCodes } from "http-status-codes";
import { useInMemoryDb, getRepository } from "../../lib/inMemoryDb.js";

export const {{pluralModelNameCamel}}Routes = express.Router();

function getDb(request, modelName) {
  if (useInMemoryDb(request)) {
    return getRepository(modelName);
  }

  return null;
}

{{pluralModelNameCamel}}Routes.get("/", async (request, response, next) => {
  try {
    const db = getDb(request, "{{modelNameCamel}}");
    console.log("GET {{pluralModelNameCamel}}");

    if (!db) {
      return response
        .status(StatusCodes.NOT_IMPLEMENTED)
        .send("Not Implemented");
    }

    console.log({ mode: `InMemory` });
    const records = await db.retrieveAll();
    return response.status(StatusCodes.OK).send(records);
  } catch (error) {
    next(error);
  }
});
