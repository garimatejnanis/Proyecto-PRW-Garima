<?php

require 'bd.php';

class Cliente {

    private $conexionBD;

    //Crear una conexion de Base de Datos.
    public function __construct() { 
        $configuracion = new BaseDatos(dirname(__FILE__) . "/configuracion.xml", dirname(__FILE__) . "/configuracion.xsd");
        $this->conexionBD = $configuracion->conectarBD();
    } 


    public function insertCliente() {
        var_dump($_POST);
        //Datos del formulario desde HTML que se reciben
        if (isset($_POST['nombre'], $_POST['apellidos'], $_POST['correo'], $_POST['contra'])) {
            $nombre = $_POST['nombre'];
            $apellidos = $_POST['apellidos'];
            $correo = $_POST['correo'];
            $contra = $_POST['contra'];
    
            //Se insertan los datos a la base de datos.
            $sql = $this->conexionBD->prepare("INSERT INTO qwe74rty54_clientes(nombre, apellidos, correo, contrasena) VALUES (?, ?, ?, ?)");
            $resultados = $sql->execute([$nombre, $apellidos, $correo, $contra]);
    
            //Si todo es correcto es true y no hay algo correcto false
            if (!$resultados) {  
                echo json_encode(array("respuesta" => true));
            } else {
                echo json_encode(array("respuesta" => false)); 
            }
        } /*else {
            //Si todo el formulario esta vacio no insertaria los datos y sale un mensaje.
            echo json_encode(array("respuesta" => false, "mensaje" => "Todos los campos son obligatorios."));
        }*/
    }
    

    //Validaciones de todos los datos del formulario por parte BackEnd.
    public function validacion(){

        $nombre = isset($_POST['nombre']) ? $_POST['nombre'] : '';
        $nombreVal = true;

        if (empty($nombre)) {
            $this->printError("nombreVal", "Introduzca el nombre.");
            //$nombreVal = false; 
        } else {
            $regex = '/^[a-zA-Z\s]+$/';

            if (!preg_match($regex, $nombre)) {
                $this->printError("nombreVal", "Introduzca un nombre válidos.");
                //$nombreVal = false; 
            } else {
                $this->printError("nombreVal","");
                $nombreVal = false; 
            }
        }


        $apellidos = isset($_POST['apellidos']) ? $_POST['apellidos'] : '';
        $apellidosVal = true;

        if (empty($apellidos)) {
            $this->printError("apellidosVal", "Introduzca el apellido.");
            //$apellidosVal = false; 
        } else {
            $regex = '/^[a-zA-Z\s]+$/';

            if (!preg_match($regex, $apellidos)) {
                $this->printError("apellidosVal", "Introduzca un apellido válido.");
                //$apellidosVal = false; 
            } else {
                $this->printError("apellidosVal", "");
                $apellidosVal = false;
            }
        }
        

        $correo = isset($_POST['correo']) ? $_POST['correo'] : '';
        $correoVal = true;

        if (empty($correo)) {
            $this->printError("correoVal", "Introduzca el correo.");
            //$correoVal = false; 
        } else {
            $regex = '/^\S+@\S+\.\S+$/';

            if (!preg_match($regex, $correo)) {
                $this->printError("correoVal", "Introduzca un correo válido.");
                //$correoVal = false;
            } else {
                $this->printError("correoVal", "");
                $correoVal = false;
            }
        }
        

        $contrasena = isset($_POST['contra']) ? $_POST['contra'] : '';
        $contrasenaVal = true;

        if (empty($contrasena)) {
            $this->printError("contrasenaVal", "Introduzca la contrasena.");
            //$contrasenaVal = false; 
        } else {
            $regex = '/^[a-zA-Z0-9]{8}$/';

            if (!preg_match($regex, $contrasena)) {
                $this->printError("contrasenaVal", "Introduzca la contrasena valida.");
                //$contrasenaVal = false;
            } else {
                $this->printError("contrasenaVal", "");
                $contrasenaVal = false; 
            }
        }
        
      
        $contrasena2 = isset($_POST['contra2']) ? $_POST['contra2'] : '';
        $contrasena2Val = true;

        if (empty($contrasena2)) {
            $this->printError("contrasena2Val", "Introduzca la contrasenaa.");
            //$contrasena2Val = false; 
        } else {
            $regex = '/^[a-zA-Z0-9]{8}$/';

            if (!preg_match($regex, $contrasena2)) {
                $this->printError("contrasena2Val", "Introduzca la contrasenaa valida.");
                //$contrasena2Val = false; 
            } else {
                $this->printError("contrasena2Val", "");
                $contrasena2Val = false; 
            }
        }
        
        /*Compara la primera contraseña con la segunda.
        Si estan mal sale un mensaje.*/ 
        if ($contrasena !== "" && $contrasena2 !== "") {
            if ($contrasena === $contrasena2) { 
                $this->printError("contrasena2Val", "");
            } else {
                $this->printError("contrasena2Val", "Las contraseñas no coinciden.");
                $contrasena2Val = false;
            }
        }

        return $nombreVal && $apellidosVal && $correoVal && $contrasenaVal && $contrasena2Val;
    }


    public function printError($hintMsg, $elemId) {
        if (!empty($hintMsg)) {
            echo $elemId . "\n"; 
        }
    }
  
}

//Instancio la clase
$cliente = new Cliente();
$validacionMensaje = $cliente->validacion();
/*
if ($validacionMensaje) {
    $cliente->insertCliente();
}*/
$cliente->validacion();
$cliente->insertCliente();
   
?>