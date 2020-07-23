const sendgrid = require('@sendgrid/mail');

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const COMPANY_EMAIL = process.env.COMPANY_EMAIL;

sendgrid.setApiKey(SENDGRID_API_KEY);

const accountCreationMail = (email, name) => {
  sendgrid.send({
    to: email,
    from: COMPANY_EMAIL,
    subject: 'Thanks for using WhiteSpot App',
    text: `Welcome to the WhiteSpot family ${name}.Reach out to us for any support/guidance/feedback.Have a nice day!
    `,
  });
};

const accountDeletionMail = (email, name) => {
  sendgrid.send({
    to: email,
    from: COMPANY_EMAIL,
    subject: 'Apologies for inconvenience',
    text: `Hello ${name}. You recently cancelled your WhiteSpot account. We are very sorry for inconveniences you faced. Kindly reply to this mail, if you think we can fix the issue together so that you get the maximum out of our services.`,
  });
};

module.exports = {
  accountCreationMail,
  accountDeletionMail,
};
