module.exports = {
    mutipleMongooseToObject: function(mongooses){
        return mongooses.map(user => user.toObject());
    },
    mongooseToObject: function(mongoose){
        return mongoose ? mongoose.toObject() : mongoose;
    }
}