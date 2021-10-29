import { sequelize } from '../src/db/sequelize.js';
{{#models}}
import "../src/db/models/{{modelNamePascal}}.js";
{{/models}}

await sequelize.sync({ alter: true });
console.log('All models were synchronized successfully.');
