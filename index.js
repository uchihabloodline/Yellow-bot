const express = require('express');
const app = express();
const PORT = 9000;
const dfff = require('dialogflow-fulfillment'); 


// Data for custom payload
var customers = [{
        id: '001',
        name: 'Shivam pandey',
        total_orders: 20,
        current_location: 'Jaipur',
        recent_order: 'In-progress',
    },
    {
        id: '002',
        name: 'Abhinav',
        total_orders: 22,
        current_location: 'Jaipur',
        recent_order: 'Delivered',


    },
    {
        id: '003',
        name: 'Aksh',
        total_orders: 12,
        current_location: 'Bangalore',
        recent_order: 'On-hold',
    },
    {
        id: '004',
        name: 'Saurav',
        total_orders: 24,
        current_location: 'Bangalore',
        recent_order: 'Delivered',
    }
];

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
        agent.add("we value your feedback, Please give your valuable feedback");
        agent.add( new dfff.Card({
            title: `Levis T-shirt`,
            imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81HmWijGHVL._UY550_.jpg",
            text: `Order delivered 💁`,
            buttonText: 'Tap for details',
            buttonUrl: "https://images-na.ssl-images-amazon.com/images/I/81HmWijGHVL._UY550_.jpg"
          }));

    }

    function rating(agent){
        agent.add("please give your rating for the most recent purchase");
    }

    function order(agent, qty = 1){
        let payloadData = {
            title: `Levis T-shirt, qty = ${qty}`,
            imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81HmWijGHVL._UY550_.jpg",
            text: `Your order is in progress 💁`,
            buttonText: 'Tap to check your order details',
            buttonUrl: "https://images-na.ssl-images-amazon.com/images/I/81HmWijGHVL._UY550_.jpg"
          }
            agent.add( new dfff.Card(payloadData));
        }

    function myreturn(agent){
        let payloadData = {
            title: `RETURN Levis T-shirt`,
            imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81HmWijGHVL._UY550_.jpg",
            text: `Your order is in progress -> return successfully Placed 💁`,
            buttonText: 'Tap to check your order details',
            buttonUrl: "https://images-na.ssl-images-amazon.com/images/I/81HmWijGHVL._UY550_.jpg"
          }
            agent.add( new dfff.Card(payloadData));
    };

    function payment(agent){
        let payloadData = {
            title: `[PAYMENT-COMPLETED]`,
            imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81HmWijGHVL._UY550_.jpg",
            text: `[PRE-PAID]`,
            buttonText: 'Tap to check your order details',
            buttonUrl: "https://images-na.ssl-images-amazon.com/images/I/81HmWijGHVL._UY550_.jpg"
          }

          agent.add( new dfff.Card(payloadData));
    }

    async function userDetails(agent){
        try{
            let name = 'Shivam pandey',
            current_order = 'active',
            total_orders = 20,
            customer_status = 'Active',
            current_location = 'Jaipur';
            
            await agent.add(`Name: ${name} \n 
                             order_status: ${current_order} \n
                             total_orders: ${total_orders} \n
                             your_status: ${customer_status} \n
                             Location: ${current_location}
                        `)
            // await agent.add( new dfff.Payload(agent.UNSPECIFIED, userPayload, {rawPayload: true, sendAsMessage: true}));
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
    intentMap.set('mypayment', payment);
    intentMap.set('return', myreturn);

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
