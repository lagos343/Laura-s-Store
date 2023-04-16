function GetCarritoByEmail()
{
    let token = document.getElementById('token').value;
    console.log(buyThings)
    let data = fetch('http://localhost:3000/savecarrito', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _csrf:token,
            productos:buyThings
          // Aquí puedes agregar los datos que quieres enviar en el cuerpo de la solicitud
        })
      })
      .then(response => {
        // Aquí puedes procesar la respuesta de la solicitud
        console.log('nice')
        ClearAll();
        window.alert("Compra realizada con exito!");
      })
      .catch(error => {
        console.log('mal')
        // Aquí puedes manejar los errores de la solicitud
      });
}