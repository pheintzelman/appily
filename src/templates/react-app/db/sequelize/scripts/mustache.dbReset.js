import { sequelize } from '../src/db/sequelize.js';
{{#models}}
import "../src/db/models/{{modelNamePascal}}.js";
{{/models}}

if(sequelize.getDatabaseName() !== '{{appNameSnake}}_database_local'){
  console.log('Reset only works on local DB');
  process.exit(126);
}

await sequelize.query(`
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

GRANT ALL ON SCHEMA public TO public;
`);

await sequelize.sync({ force: true });
console.log('All models were synchronized successfully.');
