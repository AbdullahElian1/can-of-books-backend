'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const server = express();
server.use(cors());

const PORT = process.env.PORT;



mongoose.connect('mongodb://localhost:27017/myFavBooks', { useNewUrlParser: true, useUnifiedTopology: true });

const bookSchema = new mongoose.Schema({
    name: String,
    description: String,
    url: String
});

//create a schema
const userSchema = new mongoose.Schema({
    email: String,
    books: [bookSchema]
});



const myUserModel = mongoose.model('email', userSchema);

function seedEmailCollection() {
    const user1 = new myUserModel({
        email: 'abodelian28@gmail.com',
        books: [
            {
                name: 'Living in the Light: A guide to personal transformation',
                description: 'Living in the Light: A Guide to Personal and Planetary Transformation is just that, but so much more. This is self-help for those who have real There comes a time for many when their self-help journey inevitably takes on a spiritual connotation given the extent to how deep their attempts to become the best version of themself go.',
                url: 'https://ecdn.teacherspayteachers.com/thumbitem/Living-in-the-Light-A-guide-to-personal-transformation-4998424-1572904693/original-4998424-1.jpg'
            },
            {
                name: 'The Choice: Embrace the Possible',
                description: 'Its 1944 and sixteen-year-old ballerina and gymnast Edith Eger is sent to Auschwitz. Separated from her parents on arrival, she endures unimaginable experiences, including being made to dance for the infamous Josef Mengele. When the camp is finally liberated, she is pulled from a pile of bodies, barely alive.',
                url: 'https://kbimages1-a.akamaihd.net/2b4b2761-dee6-4592-8c33-934d1c3b9046/353/569/90/False/the-choice-80.jpg'
            }
        ]
        

    })

    user1.save();
  
}

//  seedEmailCollection();


//http://localhost:3010/book?email=abed

server.get('/book',bookHandler)

function bookHandler(req,res){
    let emailForBook=req.query.email;
    // console.log(email);

    myUserModel.find({email:emailForBook},function(err,userData){
        if(err){
            res.send(err);
        }
        else
        {
            
            res.send(userData[0].books);
            
        }
    })

}


server.get('/', homeHandler);

function homeHandler(req, res) {
    res.send('Home Route');
}

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})