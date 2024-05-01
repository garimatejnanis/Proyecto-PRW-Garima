class Carrito{
    constructor(){
    }

    insertEntradaEnCarrito(){
        //peticion asincrona
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                //formamos json
                let respuesta = JSON.parse(this.responseText);
                if (respuesta["respuesta"] == false) {
                    //si no se hace la compra me sale un mensaje
                    document.getElementById("tituloCarritoMensaje").innerText = respuesta["mensaje"];
                    document.getElementById("tituloCarritoMensaje").style.display = "block";

                    //si todo bien pues me sale un mensaje y se me oculta lo de mas
                } else if (respuesta["respuesta"] == true){     
                    document.getElementById("botonComprar").style.display = "none";
                    document.getElementById("tituloCarrito").style.display = "none";
                    document.getElementById("tablaDatos").style.display = "none"; 
                    document.getElementById("tituloCarritoMensaje").innerText = respuesta["mensaje"];
                    document.getElementById("tituloCarritoMensaje").style.display = "block";  
                }
            }
        }

        xhttp.open("POST", "carrito.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send();
        
        return false;  
    }

    
}

//instancio la clase
let carrito = new Carrito();
