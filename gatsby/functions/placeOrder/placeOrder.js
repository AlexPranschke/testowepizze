const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  logger: true,
  debug: true,
  secureConnection: false,
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// test email
exports.handler = async (event, context) => {
  const info = await transporter.sendMail({
    from: 'testowa stronka <testowaStronka@example.com>',
    to: 'orders@example.com',
    subject: 'new order',
    html: `<p>test<p>`,
  });
  console.log(info);
  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};
