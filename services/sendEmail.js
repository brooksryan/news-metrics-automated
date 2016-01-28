var nodemailer = require('nodemailer');

module.exports = {
	sendNewMail: function (transporter){
		var transporter = nodemailer.createTransport({
	    service: 'gmail',
	    auth: {
		        user: 'brooksryan19@gmail.com',
		        pass: 'Bologna1992'
		    }
		}, {
		    // default values for sendMail method
		    from: 'brooksryan19@gmail.com',
		    headers: {
		        'My-Awesome-Header': '123'
		    }
		});


		transporter.sendMail({
	    // default values for sendMail method
	    to: 'brooks.ryan@elementum.com', // list of receivers
	    subject: "Hello ✔", // Subject line
	    text: "Hello world ✔", // plaintext body
		}, function (err,info){
		  if (err) {console.log(err)}
		  else (console.log(info));
		});
	}
}