class RelacionCliente{
    constructor(){ 
    }

    login(){
        //Creamos una peticion asincrona
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                //Formamos en JSON
                let respuesta = JSON.parse(this.responseText);

                //Si es correcto devuelve el mensaje y en el caso contrario no te HACE LOGIN
                if (respuesta["respuesta"] == false) {     
                    console.log("No has iniciado.");
                    //Si no hay ninguna cuenta creada pues sale mensaje 
                    document.getElementById("usuarioError").innerText = "No existe ninguna cuenta con este usuario."; 
                    document.getElementById("usuarioError").style.display = 'block';
                } else if (respuesta["respuesta"] == true){
                    /*La proxima vez que se visualize la pagina los datos estaran
                    en el formulario*/
                    document.getElementById("usuario").value = "";
                    document.getElementById("password").value = "";
                    console.log("Iniciado");

                    document.getElementById("cabecera").style.display = "block";
                    document.getElementById("cuerpo").style.display = "block";
                    document.getElementById("pie").style.display = "block";
                    document.getElementById("cuenta").style.display = "none";
                    document.getElementById("login").style.display = "none";

                    if (respuesta["respuesta"] == true) {
                        //Muestro el usuario
                        document.getElementById('correoUsuario').innerText = respuesta["correo"];
                    } else {
                        document.getElementById('correoUsuario').innerText = ""; 
                        }
                        
                }
            }
        }

        let usuario = document.getElementById("usuario").value;
        let password = document.getElementById("password").value;
        let params = "usuario=" + usuario + "&password=" + password;
        xhttp.open("POST", "login_logout.php", true);

        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(params);
        
        return false;  
    }


    logout(){
        //Petciion asincrona
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                //Oulta la cabecera, pie, cuerpo.
                //Muestra login y crear cuenta
                document.getElementById('correoUsuario').style.display = 'none';
                document.getElementById("cabecera").style.display = "none";
                document.getElementById("cuerpo").style.display = "none";
                document.getElementById("pie").style.display = "none";
                document.getElementById("cuenta").style.display = "block";
                document.getElementById("login").style.display = "block";
                
                //Formamos en JSON.
                let respuesta = JSON.parse(this.responseText);
                //Si es correcto devuelve el mensaje y en el caso contrario no te cierra la session
                if (respuesta["respuesta"] == false) {
                    console.log("No se pudo cerra la sesión")
                } else if (respuesta["respuesta"] == true) {
                    console.log("Sesión cerrada con éxito");
                }
            }
        }
        

        xhttp.open("POST", "login_logout.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send();
        return false;
    }


    //Validaciones de todos los datos del formulario por parte FrontEnd.
    validacion(){   
        let usuarioVal = true;
        let usuario = document.contactForm2.usuario.value;

        if(usuario == ""){
            this.printError("usuarioVal", "Introduzca el usuario.")
        }else{
            let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
            
            if(regex.test(usuario) === false) {
                this.printError("usuarioVal", "Introduzca el usuario valido.");
            } else {
                this.printError("usuarioVal", "");
                usuarioVal = false;
            }
        }
        

        let contrasenaVal = true;
        let password = document.contactForm2.password.value;

        if(password == ""){
            this.printError("passwordVal", "Introduzca la contraseña.")
        }else{
            let regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            
            if(regex.test(password) === false) {
               this.printError("passwordVal", "Introduzca la contraseña valida.");
            } else {
                this.printError("passwordVal", "");
                contrasenaVal = false;
            }
        }

        if ((usuarioVal || contrasenaVal ) == true) {
            return false;
        } else {
            return true;
        }
    }

    printError(elemId, hintMsg) {
        document.getElementById(elemId).innerHTML = hintMsg;
    }

    /*mostrarTarjetaLogin() {
        document.getElementById("login").style.display = "block";
        document.getElementById("cuenta").style.display = "none";   
        document.getElementById("formulario").style.display = "none";      
    }*/

     //Cerrar el bloque del login
    cerrarTarjetaLogin() {
       document.getElementById("login").style.display = "none";
    }
}

let relacionCliente = new RelacionCliente();

