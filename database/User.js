const {Schema} = require('mongoose') ;
const mongoose = require('mongoose') ;

const userSchema = new Schema({
    email:{type:String ,required:true},
    password:{type:String },

})

const User = mongoose.model('user',userSchema) ;

module.exports ={ User} ;