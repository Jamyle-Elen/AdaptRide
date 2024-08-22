import Driver from '../models/Driver.Model.js';
import Passenger from '../models/Passenger.Model.js';
import Ride from '../models/Ride.Model.js';

Driver.hasMany(Ride);
Ride.belongsTo(Driver);

// Passenger.hasMany(Ride);
// Ride.belongsTo(Passenger);

export function setupAssociations() {

}
