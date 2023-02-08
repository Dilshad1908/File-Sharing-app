const express=require('express');
const app=express();
const PORT= process.env.PORT ||3000;
const connectDB=require('./config/db')
connectDB()

// middleware
app.use('/api/file',require('./routes/files'))

app.listen(PORT,()=>{
    console.log(`server is running at port:${PORT}`)
})