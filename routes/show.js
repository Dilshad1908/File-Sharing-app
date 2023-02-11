const router=require('express').Router();
const File=require('../models/files')



router.get('/:uuid', (req,res)=>{

        const file= File.findOne({uuid:req.params.uuid},(err,fil)=>{
            // if you cosole file then it will give as req (many properties)
            // but i  fil it is only one schema(because findone hai) which is stored in database
            if(!file){
                console.log("file does not exist")
                return res.render('download',{error:'file does not exist'})
            }
            if(err){
                return res.render('download',{message:'something went wrong'})

            }
             console.log(fil)
            return res.render('download',{
                uuid:fil.uuid,
                fileName:fil.filename,
                fileSize:fil.size,
                downloadLink: `${process.env.APP_BASE_URL}/file/download/${fil.uuid}`
                // link will be like - http://localhost:3000/file/downlod/67367-76287nbb
            })

        })
        
    
        
})

module.exports=router