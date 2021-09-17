import express from "express";
import { StatusCodes } from "http-status-codes";
import { useInMemoryDb, getRepository } from "../../lib/inMemoryDb.js";

export const {{modelNameCamel}}Routes = express.Router();

function getDb(request, modelName) {
  if (useInMemoryDb(request)) {
    return getRepository(modelName);
  }

  return null;
}

{{modelNameCamel}}Routes.post("/", async (request, response, next) => {
  try {
    const {{modelNameCamel}} = request.body;
    const db = getDb(request, "{{modelNameCamel}}");
    console.log(`POST {{modelNamePascal}} ${JSON.stringify({{modelNameCamel}})}`);

    if (!db) {
      return response.status(StatusCodes.NOT_IMPLEMENTED).send("Not Implemented");
    }

    console.log({ mode: `InMemory` });
    const record = await db.insert({{modelNameCamel}});
    return response.status(StatusCodes.OK).send(record);
  } catch (error) {
    next(error);
  }
});

{{modelNameCamel}}Routes.get("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    const db = getDb(request, "{{modelNameCamel}}");
    console.log(`GET {{modelNamePascal}} ${id}`);

    if (!db) {
      return response.status(StatusCodes.NOT_IMPLEMENTED).send("Not Implemented");
    }

    console.log({ mode: `InMemory` });
    const record = await db.retrieve(id);
    return response.status(StatusCodes.OK).send(record);
  } catch (error) {
    next(error);
  }
});

{{modelNameCamel}}Routes.put("/", async (request, response, next) => {
  try {
    const {{modelNameCamel}} = request.body;
    const db = getDb(request, "{{modelNameCamel}}");
    console.log(`Put {{modelNamePascal}} ${JSON.stringify({{modelNameCamel}})}`);
  
    if (!db) {
      return response.status(StatusCodes.NOT_IMPLEMENTED).send("Not Implemented");
    }
  
    console.log({ mode: `InMemory` });
    const record = await db.update({{modelNameCamel}});
    return response.status(StatusCodes.OK).send(record); 
  } catch (error) {
    next(error);
  }
});

{{modelNameCamel}}Routes.delete("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    const db = getDb(request, "{{modelNameCamel}}");
    console.log(`Delete {{modelNamePascal}} ${id}`);
  
    if (!db) {
      return response.status(StatusCodes.NOT_IMPLEMENTED).send("Not Implemented");
    }
  
    console.log({ mode: `InMemory` });
    await db.remove(id);
    return response.status(StatusCodes.NO_CONTENT).send(); 
  } catch (error) {
    next(error);
  }
});
