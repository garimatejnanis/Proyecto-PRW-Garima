<?php

require 'bd.php';

class Carrito{
    private $conexionBD;

     //Crear una conexion de Base de Datos.
    public function __construct() {
        $configuracion = new BaseDatos(dirname(__FILE__) . "/configuracion.xml", dirname(__FILE__) . "/configuracion.xsd");
        $this->conexionBD = $configuracion->conectarBD();
    }

    //Obtengo el id de la tabla entrada donde se obtengan los datos del id usuario iniciado
    public function getInfoEntradabyId(){
        $id_relacion_cliente = $_SESSION['id'];
        $sql = $this->conexionBD->prepare("SELECT id FROM qwe74rty54_entrada WHERE id_relacion_cliente = ?");
        //ejecuta
        $sql->execute([$id_relacion_cliente]);

        $resultados = $sql->fetchAll(PDO::FETCH_ASSOC);
        
        //recorre los datos y me lo almacena en un array
        foreach ($resultados as $key) {
            $ids[] = $key['id'];
        }

        //retorna los id.
        return $ids;
    }
    


    public function insertEntradaEnCarrito(){
        //inicio la seesion
        session_start();

        //obtengo los ids
        $id_entradas = $this->getInfoEntradaById();

        //se insertan los datos del id de la entrada
        $sql = $this->conexionBD->prepare("INSERT INTO qwe74rty54_carrito (id_entrada) VALUES (?)");
        
        //recorre las entrada que haya comprado
        foreach ($id_entradas as $id_entrada) {
        $resultados = $sql->execute([$id_entrada]);
            if (!$resultados) {  
                //si hay algun error ejecuta el mensaje
                echo json_encode(array("respuesta" => false, "mensaje" => "Hubo un error al hacer pedido"));
                return; 
            }
        }

        //me guarda en la session las entradas que compro
        $_SESSION['id_entradas'] = $id_entradas;
        
        //si todo correcto me sale mensaje
        echo json_encode(array("respuesta" => true, "mensaje" => "Pedido realizado con éxito. Se enviará un correo de confirmación"));
    }

}

//instancio la clase
$carrito = new Carrito();

//llamo al metodo
$carrito->insertEntradaEnCarrito();
