async function authmd(req, res, next){
    console.log(req.cookies.auth)
    if(req.cookies.auth ){
        next()
    }else{
        res.redirect('/login')
    }
}

module.exports ={
    authmd
}