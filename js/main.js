// El código va aquí -> 

/* Campos */
let txtName = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

let tabla=document.getElementById("tablaListaCompras");
let cuerpoTabla=tabla.getElementsByTagName("tbody");

let contadorProductos= document.getElementById("contadorProductos");
let productosTotal= document.getElementById("productosTotal");
let precioTotal= document.getElementById("precioTotal");

let isValid=true;
let idTimeout; 
let precio=0;
let contador=0;
let totalCantProductos=0;
let costoTotal=0;

let datos = []; // aquí se almacenarán lso datos de la tabla

/* Botones */
let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

function ValidarCantidad(){
    if(txtNumber.value.length==0){
        return false;
    } //if

    if (isNaN(txtNumber.value)){
        return false;
    }// if

    if(parseFloat(txtNumber.value)<=0){
        return false;
    }//if

    return true; 
}//validarCantidad

function getPrice(){
    return Math.floor(Math.random()*50*100)/100;
}// Obtener precio

btnAgregar.addEventListener("click",function(event){
    event.preventDefault();
    isValid=true;
    console.log(getPrice());
    clearTimeout(idTimeout); 

    /* Limpiar mensaje de alerta después del click en agregar */
    alertValidacionesTexto.innerHTML=""; 
    alertValidaciones.style.display="none";

    /* Validación de campos vacíos */
    /* console.log("borde: ",txtName.style.border); */ // Verificar color de borde
   /*  txtNombre.value=txtNombre.value.trim();  *//* Eliminar espacios - necesita click*/

    let lista="Los siguientes campos deben ser llenados correctamente:<ul>";
    if (txtName.value.length<2){
        txtName.style.border="solid thin red"; 
        lista +="<li>Se debe escribir un nombre válido </li>" /* alertValidacionesTexto.innerHTML="Se debe escribir un nombre válido"; */ // Se puede usar en vez de la lista
        alertValidaciones.style.display="block";
        isValid=false;
    }else{
        txtName.style.border="";
    } /* Validar si el campo "Nombre" está vacío o no.*/

    
    if(!ValidarCantidad()){ // con el signo ! se niega el resultado de la función
        /*  if (txtNumber.value.length==0){ */
        txtNumber.style.border="solid thin red"; 
        lista +="<li>Se debe escribir una cantidad válida </li>" /*  alertValidacionesTexto.innerHTML+="Se debe escribir una cantidad válida"; */ // se puede usar en vez de la lista
        alertValidaciones.style.display="block"; 
        isValid=false;
    } else{
        txtNumber.style.border="";
        } /* Validar si el campo "Cantidad" está vacío o no. */

    lista += "</ul>";
    alertValidacionesTexto.insertAdjacentHTML("beforeend",lista);
    idTimeout=setTimeout(function(){
        alertValidaciones.style.display="none";
    }, 5000); /*sirve para establecer el tiempo en el que se mostrará el mensaje*/

    if(isValid){
        precio=getPrice();
        contador++;
        let row = `<tr>
                    <th>${contador}</th>
                    <td>${txtName.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>$ ${precio}</td>
                </tr>`;
        
        let elemento = `{ 
                         "id": ${contador},
                         "name" : "${txtName.value}",
                         "cantidad" : "${txtNumber.value}",
                         "precio" : "${precio}"
                        }`;
        datos.push (JSON.parse(elemento));
        localStorage.setItem("datos",JSON.stringify(datos));
            
        cuerpoTabla[0].insertAdjacentHTML("beforeend", row);
        contadorProductos.innerText=contador;
        totalCantProductos += parseFloat(txtNumber.value);
        productosTotal.innerText=totalCantProductos;
        costoTotal+=precio * parseFloat(txtNumber.value);
        precioTotal.innerText=`$ ${costoTotal.toFixed(2)}`;

            // para JSON
            let resumen=`{"contadorProductos" : ${contador},
                        "totalCantProductos"  : ${totalCantProductos},
                        "costoTotal"          : ${costoTotal.toFixed(2)}}`;
                localStorage.setItem("resumen",resumen);

                /* Se reemplaza para usar formato JSON */
                /*      localStorage.setItem("contadorProductos",contador);
                        localStorage.setItem("totalCantProductos",totalCantProductos);
                        localStorage.setItem("costoTotal",costoTotal.toFixed(2)); */
                        
        txtName.value="";
        txtNumber.value="";
        txtName.focus();
    }// if isValid
}); /* btn agregar */
    

/* Botón limpiar */
btnClear.addEventListener("click",function(event){
    event.preventDefault();

    /* Limpiar campos */
    txtName.value="";
    txtNumber.value="";

    /* Limpiar tabla */
    cuerpoTabla[0].innerHTML="";

    /* Limpiar contadores */
    contador =0;
    totalCantProductos=0;
    costoTotal=0;
    contadorProductos.innerText="0";
    productosTotal.innerText="0";
    precioTotal.innerText="$ 0";

    localStorage.setItem("contadorProductos",contador);
    localStorage.setItem("totalCantProductos",totalCantProductos);
    localStorage.setItem("costoTotal",costoTotal.toFixed(2));
});// click btnClear



/* Eliminar espacios en el inicio y fin del campo */
txtNumber.addEventListener("blur",function(event){
    event.preventDefault();
    txtNumber.value=txtNumber.value.trim();
}); /* txtNumber.blur */
    
txtName.addEventListener("blur",function(event){
    event.preventDefault();
    txtName.value=txtName.value.trim();
}); /* txtName.blur */

window.addEventListener("load", function (event){

    /* if para JSON */
    if(localStorage.getItem("resumen")==null){
        let resumen = `{"contadorProductos" : ${contador},
                      "totalCantProductos"  : ${totalCantProductos},
                        "costoTotal" : ${costoTotal.toFixed(2)} }`;
                localStorage.setItem("resumen",resumen);
        }

        let res = JSON.parse(localStorage.getItem("resumen"));  //rempaza ifs normales
        if(localStorage.getItem("datos")!=null){
            datos=JSON.parse(localStorage.getItem("datos"));

            datos.forEach(r => {
                let row = `<tr>
                    <th>${r.id}</th>
                    <td>${r.name}</td>
                    <td>${r.cantidad}</td>
                    <td>$ ${r.precio}</td>
                </tr>`;
                cuerpoTabla[0].insertAdjacentHTML("beforeend", row);
            }); //agregar tabla cuando reinicia la página

        } //!= null
            /*     if (this.localStorage.getItem("contadorProductos")==null){
                    localStorage.setItem("contadorProductos","0");
                } // if contadorProductos == null

                if (this.localStorage.getItem("totalCantProductos")==null){
                    localStorage.setItem("totalCantProductos","0");
                } // if ctotalCantProductos == null

                if (this.localStorage.getItem("costoTotal")==null){
                    localStorage.setItem("costoTotal","0.0");
                } // if costoTotal == null */ // se remplazan estas líneas para usar formato JSON
        
        contador=res.contadorProductos; // contador= parseInt(localStorage.getItem("contadorProductos"));  /*Se convierten valores para que no genere problema */
        totalCantProductos=res.totalCantProductos; // totalCantProductos= parseInt(localStorage.getItem("totalCantProductos"));  /*Se convierten valores para que no genere problema */
        costoTotal=res.costoTotal; // costoTotal= parseFloat(localStorage.getItem("costoTotal"));  /*Se convierten valores para que no genere problema */
        
        contadorProductos.innerText=contador;
        productosTotal.innerText=totalCantProductos;
        precioTotal.innerText= `$ ${costoTotal}`;
 }); // traer información del local storage