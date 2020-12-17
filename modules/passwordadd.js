const mongoose=require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://shubhamKunwar:shubhamkunwar@cluster0.0axez.mongodb.net/cse?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true})

var db=mongoose.connection
const passwordDetailsSchema=new mongoose.Schema({
    questionNo:{
         type:Number,
         required: true,
         index: {
            unique: true
        }
    },    
    question:{
         type:String,
         required: true
        
    },    
    answer:{
         type:String,
         required: true,
         
    },    
    date:{
        type:Date,
        default:Date.now
    }
})
passwordDetailsSchema.plugin(mongoosePaginate);
 const passwordDetailsModel=mongoose.model('answers',passwordDetailsSchema)
 module.exports=passwordDetailsModel