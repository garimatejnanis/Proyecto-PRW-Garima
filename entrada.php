<?php
require 'bd.php';

class Entrada{   
    private $conexionBD;
 
    //Crear una conexion de Base de Datos.
    public function __construct() {
        $configuracion = new BaseDatos(dirname(__FILE__) . "/configuracion.xml", dirname(__FILE__) . "/configuracion.xsd");
        $this->conexionBD = $configuracion->conectarBD();
    }

    //Obtengo los datos para mostrarlo.
    public function getInfoComediantes(){
        $sql = $this->conexionBD->prepare("SELECT id, nombre, apellidos FROM qwe74rty54_comediantes");
        $sql->execute();
        $resultados = $sql->fetchAll(PDO::FETCH_ASSOC);
        
        //Si todo es correcto es true y no hay algo correcto false.
        if(!$resultados){
            echo json_encode(array("respuesta" => false));
        }else{
            //Crea array asociativo que contendra los datos de los comediantes
            echo json_encode(array("respuesta" => true, "infoComediante" => $resultados));
        }
    }
    
    //Obtengo la informacion de la ciudad.
    public function getInfoCiudadUbicacion(){
        $sql = $this->conexionBD->prepare("SELECT ciudad FROM qwe74rty54_ubicacion");
        $sql->execute();
        $resultados = $sql->fetchAll(PDO::FETCH_ASSOC);
        
        //Si todo es correcto es true y no hay algo correcto false.
        if(!$resultados){
            echo json_encode(array("respuesta" => false));
        }else{
            //Crea array asociativo que contendra los datos de las ciudades
            echo json_encode(array("respuesta" => true, "infoCiudades" => $resultados));
        }
    }

    //Para carga el select desde la Base de datos.
    //Obtengo el lugar donde tenga la ciudad. Dependiendo de la ciudad que escoga el lugar se me pondra por defecto.
    //Pj: Eligo la ciudad Las Palmas y por defecto se me pondra el Teatro Galdos.
    public function getInfoLugarUbicacion($ciudad){
        $sql = $this->conexionBD->prepare("SELECT id, lugar FROM qwe74rty54_ubicacion WHERE ciudad = :ciudad");
        $sql->bindParam(':ciudad', $ciudad);
        $sql->execute();
        $resultados = $sql->fetchAll(PDO::FETCH_ASSOC);

        //Si todo es correcto es true y no hay algo correcto false.
        if(!$resultados){
            echo json_encode(array("respuesta" => false));
        }else{
            //Crea array asociativo que contendra los datos de los lugares
            echo json_encode(array("respuesta" => true, "infoLugares" => $resultados));
        }
    }
    
    //Obtengo la informacion de la planta (Planta A, Planta B...).
    public function getInfoNombrePlanta(){
        $sql = $this->conexionBD->prepare("SELECT id, nombre FROM qwe74rty54_planta");
        $sql->execute();
        $resultados = $sql->fetchAll(PDO::FETCH_ASSOC);

        //Si todo es correcto es true y no hay algo correcto false.
        if(!$resultados){
            echo json_encode(array("respuesta" => false));
        }else{
            //Crea array asociativo que contendra los datos de la planta
            echo json_encode(array("respuesta" => true, "infoPlantas" => $resultados));
        }
    }

    //Para carga el select desde la Base de datos.
    //Obtengo el precio donde tenga la planta. Dependiendo de la planta que escoga el precio se me pondra por defecto.
    //Pj: Eligo la planta A y su precio es 120.
    public function getInfoPrecioPlanta($planta){
        $sql = $this->conexionBD->prepare("SELECT id, precio FROM qwe74rty54_planta WHERE nombre = :planta");
        $sql->bindParam(':planta', $planta);
        $sql->execute();
        $resultados = $sql->fetchAll(PDO::FETCH_ASSOC);

        //Si todo es correcto es true y no hay algo correcto false.
        if(!$resultados){
            echo json_encode(array("respuesta" => false));
        }else{
            //Crea array asociativo que contendra los datos de los precios
            echo json_encode(array("respuesta" => true, "infoPrecios" => $resultados));
        }
    }

    //Obtengo la informacion de la fecha.
    public function getInfoFechaHorario(){
        $sql = $this->conexionBD->prepare("SELECT id, fecha FROM qwe74rty54_horario");
        $sql->execute();
        $resultados = $sql->fetchAll(PDO::FETCH_ASSOC);

        //Si todo es correcto es true y no hay algo correcto false.
        if(!$resultados){
            echo json_encode(array("respuesta" => false));
        }else{
            //Crea array asociativo que contendra los datos de los fechas
            echo json_encode(array("respuesta" => true, "infoFechas" => $resultados));
        }
    }

    //Para carga el select desde la Base de datos.
    //Obtengo la hora donde tenga la fecha. Dependiendo de la fecha que escoga la hora se me pondra por defecto.
    //Pj: Eligo la la fecha 2024-08-30 y la hora es 19:00
    public function getInfoHoraHorario($fecha){
        $sql = $this->conexionBD->prepare("SELECT id, hora FROM qwe74rty54_horario WHERE fecha = :fecha");
        $sql->bindParam(':fecha', $fecha);
        $sql->execute();
        $resultados = $sql->fetchAll(PDO::FETCH_ASSOC);

        //Si todo es correcto es true y no hay algo correcto false.
        if(!$resultados){
            echo json_encode(array("respuesta" => false));
        }else{
            //Crea array asociativo que contendra los datos de los hora
            echo json_encode(array("respuesta" => true, "infoHoras" => $resultados));
        }
    }

    public function insertEntrada(){
        //Iniciamos la session.
        session_start();
       
        //Datos del formulario desde HTML que se reciben
        if (isset($_POST['nombrePersona'], $_POST['apellidosPersona'], $_POST['lugarPersona'], $_POST['precioPersona'], $_POST['horaPersona'])) {
                   
            $nombre = $_POST['nombrePersona'];
            $apellidos = $_POST['apellidosPersona'];         
            $comediante = $_POST['comediantePersona'];
            $lugar = $_POST['lugarPersona'];
            $precio = $_POST['precioPersona'];
            $hora = $_POST['horaPersona'];  
            $id_relacion_cliente = $_SESSION['id'];

            //Se insertan los datos en la BD
            $sql = $this->conexionBD->prepare("INSERT INTO qwe74rty54_entrada (nombrePer, apellidosPer, id_comediante, id_ubicacion, id_planta, id_horario, id_relacion_cliente) VALUES (?, ?, ?, ?, ?, ?, ?)");
            //Se ejecuta
            $resultados = $sql->execute([$nombre, $apellidos, $comediante , $lugar, $precio, $hora, $id_relacion_cliente]);

            //Si todo es correcto es true y no hay algo correcto false.
            if (!$resultados) {  
                echo json_encode(array("respuesta" => true));
            } else {
                echo json_encode(array("respuesta" => false));
            }
        }
    }
    

    public function updateEntrada(){
        //Datos del formulario desde HTML que se reciben
        if (isset($_POST['id_entrada'],$_POST['nombrePersonaEdit'], $_POST['apellidosPersonaEdit'], $_POST['comediantePersonaEdit'], $_POST['lugarPersonaEdit'], $_POST['precioPersonaEdit'], $_POST['horaPersonaEdit'])) {
        
            $id_entrada = $_POST['id_entrada'];
            $nombre = $_POST['nombrePersonaEdit'];
            $apellidos = $_POST['apellidosPersonaEdit'];
            $comediante = $_POST['comediantePersonaEdit'];
            $lugar = $_POST['lugarPersonaEdit'];
            $precio = $_POST['precioPersonaEdit'];
            $hora = $_POST['horaPersonaEdit'];  
           
            //Se insertan los datos en la BD
            $sql = $this->conexionBD->prepare("UPDATE qwe74rty54_entrada SET nombrePer = ?, apellidosPer = ?, id_comediante = ?,
            id_ubicacion = ?, id_planta = ?, id_horario = ? WHERE id = ?");    
            //Se ejecuta
            $resultados = $sql->execute([$nombre, $apellidos, $comediante, $lugar, $precio, $hora, $id_entrada]);
        
            //Si todo es correcto es true y no hay algo correcto false.
            if (!$resultados) {  
                echo json_encode(array("respuesta" => false));
            } else {
                echo json_encode(array("respuesta" => true));
            }
        }
    }
    

    public function getInfoEntrada(){
        //Iniciamos la session
        session_start();

        //Obtemos el id, de la seesion del usuario
        $id_relacion_cliente = $_SESSION['id'];

        //Obtenemos todos los datos donde el id, del usuario sea por el que haya iniciado
        $sql = $this->conexionBD->prepare("SELECT * FROM qwe74rty54_entrada WHERE id_relacion_cliente = ?");
        //Se ejecuta
        $sql->execute([$id_relacion_cliente]);
        $resultados = $sql->fetchAll(PDO::FETCH_ASSOC);

        //Si todo es correcto es true y no hay algo correcto false.
        if(!$resultados){
            echo json_encode(array("respuesta" => false, "mensaje" => "El carrito de la compra está vacío"));
        }else{
            echo json_encode(array("respuesta" => true, "infoEntrada" => $resultados));
        }
    }

    public function obtenerEntrada($id){
        //Obtengo el id, de la entrada para poder modificar del formulario
        $sql = $this->conexionBD->prepare("SELECT * FROM qwe74rty54_entrada WHERE id = ?");
        $sql->execute([$id]);
        $resultados = $sql->fetch(PDO::FETCH_ASSOC);
    
        //Si todo es correcto es true y no hay algo correcto false.
        if(!$resultados){
            echo json_encode(array("respuesta" => false));
        }else{
            echo json_encode(array("respuesta" => true, "infoEntrada" => $resultados));
        }
    }

    public function deleteEntrada($id){
        //Eliminar la entrada por el id.
        $sql = $this->conexionBD->prepare("DELETE  FROM qwe74rty54_entrada WHERE id = ?");
        $resultados = $sql->execute([$id]);   
            
        //Si todo es correcto es true y no hay algo correcto false.
        if(!$resultados){
            echo json_encode(array("respuesta" => true));
        }else{
            echo json_encode(array("respuesta" => false));
        }
    }

    //Validaciones de todos los datos del formulario por parte BackEnd.
    public function validacion(){
           
        $nombreP = isset($_POST['nombrePersona']) ? $_POST['nombrePersona'] : '';
        $nombrePersonaVal = true;

        if (empty($nombreP)) {
            $this->printError("nombrePersonaVal", "Introduzca el nombre.");
        } else {
            $regex = '/^[a-zA-Z\s]+$/';

            if (!preg_match($regex, $nombreP)) {
                $this->printError("nombrePersonaVal", "Introduzca un nombre válidos.");
            } else {
                $this->printError("nombrePersonaVal","");
                $nombrePersonaVal = false;
            }
        }


        $apellidosP = isset($_POST['apellidosPersona']) ? $_POST['apellidosPersona'] : '';
        $apellidosPersonaVal = true;

        if (empty($apellidosP)) {
            $this->printError("apellidosPersonaVal", "Introduzca el apellido.");
        } else {
            $regex = '/^[a-zA-Z\s]+$/';

            if (!preg_match($regex, $apellidosP)) {
                $this->printError("apellidosPersonaVal", "Introduzca un apellido válido.");
            } else {
                $this->printError("apellidosPersonaVal", "");
                $apellidosPersonaVal = false;
            }
        }


        $comedianteP = isset($_POST['comediantePersona']) ? $_POST['comediantePersona'] : '';
        $comediantePersonaVal = true;

        if($comedianteP == "Selecciona una opción") {
            $this->printError("comediantePersonaVal","Seleccione una comediante.");
        } else {
            $this->printError("comediantePersonaVal","");
            $comediantePersonaVal = false;
        }
    

        $ciudadPersonaVal = true;
        $ciudadP = isset($_POST['ciudadPersona']) ? $_POST['ciudadPersona'] : ''; 

        if($ciudadP == "Selecciona una opción") {
            $this->printError("ciudadPersonaVal","Seleccione una ciudad.");
        } else {
            $this->printError("ciudadPersonaVal","");
            $ciudadPersonaVal = false;
        }
    
        $plantaPersonaVal = true;
        $plantaP = isset($_POST['plantaPersona']) ? $_POST['plantaPersona'] : ''; 

        if($plantaP == "Selecciona una opción") {
            $this->printError("plantaPersonaVal","Seleccione una planta.");
        } else {
            $this->printError("plantaPersonaVal","");
            $plantaPersonaVal = false;
        }


        $fechaPersonaVal = true;
        $fechaP = isset($_POST['fechaPersona']) ? $_POST['fechaPersona'] : ''; 

        if($fechaP == "Selecciona una opción") {
            $this->printError("fechaPersonaVal","Seleccione una fecha.");
        } else {
            $this->printError("fechaPersonaVal","");
            $fechaPersonaVal = false;
        }   

        return $nombrePersonaVal && $apellidosPersonaVal && $comediantePersonaVal 
        && $ciudadPersonaVal && $plantaPersonaVal && $fechaPersonaVal ;
    }

    //Validaciones de todos los datos del formulario para editar por parte BackEnd.
    public function validacion2(){
        $nombreEditP = isset($_POST['nombrePersonaEdit']) ? $_POST['nombrePersonaEdit'] : '';
        $nombrePersonaEditVal = true;

        if (empty($nombreEditP)) {
            $this->printError("nombrePersonaVal", "Introduzca el nombre.");
        } else {
            $regex = '/^[a-zA-Z\s]+$/';

            if (!preg_match($regex, $nombreEditP)) {
                $this->printError("nombrePersonaEditVal", "Introduzca un nombre válidos.");
            } else {
                $this->printError("nombrePersonaEditVal","");
                $nombrePersonaEditVal = false;
            }
        }


        $apellidosEditP = isset($_POST['apellidosPersonaEdit']) ? $_POST['apellidosPersonaEdit'] : '';
        $apellidosPersonaEditVal = true;

        if (empty($apellidosEditP)) {
            $this->printError("apellidosPersonaEditVal", "Introduzca el apellido.");
        } else {
            $regex = '/^[a-zA-Z\s]+$/';

            if (!preg_match($regex, $apellidosEditP)) {
                $this->printError("apellidosPersonaEditVal", "Introduzca un apellido válido.");
            } else {
                $this->printError("apellidosPersonaEditVal", "");
                $apellidosPersonaEditVal = false;
            }
        }

        $comedianteEditP = isset($_POST['comediantePersonaEdit']) ? $_POST['comediantePersonaEdit'] : '';
        $comediantePersonaVal = true;

        if($comedianteEditP == "Selecciona una opción") {
            $this->printError("comediantePersonaEditVal","Seleccione una comediante.");
        } else {
            $this->printError("comediantePersonaEditVal","");
            $comediantePersonaEditVal = false;
        }
    

        $ciudadPersonaEditVal = true;
        $ciudadEditP = isset($_POST['ciudadPersonaEdit']) ? $_POST['ciudadPersonaEdit'] : ''; 

        if($ciudadEditP == "Selecciona una opción") {
            $this->printError("ciudadPersonaEditVal","Seleccione una ciudad.");
        } else {
            $this->printError("ciudadPersonaEditVal","");
            $ciudadPersonaEditVal = false;
        }
    
        $plantaPersonaEditVal = true;
        $plantaEditP = isset($_POST['plantaPersonaEdit']) ? $_POST['plantaPersonaEdit'] : ''; 

        if($plantaEditP == "Selecciona una opción") {
            $this->printError("plantaPersonaEditVal","Seleccione una planta.");
        } else {
            $this->printError("plantaPersonaEditVal","");
            $plantaPersonaEditVal = false;
        }

        $fechaPersonaEditVal = true;
        $fechaEditP = isset($_POST['fechaPersonaEdit']) ? $_POST['fechaPersonaEdit'] : ''; 

        if($fechaEditP == "Selecciona una opción") {
            $this->printError("fechaPersonaEditVal","Seleccione una fecha.");
        } else {
            $this->printError("fechaPersonaEditVal","");
            $fechaPersonaEditVal = false;
        }

        return $nombrePersonaEditVal 
        && $apellidosPersonaEditVal && $comediantePersonaEditVal && $ciudadPersonaEditVal 
        && $plantaPersonaEditVal && $fechaPersonaEditVal;
    }
 
    public function printError($hintMsg, $elemId) {
        if (!empty($hintMsg)) {
            echo $elemId . "\n"; 
        }
    }
}

//Instancio la clase
$entrada = new Entrada();

//Genero accion para poder hacer peticiones ya que son varios metodos.
//Esto funciona si la accion es igual al nombre llama al metodo
if(isset($_GET['accion'])) {
    $accion = $_GET['accion'];
    if($accion == 'getInfoComediantes') {
        $entrada->getInfoComediantes();
    } elseif($accion == 'getInfoCiudadUbicacion') {
        $entrada->getInfoCiudadUbicacion();
    } else if($accion == 'getInfoLugarUbicacion'){
        $ciudad = $_GET['ciudad'];
        $entrada->getInfoLugarUbicacion($ciudad);
    }else if($accion == 'getInfoNombrePlanta'){
        $entrada->getInfoNombrePlanta();
    } else if($accion == 'getInfoPrecioPlanta'){
        $planta = $_GET['nombre'];
        $entrada->getInfoPrecioPlanta($planta);
    }else if($accion == 'getInfoFechaHorario'){
        $entrada->getInfoFechaHorario();
    }else if($accion == 'getInfoHoraHorario'){
        $fecha = $_GET['fecha'];
        $entrada->getInfoHoraHorario($fecha);
    }else if ($accion == 'getInfoComediante'){
        $entrada->getInfoComediantes();
    }else if ($accion == 'insertEntrada'){
        $entrada->insertEntrada();
    }else if ($accion == 'getInfoEntrada'){
        $entrada->getInfoEntrada();
    }else if ($accion == 'updateEntrada'){
        $entrada->updateEntrada();
    }else if ($accion == 'obtenerEntrada'){
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $entrada->obtenerEntrada($id);
        } else {
            echo json_encode(array("respuesta" => false, "mensaje" => "No se proporcionó el parámetro 'id'"));
        }
    }else if ($accion == 'deleteEntrada'){
        if (isset($_GET['id'])) {    
            $id = $_GET['id'];    
            $entrada->deleteEntrada($id);
        } else {
            echo json_encode(array("respuesta" => false, "mensaje" => "No se proporcionó el parámetro 'id'"));
        }
    }else{
        $entrada->validacion();
        $entrada->validacion2();
    }
}