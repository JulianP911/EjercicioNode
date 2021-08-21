// Importar el modulo de axios, fs y http
const axios = require('axios');
const fs = require('fs');
const http = require('http');

// Constantes de url de proveedores y clientes
const urlProveedores = 'https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json';
const urlClientes = 'https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json';

http.createServer((req, resp) => {
  if (req.url === "/api/proveedores") {
    axios.get(urlProveedores).then((res) => {
      let proveedores = res.data;
      fs.readFile("index.html", (err, data) => {
        if (err) {
            throw err;
        }
        let contenido = data.toString();
        contenido = contenido.replace("{{Titulo}}", "Lista de Proveedores");
        contenido = contenido.replace("{{Cabecera}}", 
        `<td>Id Proveedor</td>
        <td>Nombre Compania</td>
        <td>Nombre Contacto</td>`);
        let informacion = "";
        proveedores.forEach((proveedor) => {
          informacion += `
          <tr>
          <td>${proveedor.idproveedor}</td>
          <td>${proveedor.nombrecompania}</td>
          <td>${proveedor.nombrecontacto}</td>
          </tr>`;
        }); 
        contenido = contenido.replace("{{Informacion}}", informacion);
        resp.end(contenido); 
      });
    }).catch((err) => {
      console.log("Se produjo un error al obtener la informacion de los proveedores.", err)
    })
  } else if (req.url === "/api/clientes") {
    axios.get(urlClientes).then((res) => {
      let clientes = res.data;
      fs.readFile("index.html", (err, data) => {
        if (err) {
            throw err;
        }
        let contenido = data.toString();
        contenido = contenido.replace("{{Titulo}}", "Lista de Clientes");
        contenido = contenido.replace("{{Cabecera}}", 
        `<td>Id Cliente</td>
        <td>Nombre Compania</td>
        <td>Nombre Contacto</td>`);
        let informacion = "";
        clientes.forEach((cliente) => {
          informacion += `
          <tr>
          <td>${cliente.idCliente}</td>
          <td>${cliente.NombreCompania}</td>
          <td>${cliente.NombreContacto}</td>
          </tr>`;
        }); 
        contenido = contenido.replace("{{Informacion}}", informacion);
        resp.end(contenido); 
      });
    }).catch((err) => {
      console.log("Se produjo un error al obtener la informacion de los proveedores.", err)
    })
  }
}).listen(8081);