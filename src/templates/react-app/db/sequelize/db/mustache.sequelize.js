import { Sequelize } from 'sequelize';

const localConnectionString =
  'postgres://dbwrite:local@localhost:5432/{{appNameSnake}}_database';

const options = {
  define: {
    //prevent sequelize from pluralizing table names
    freezeTableName: true
  }
};

export const sequelize = new Sequelize(localConnectionString, options);
