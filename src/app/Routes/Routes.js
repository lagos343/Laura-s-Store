const express= require('express');
const Router = express.Router();
const firebase = require('../database/firestore');
const auth = require('../auth/firebaseAuth');
const lib = require('../lib/lib')
const mid = require('../Middleware/middle');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
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
        OfertasBelleza:OfertasBelleza.docs.map(x => x.data()),
        csrfToken: req.csrfToken()
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
            categorias5:categorias5.docs.map(x => x.data().categorias.map(y => y))[0],
            csrfToken: req.csrfToken()
        
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
        Ofertaszapato:Ofertaszapato.docs.map(x => x.data()),
        csrfToken: req.csrfToken()
    });
});

// nosotros
Router.get('/contactanos',mid.authmd,async(req,res)=>{
    res.render('contactanos',{Titulo:'Wash Nyc | About',
    csrfToken: req.csrfToken()});
});
Router.get('/sendinfo',mid.authmd,async(req,res)=>{
    res.render('contactanos',{Titulo:'Wash Nyc | About',
    csrfToken: req.csrfToken()});
});

//ofertas
Router.get('/ofertas',mid.authmd,async(req,res)=>{
    res.render('ofertas',{Titulo:'Wash Nyc | About',
    csrfToken: req.csrfToken()});
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
        detalles:detalles,
        csrfToken: req.csrfToken()
    });
});


// login
Router.get('/login',(req,res)=>{
    res.render('login',
    {
        Titulo:'Wash Nyc | DashBoard',
        csrfToken: req.csrfToken()
    });
});
Router.post('/loginn',csrfProtection,async (req,res)=>{
    if(!req.body.email)
    {
        console.log("correo nulo redirigiendo")
        res.redirect('/login');
        return;
    } 
    if(!req.body._csrf)
    {
        console.log("token nulo redirigiendo")
        res.redirect('/login');
        return;
    }
    if(!req.body.password)
    {
        console.log("pass nulo redirigiendo")
         res.redirect('/login');
         return;
    }
    
    var login = await firebase.GetUserByEmail(req.body.email, req.body.password);
    console.log(login.docs.length)
    if(login.docs.length < 1) 
    {
        console.log("no hay usuarios registrado")
        res.redirect('/login');
        return;
    };
    login = login.docs.map(x => x.data());


    if(login[0].email == null){
        res.redirect('/login')

    }else{
        res.cookie("email", login[0].email);
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

//factura
Router.get('/infocompra',async(req,res)=>{
    let idObtenida = req.query.id
    let factura = await firebase.getFacturaById(idObtenida);
    res.render('factura', {
        detalles: factura.productos,
        correo: factura.email,
            
    })
});

//Carrito
Router.post('/savecarrito',csrfProtection, async (req, res)=>{
    let Document = {
        email:req.cookies.email,
        productos:req.body.productos
    }
    
    let data = await firebase.CrearCarrito(Document);
    console.log('data: '+data)
    res.status(200).send(data);
});

module.exports=Router;