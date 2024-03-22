const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
    <h2>Your Recent Order for $${total}</h2>
    <p>Please start walking over, we will have your order ready in the next 20 mins.</p>
    <ul>
      ${order
        .map(
          (item) => `<li>
          <img src="${item.thumbnail}" alt="${item.name}"/>
          ${item.size} ${item.name} - $${item.price}
        </li>`
        )
        .join('')}
    </ul>
    <p>Your total is <strong>$${total}</strong></p>
    <style>
      ul {
        list-style: none;
      }
    </style>
  </div>`;
}

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

exports.handler = async (event, context) => {
  console.log('Received event:', event);

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Invalid JSON format in request body',
      }),
    };
  }

  console.log('Parsed body:', body);

  const requiredFields = ['email', 'name', 'order', 'total'];

  for (const field of requiredFields) {
    console.log(`Checking that ${field} is good`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field`,
        }),
      };
    }
  }

  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Why would you order nothing?!`,
      }),
    };
  }

  try {
    const info = await transporter.sendMail({
      from: "Slick's Slices <slick@example.com>",
      to: `${body.name} <${body.email}>, orders@example.com`,
      subject: 'New order!',
      html: generateOrderEmail({ order: body.order, total: body.total }),
    });
    console.log(info);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
