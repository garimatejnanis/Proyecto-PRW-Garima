class Entrada {
    constructor(){
    }
 
    getInfoComediantes(){
        //Peticion asincrona
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                //Formamos un json
                let respuesta = JSON.parse(this.responseText);        
                if (respuesta["respuesta"] == false) {
                    console.log("No se obtienen los comediantes");          
                } else if (respuesta["respuesta"] == true){
                    console.log("Obtenido correctamente el listado de Comediante");
                    //Contiene los datos de los comediantes, por el array del php
                    let datos = respuesta["infoComediante"];
                    //Se introducen los nombre de las imagenes
                    let nombresImagenes = ["comediante_M1.jpg", "comediante_M2.jpg", "comediante_F3.jpg", "comediante_F4.jpg", "comediante_M5.jpg", "comediante_M6.jpg"];
                    let html = "";

                    //Recorre las imagenes y comprueba si las iamagenes conincide con el nombre
                    datos.forEach((comediante, index) => {
                        let rutaImagen = `ImagenesComediantes/${nombresImagenes[index]}`;
                        //Recorre en la columna los datos, con nombre y apellidos y foto
                        //Ademas cada imagen mostrara el formulario para poder comprar una entrada
                        html += `
                            <div class="col-xl-auto col-lg-auto col-md-auto col-auto" id="comedianteDatos_${index}" >
                                <a  href="#" onclick="return entrada.mostrarFormularioEntrada()"><img src="${rutaImagen}"></a>
                                <h2>${comediante.nombre} ${comediante.apellidos}</h2>
                            </div>
                        `;
                    });

                    //Muestra los datos
                    document.getElementById("tituloListaComediante").style.display = "block";
                    document.getElementById("listaComediante").innerHTML = html;
                    document.getElementById("listaComediante").style.display = "block";
                    
                    //Oculta los otros datos.
                    document.getElementById("tituloCuerpo").style.display = "none";
                    document.getElementById("ocultarSlider").style.display = "none";
                    document.getElementById("tituloServicio").style.display = "none";
                    document.getElementById("ocultarImgServicio").style.display = "none";
                    document.getElementById("tipoServicio").style.display = "none";
                    document.getElementById("ocultarImgDescanso").style.display = "none";
                    document.getElementById("tituloCarritoError").style.display = "none";
                    document.getElementById("tituloFormulario").style.display = "none";
                    document.getElementById("formularioEntrada").style.display = "none";
                    document.getElementById("tablaDatos").style.display = "none";
                    document.getElementById("tituloCarrito").style.display = "none";
                    document.getElementById("botonComprar").style.display = "none";
                    document.getElementById("tituloCarritoMensaje").style.display = "none";                  
                }
            }
        }

        xhttp.open("GET", "entrada.php?accion=getInfoComediantes", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send();
        return false;
    }

    //Muestra formulario.
    mostrarFormularioEntrada() {
        document.getElementById("tituloFormulario").style.display = "block";
        document.getElementById("formulario").style.display = "block";
        document.getElementById("formularioEntrada").style.display = "block";
        document.getElementById("tituloListaComediante").style.display = "block";
        return false;
    }

    //Cargar el select 
    getInfoComediante() {
        //Petcion asincrona
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                //Formamos json
                let respuesta = JSON.parse(this.responseText);

                if (respuesta["respuesta"] == false) {
                    console.log("No carga el select Comediantes");
                } else if (respuesta["respuesta"] == true) {
                    //Se obtiene el nombre y apellidos
                    let data = respuesta["infoComediante"];
                    let selectComediante = document.getElementById("comediantePersona");
                    selectComediante.innerHTML = "<option>Selecciona una opción</option>";
                    //Recorremos el array, en value tendra el id
                    data.forEach(comediante => {
                        let option = document.createElement("option");
                        option.text = comediante.nombre + " " + comediante.apellidos;
                        option.value = comediante.id;
                        //Se agregan las opcines
                        selectComediante.appendChild(option);
                    });

                    //Lo mismo para el formulario de editar.
                    let selectComedianteEdit = document.getElementById("comediantePersonaEdit"); 
                    selectComedianteEdit.innerHTML = "<option>Selecciona una opción</option>";
                    data.forEach(comediante => {
                        let option = document.createElement("option");
                        option.text = comediante.nombre + " " + comediante.apellidos;
                        option.value = comediante.id;
                        selectComedianteEdit.appendChild(option);
                    });
                }
            }
        };

        xhttp.open("GET", "entrada.php?accion=getInfoComediante", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send();
        return false;
    }

    getInfoCiudadUbicacion() {
        //Peticion asincrona
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                //Forma json
                let respuesta = JSON.parse(this.responseText);
                if (respuesta["respuesta"] == false) {
                    console.log("No carga select de Ciudad");
                } else if (respuesta["respuesta"] == true) {
                    //Obtenemos el nombre de la ciduad
                    let data = respuesta["infoCiudades"];
                    let selectCiudad = document.getElementById("ciudadPersona");
                    selectCiudad.innerHTML = "<option>Selecciona una opción</option>";
                    //Recorremos el array, en value tendra el id
                    data.forEach(ciudad => {
                        let option = document.createElement("option");
                        option.text = ciudad.ciudad;
                         //Se agregan las opcines
                        selectCiudad.appendChild(option);
                    });

                    //Hace lo mismo formulario de editar
                    let selectCiudadEdit = document.getElementById("ciudadPersonaEdit");
                    selectCiudadEdit.innerHTML = "<option>Selecciona una opción</option>";
                    data.forEach(ciudad => {
                        let option = document.createElement("option");
                        option.text = ciudad.ciudad;
                        selectCiudadEdit.appendChild(option);
                    });
                }
            }
        };

        xhttp.open("GET", "entrada.php?accion=getInfoCiudadUbicacion", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send();
        return false;
    }


    getInfoLugarUbicacion(ciudad) {
        //Peticion asincrona
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let respuesta = JSON.parse(this.responseText);
                if (respuesta["respuesta"] == false) {
                    console.log("Error al ejecutar");
                } else if (respuesta["respuesta"] == true) {
                    //Obtenmos la info de lugar
                    let data = respuesta["infoLugares"];
                    //Se pone por defecto la opcion, al elegir la cidudad
                    let selectLugar = document.getElementById("lugarPersona");
                    selectLugar.innerHTML = "<option>Selecciona una opción</option>";
                    data.forEach((lugar, index) => {
                        let option = document.createElement("option");
                        option.text = lugar.lugar;
                        option.value = lugar.id;
                        selectLugar.appendChild(option);

                        //La opcion elegida en el select de ciudad, se pondra por defecto la opcion de lugar
                        if (index === 0) {
                            option.selected = true;
                        }
                    });

                    //Los mismo para el formulario de editar
                    let selectLugarEdit = document.getElementById("lugarPersonaEdit");
                    selectLugarEdit.innerHTML = "<option>Selecciona una opción</option>";
                    data.forEach((lugar, index) => {
                        let option = document.createElement("option");
                        option.text = lugar.lugar;
                        option.value = lugar.id;
                        selectLugarEdit.appendChild(option);
                        if (index === 0) {
                            option.selected = true;
                        }
                    });
                }
            }
        };

        xhttp.open("GET", `entrada.php?accion=getInfoLugarUbicacion&ciudad=${ciudad}`, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send();
        return false;
    }


    getInfoNombrePlanta() {
        //peticion asincrona
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let respuesta = JSON.parse(this.responseText);
                if (respuesta["respuesta"] == false) {
                    console.log("No carga select Planta");
                } else if (respuesta["respuesta"] == true) {
                    let data = respuesta["infoPlantas"];

                    //Carga el select como los otros
                    let selectPlanta = document.getElementById("plantaPersona");
                    selectPlanta.innerHTML = "<option>Selecciona una opción</option>";
                    data.forEach(planta => {
                        let option = document.createElement("option");
                        option.text = planta.nombre;
                        selectPlanta.appendChild(option);
                    });

                    //para el formulario editar
                    let selectPlantaEdit = document.getElementById("plantaPersonaEdit");
                    selectPlantaEdit.innerHTML = "<option>Selecciona una opción</option>";
                    data.forEach(planta => {
                        let option = document.createElement("option");
                        option.text = planta.nombre;
                        selectPlantaEdit.appendChild(option);
                    });
                }
            }
        };

        xhttp.open("GET", "entrada.php?accion=getInfoNombrePlanta", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send();
        return false;
    }

    
    getInfoPrecioPlanta(planta) {
        //peticion asoincorna
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let respuesta = JSON.parse(this.responseText);
                if (respuesta["respuesta"] == false) {
                    console.log("Error al ejecutar");
                } else if (respuesta["respuesta"] == true) {
                    let data = respuesta["infoPrecios"];

                    let selectPrecio = document.getElementById("precioPersona");
                    selectPrecio.innerHTML = "<option>Selecciona una opción</option>";
                    data.forEach((precio, index) => {
                        let option = document.createElement("option");
                        option.text = precio.precio;
                        option.value = precio.id;
                        selectPrecio.appendChild(option);
                        //La opcion elegida en el select de nombre planta, se pondra por defecto la opcion de  precio
                        if (index === 0) {
                            option.selected = true;
                        }
                    });

                    //lo mismo para formulario editar
                    let selectPrecioEdit = document.getElementById("precioPersonaEdit");
                    selectPrecioEdit.innerHTML = "<option>Selecciona una opción</option>";
                    data.forEach((precio, index) => {
                        let option = document.createElement("option");
                        option.text = precio.precio;
                        option.value = precio.id;
                        selectPrecioEdit.appendChild(option);
                        
                        if (index === 0) {
                            option.selected = true;
                        }
                    });
                   
                }
            }
        };

        xhttp.open("GET", `entrada.php?accion=getInfoPrecioPlanta&nombre=${planta}`, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send();
        return false;
    }


    getInfoFechaHorario() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let respuesta = JSON.parse(this.responseText);
                if (respuesta["respuesta"] == false) {
                    console.log("No carga select fecha");
                } else if (respuesta["respuesta"] == true) {
                    //Obtengo desde el array las fechas
                    let data = respuesta["infoFechas"];

                    //Mismo procesos como los anterioes
                    let selectFecha = document.getElementById("fechaPersona");
                    selectFecha.innerHTML = "<option>Selecciona una opción</option>";
                    data.forEach(fecha => {
                        let option = document.createElement("option");
                        option.text = fecha.fecha;
                        selectFecha.appendChild(option);
                    });

                    //formulario para editar
                    let selectFechaEdit = document.getElementById("fechaPersonaEdit");
                    selectFechaEdit.innerHTML = "<option>Selecciona una opción</option>";
                    data.forEach(fecha => {
                        let option = document.createElement("option");
                        option.text = fecha.fecha;
                        selectFechaEdit.appendChild(option);
                    });
                }
            }
        };

        xhttp.open("GET", "entrada.php?accion=getInfoFechaHorario", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send();
        return false;
    }


    getInfoHoraHorario(fecha) {
        //peticion asincrona.
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let respuesta = JSON.parse(this.responseText);
                if (respuesta["respuesta"] == false) {
                    console.log("Error al ejecutar");
                } else if (respuesta["respuesta"] == true) {
                    //obtengo la info desde el array
                    let data = respuesta["infoHoras"];

                    //mismo proceso como anteriores
                    let selectHora = document.getElementById("horaPersona");
                    selectHora.innerHTML = "<option>Selecciona una opción</option>";
                    data.forEach((hora, index) => {
                        let option = document.createElement("option");
                        option.text = hora.hora;
                        option.value = hora.id;
                        selectHora.appendChild(option);
                        if (index === 0) {
                            option.selected = true;
                        }
                    });

                    //para formulairo editar
                    let selectHoraEdit = document.getElementById("horaPersonaEdit");
                    selectHoraEdit.innerHTML = "<option>Selecciona una opción</option>";
                    data.forEach((hora, index) => {
                        let option = document.createElement("option");
                        option.text = hora.hora;
                        option.value = hora.id;
                        selectHoraEdit.appendChild(option);
                        if (index === 0) {
                            option.selected = true;
                        }
                    });
                }
            }
        };

        xhttp.open("GET", `entrada.php?accion=getInfoHoraHorario&fecha=${fecha}`, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send();
        return false;
    }

    insertEntrada(){
        //petcion asincrona
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                //oculta al haber insertado
                document.getElementById("formularioEntrada").style.display = "none";
                document.getElementById("tituloFormulario").style.display = "none";
                //formamos json
                let respuesta = JSON.parse(this.responseText);
                if (respuesta["respuesta"] == false) {
                    //ocultamos 
                    console.log("no se inserta la entrada"); 
                    document.getElementById("nombrePersona").value = "";
                    document.getElementById("apellidosPersona").value =  "";
                    document.getElementById("comediantePersona").value =  "Selecciona una opción";
                    document.getElementById("ciudadPersona").value =  "Selecciona una opción";
                    document.getElementById("lugarPersona").value =  "";
                    document.getElementById("plantaPersona").value =  "Selecciona una opción";
                    document.getElementById("precioPersona").value = "";
                    document.getElementById("fechaPersona").value =  "Selecciona una opción";
                    document.getElementById("horaPersona").value = ""; 
                } else if (respuesta["respuesta"] == true){
                    console.log("entrada insertada.");                           
                }
            }
        }

        //Obtiene los datos del formualrio
        let nombre = document.getElementById("nombrePersona").value;
        let apellidos = document.getElementById("apellidosPersona").value;
        let comediante = document.getElementById("comediantePersona").value;
        let lugar = document.getElementById("lugarPersona").value;
        let precio = document.getElementById("precioPersona").value;
        let hora = document.getElementById("horaPersona").value;

        let params = "nombrePersona=" + nombre + "&apellidosPersona=" + apellidos + 
        "&comediantePersona=" + comediante + "&lugarPersona=" + lugar +
        "&precioPersona=" + precio +  "&horaPersona=" + hora;

        //hace peticion en php y si todo esta correcto inseta o sino salta error
        xhttp.open("POST", "entrada.php?accion=insertEntrada", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(params);
        return false;  
    }


    getInfoEntrada() {
        //petciion asinconra
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                //formamos json
                let respuesta = JSON.parse(this.responseText);         
                if (respuesta["respuesta"] == false) {
                    //si esta vacio el carrito me muestra el mensaje
                    document.getElementById("tituloCarritoError").innerText = respuesta["mensaje"];
                    document.getElementById("tituloCarritoError").style.display = "block"; 

                    //oculta otros elementos
                    document.getElementById("tituloCuerpo").style.display = "none";  
                    document.getElementById("ocultarSlider").style.display = "none";  
                    document.getElementById("tituloServicio").style.display = "none"; 
                    document.getElementById("tipoServicio").style.display = "none";   
                    document.getElementById("ocultarImgServicio").style.display = "none"; 
                    document.getElementById("ocultarImgDescanso").style.display = "none";
                    document.getElementById("tablaDatos").style.display = "none";
                    document.getElementById("tituloCarrito").style.display = "none";  
                    document.getElementById("botonComprar").style.display = "none";
                    document.getElementById("tituloListaComediante").style.display = "none";
                    document.getElementById("listaComediante").style.display = "none";
                     
                } else if (respuesta["respuesta"] == true){
                    //obtengo los datos insetados
                    let datos = respuesta["infoEntrada"];
                    let tablaHTML = '';
                    
                    //me crea la tabla
                    tablaHTML = '<table class="table col-xl-auto col-lg-auto col-md-auto col-auto tablaCarrito">';
                    tablaHTML += '<thead class="colorTablaTitulo"><tr>';
                    tablaHTML += '<th>Nombre</th>';
                    tablaHTML += '<th>Apellidos</th>';
                    tablaHTML += '<th>Comediante</th>';
                    tablaHTML += '<th>Lugar</th>';
                    tablaHTML += '<th>Fecha</th>';
                    tablaHTML += '<th>Precio</th>';
                    tablaHTML += '<th>Acciones</th>';
                    tablaHTML += '</tr></thead>';
                    tablaHTML += '<tbody>';

                    //recorro los datos que quiero imprimir
                    //Ademas for cada fila se crean botones, que tienen metodos para editar y eliminar
                    datos.forEach(function(entrada) {
                        tablaHTML += '<tr>';
                            tablaHTML += '<td>' + entrada.nombrePer + '</td>';
                            tablaHTML += '<td>' + entrada.apellidosPer + '</td>';
                            tablaHTML += '<td>' + entrada.id_comediante + '</td>';
                            tablaHTML += '<td>' + entrada.id_ubicacion + '</td>';
                            tablaHTML += '<td>' + entrada.id_horario + '</td>';
                            tablaHTML += '<td>' + entrada.id_planta + '</td>';
                            tablaHTML += '<td><button type="button" class="btn colorBotonEditar" onclick="return entrada.editarEntrada(' + entrada.id + ', \'' + entrada.nombre + '\')">Editar</button>' +" "+ 
                            '<button type="button" class="btn colorBotonEliminar"  onclick="return entrada.deleteEntrada(' + entrada.id + ')">Eliminar</button></td>';
                        tablaHTML += '</tr>';
                    });
                        tablaHTML += '</tbody></table>';

                        //imprime la tabla, boton y titulo del carrito
                        document.getElementById("tituloCarrito").style.display = "block";
                        document.getElementById("tituloCarritoError").innerText = "";
                        document.getElementById("tablaDatos").innerHTML = tablaHTML;
                        document.getElementById("tablaDatos").style.display = "block";
                        document.getElementById("botonComprar").style.display = "block";

                        //oculta los elementos.
                        document.getElementById("tituloCuerpo").style.display = "none";
                        document.getElementById("ocultarSlider").style.display = "none";
                        document.getElementById("tituloServicio").style.display = "none";
                        document.getElementById("ocultarImgServicio").style.display = "none";
                        document.getElementById("tipoServicio").style.display = "none";
                        document.getElementById("ocultarImgDescanso").style.display = "none";
                        document.getElementById("tituloListaComediante").style.display = "none";
                        document.getElementById("listaComediante").style.display = "none";
                        document.getElementById("tituloFormulario").style.display = "none";
                        document.getElementById("formularioEntrada").style.display = "none";
                        document.getElementById("tituloEditar").style.display = "none";
                        document.getElementById("tituloCarritoError").style.display = "none";       
                    }
                }
            }
    
        xhttp.open("GET", "entrada.php?accion=getInfoEntrada", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send();
        return false;
    }
  
    
    editarEntrada(id) {
        //obtener los datos de la entrada
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                //formamos json
                let respuesta = JSON.parse(this.responseText);
                if (respuesta["respuesta"] == true) {
                    //se obtienen los datos del array
                    let datos = respuesta["infoEntrada"];

                    //muestro y oculto los elementos
                    document.getElementById("tituloEditar").style.display = "block";
                    document.getElementById("formularioEntrada2").style.display = "block";
                    document.getElementById("botonComprar").style.display = "none";

                    //muestro por input hidden
                    document.getElementById("id_entrada").value = datos.id;

                    //los datos introducidos me muestran el formualrio para poder editar
                    document.getElementById("nombrePersonaEdit").value = datos.nombrePer;
                    document.getElementById("apellidosPersonaEdit").value = datos.apellidosPer;
                    document.getElementById("comediantePersonaEdit").value = datos.id_comediante;
                    document.getElementById("lugarPersonaEdit").value = datos.id_ubicacion;
                    document.getElementById("precioPersonaEdit").value = datos.id_planta;
                    document.getElementById("horaPersonaEdit").value = datos.id_horario;
                } else {
                    console.log("No se obtienen datos errror.");
                }
            }
        };
    
        xhttp.open("GET", "entrada.php?accion=obtenerEntrada&id=" + id, true);
        xhttp.send();
    }

    updateEntrada(){
        //petcion asincorna
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                //se coulta haber editado y gaurdado
                document.getElementById("formularioEntrada2").style.display = "none";
                document.getElementById("tituloEditar").style.display = "none";
                //formamos json
                let respuesta = JSON.parse(this.responseText);
                if (respuesta["respuesta"] == true) {
                    console.log("entrada  modificada"); 
                    entrada.getInfoEntrada();   
                } else if (respuesta["respuesta"] == false){
                    console.log("entrada no modificada.");               
                }
                
            }
        }
       
        let nombreEdit = document.getElementById("nombrePersonaEdit").value;
        let apellidosEdit = document.getElementById("apellidosPersonaEdit").value;
        let comedianteEdit = document.getElementById("comediantePersonaEdit").value;
        let lugarEdit = document.getElementById("lugarPersonaEdit").value;
        let precioEdit = document.getElementById("precioPersonaEdit").value;
        let horaEdit = document.getElementById("horaPersonaEdit").value;

        //input hidden
        let id_entrada = document.getElementById("id_entrada").value;
        let params =  "id_entrada=" + id_entrada + "&nombrePersonaEdit=" + nombreEdit + "&apellidosPersonaEdit=" + apellidosEdit + 
        "&comediantePersonaEdit=" + comedianteEdit + "&lugarPersonaEdit=" + lugarEdit +
        "&precioPersonaEdit=" + precioEdit + "&horaPersonaEdit=" + horaEdit;

        
        xhttp.open("POST", "entrada.php?accion=updateEntrada", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(params);
        
        return false; 
    }

    //se elimina la entrada
    deleteEntrada(id){
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let respuesta = JSON.parse(this.responseText);
                if (respuesta["respuesta"] == false) {
                    console.log("no eliminada"); 
                    entrada.getInfoEntrada(); 
                } else if (respuesta["respuesta"] == true){
                    console.log("eliminada"); 
                    entrada.getInfoEntrada();    
                }
            }
        }

        xhttp.open("DELETE", "entrada.php?accion=deleteEntrada&id=" + id, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send();
        
        return false; 
    }


    //Validaciones de todos los datos del formulario por parte FrontEnd.
    validacion(){         
        let nombrePersonaVal = true;
        let nombreP = document.contactForm3.nombrePersona.value;

        if(nombreP == ""){
            this.printError("nombrePersonaVal", "Introduzca el nombre.")
        }else{
            let regex = /^[a-zA-Z\s]+$/; 
            
            if(regex.test(nombreP) === false) {
                this.printError("nombrePersonaVal", "Introduzca el nombre valido.");
            } else {
                this.printError("nombrePersonaVal", "");
                nombrePersonaVal = false;
            }
        }
        
        let apellidosPersonaVal = true;
        let apellidosP = document.contactForm3.apellidosPersona.value;

        if(apellidosP == ""){
            this.printError("apellidosPersonaVal", "Introduzca el apellido.")
        }else{
            let regex = /^[a-zA-Z\s]+$/; 
            
            if(regex.test(apellidosP) === false) {
                this.printError("apellidosPersonaVal", "Introduzca el apellido valido.");
            } else {
                this.printError("apellidosPersonaVal", "");
                apellidosPersonaVal = false;
            }
        }

        let comediantePersonaVal = true;
        let comedianteP = document.contactForm3.comediantePersona.value;
        
        if(comedianteP == "Selecciona una opción") {
            this.printError("comediantePersonaVal", "Seleccione un comediante.");
        } else {
            this.printError("comediantePersonaVal", "");
            comediantePersonaVal = false;
        }


        let ciudadPersonaVal = true;
        let ciudadP = document.contactForm3.ciudadPersona.value;
        
        if(ciudadP == "Selecciona una opción") {
            this.printError("ciudadPersonaVal", "Seleccione una ciudad.");
        } else {
            this.printError("ciudadPersonaVal", "");
            ciudadPersonaVal = false;
        }

        let plantaPersonaVal = true;
        let plantaP = document.contactForm3.plantaPersona.value;
        
        if(plantaP == "Selecciona una opción") {
            this.printError("plantaPersonaVal", "Seleccione una planta.");
        } else {
            this.printError("plantaPersonaVal", "");
            plantaPersonaVal = false;
        }

        let fechaPersonaVal = true;
        let fechaP = document.contactForm3.fechaPersona.value;
        
        if(fechaP == "Selecciona una opción") {
            this.printError("fechaPersonaVal", "Seleccione una fecha.");
        } else {
            this.printError("fechaPersonaVal", "");
            fechaPersonaVal = false;
        }
        
        if ((nombrePersonaVal || apellidosPersonaVal || ciudadPersonaVal 
            || comediantePersonaVal || plantaPersonaVal || fechaPersonaVal)==true) {
            return false;
        } else {
            return true;
        }

    }

    //Validaciones de todos los datos del formulario editar por parte FrontEnd.
    validacion2(){
        let nombrePersonaEditVal = true;
        let nombreEditP = document.contactForm4.nombrePersonaEdit.value;

        if(nombreEditP == ""){
            this.printError("nombrePersonaEditVal", "Introduzca el nombre.")
        }else{
            let regex = /^[a-zA-Z\s]+$/; 
            
            if(regex.test(nombreEditP) === false) {
                this.printError("nombrePersonaEditVal", "Introduzca el nombre valido.");
            } else {
                this.printError("nombrePersonaEditVal", "");
                nombrePersonaEditVal = false;
            }
        }
        
        let apellidosPersonaEditVal = true;
        let apellidosEditP = document.contactForm4.apellidosPersonaEdit.value;

        if(apellidosEditP == ""){
            this.printError("apellidosPersonaEditVal", "Introduzca el apellido.")
        }else{
            let regex = /^[a-zA-Z\s]+$/; 
            
            if(regex.test(apellidosEditP) === false) {
                this.printError("apellidosPersonaEditVal", "Introduzca el apellido valido.");
            } else {
                this.printError("apellidosPersonaEditVal", "");
                apellidosPersonaEditVal = false;
            }
        }

        let comediantePersonaEditVal = true;
        let comedianteEditP = document.contactForm4.comediantePersonaEdit.value;
        
        if(comedianteEditP == "Selecciona una opción") {
            this.printError("comediantePersonaEditVal", "Seleccione un comediante.");
        } else {
            this.printError("comediantePersonaEditVal", "");
            comediantePersonaEditVal = false;
        }


        let ciudadPersonaEditVal = true;
        let ciudadEditP = document.contactForm4.ciudadPersonaEdit.value;
        
        if(ciudadEditP == "Selecciona una opción") {
            this.printError("ciudadPersonaEditVal", "Seleccione una ciudad.");
        } else {
            this.printError("ciudadPersonaEditVal", "");
            ciudadPersonaEditVal = false;
        }

        let plantaPersonaEditVal = true;
        let plantaEditP = document.contactForm4.plantaPersonaEdit.value;
        
        if(plantaEditP == "Selecciona una opción") {
            this.printError("plantaPersonaEditVal", "Seleccione una planta.");
        } else {
            this.printError("plantaPersonaEditVal", "");
            plantaPersonaEditVal = false;
        }

        let fechaPersonaEditVal = true;
        let fechaEditP = document.contactForm4.fechaPersonaEdit.value;
        
        if(fechaEditP == "Selecciona una opción") {
            this.printError("fechaPersonaEditVal", "Seleccione una fecha.");
        } else {
            this.printError("fechaPersonaEditVal", "");
            fechaPersonaEditVal = false;
        }

        if (( nombrePersonaEditVal || apellidosPersonaEditVal || comediantePersonaEditVal
        ||  ciudadPersonaEditVal || plantaPersonaEditVal || fechaPersonaEditVal )==true) {
            return false;
        } else {
            return true;
        }
    }

    printError(elemId, hintMsg) {
        document.getElementById(elemId).innerHTML = hintMsg;
    }

}

//instancio la clase
let entrada = new Entrada();

//ejecutamos el evento, cuando ya se haya cargado los otros anteriomente
document.addEventListener("DOMContentLoaded", function() {
    
    entrada.getInfoComediante();

    entrada.getInfoCiudadUbicacion();

    //añado evento change, que se ejecuta cuando vaya cambiadno de opciones durante el select
    document.getElementById("ciudadPersona").addEventListener("change", function() {
        //al elegir la ciudad se guarda en la variable
        let ciudadSeleccionada = this.value;
        //y se aplicaria la opcion de lugar.
        entrada.getInfoLugarUbicacion(ciudadSeleccionada);
    });

     //añado evento change, que se ejecuta cuando vaya cambiadno de opciones durante el select
    document.getElementById("ciudadPersonaEdit").addEventListener("change", function() {
          //al elegir la ciudad se guarda en la variable
        let ciudadSeleccionadaEdit = this.value;
         //y se aplicaria la opcion de lugar.
        entrada.getInfoLugarUbicacion(ciudadSeleccionadaEdit);
    });

    entrada.getInfoNombrePlanta();

     //añado evento change, que se ejecuta cuando vaya cambiadno de opciones durante el select
    document.getElementById("plantaPersona").addEventListener("change", function() {
          //al elegir la planta se guarda en la variable
        let plantaSeleccionada = this.value;
         //y se aplicaria la opcion de precio.
        entrada.getInfoPrecioPlanta(plantaSeleccionada);
    });

     //añado evento change, que se ejecuta cuando vaya cambiadno de opciones durante el select
    document.getElementById("plantaPersonaEdit").addEventListener("change", function() {
        //al elegir la planta se guarda en la variable
        let plantaSeleccionadaEdit = this.value;
         //y se aplicaria la opcion de precio.
        entrada.getInfoPrecioPlanta(plantaSeleccionadaEdit);
    });

    entrada.getInfoFechaHorario();

     //añado evento change, que se ejecuta cuando vaya cambiadno de opciones durante el select
    document.getElementById("fechaPersona").addEventListener("change", function() {
        //al elegir la fecha se guarda en la variable
        let fechaSeleccionada = this.value;
         //y se aplicaria la opcion de hora.
        entrada.getInfoHoraHorario(fechaSeleccionada);
    });

     //añado evento change, que se ejecuta cuando vaya cambiadno de opciones durante el select
    document.getElementById("fechaPersonaEdit").addEventListener("change", function() {
        //al elegir la fecha se guarda en la variable
        let fechaSeleccionadaEdit = this.value;
         //y se aplicaria la opcion de hora.
        entrada.getInfoHoraHorario(fechaSeleccionadaEdit);
    });
    
});


