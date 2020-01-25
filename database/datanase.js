const mongoose  = require("mongoose") ;
const {mongo_uri} = require("../config/config") ;

mongoose.connect(mongo_uri,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}
) ;