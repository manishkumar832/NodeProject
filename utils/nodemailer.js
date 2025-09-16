require("dotenv").config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const extractUserName = (email) => {
  let raw = email.split("@")[0];
  raw = raw.replace(/[\._0-9]+/g, " ");
  return raw
    .split(" ")
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

async function sendingMails(userEmail) {
  const name = extractUserName(userEmail);

  const msg = {
    to: userEmail,
    from: {
      email: process.env.MAIL_ID,   // Verified Gmail
      name: "Team NextHire"
    },
    subject: "Job Application Submitted Successfully",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color:#2d89ef;">Hi ${name},</h2>
        <p>Your job application has been submitted successfully ✅</p>
        <p>We’ll review your application and get back to you soon.</p>
        <br/>
        <p>Regards,<br/><strong>Team NextHire</strong></p>
      </div>
    `
  };

  try {
    await sgMail.send(msg);
    console.log("✅ Mail sent successfully");
    return "Mail sent successfully";
  } catch (error) {
    console.error("❌ Error sending mail:", error.response?.body || error);
    return error;
  }
}

module.exports = { sendingMails };
