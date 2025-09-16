const sgMail = require("@sendgrid/mail");
require("dotenv").config();

// Set your SendGrid API key
sgMail.setApiKey(process.env.MAIL_PASSKEY);

// Helper: Extract name from email
const extractUserName = (email) => {
  let raw = email.split("@")[0];
  raw = raw.replace(/[\._0-9]+/g, " ");
  return raw
    .split(" ")
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// Main function to send email
async function sendingMails(userEmail) {
  const name = extractUserName(userEmail);

  const msg = {
    to: userEmail,
    from: process.env.MAIL_ID, // Verified sender
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
    const result = await sgMail.send(msg);
    console.log("📨 Mail sent successfully:", result[0].statusCode);
    return result;
  } catch (error) {
    console.error("❌ Error sending mail:", error);
    throw error; // Let ApplyJob handle it
  }
}

module.exports = { sendingMails };
