import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, query, where, getDocs, updateDoc} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

    const firebaseConfig = {
        apiKey: "AIzaSyDDRxFwJiPhTufws1Q8s8GqZDq_GySgWxo",
        authDomain: "computadoras-481b7.firebaseapp.com",
        projectId: "computadoras-481b7",
        storageBucket: "computadoras-481b7.appspot.com",
        messagingSenderId: "744576997492",
        appId: "1:744576997492:web:cf6a1acc350e2291b55921"
    };
    // Inicializar FireDatabase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app)

    // Evento para manejar el envío del formulario de agregar producto
    const productform1 = document.getElementById("formulario");
    productform1.addEventListener("submit", async (e) => {
        e.preventDefault();
        const producto = {
            codigo: productform1.codigo.value,
            marca: productform1.marca.value,
            modelo: productform1.modelo.value,
            precio: productform1.precio.value,
            tipo: productform1.tipo.value,
            material: productform1.material.value,
            color: productform1.color.value,
            fechaLanza: productform1.fechaLanza.value,
            garantia: productform1.garantia.value,
            cantidad: productform1.cantidad.value
        };
        await agregarProducto(producto);
        productform.reset();
    });

    //Insertar
    const productform = document.getElementById("formulario");
    productform.addEventListener("submit", async(e)=>{
        e.preventDefault();
        await addDoc(collection(db, "productos"),{
            codigo: productform.codigo.value,
            marca: productform.marca.value,
            modelo: productform.modelo.value,
            precio: productform.precio.value,
            tipo: productform.tipo.value,
            material: productform.material.value,
            color: productform.color.value,
            fechaLanza: productform.fechaLanza.value,
            garantia: productform.garantia.value,
            cantidad: productform.cantidad.value
        });
            actualizarTabla();
            productform.reset();   
    });
        
    //Leer
    const leerproduc = document.getElementById("buscarModel");
    leerproduc.addEventListener("click", async()=>{
        const modeloLeer = document.getElementById("modeloLeer").value;
        if (!modeloLeer){
            console.error("Llene el campo");
            return;
        }
            const modeloQuery = query(collection(db, "productos"), where("modelo", "==", modeloLeer));
            const querySnapshot = await getDocs(modeloQuery);
            if (querySnapshot.empty) {
                console.log("No se encontro")
                return;
            }
            const modeloData = querySnapshot.docs[0].data();
            document.getElementById("codigoRespuesta").value = modeloData.codigo;
            document.getElementById("marcaRespuesta").value = modeloData.marca;
            document.getElementById("modeloRespuesta").value = modeloData.modelo;
            document.getElementById("precioRespuesta").value = modeloData.precio;
            document.getElementById("tipoRespuesta").value = modeloData.tipo;
            document.getElementById("materialRespuesta").value = modeloData.material;
            document.getElementById("colorRespuesta").value = modeloData.color;
            document.getElementById("fechaLanzaRespuesta").value = modeloData.fechaLanza;
            document.getElementById("garantiaRespuesta").value = modeloData.garantia;
            document.getElementById("cantidadRespuesta").value = modeloData.cantidad;
        });

    //Actualizar
    const formularioActu = document.getElementById("formularioLeer");    
    formularioActu.addEventListener("submit", async (e) => {
        e.preventDefault();
        try {     
            const actualizar = formularioActu.modeloLeer.value;              
            const computadoraQuery = query(collection(db, "productos"), where("modelo", "==", actualizar));
            const querySnapshot = await getDocs(computadoraQuery);
            if (querySnapshot.empty) {
                console.log("No se encontro");
                return;
            }
            const docRef = querySnapshot.docs[0].ref;
            await updateDoc(docRef, {
                codigo: formularioActu.codigoRespuesta.value,
                marca: formularioActu.marcaRespuesta.value,
                modelo: formularioActu.modeloRespuesta.value,
                precio: formularioActu.precioRespuesta.value,
                tipo: formularioActu.tipoRespuesta.value,
                material: formularioActu.materialRespuesta.value,
                color: formularioActu.colorRespuesta.value,
                fechaLanza: formularioActu.fechaLanzaRespuesta.value,
                garantia: formularioActu.garantiaRespuesta.value,
                cantidad: formularioActu.cantidadRespuesta.value,
            });
            console.log("Documento actualizado correctamente");
            formularioActu.reset();
        } catch (error) {
        console.error("Error al actualizar documento: ", error);
        }
    });  

    // Eliminar
    const eliminarCompu = document.getElementById("formularioBorrar");
        eliminarCompu.addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
            const modeloBorrar= eliminarCompu.modeloBorrar.value;
            if (!modeloBorrar) {
                console.error("No puede estar vacio");
                return;
            }
            const modeloQuery = query(collection(db, "productos"), where("modelo", "==", modeloBorrar));
            const querySnapshot = await getDocs(modeloQuery);
            // Verifica si existen documentos con ese nombre
            if (querySnapshot.docs.length === 0) {
                console.log("Sin existencias");
                return;
            }
                    // Itera con los datos para encontrar la busqueda
            for (const doc of querySnapshot.docs) {
                await deleteDoc(doc.ref);
                console.log("Producto eliminado");
            }
            // Resetea el formulario después de eliminar los documentos
            eliminarCompu.reset();
            } catch (error) {
                console.error("Error al eliminar documento: ", error);
            }
    });        
    
    // Función para actualizar la tabla con los datos de la base de datos
    const actualizarTabla = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "productos"));
            const tablaDatos = document.getElementById("tablaDatos");
            // Limpiar contenido existente de la tabla
            tablaDatos.innerHTML = "";
            // Iterar sobre los documentos y agregar filas a la tabla
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const newRow = document.createElement("tr");
                newRow.innerHTML = `
                    <td>${data.codigo}</td>
                    <td>${data.marca}</td>
                    <td>${data.modelo}</td>
                    <td>${data.precio}</td>
                    <td>${data.tipo}</td>
                    <td>${data.material}</td>
                    <td>${data.color}</td>
                    <td>${data.fechaLanza}</td>
                    <td>${data.garantia}</td>
                    <td>${data.cantidad}</td>
                `;
                tablaDatos.appendChild(newRow);
            });
        } catch (error) {
            console.error("Error al actualizar tabla: ", error);
        }
    };
    // Llamar a la función para actualizar la tabla cuando se carga la página por primera vez
    actualizarTabla();
