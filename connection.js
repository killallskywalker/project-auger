const mongoose = require('mongoose');

let isConnected;

// Reuse connection on every lambda call when connection still exist . 
module.exports.connectToDatabase = async => {
  if(isConnected){
    console.log('=> using existing database connection');
    return Promise.resolve();
  }
  
  return mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB}.q9ljg.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
    .then(db => { 
      isConnected = db.connections[0].readyState;
      console.log('=> using new database connection');
    }).catch(err => {
       throw new Error(err);
    });
};

