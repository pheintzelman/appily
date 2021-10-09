import sequelizeModule from 'sequelize';
import { sequelize } from '../sequelize.js'
const { DataTypes } = sequelizeModule;

export const {{modelNamePascal}} = sequelize.define('{{modelNamePascal}}', {
  {{#properties}}
  {{propertyNameCamel}}: {
    type: DataTypes.{{sequelizeType}},
    field: '{{propertyNameSnake}}'
  },
  {{/properties}}
}, {
  tableName: '{{modelNameSnake}}'
});
