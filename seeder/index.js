const seeder = require('mongoose-seed');
const data = require('./plan');
const config = require('./../config/dev.env.json');
const db = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_DB}.q9ljg.mongodb.net/${config.MONGO_DB}?retryWrites=true&w=majority` 

// Connect to MongoDB via Mongoose
seeder.connect(db, function() {
 
  // Load Mongoose models
  seeder.loadModels([
    '../model/Plan',
  ]);
 
  // Clear specified collections
  seeder.clearModels(['Plan'], function() {
      seeder.populateModels(data, function() {
          seeder.disconnect();
      })
    });
});