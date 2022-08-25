const { Router }= require('express');
const router = Router();
const admin = require('firebase-admin');

var serviceAccount = require("../../finalproyect-15a79-firebase-adminsdk-nvcgo-f2ad789d71.json");


admin.initializeApp({

    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://finalproyect-15a79-default-rtdb.firebaseio.com/'
});
const db = admin.database();



router.get('/', (req, res) => {

    db.ref('contactos').once('value', (snapshot)=>{
       const data = snapshot.val();
       res.render('index', { contactos: data });
    });
    

});

router.post('/new-contact', (req, res) =>{

    console.log(req.body);
    const newContact = {

        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
    };
    db.ref('contactos').push(newContact);
    res.redirect('/');
});

router.get('/delete-contactos/:id', (req, res)=>{

    db.ref('contactos/' + req.params.id ).remove();
    res.redirect('/');

})

													
module.exports = router;