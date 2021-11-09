import express from "express";
import { StatusCodes } from "http-status-codes";
import { useInMemoryDb, getRepository } from "../../lib/inMemoryDb.js";
import { getRepository as getSequelizeRepository } from "../../db/sequelizeDb.js";
import { {{modelNamePascal}} } from "../../db/models/{{modelNamePascal}}.js";
import { validate, Validator } from "appily-validate";

function validate{{modelNamePascal}}({{modelNameCamel}}) {
  const rules = [
    {{#properties}}
    {{#required}}
    { type: Validator.NotEmpty, property: '{{propertyNameCamel}}', message: 'required' }{{#last}},{{/last}}
    {{/required}}
    {{/properties}}
  ];

  const state = validate(rules, {{modelNameCamel}});
  console.log(state);
  return state;
}

export const {{modelNameCamel}}Routes = express.Router();

function getDb(request) {
  if (useInMemoryDb(request)) {
    console.log({ mode: `InMemory` });
    return getRepository("{{modelNameCamel}}");
  }

  return getSequelizeRepository({{modelNamePascal}});
}

{{modelNameCamel}}Routes.post("/", async (request, response, next) => {
  try {
    const {{modelNameCamel}} = request.body;
    const db = getDb(request);
    console.log(`POST {{modelNamePascal}} ${JSON.stringify({{modelNameCamel}})}`);

    const state = validate{{modelNamePascal}}({{modelNameCamel}});
    if (!state.valid) {
      return response.status(StatusCodes.BAD_REQUEST).send(state);
    }

    const record = await db.insert({{modelNameCamel}});
    return response.status(StatusCodes.OK).send(record);
  } catch (error) {
    next(error);
  }
});

{{modelNameCamel}}Routes.get("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    const db = getDb(request);
    console.log(`GET {{modelNamePascal}} ${id}`);

    const record = await db.retrieve(id);
    return response.status(StatusCodes.OK).send(record);
  } catch (error) {
    next(error);
  }
});

{{modelNameCamel}}Routes.put("/", async (request, response, next) => {
  try {
    const {{modelNameCamel}} = request.body;
    const db = getDb(request);
    console.log(`Put {{modelNamePascal}} ${JSON.stringify({{modelNameCamel}})}`);
  
    const state = validate{{modelNamePascal}}({{modelNameCamel}});
    if (!state.valid) {
      return response.status(StatusCodes.BAD_REQUEST).send(state);
    }
    
    const record = await db.update({{modelNameCamel}});
    return response.status(StatusCodes.OK).send(record); 
  } catch (error) {
    next(error);
  }
});

{{modelNameCamel}}Routes.delete("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    const db = getDb(request);
    console.log(`Delete {{modelNamePascal}} ${id}`);
  
    await db.remove(id);
    return response.status(StatusCodes.NO_CONTENT).send(); 
  } catch (error) {
    next(error);
  }
});
