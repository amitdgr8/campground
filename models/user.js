var mongoose = require("mongoose");
var psssportLocalMongoose = require("passport-local-mongoose");


var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});
UserSchema.plugin(psssportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);