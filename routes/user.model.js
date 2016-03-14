/**
 * Created by jason on 16/3/14.
 */

var mongoose = require('mongoose');
var validation = require('./user.validation.js');

var Schema = mongoose.Schema;

var User = new Schema({
    firstname:{type:String,required:true},
    surname:{type:String,required:true},
    username:{type:String,required:true,index:{unique:true,dropDups:true}},
    password:{type:String,required:true}
})

var UserModel = mongoose.model("User",User);

User.path('username').validate(function(input){
    return validation.isAlphaNumericOnly(input) && validation.isLongEnough(input);
},"Username must Contain [A-z,0-9]");

User.path('password').validate(function(input){

    return validation.isGoodPassword(input);
},"Invalid password: password must contion [A-z,0-9] and least 6 characters and contain 1 UpperCase Character and one Number")





module.exports.UserModel = UserModel;



