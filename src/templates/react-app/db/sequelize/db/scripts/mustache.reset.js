import { sequelize } from '../sequelize.js';
{{#models}}
import "../models/{{modelNamePascal}}.js";
{{/models}}

await sequelize.sync({ force: true });
console.log('All models were synchronized successfully.');
