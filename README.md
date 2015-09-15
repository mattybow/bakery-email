### Hey Cameron
---
Here's how you run this demo
```
> git clone https://github.com/mattybow/bakery-email.git
> cd bakery-email
> npm install
> node server
```
Since you're on windows command line, you'll type
```
set MG_API_KEY=key-xxxxxxxxxxxx
```
This sets the environment variable for the mailgun api.  In heroku, you can set this in the config vars.  We don't want to put it directly in the source because this is a public repo.
```js
var MG_API_KEY = process.env.MG_API_KEY;
var mailgun = require('mailgun-js')({apiKey:MG_API_KEY,domain:MG_DOMAIN});
```
<br><br>
When you see:
```
Node app is running on port 5000
```
Open up a new browser window and go to http://localhost:5000

You'll see that I've taken out all but the form stuff.  I only set up the last form, the one with the file upload because that's probably the most difficult.

You can go ahead and try it for yourself, I've set the email address to send to your email address so you can see that it's working.

### What's going on in the code
#### Clientside
---
In `js/email.js` which we load at the bottom of the `<body>` tag, we're attaching an event to the click of the submit button selected by the id attribute.  

I removed a couple of the attributes on the `<form>` element because it was causing a new message to come up.  On click, we prevent the default behavior from happening to keep the form from submitting and we handle the event ourselves.  We grab the info from the fields, put it in a `new FormData` and `POST` with ajax to the route `email`.

The callback provides you a way of hooking into the response from the server.

#### Serverside
---
In `server/index.js` we're using a couple new modules to make our life easier.  You will need to install these in your own repo to use them.  Run:
```
npm install body-parser mailgun-js multer --save
```
I've tried to make things clear by blocking out the sections of the code that pertain to email sending.

In the `email` route, our callback creates a new attachment object from the `Buffer` object from the buffer key in `body.resume`, which we specified on the client when we formed the payload.

The `data` variable is where you can set who you send to and who it's from.  If you want to send a confirmation email to the sender it's as simple as calling the `send` method again.  You can also put the body in html with inline styles to make it look pretty.  See the api [here](https://github.com/1lobby/mailgun-js#usage-overview) or read the [mailgun blogpost](http://blog.mailgun.com/how-to-send-transactional-emails-in-a-nodejs-app-using-the-mailgun-api/)
