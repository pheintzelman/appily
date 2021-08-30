import express from "express";
import { StatusCodes } from "http-status-codes";

export const {{pluralModelNameCamel}}Routes = express.Router();

{{pluralModelNameCamel}}Routes.get("/", (request, response) => {
  console.log("GET {{pluralModelNameCamel}}");
  response.status(StatusCodes.NOT_IMPLEMENTED).send("Not Implemented");
});
