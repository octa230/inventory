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
        <h1>Thank you for Shoping with us</h1>
        <p>[Purchase ${sale._id}]: ${sale.createdAt.toString().substring(0, 10)}</p>
        </div>
        <table>
        <thead>
        <tr>
        <td><strong>Unit</strong></td>
        <td><strong>Qty</strong></td>
        <td><strong align="right">Price</strong></td>
        </tr>
        </thead>
        <tbody>${sale.saleItems.map((item)=> `
        <tr>
        <td>${item.name}</td>
        <td align="center">${item.quantity}</td>
        <td align="right">${item.price.toFixed(2)}</td>
        </tr>
        `).join('/n')}
        </tbody>
        <tfoot>
        <tr> 
        <td colspan="2">Items Price</td>
        <td align="right">AED: ${sale.itemsPrice.toFixed(2)}</td>
        </tr>
        <tr>
        <td colspan="2">Paid</td>
        <td align="right">${sale.isPaid}</td>
        </tr>
        </tfoot>
        </table>
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