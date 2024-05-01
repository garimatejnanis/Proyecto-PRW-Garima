<?php

require 'bd.php';

class RelacionCliente {
    private $conexionBD;
    private $clienteId;

    //Crear una conexion de Base de Datos.
    public function __construct() {
        $configuracion = new BaseDatos(dirname(__FILE__) . "/configuracion.xml", dirname(__FILE__) . "/configuracion.xsd");
        $this->conexionBD = $configuracion->conectarBD();
    }
    
    //Obtener el ID, al hacer el login si los datos son corectos.
    public function getInfoCliente($usuario, $password) {
        $sql = $this->conexionBD->prepare("SELECT id FROM qwe74rty54_clientes WHERE correo = :usuario AND contrasena = :password");
        $sql->bindParam(':usuario', $usuario, PDO::PARAM_STR);
        $sql->bindParam(':password', $password, PDO::PARAM_STR);
        $sql->execute();

        //Se devuelve como Array.
        $result = $sql->fetch(PDO::FETCH_ASSOC);

        if ($result !== false) {
            //Me devulve el ID.
            $this->clienteId = $result['id'];
            return $result['id'];
        } 

        return false;
    }

    //Almaceno el ID.
    public function getClienteById() {
        return $this->clienteId;
    }

    //Se crea el token.
    public function Token(){
        return bin2hex(random_bytes(32));
    }

    //Obtengo el correo con el cliente que haya iniciado.
    public function getCorreoCliente($clienteId) {
        $sql = $this->conexionBD->prepare("SELECT correo FROM qwe74rty54_clientes WHERE id = ?");
        $sql->execute([$clienteId]);

        //Se devuelve como Array.
        $result = $sql->fetch(PDO::FETCH_ASSOC);
    
        if ($result !== false) {
            //Lo obtengo para poder mostrar en la pagina del Teatro, el usuario.
            return $result['correo'];
        } else {
            return false;
        }
    }

    public function login(){

        //Empiezo la session.
        session_start();

        //Almaceno el ID, en una variable.
        $idCliente = $this->getClienteById();
    
        //Aquí compruebo si el ID tiene cualquier valor será true.
        //En el caso contrario si es false pues el valor será false.
        if ($idCliente !== false) {
           
            $correos = $this->getCorreoCliente($idCliente); //Almaceno el correo para que me lo muestre.
            $token = $this->Token(); //Almaceno el token.
            $fechaHoy = date('Y-m-d'); //Almaceno la fecha de hoy.
            $fechaExpiracion = date('Y-m-d', strtotime('+3 day')); //Almaceno la fecha de Exp, con 3 días más.
            
            //Me seleciona el token y la fehcaExp.
            $sql = $this->conexionBD->prepare("SELECT token, fecha_expiracion FROM qwe74rty54_relacion_cliente WHERE id_cliente = ?");
            $sql->execute([$idCliente]);

            //Se devuelve como Array.
            $resultado = $sql->fetch(PDO::FETCH_ASSOC);
    
            if ($resultado) {
                //Almaceno token y fechaExp.
                $tokenAntiguo = $resultado['token'];
                $fechaAntigua = $resultado['fecha_expiracion'];
                
                //Compruebo si la fechaAnt es menor que la de tres dias anteriores.
                if (strtotime($fechaAntigua) < strtotime('-3 day')) {
                    //Se genera un nuevo token.
                    $token = $this->Token();
                    //Se añade nueva fecha.
                    $fechaExpiracion = date('Y-m-d', strtotime('+3 day'));
                } else {
                    //En el caso contrario.
                    //Se sustituye.
                    //Se queda igual el token.
                    $token = $tokenAntiguo;
                }

                //Esta varible hace un Update del token, la fechaHoy (actual) y fechaExp con 3 dias mas.
                //Si ha iniciado despues de 3 dias.
                $sqlUpdate = $this->conexionBD->prepare("UPDATE qwe74rty54_relacion_cliente SET token = ?, fecha = ?, fecha_expiracion = ? WHERE id_cliente = ?");
                $resul = $sqlUpdate->execute([$token, $fechaHoy, $fechaExpiracion, $idCliente]);
            
            } else {
                //Si no ha iniciado nunca se insertaran los datos.
                $sqlInsert = $this->conexionBD->prepare("INSERT INTO qwe74rty54_relacion_cliente (id_cliente, token, fecha, fecha_expiracion) VALUES (?, ?, ?, ?)");
                $resul = $sqlInsert->execute([$idCliente, $token, $fechaHoy, $fechaExpiracion]);
            }
    
            //Si todo es correcto es true y no hay algo correcto false
            if (!$resul) {
                $response = array("respuesta" => false);
            } else {
                //Almaceno el tomeken y el id en la session
                $_SESSION['token'] = $token;
                $_SESSION['id'] = $idCliente;
                $response = array("respuesta" => true,  "correo" => $correos);    
            }
    
            echo json_encode($response);
    
        } else {
            echo json_encode(array("respuesta" => true));
        }

    }

    //Elimina la sesion.
    public function logout(){
        session_start();

        $_SESSION = array();

        $eliminar = session_destroy();

        setcookie(session_name(), '', time() - 1000, '/');

        //Si todo es correcto es true y no hay algo correcto false
        if (!$eliminar) {
            echo json_encode(array("respuesta" => true));
        }else {
            echo json_encode(array("respuesta" => false));
        }
    }

    //Validaciones de todos los datos del formulario por parte BackEnd.
    public function validacion(){
           
        $usuario =  isset($_POST['usuario']) ? $_POST['usuario'] : '';
        $usuarioVal = true;

        if (empty($usuario)) {
            $this->printError("usuarioVal", "Introduzca el usuario.");
        } else {
            $regex = '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/';

            if (!preg_match($regex, $usuario)) {
                $this->printError("usuarioVal", "Revise el Usuario.");
            } else {
                $this->printError("usuarioVal", "");
                $usuarioVal = false;
            }
        }

        $password =  isset($_POST['password']) ? $_POST['password'] : '';
        $contrasenaVal = true;

        if (empty($password)) {
            $this->printError("passwordVal", "Introduzca la contraseña.");
        } else {
            $regex = '/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/';

            if (!preg_match($regex, $password)) {
                $this->printError("passwordVal", "Revise la contraseña.");
            } else {
                $this->printError("passwordVal", "");
                $contrasenaVal = false;
            }
        }

        return $usuarioVal && $contrasenaVal;
    }

    
    public function printError($hintMsg, $elemId) {
        if (!empty($hintMsg)) {
            echo $elemId . "\n"; 
        }
    }
}

//Comprueba si los datos del formulario del html
$usuario = isset($_POST['usuario']) ? $_POST['usuario'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

//Instancio la clase.
$relacionCliente = new RelacionCliente();
//Se pasan los parametros introducidos desde el formualario
$id = $relacionCliente->getInfoCliente($usuario, $password);
$validacionMensaje = $relacionCliente->validacion();

if (!empty($id) && empty($validacionMensaje)) {
    $relacionCliente->login();
}else{
    $relacionCliente->logout();
}

?>
