import nodemailer from "nodemailer";
import User from "@/lib/models/userModel";
import bcryptjs from 'bcryptjs';


export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        console.log(email,emailType,userId);
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } 
        var transport = nodemailer.createTransport({
            service:'gmail',
            auth: {
              user: "tchougale2107@gmail.com",
              pass: process.env.EMAIL_PASSWORD
            }
          });


        const mailOptions = {
            from: 'tchougale2107@gmail.com',
            to: email,
            subject: "Verify your email",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail
        (mailOptions);
        console.log('mail res',mailresponse);
        return mailresponse;

    } catch (error:any) {
        console.error('mail error',error);
        throw new Error(error.message);
    }
}