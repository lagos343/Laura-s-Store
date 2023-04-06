const express= require('express');
const Router = express.Router();
const firebase = require('../database/firestore');
const auth = require('../auth/firebaseAuth');
const lib = require('../lib/lib')
const mid = require('../Middleware/middle');
// Inicio
Router.get('/',mid.authmd,async (req,res)=>{
    const ProductosOferta =await firebase.GetProductsAsync();
    const Libros = await firebase.GetLibros();
    const topcategorias = await firebase.GetCategorias();
    const OfertasBelleza = await firebase.GetProductosDeBelleza();

    const categoriass  = [];
    topcategorias.docs.forEach(x => {
            
        if(x.data().nombre != "Hogar y Cocina" &&
         x.data().nombre != "Belleza y cuidado personal" &&
         x.data().nombre != "Moda para mujer" &&
         x.data().nombre != "Electrónicos y computadoras" &&
         x.data().nombre != "Arte y Artesanias"){
            categoriass.push( x.data());
        }
    });
    res.render('index',
    {
        Titulo:"Laura's Store | Inicio",
        ProductosOferta:lib.GetRandom(ProductosOferta.docs.map(x => x.data()), 4) ,
        Libros:Libros.docs.map(x => x.data()),
        topcategorias:categoriass,
        OfertasBelleza:OfertasBelleza.docs.map(x => x.data())
    });
});

// Categorias
Router.get('/categorias',mid.authmd,async(req,res)=>{

    const categorias1 = await firebase.GetCategoriasByName("Hogar y Cocina");
    const categorias2 =await firebase.GetCategoriasByName("Belleza y cuidado personal");
    const categorias3 =await firebase.GetCategoriasByName("Moda para mujer");
    const categorias4 =await firebase.GetCategoriasByName("Electrónicos y computadoras");
    const categorias5 =await firebase.GetCategoriasByName("Arte y Artesanias");

    var x =categorias1.docs.map(x => x.data().categorias.map(y => y))
    res.render('categorias',{
        Titulo:"Laura's Store | Categorias",
            categorias1:categorias1.docs.map(x => x.data().categorias.map(y => y))[0],
            categorias2:categorias2.docs.map(x => x.data().categorias.map(y => y))[0],
            categorias3:categorias3.docs.map(x => x.data().categorias.map(y => y))[0],
            categorias4:categorias4.docs.map(x => x.data().categorias.map(y => y))[0],
            categorias5:categorias5.docs.map(x => x.data().categorias.map(y => y))[0]
        
    });
});

// productos
Router.get('/productos',mid.authmd,async(req,res)=>{
    const ProductosOferta =await firebase.GetProductsAsync();
    const OfertasBelleza = await firebase.GetProductosDeBelleza();
    const Ofertaszapato = await firebase.GetProductoszapatos();

    res.render('productos',{
        Titulo:"Laura's Store | Productos",
        ProductosOferta:lib.GetRandom(ProductosOferta.docs.map(x => x.data()), 4),
        ProductosOferta2:lib.GetRandom(ProductosOferta.docs.map(x => x.data()), 4),
        OfertasBelleza:OfertasBelleza.docs.map(x => x.data()),
        Ofertaszapato:Ofertaszapato.docs.map(x => x.data())
    });
});

// nosotros
Router.get('/contactanos',mid.authmd,async(req,res)=>{
    res.render('contactanos',{Titulo:'Wash Nyc | About'});
});
Router.get('/sendinfo',mid.authmd,async(req,res)=>{
    res.render('contactanos',{Titulo:'Wash Nyc | About'});
});

//ofertas
Router.get('/ofertas',mid.authmd,async(req,res)=>{
    res.render('ofertas',{Titulo:'Wash Nyc | About'});
});

// detalles
Router.get('/detalles',mid.authmd,async(req,res)=>{
    var datos = await firebase.GetProductByname(req.query.id);
    var detalles = [];
    datos.docs.map(x => x.data().detalles.forEach(y => detalles.push(y)));
    res.render('detalle-producto',
    {
        Titulo:'Wash Nyc | Login',
        producto:datos.docs.map(x => x.data())[0],
        detalles:detalles
    });
});


// login
Router.get('/login',(req,res)=>{
    res.render('login',{Titulo:'Wash Nyc | DashBoard'});
});
Router.get('/loginn',async (req,res)=>{
    var login = await firebase.GetUserByEmail(req.query.email);
    console.log(login)
    if(login == null){
        res.redirect('/login')

    }else{
        res.cookie("auth",true);
        res.redirect('/')
    }
    
});

//Registrer
Router.get('/registro',(req,res)=>{
    res.render('registro',{Titulo:'Wash Nyc | Register'});
})
Router.get('/registroo',async(req,res)=>{

    await auth.Registro(req.query)
    console.log(req.query);
    res.cookie("auth",true);

    res.redirect('/')
})
module.exports=Router;