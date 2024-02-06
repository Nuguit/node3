let express = require('express')
let app = express()
let gatos = require('./app')

app.use(express.static('public'))

app.get('/lista', function(req,res){
    res.send(animalPrint("Lista de gatos",gatos))
})

app.get('/sumar-animal', function(req,res){
    let {nombre, tipo, edad} = req.query
    edad = parseInt(edad)
 gatos.push({nombre,tipo, edad})
 res.send({mensaje: `${nombre} añadido`, results: gatos})
})



app.get('/adoptar', function(req,res){
gatos = gatos.filter((animal) => animal.nombre != req.query.nombre)
res.send(animalPrint(`Gato adoptado`,gatos))
})


function animalPrint(msg,gatos){
    let salida = ""
    for (let i = 0; i <gatos.length; i++) {
        salida += `<tr>
            <td>${gatos[i].nombre}</td>
            <td>${gatos[i].tipo}</td>
            <td>${gatos[i].edad}</td>
            <td> 
               <form action="/adoptar">
                <input type="text" hidden name="nombre" value="${gatos[i].nombre}" id="nombre">
                <button type="submit">Enviar</button>
                </form>
            </td>
        </tr>`    
    }

    return `<h3>${msg}</h3>
            <table>
            <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Edad</th>
            </tr>
            ${salida}
        </table>`
}





app.listen(process.env.PORT || 3000 , (e) =>{
    e
    ? console.error("Nos se ha podido conectar el servidor")
    : console.log("Servidor conectado y a la escucha en el puerto: " + (process.env.PORT || 3000))
})