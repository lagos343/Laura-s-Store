require('dotenv').config()
const admin = require('firebase-admin');
const Account = require("./firebasekeys.json");
const app = admin.initializeApp({
    credential: admin.credential.cert(Account)
});

const db = app.firestore();

async function GetProductsAsync() {
    return await db.collection("productos").get();
} 

async function GetProductByname(name){
    return await db.collection("productos").where("nombre","==",name).get();
}

async function GetCategorias(){
    return await db.collection("Categorias").get();
}
async function GetCategoriasByName(nombre){
    return await db.collection("Categorias").where("nombre","==",nombre).get();
}
async function GetLibros(){
    return await db.collection("libros").get();
}

async function GetProductosDeBelleza(){
    return await db.collection("productos de belleza").get();
}
async function GetProductoszapatos(){
    return await db.collection("producto de calzado").get();
}
async function GetUserByEmail(email,password){
    return await db.collection("users").where("email","==",email).where("password","==",password).get();
}

async function CrearCarrito(item){
    let retorno = await db.collection('carrito').add(item)      
    return {id: retorno.id};
}

async function getFacturaById(item){
    let retorno = await db.collection('carrito').doc(item).get();      
    return retorno.data();
}



module.exports ={
    GetUserByEmail,
    GetProductsAsync,
    GetCategorias,
    GetLibros,
    GetProductosDeBelleza,
    GetCategoriasByName,
    GetProductoszapatos,
    GetProductByname,
    CrearCarrito,
    getFacturaById
}