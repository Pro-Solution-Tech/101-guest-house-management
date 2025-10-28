import nodemailer from "nodemailer";
import validator from "validator";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Create email transporter
const createEmailTransporter = () => {
  return nodemailer.createTransport({
    host: "mail.privateemail.com", // e.g., mail.yourdomain.com
    port: 465, // usually 465 (SSL) or 587 (TLS)
    secure: true, // true for 465, false for 587
    auth: {
      user: process.env.PRIVATE_EMAIL_USER,
      pass: process.env.PRIVATE_EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

// Validation middleware
export const validateContactForm = (req, res, next) => {
  const { name, email, subject, message } = req.body;
  const errors = [];

  // Required field validation
  if (!name || name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long");
  }

  if (!email || !validator.isEmail(email)) {
    errors.push("Please provide a valid email address");
  }

  if (!subject || subject.trim().length < 5) {
    errors.push("Subject must be at least 5 characters long");
  }

  if (!message || message.trim().length < 10) {
    errors.push("Message must be at least 10 characters long");
  }

  // Optional field validation
  if (
    req.body.phone &&
    !validator.isMobilePhone(req.body.phone, "any", { strictMode: false })
  ) {
    errors.push("Please provide a valid phone number");
  }

  if (req.body.checkIn && req.body.checkOut) {
    const checkIn = new Date(req.body.checkIn);
    const checkOut = new Date(req.body.checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkIn < today) {
      errors.push("Check-in date cannot be in the past");
    }

    if (checkOut <= checkIn) {
      errors.push("Check-out date must be after check-in date");
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors,
    });
  }

  next();
};

// Sanitize input data
const sanitizeInput = (data) => {
  const sanitized = {};
  Object.keys(data).forEach((key) => {
    if (typeof data[key] === "string") {
      sanitized[key] = validator.escape(data[key].trim());
    } else {
      sanitized[key] = data[key];
    }
  });
  return sanitized;
};

// Generate email templates
const generateEmailTemplates = (data) => {
  const {
    name,
    email,
    phone,
    subject,
    message,
    checkIn,
    checkOut,
    guests,
    roomType,
    timestamp,
    userAgent,
    ipAddress,
  } = data;

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Email to business owner
  const businessEmailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>New Contact Form Submission - 101 Guest House</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #16a085 0%, #2d5a87 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #16a085; }
            .urgent { border-left-color: #e74c3c; }
            .label { font-weight: bold; color: #2c3e50; margin-right: 10px; }
            .value { color: #34495e; }
            .message-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border: 1px solid #ddd; }
            .footer { background: #34495e; color: white; padding: 20px; text-align: center; margin-top: 20px; border-radius: 8px; }
            .button { display: inline-block; padding: 12px 24px; background: #16a085; color: white; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
            .booking-info { background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin: 15px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🏨 New Contact Form Submission</h1>
                <p>101 Guest House Website</p>
            </div>
            <div class="content">
                <div class="info-box ${checkIn || roomType ? "urgent" : ""}">
                    <h3>📧 Contact Information</h3>
                    <p><span class="label">Name:</span><span class="value">${name}</span></p>
                    <p><span class="label">Email:</span><span class="value"><a href="mailto:${email}">${email}</a></span></p>
                    <p><span class="label">Phone:</span><span class="value">${
                      phone || "Not provided"
                    }</span></p>
                    <p><span class="label">Subject:</span><span class="value">${subject}</span></p>
                </div>

                ${
                  checkIn || checkOut || roomType
                    ? `
                <div class="booking-info">
                    <h3>🗓️ Booking Information</h3>
                    <p><span class="label">Check-in:</span><span class="value">${formatDate(
                      checkIn
                    )}</span></p>
                    <p><span class="label">Check-out:</span><span class="value">${formatDate(
                      checkOut
                    )}</span></p>
                    <p><span class="label">Guests:</span><span class="value">${
                      guests || 1
                    }</span></p>
                    <p><span class="label">Room Type:</span><span class="value">${
                      roomType || "Not specified"
                    }</span></p>
                </div>`
                    : ""
                }

                <div class="message-box">
                    <h3>💬 Message</h3>
                    <p style="white-space: pre-line;">${message}</p>
                </div>

                <div class="info-box">
                    <h3>📊 Submission Details</h3>
                    <p><span class="label">Submitted:</span><span class="value">${new Date(
                      timestamp
                    ).toLocaleString()}</span></p>
                    <p><span class="label">IP Address:</span><span class="value">${ipAddress}</span></p>
                    <p><span class="label">Browser:</span><span class="value">${userAgent}</span></p>
                </div>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="mailto:${email}" class="button">Reply to Customer</a>
                    ${
                      phone
                        ? `<a href="tel:${phone}" class="button">Call Customer</a>`
                        : ""
                    }
                </div>
            </div>
            <div class="footer">
                <p>This email was automatically generated from your 101 Guest House contact form.</p>
                <p>Please respond to the customer as soon as possible to maintain excellent service standards.</p>
            </div>
        </div>
    </body>
    </html>
  `;

  // Auto-reply email to customer
  const customerEmailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Thank You - 101 Guest House</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #16a085 0%, #f1c40f 100%); color: white; padding: 40px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #f1c40f; }
            .contact-info { background: #e8f8f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { background: #2c3e50; color: white; padding: 20px; text-align: center; margin-top: 20px; border-radius: 8px; }
            .logo { font-size: 36px; font-weight: bold; margin-bottom: 10px; }
            .tagline { font-size: 14px; opacity: 0.9; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">101 GUEST HOUSE</div>
                <div class="tagline">COMFORTABILITY WITH CLASS</div>
                <h2>Thank You for Contacting Us!</h2>
            </div>
            <div class="content">
                <p>Dear <strong>${name}</strong>,</p>
                
                <p>Thank you for reaching out to 101 Guest House. We have received your message regarding "<strong>${subject}</strong>" and truly appreciate your interest in our services.</p>

                <div class="info-box">
                    <h3>✅ What happens next?</h3>
                    <ul>
                        <li>Our team will review your inquiry within <strong>2-4 hours</strong></li>
                        <li>We'll respond with detailed information and availability</li>
                        <li>For urgent matters, please call us directly at <strong>+233 598 937 110</strong></li>
                    </ul>
                </div>

                ${
                  checkIn || roomType
                    ? `
                <div class="info-box">
                    <h3>🏨 Your Booking Inquiry</h3>
                    <p>We've noted your interest in:</p>
                    <ul>
                        ${
                          checkIn
                            ? `<li>Check-in: <strong>${formatDate(
                                checkIn
                              )}</strong></li>`
                            : ""
                        }
                        ${
                          checkOut
                            ? `<li>Check-out: <strong>${formatDate(
                                checkOut
                              )}</strong></li>`
                            : ""
                        }
                        ${
                          guests
                            ? `<li>Guests: <strong>${guests}</strong></li>`
                            : ""
                        }
                        ${
                          roomType
                            ? `<li>Room Type: <strong>${roomType}</strong></li>`
                            : ""
                        }
                    </ul>
                    <p>We'll check availability and get back to you with options and pricing.</p>
                </div>`
                    : ""
                }

                <div class="contact-info">
                    <h3>📞 Need Immediate Assistance?</h3>
                    <p><strong>Phone:</strong> +233 598 937 110 | +233 500 080 512</p>
                    <p><strong>WhatsApp:</strong> +233 598 937 110</p>
                    <p><strong>Email:</strong> info@101guesthouse.com</p>
                    <p><strong>Location:</strong> 50 Meters from Obolo Spot, Off the Koforidua High Way, Akyem Kukurantumi</p>
                </div>

                <p>We look forward to hosting you and providing you with an exceptional experience that embodies our commitment to "Comfortability with Class."</p>

                <p>Warm regards,<br>
                <strong>The 101 Guest House Team</strong></p>
            </div>
            <div class="footer">
                <p>© 2025 101 Guest House. All rights reserved.</p>
                <p>This is an automated response to confirm we received your message.</p>
            </div>
        </div>
    </body>
    </html>
  `;

  return {
    businessEmail: {
      subject: `🏨 New Contact: ${subject} - from ${name}`,
      html: businessEmailHTML,
      text: `New contact form submission from 101 Guest House website.\n\nFrom: ${name} (${email})\nPhone: ${
        phone || "Not provided"
      }\nSubject: ${subject}\n\nMessage:\n${message}\n\nBooking Details:\nCheck-in: ${formatDate(
        checkIn
      )}\nCheck-out: ${formatDate(checkOut)}\nGuests: ${
        guests || 1
      }\nRoom Type: ${roomType || "Not specified"}\n\nSubmitted: ${new Date(
        timestamp
      ).toLocaleString()}`,
    },
    customerEmail: {
      subject: `Thank you for contacting 101 Guest House - We'll respond soon!`,
      html: customerEmailHTML,
      text: `Dear ${name},\n\nThank you for contacting 101 Guest House. We have received your message regarding "${subject}" and will respond within 2-4 hours.\n\nFor immediate assistance, please call +233 598 937 110.\n\nBest regards,\nThe 101 Guest House Team`,
    },
  };
};

// Main contact form handler
export const handleContactSubmission = async (req, res) => {
  try {
    const sanitizedData = sanitizeInput(req.body);

    const submissionData = {
      ...sanitizedData,
      timestamp: new Date().toISOString(),
      ipAddress: req.ip || req.connection.remoteAddress || "Unknown",
      userAgent: req.get("User-Agent") || "Unknown",
    };

    const transporter = createEmailTransporter();

    // Verify transporter connection to catch auth errors early
    await transporter.verify();

    const emailTemplates = generateEmailTemplates(submissionData);
    const businessEmail =
      process.env.BUSINESS_EMAIL || "info@101guesthouse.com";
    const customerEmail = submissionData.email;

    const businessMailOptions = {
      from: `"101 Guest House Contact Form" <${
        process.env.PRIVATE_EMAIL_USER || "info@101guesthouse.com"
      }>`,
      to: businessEmail,
      replyTo: customerEmail,
      subject: emailTemplates.businessEmail.subject,
      html: emailTemplates.businessEmail.html,
      text: emailTemplates.businessEmail.text,
      priority:
        submissionData.checkIn || submissionData.roomType ? "high" : "normal",
    };

    const customerMailOptions = {
      from: `"101 Guest House" <${
        process.env.PRIVATE_EMAIL_USER || "info@101guesthouse.com"
      }>`,
      to: customerEmail,
      subject: emailTemplates.customerEmail.subject,
      html: emailTemplates.customerEmail.html,
      text: emailTemplates.customerEmail.text,
    };

    // Send both emails in parallel
    const [businessResult, customerResult] = await Promise.all([
      transporter.sendMail(businessMailOptions),
      transporter.sendMail(customerMailOptions),
    ]);

    console.log("Contact form submission successful:", {
      name: submissionData.name,
      email: submissionData.email,
      businessEmailId: businessResult.messageId,
      customerEmailId: customerResult.messageId,
    });

    res.status(200).json({
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    });
  } catch (error) {
    console.error("Contact form submission error:", error);

    let errorMessage =
      "An error occurred while sending your message. Please try again.";
    let statusCode = 500;

    if (error.code === "EAUTH") {
      errorMessage = "Email authentication failed. Please contact support.";
      console.error(
        "Email authentication error - Please check PRIVATE_EMAIL_USER and PRIVATE_EMAIL_PASSWORD in your .env file."
      );
    } else if (error.code === "ECONNECTION") {
      errorMessage =
        "Unable to connect to email server. Please try again later.";
    } else if (error.code === "EMESSAGE") {
      errorMessage =
        "Invalid message format. Please check your input and try again.";
      statusCode = 400;
    }

    res.status(statusCode).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
