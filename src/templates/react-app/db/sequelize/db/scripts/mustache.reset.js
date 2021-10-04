import { sequelize } from '../sequelize.js';
{{#models}}
import "../models/{{modelNamePascal}}.js";
{{/models}}

//needed to handle table renames
await sequelize.drop();
console.log("All tables dropped!");

await sequelize.sync({ force: true });
console.log('All models were synchronized successfully.');
