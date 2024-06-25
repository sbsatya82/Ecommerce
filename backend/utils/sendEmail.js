const nodeMailer = require("nodemailer");

exports.sendEmail = async (options) => {
  try {
    const transporter = nodeMailer.createTransport({
      host:process.env.SMPT_HOST,
      port:process.env.SMPT_PORT,
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: options.email,
      subject: options.subject,
      text: options.message
    };

    // Send email and await the result
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${options.email}`);
  } catch (error) {
    console.error("Error sending email:", error);

    throw new Error("Failed to send email. Please try again later.");
  }
};
