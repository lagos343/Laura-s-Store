require('dotenv').config()
const admin = require('firebase-admin');
const Account = require("../database/firebasekeys.json");



async function Registro(data){
    const userResponse = await admin.auth().createUser(data);
    console.log(userResponse.uid);
    await admin.firestore().collection("users").doc(userResponse.uid).set(data);
}

async function login(data){
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    var cookietoken = await admin.auth().createSessionCookie(response.uid,{
        expiresIn
    })
    console.log(cookietoken)
}


module.exports ={
    Registro,
    login
}