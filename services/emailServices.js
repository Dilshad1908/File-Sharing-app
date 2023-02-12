const nodemailer=require('nodemailer');
async function sendMail({from,to,subject,text,html}){
// setting transport
    let transporter=nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        secure:false,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
        }
    })
// sending email
    let info=await transporter.sendMail({
        from:`Dilshad${from}`,
        to:to,
        subject:subject,
        text:text,
        html:html
    })

}

module.exports=sendMail;