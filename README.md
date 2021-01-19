# Yellow-bot
Conversational Bot built using google's DialogFlow API and a custom webserver written in Node.js

<h2>Setting up ngrok for using local server in dialogflow at https protocol </h2>

<ul>
  <li>Download ngrok from the official website
  <li>After extracting the files, run the `.exe` file present there.
  <li>After running your local node server on the destined PORT(9000 here), run the command `ngrok http <PORT>`
  <li>Copy the generated address for your server and paste it in dialogflow fulfillment and save it.
  <li>Now you're all set to do things to your server and test them on the intents!!
</ul>

<h2> Steps to start the project</h2>
  <ol>
    <li> Git clone this repository
    <li> Do `npm i` for in the terminal at respective project location
    <li> Create a account on DialogFlow on <a href='https://dialogflow.cloud.google.com/'> this link </a>
    <li> Start the project by doing `nodemon index.js`.
    <li> From the console on DialogFlow, send message intent for respective responses. Eg:- rating, feedback, order etc.
  
  </ol>
  
  <h3> Do put up discussions and issues of any addition or modification!</h3>
  
  
