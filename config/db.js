const mongoose = require('mongoose');  // import

module.exports.connectToMongoDb = async () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MongDb_url)
        .then (
            () => {
                console.log("connect to db")
            }
                    )
        .catch((err) => {
            console.log(err);
        });
};