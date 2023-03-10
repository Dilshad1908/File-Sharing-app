const nodemailer=require('nodemailer');
require('dotenv').config()


async function sendMail({from,to,subject,text,html}){
// setting transport
    let transporter=nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port: 465,
        secure:true,
    auth: {
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS
    }
    })

// sending email
    let info=await transporter.sendMail({
        from:from,
        to:to,
        subject:subject,
        text:text,
        html:html
    })
    // console.log(info)

}

module.exports=sendMail;