const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.helloWorld = functions.https.onRequest((request, response) => {
  console.log(request);
  response.send("Hello from Firebase!");
 });

 exports.addMessage = functions.https.onCall((data, context) => {
    const text = data.quote.text;
    const price = data.quote.price;
    const taxes = data.quote.taxes;
    const total = data.quote.total;
    const work = data.quote.work;
    const clientEmail = data.quote.email;
    // Authentication / user information is automatically added to the request.
    const uid = context.auth.uid;
    const name = context.auth.token.name || null;
    const picture = context.auth.token.picture || null;
    const email = context.auth.token.email || null;
    console.log(name);
    console.log(price);
    console.log(taxes);
    console.log(total);
    console.log(work);
    //console.log(data.quote);

    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'mr.guoping.wu@gmail.com',
          pass: '=Bruce430!',
        }
    });



    var mailOptions = {
        from: email,
        to: clientEmail,
        subject: 'Quote',
        html: '<h1>Quote</h1><p>work: {{work}}</p><p>price: {{price}}</p><p>total: {{total}}</p>'
     };

     transporter.sendMail(mailOptions, function(error, info){
         if (error) {
             console.log(error);
             return { emailresult: "fail"};
         } else {
            console.log('Email sent: ' + info.response);
            return { emailresult: "succuss"};
        }
     });


     return { text: "Guoping cleaned msg"};
});

exports.sendQuote = functions.https.onCall((data, context) => {
   const uid = context.auth.uid;
   const name = context.auth.token.name || null;
   const picture = context.auth.token.picture || null;
   const email = context.auth.token.email || null;
   const token = context.auth.token || null;
   console.log(name);
   console.log(email);
   //console.log(uid);
   //console.log(token);
   //console.log(data.quote);

   const email1 = email.replace(/[.,#$\[\]@ ]/g,'');
   const name1 = name.replace(/[.,#$\[\]@ ]/g,'');
   const usertag = (name1 + '+' + email1).toLowerCase();
   console.log(usertag);

   const text = data.quote.text;
   const price = data.quote.price;
   const taxes = data.quote.taxes;
   const total = data.quote.total;
   const work = data.quote.work;
   const clientEmail = data.quote.email;
   // Authentication / user information is automatically added to the request.
   //const uid = context.auth.uid;
   //const name = context.auth.token.name || null;
   //const picture = context.auth.token.picture || null;
   //const email = context.auth.token.email || null;
   //console.log(name);
   console.log(price);
   console.log(taxes);
   console.log(total);
   console.log(work);
   //console.log(data.quote);

   var nodemailer = require('nodemailer');

  /* var transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
         user: 'mr.guoping.wu@gmail.com',
         pass: '=Bruce430!',
       }
   });*/

   var transporter = nodemailer.createTransport({
         service: 'Gmail',
         auth: {
             XOAuth2: {
                 user: "mr.guoping.wu@gmail.com",
                 clientId: "1088029675584-nq1tuerdrl96b0f7n7ahu35cjvltk1i8.apps.googleusercontent.com",
                 clientSecret: "x2N2d4mDfLwwyhMiZdCNSYxp",
                 refreshToken: "1/yvD7nGKdRilixLq7qp0qqfwuxlh8rIWRfY5cnwgUpX0"
             }
         },
         debug: true
     });


   console.log("transporter configured");

   var mailOptions = {
       from: 'info@jc.com',
       to: 'info@shop1234.net',
       subject: 'Quote',
       html: '<p>Your html here</p>'
    };

    console.log("mailOption configured");

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            return { emailresult: "fail"};
        } else {
           console.log('Email sent: ' + info.response);
           return { emailresult: "succuss"};
       }
    });


    //return { text: "Guoping cleaned msg"};

    // Create a SMTP transport object
    /*var transport = nodemailer.createTransport("SMTP", {
            service: 'Gmail',
            auth: {
                user: "mr.guoping.wu@gmail.com",
                pass: "=Bruce430!"
            }
        });

    console.log('SMTP Configured');

    // Message object
    var message = {

        // sender info
        from: email,

        // Comma separated list of recipients
        to: clientEmail,

        // Subject of the message
        subject: 'Quote', //

        headers: {
            'X-Laziness-level': 1000
        },


        // HTML body
        html: '<h1>Quote</h1><p>work: {{work}}</p><p>price: {{price}}</p><p>total: {{total}}</p>'

    };

    console.log('Sending Mail');
    transport.sendMail(message, function(error){
        if(error){
            console.log('Error occured');
            console.log(error.message);
            return;
        }
        console.log('Message sent successfully!');

        return { text: "quote sent"};
    );*/

    // This is the easiest way to send mail

    /*var mail = require("nodemailer").mail;

    mail({
    from: email, // sender address
    to: clientEmail, // list of receivers
    subject: "Quote", // Subject line
    html: '<h1>Quote</h1><p>work: {{work}}</p><p>price: {{price}}</p><p>total: {{total}}</p>'
  });*/
  });
