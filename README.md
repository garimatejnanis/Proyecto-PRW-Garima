Proyecto Final – Desarrollo de Aplicaciones Web (CFGS)

Este es el Proyecto Final del Ciclo Formativo de Grado Superior en Informática y Comunicaciones, especialidad en Desarrollo de Aplicaciones Web.
El proyecto consiste en una aplicación web para la gestión de venta de entradas de un teatro de comedia.

Requisitos previos: 
  - Tener XAMPP instalado y configurado correctamente.
  - Tener MySQL Workbench para importar la base de datos.

Tecnologías utilizadas: HTML, CSS, JavaScript, PHP, MySQL, Bootstrap y REST API (PHP).

Funcionalidad REST API:
Se ha desarrollado una API REST que permite la gestión de los datos del sistema a través de los siguientes métodos:
 - GET: Obtener datos, por ejemplo, la lista de actores.
 - POST: Insertar nuevos registros, como entradas.
 - PUT: Actualizar información existente, como los datos de una obra o del lugar.
 - DELETE: Eliminar registros, por ejemplo, borrar una entrada.

Instalación: 
  - Clona este repositorio en tu equipo: git clone https://github.com/garimatejnanis/Proyecto-PRW-Garima
  - Coloca el proyecto dentro de la carpeta htdocs de XAMPP.
  - Abre MySQL Workbench y ejecuta el archivo teatro.sql incluido en el repositorio para crear la base de datos.
  - Asegúrate de configurar correctamente la conexión a la base de datos en el archivo bd.php o donde se gestione la conexión.
  - Inicia Apache y MySQL desde el panel de XAMPP.
  - Abre tu navegador y accede al proyecto: http://localhost/Proyecto-PRW-Garima

Uso de la aplicación:
  - Primero, regístrate creando una cuenta de usuario.
  - Luego, inicia sesión con tus credenciales.
  - Una vez dentro, podrás acceder a todas las funcionalidades implementadas para la gestión de entradas del teatro.
