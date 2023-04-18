const router=require('express').Router();
const multer=require('multer')
const path=require('path')
const File=require('../models/files')
const {v4:uuid4} = require('uuid')


// configration of multer
let storage= multer.diskStorage({
    destination:(req,file,cb) => cb(null,'uploads/'),
    filename:(req,file,cb) => {
        const uniquename=`${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`
        cb(null,uniquename)
    }
})

let upload=multer({
    storage:storage,
    limits:{fileSize:1000000*100}
}).single('myfile')



router.post('/',(req,res)=>{
    

    // storage file   ye wahi storage hai jo multer me vairable tha
    upload(req,res,async (err)=>{
        // validate request
    if(!req.file){
        return res.json({error:'Choose the file'})
    }


        if(err){
            return res.status(500).send({error:err.message})
        }
        // store in to database
        // console.log(req.file)
        const file=new File({
            filename:req.file.filename,
            uuid:uuid4(),
            path:req.file.path,
            size:req.file.size
            
        });
        

        const response= await file.save()
        // console.log(response.uuid)
        // APP_BASE_URL=http://localhost:3000 saved hai .env file me
        return res.json({file:`${process.env.APP_BASE_URL}/files/${response.uuid}`})
        // link will appear like  http://localhost:3000/files/644tty-341635fscsdgfa 

    })
})

router.post('/send',async (req,res)=>{
    // console.log(req.body)
    const {uuid,emailTo,emailFrom}=req.body
    
    // validate request
    if(!uuid || !emailTo || !emailFrom){
        res.status(422).send({error:"All fields are required"})
    }
    // get data from database
    const file= await File.findOne({uuid:uuid})
    // console.log(file.sender)
    // if(file.sender){
    //     res.status(422).send({error:"email has already sent"})

    // }

    file.sender=emailFrom;
    file.receiver=emailTo
    const response=file.save();
    // send email
    const sendMail=require('../services/emailServices')
    sendMail({
        to:emailTo,
        from:emailFrom,
        subject:'File sharing',
        text:`${emailFrom} shared a file with you.`,
        html:require('../services/emailTemplate')({
            emailFrom:emailFrom,
            downloadLink:`${process.env.APP_BASE_URL}/file/${file.uuid}`,
            size:parseInt(file.size/1000) +'kb',
            expires:'24 hours' 

        })
    })

    return res.send({success:`{message sent successfully to ${emailTo}`})

    
})



module.exports=router