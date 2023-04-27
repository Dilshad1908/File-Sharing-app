const express=require('express');
const app=express();
const path=require('path')
const PORT= process.env.PORT ||3000;
const cors= require('cors')

app.use(express.static('public'))
const connectDB=require('./config/db')
connectDB()

// cors

const corsOptions={
    origin:process.env.ALLOWED_CLIENTS.split(',')
}

app.use(cors(corsOptions))
// app.use(cors({
//     origin:'http://127.0.0.1:5500',
// }))

// set view engine 
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))



// middleware
app.use(express.json());
app.use('/api/file',require('./routes/files'))
app.use('/file',require('./routes/show'))
app.use('/file/download',require('./routes/download'))

app.listen(PORT,()=>{
    console.log(`server is running at port:${PORT}`)
})

