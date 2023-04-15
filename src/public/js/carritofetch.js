function GetCarritoByEmail()
{
    let token = document.getElementById('token').value;
    console.log(token)
    let data = fetch('http://localhost:3000/getcarrito', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _csrf:token
          // Aquí puedes agregar los datos que quieres enviar en el cuerpo de la solicitud
        })
      })
      .then(response => {
        // Aquí puedes procesar la respuesta de la solicitud
      })
      .catch(error => {
        // Aquí puedes manejar los errores de la solicitud
      });
}