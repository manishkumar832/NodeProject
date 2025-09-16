const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
require("dotenv").config();

// Configure transporter with SendGrid API
const transporter = nodemailer.createTransport(
  sgTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY, // Add your SendGrid API key in .env
    },
  })
);

// Verification function
transporter.verify((err, success) => {
  if (err) {
    console.error("❌ SendGrid connection failed:", err);
  } else {
    console.log("✅ SendGrid is ready to send emails");
  }
});

// Function to extract user name from email
const extractUserName = (email) => {
  let raw = email.split("@")[0];
  raw = raw.replace(/[\._0-9]+/g, " ");
  return raw
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// Function to send email
async function sendingMails(userEmail) {
  const name = extractUserName(userEmail);

  const mailOptions = {
    from: "you@yourdomain.com", // Must be verified sender in SendGrid
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
    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Mail sent successfully", result);
    return "Mail sent successfully";
  } catch (error) {
    console.error("❌ Error sending mail:", error);
    return error;
  }
}

module.exports = { sendingMails };
