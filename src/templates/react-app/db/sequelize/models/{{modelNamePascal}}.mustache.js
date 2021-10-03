import sequelizeModule from 'sequelize';
import { sequelize } from '../sequelize.js'
const { DataTypes } = sequelizeModule;

export const {{modelNamePascal}} = sequelize.define('{{modelNamePascal}}', {
  {{#properties}}
  {{propertyNameSnake}}: {
    type: DataTypes.STRING
  },
  {{/properties}}
}, {
  // Other model options go here
});
