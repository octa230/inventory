const nodemailer = require('nodemailer');

const sendEmail = async(subject, message, send_to, sent_from, reply_to, Invoice )=> {

    ///create mail transporter func

    let company = 'Uplifting Floral Studio'
    let InvoiceNumber = Invoice;
    


    let message= `
    <!DOCTYPE html>
    <html>
        <head>
        <meta Charset="UTF-8"/>
        <title>Invoice</title>
        </head>
        <body>
        <h1>Hello ${send_to}</h1>
        <div>
        </div>
        </body>
    </html>
    `
      

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },

        tls:{
            rejectUnauthorized: false,
        }
        
    })

    const options = {
        from: sent_from,
        to: send_to,
        replyTo: reply_to,
        subject: subject,
        html: message
    }

    transporter.sendMail(options, (err, info)=>{
        if(err){
            console.log(err)
        } else {
            console.log(info)
        }
    })


}

module.exports = sendEmail