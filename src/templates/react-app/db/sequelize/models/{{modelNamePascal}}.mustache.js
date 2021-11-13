import sequelizeModule from 'sequelize';
import { sequelize } from '../sequelize.js'
const { DataTypes } = sequelizeModule;

export const {{modelNamePascal}} = sequelize.define('{{modelNamePascal}}', {
  {{#properties}}
  {{propertyNameCamel}}: {
    type: DataTypes.{{sequelizeType}},
    {{#required}}
    allowNull: false,
    {{/required}}
    {{#hasDefaultValue}}
    defaultValue: {{defaultValue}},
    {{/hasDefaultValue}}
    field: '{{propertyNameSnake}}'
  },
  {{/properties}}
}, {
  tableName: '{{modelNameSnake}}'
});
