const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.helloWorld = functions.https.onRequest((request, response) => {
  console.log(request);
  response.send("Hello from Firebase!");
 });

 exports.addMessage = functions.https.onCall((data, context) => {
    const text = data.text;
    const price = data.price;
    const taxes = data.taxes;
    const total = data.total;
    const work = data.work;
    // Authentication / user information is automatically added to the request.
    const uid = context.auth.uid;
    const name = context.auth.token.name || null;
    const picture = context.auth.token.picture || null;
    const email = context.auth.token.email || null;
    //console.log(name);
    //console.log(price);
    //console.log(taxes);
    //console.log(total);
    //console.log(work);
    console.log(data.quote);
    return { text: "Guoping cleaned msg"};
});
