exports.handler = async (event, context, callback) => {
  console.log("Custom message trigger event:", JSON.stringify(event, null, 2));

  if (event.triggerSource === "CustomMessage_SignUp") {
    const email = event.request.userAttributes.email;
    const username = event.userName;

    // ✅ Log new signup event
    console.log(`New user sign-up: Email: ${email}, Username: ${username}, Time: ${new Date().toISOString()}`);

    // ✅ Customize the email subject and message
    event.response.emailSubject = "Verify your FuturePath account now!";
    event.response.emailMessage = `Thank you for signing up for FuturePath and taking the first step towards a brighter future. Now all you have to do is verify your email using this link: ${event.request.codeParameter}`;
  }

  callback(null, event);
};
