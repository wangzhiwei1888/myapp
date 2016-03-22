/**
 * Created by jason on 16/3/14.
 */

var mongoose = require('mongoose');
var validation = require('./user.validation.js');

var Schema = mongoose.Schema;

var Weekly = new Schema({
    userId:{type:String,required:true},
    projectName:{type:String,required:true},
    task:{type:String,required:true},
    progress:{type:String,required:true},
    time:{type:Date, default:Date.now}
})

var weeklyModel = mongoose.model("Weekly",Weekly);

Weekly.path('userId').validate(function(input){

    return input.length > 0;

},"userid 不能为空");

Weekly.path('projectName').validate(function(input){

    return input.length > 0;

},"projectName 不能为空");


Weekly.path('task').validate(function(input){

    return input.length > 0;

},"task 不能为空");


Weekly.path('progress').validate(function(input){

    return input.length > 0;

},"progress 不能为空");




module.exports.weeklyModel = weeklyModel;



