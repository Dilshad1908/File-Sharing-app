require('dotenv').config()
const mongoose=require('mongoose');
function connectDB(){
    // Database connecttion
    mongoose.connect(process.env.MONGO_CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true});
     const connection = mongoose.connection
     connection.on('error', console.error.bind(console,'error in connecting '))
     connection.once('open', ()=>{
      console.log('succesfully connected to database')
     })

}

// export function for use in other files(export function name)

module.exports=connectDB