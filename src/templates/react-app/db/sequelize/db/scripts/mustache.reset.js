import { sequelize } from '../sequelize.js';
{{#models}}
import "../models/{{modelNamePascal}}.js";
{{/models}}

await sequelize.query(`
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

GRANT ALL ON SCHEMA public TO public;
`);

await sequelize.sync({ force: true });
console.log('All models were synchronized successfully.');
