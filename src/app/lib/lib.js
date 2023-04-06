function GetRandom(array,limit){
    const arrayReturn = []
    for (let index = 0; index < limit; index++) {
        arrayReturn.push(array[Math.floor(Math.random()*array.length)])
        
    }
    return arrayReturn;
}

module.exports= { GetRandom}