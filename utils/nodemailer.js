const nodemailer=require("nodemailer")
require("dotenv").config()

const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
      user:process.env.MAIL_ID, //here i pass my mail which i created
      pass:process.env.MAIL_PASSKEY  // created mail pass key
    }
})

transporter.verify((err, success) => {
  if (err) {
    console.error("❌ SMTP connection failed:", err);
  } else {
    console.log("✅ SMTP server is ready to send emails");
  }
});
const extractUserName = (email) => {
  let raw = email.split("@")[0]; 
  raw = raw.replace(/[\._0-9]+/g, " ");
  return raw
    .split(" ")
    .filter(Boolean) 
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");
};

async function sendingMails(userEmail) {
   const name = extractUserName(userEmail);
    
    const mailoption={
        from:process.env.mailid,  // here i pass my mail which i created
        to:userEmail,
         subject: "Job Application Submitted Successfully",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color:#2d89ef;">Hi ${name},</h2>
        <p>Your job application has been submitted successfully ✅</p>
        <p>We’ll review your application and get back to you soon.</p>
        <br/>
        <p>Regards,<br/><strong>Team NextHire</strong></p>
      </div>
    `,

    }

  try {
     const result =await transporter.sendMail(mailoption)
     console.log("js result",result)
     return "mail send successfully"
   } catch (error) {
      console.log(error)
      return error
   }
}

module.exports ={sendingMails}