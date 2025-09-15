const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "SendGrid",
  auth: {
    api_key: process.env.MAIL_PASSKEY,
  },
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

  const mailoption = {
    from: process.env.MAIL_ID,
    to: userEmail,
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
  };

  try {
    const result = await transporter.sendMail(mailoption);
    console.log("📨 Mail sent result:", result);
    return "Mail sent successfully";
  } catch (error) {
    console.error("❌ SendGrid mail error:", error);
    return error.message;
  }
}

module.exports = { sendingMails };
