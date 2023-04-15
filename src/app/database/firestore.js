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

async function CrearCarrito(correo,item){
    let Carrito = await GetToCarrito(correo);
    
    if(Carrito == null)
    {
        let data = {
            correo:correo,
            items:[item],
            completado:false
        }
        return db.collection('carrito').add(data)
    }
}

async function UpdateCarrito(correo,items){
    let Carrito = await GetToCarrito(correo);
    if(Carrito == null)
    {
        return await CrearCarrito(correo,items);
    }
    console.log(Carrito)
    //db.collection('carrito').doc(Carrito.)
}

async function GetToCarrito(correo){
    let documento = db.collection('carrito').where("completado","==",false).where("correo","==",correo).get();
    return documento;
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
    UpdateCarrito,
    GetToCarrito
}