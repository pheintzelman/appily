import sequelizeModule from 'sequelize';
import { sequelize } from '../sequelize.js'
const { DataTypes } = sequelizeModule;

export const {{modelNamePascal}} = sequelize.define('{{modelNamePascal}}', {
  {{#properties}}
  {{propertyNameSnake}}: {
    type: DataTypes.{{sequelizeType}}
  },
  {{/properties}}
}, {
  // Other model options go here
});
