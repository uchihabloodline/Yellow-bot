const express = require('express');
const app = express();
const PORT = 9000;
const dfff = require('dialogflow-fulfillment'); 


// Data for custom payload

var customUserPayload = {
    userData: {
        name: 'Shivam Pandey',
        customerType: 'Premium',
        accountStatus: 'Active',
        totalOrders: '20',
        recentOrderStatus: 'delivered'
    }
};


// Default response for validation that server is running good and 
// Giving back appropriate response

app.get('/',express.json(), (req,res) => {
    res.send("Server is live");
});

app.post('/',express.json(), async (req,res) => {
    const agent = new dfff.WebhookClient({
            request: req,
            response: res
        });
     function feedback(agent){
        // agent.add("we value your feedback, Please give your valuable feedback");
        agent.add( new dfff.Card({
            title: `Title: this is a card title`,
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
            text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
            buttonText: 'This is a button',
            buttonUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg"
          }));

    }

    function rating(agent){
        agent.add("please give your rating for the most recent purchase");
    }

    function order(agent){
        // let payloadData = {
        //     "richContent": [
        //       [
        //         {
        //           "type": "Food",
        //           "title": "Mix Veg",
        //           "subtitle": "Mix Veg curry",
        //           "image": {
        //             "src": {
        //               "rawUrl": "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg"
        //             }
        //           }, 
        //           "text": "Order in progress"
        //         }
        //       ]
        //     ]
        //   }
            agent.add( new dfff.Card({
                title: `Title: this is a card title`,
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
                text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
                buttonText: 'This is a button',
                buttonUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg"
              }));
        }

    async function userDetails(agent){
        console.log('agent-->',agent);
        try{
            let userPayload = {
                "richContent": [
                  [
                    {
                      "type": "description",
                      "title": "Description title",
                      "text": [
                        "This is text line 1.",
                        "This is text line 2."
                      ]
                    }
                  ]
                ]
              }
            await agent.add( new dfff.Payload(agent.UNSPECIFIED, userPayload, {rawPayload: true, sendAsMessage: true}));
        }catch(err){
            if(err){
                console.log("err-->",err);
            }
        }
    }

    let intentMap = new Map();

    intentMap.set('feedback', feedback);
    intentMap.set('rating', rating);
    intentMap.set('myorder', order);
    intentMap.set('user', userDetails);

    //handling all the request for all the respective intents
    await agent.handleRequest(intentMap);
});

// Server listens at given PORT
app.listen(PORT,(err)=>{
    if(err){
        console.log(`Error running the server at ${PORT}`);
    }
    console.log(`Server is live at PORT ${PORT}`);
});
