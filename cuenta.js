class Cliente {
    constructor() {    
    }

    insertCliente() {   
        //Hacemos una petición asicrona
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                //Si se insertan los datos se me oculta el bloque de crear cuenta.
                document.getElementById("cuenta").style.display = "none"; 
                
                /*La proxima vez que se visualize la pagina los datos estaran
                en el formulario*/
                document.getElementById("nombre").value = "";
                document.getElementById("apellidos").value = "";
                document.getElementById("correo").value = "";
                document.getElementById("contra").value = "";
                document.getElementById("contra2").value = "";

                //La repsuesta formada en json.
                let respuesta = JSON.parse(this.responseText);
                    
                //Si es correcto devuelve el mensaje y en el caso contrario no te crea la cuenta
                if (respuesta["respuesta"] == true) { 
                    console.log(respuesta);
                } else if (respuesta["respuesta"] == false){
                    console.log(respuesta);   
                }
            }
        }

        let nombre = document.getElementById("nombre").value;
        let apellidos = document.getElementById("apellidos").value;
        let correo = document.getElementById("correo").value;
        let contra = document.getElementById("contra").value;

        let params = "nombre=" + nombre + "&apellidos=" + apellidos +
        "&correo=" + correo + "&contra=" + contra;
       
        xhttp.open("POST", "cuenta.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(params);
        
        return false;
    }

    //Validaciones de todos los datos del formulario por parte FrontEnd.
    validacion(){         
        let nombreVal = true;
        let nombre = document.contactForm.nombre.value;

        if(nombre == ""){
            this.printError("nombreVal", "Introduzca el nombre.")
        }else{
            let regex = /^[a-zA-Z\s]+$/; 
            
            if(regex.test(nombre) === false) {
                this.printError("nombreVal", "Introduzca el nombre valido.");
            } else {
                this.printError("nombreVal", "");
                nombreVal = false;
            }
        }
        
        let apellidosVal = true;
        let apellidos = document.contactForm.apellidos.value;

        if(apellidos == ""){
            this.printError("apellidosVal", "Introduzca el apellido.")
        }else{
            let regex = /^[a-zA-Z\s]+$/; 
            
            if(regex.test(apellidos) === false) {
                this.printError("apellidosVal", "Introduzca el apellido valido.");
            } else {
                this.printError("apellidosVal", "");
                apellidosVal = false;
            }
        }

        let correoVal = true;
        let correo = document.contactForm.correo.value;

        if(correo == ""){
            this.printError("correoVal", "Introduzca el correo valido.")
        }else{
            let regex = /^\S+@\S+\.\S+$/; 
            
            if(regex.test(correo) === false) {
                this.printError("correoVal", "Introduce el correo valido.");
            } else {
                this.printError("correoVal", "");
                correoVal = false;
            }
        }

        let contrasenaVal = true;
        let contrasena = document.contactForm.contra.value;

        if(contrasena == ""){
            this.printError("contrasenaVal", "Introduzca la contrasena.")
        }else{
            let regex = /^[a-zA-Z0-9]{8}$/;
            
            if(regex.test(contrasena) === false) {
               this.printError("contrasenaVal", "Introduzca la contrasena valida.");
            } else {
                this.printError("contrasenaVal", "");
                contrasenaVal = false;
            }
        }

        let contrasena2Val = true;
        let contrasena2 = document.contactForm.contra2.value;

        if(contrasena2 == ""){
            this.printError("contrasena2Val", "Introduzca la contrasena.")
        }else{
            let regex = /^[a-zA-Z0-9]{8}$/; 
            
            if(regex.test(contrasena2) === false) {
                this.printError("contrasena2Val", "Introduzca la contrasena valida.");
            } else {
                this.printError("contrasena2Val", "");
                contrasena2Val = false;
            }
        }
        
        /*Compara la primera contraseña con la segunda.
        Si estan mal sale un mensaje.*/ 
        if (contrasena !== "" && contrasena2 !== "") {
            if (contrasena === contrasena2) { //comparacion
                this.printError("contrasena2Val", "");
            } else {

            this.printError("contrasena2Val", "Las contraseñas no coinciden.");
            }
        }

        if ((nombreVal || apellidosVal || correoVal 
            || contrasenaVal || contrasena2Val)==true) {
            return false;
        } else {
            return true;
        }

    }

   printError(elemId, hintMsg) {
        document.getElementById(elemId).innerHTML = hintMsg;
    }

    /*mostrarTarjetaCrearCuenta() {
        document.getElementById("cuenta").style.display = "block"; 
        document.getElementById("login").style.display = "none";
        document.getElementById("formulario").style.display = "none";   
    }*/

    //Cerrar el bloque de la cuenta.
    cerrarTarjetaCrearCuenta() {
        document.getElementById("cuenta").style.display = "none";
    }
}

//instancia, de clase
//nombre del metodo en html, con la variable cliente
let cliente = new Cliente();


