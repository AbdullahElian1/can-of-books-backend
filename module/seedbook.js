
'use strict';
const mongoose = require('mongoose');

module.exports = {
    bookHandler,
    handleAddBook,
    handleDeleteBook,
    handleUpdate
};
const URL =process.env.MONGO_URL;
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

const bookSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: String
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
                status: 'https://ecdn.teacherspayteachers.com/thumbitem/Living-in-the-Light-A-guide-to-personal-transformation-4998424-1572904693/original-4998424-1.jpg'
            },
            {
                name: 'The Choice: Embrace the Possible',
                description: 'Its 1944 and sixteen-year-old ballerina and gymnast Edith Eger is sent to Auschwitz. Separated from her parents on arrival, she endures unimaginable experiences, including being made to dance for the infamous Josef Mengele. When the camp is finally liberated, she is pulled from a pile of bodies, barely alive.',
                status: 'https://kbimages1-a.akamaihd.net/2b4b2761-dee6-4592-8c33-934d1c3b9046/353/569/90/False/the-choice-80.jpg'
            }
        ]
        

    })

    user1.save();
  
}

// seedEmailCollection();

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


function handleAddBook(req,res){
    let {name,description,status,email}=req.body;
    myUserModel.find({email:email},function(err,userData){
        if(err){
            res.send(err);
        }
        else
        {
            // console.log(userData[0].books);
            
            userData[0].books.push({
                name:name,
                description:description,
                status:status

            })
            userData[0].save();
            res.send(userData[0].books);
            
        }
    })
    // console.log(req.body);
    
}



function handleDeleteBook(req,res){
    const {email} = req.query;
    const index = Number(req.params.index);
    myUserModel.find({email:email},(err,userData)=>{
        if(err)
        {
            console.log('something went wrong');
        }
        else
        {
            const newBookArr = userData[0].books.filter((book,idx)=>{
                if(idx !== index)
                {
                    return book;
                }
            })
            userData[0].books = newBookArr;
            userData[0].save();
            res.send(userData[0].books);
            
        }
    })


}

function handleUpdate(req, res) {
    const { name, description, status, email } = req.body;
    const index = Number(req.params.index);
    console.log(name, description, status, email, index);
    myUserModel.findOne({ email: email }, (err, userData) => {
      console.log("before splice", userData);
      userData.books.splice(index, 1, {
        name: name,
        description: description,
        status: status,
      });
      console.log("after splice", userData);
      userData.save();
      res.send(userData.books);
    });
  }
