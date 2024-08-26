import { Sequelize } from 'sequelize';
import Driver from './Driver.Model.js';
import Passenger from './Passenger.Model.js';
import Ride from './Ride.Model.js';

const db = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

const initializeModels = () => {

  Driver.hasMany(Ride, { foreignKey: { allowNull: false } });
  Passenger.hasMany(Ride, { foreignKey: { allowNull: false } });
  Ride.belongsTo(Driver, { foreignKey: { allowNull: false } });
  Ride.belongsTo(Passenger, { foreignKey: { allowNull: false } });
};

const init = async () => {
  try {
    initializeModels();
    await db.sync({ force: true });
    console.log('Modelos sincronizados com sucesso.');
  } catch (error) {
    console.error('Erro ao sincronizar os modelos:', error);
  }
};

init();

export { db, Driver, Passenger, Ride };
