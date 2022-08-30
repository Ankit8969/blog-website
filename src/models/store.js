const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        trim:true,
    },
    details:{
        type:String,
        trim:true,
        required:true,
    },
    url:{
        type:String,
        trim:true,
    },
    userTasks:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});





const Store = mongoose.model('Store', storeSchema);
module.exports = Store;