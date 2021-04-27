const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

module.exports = {
  error,
  stock,
};

const alertNumber = process.env.ALERT_NUMBER;
const messagingServiceSid = process.env.TWILIO_MSSID;

async function error(err) {
  await twilio.messages.create({
    messagingServiceSid,
    to: alertNumber,
    body: `Stock Sniper crashed! -  ${err}`,
  });
}

async function stock(message, items) {
  const itemLinks = items.reduce(
    (acc, item) => acc + `${item.title} - ${item.link}\n`,
    '',
  );
  const body = `${message}\n${itemLinks}`.substring(0, 1599);
  await twilio.messages.create({
    messagingServiceSid,
    to: alertNumber,
    body,
  });
}
