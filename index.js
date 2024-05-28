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



    //Insertar
    const productform = document.getElementById("formulario");
    productform.addEventListener("submit", async(e)=>{
        e.preventDefault();

        // Verificar campos vacíos
        const inputs = productform.querySelectorAll('input[type="text"]');
        for (const input of inputs) {
            if (!input.value.trim()) {
                alert("Por favor completa todos los campos.");
                return;
            }
        }

        await addDoc(collection(db, "productos"),{
            codigo: productform.codigo.value.trim(),
            marca: productform.marca.value.trim(),
            modelo: productform.modelo.value.trim(),
            precio: productform.precio.value.trim(),
            tipo: productform.tipo.value.trim(),
            material: productform.material.value.trim(),
            color: productform.color.value.trim(),
            fechaLanza: productform.fechaLanza.value.trim(),
            garantia: productform.garantia.value.trim(),
            cantidad: productform.cantidad.value.trim()
        });

        productform.reset();   
        actualizarTabla();
        
    });
        
    // Función para mostrar los datos en la tabla
    function mostrarDatosTabla(datos) {
        const tablaDatos = document.getElementById("tablaDatos");
        tablaDatos.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos
        
        datos.forEach(producto => {
            const fila = document.createElement("tr");
            
            // Agregar cada dato del producto como una celda en la fila
            Object.values(producto).forEach(value => {
                const celda = document.createElement("td");
                celda.textContent = value;
                fila.appendChild(celda);
            });
            
            // Agregar botón de eliminar
            const botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Eliminar";
            botonEliminar.addEventListener("click", () => {
                eliminarProducto(producto.id);
            });
            const celdaBoton = document.createElement("td");
            celdaBoton.appendChild(botonEliminar);
            fila.appendChild(celdaBoton);
            
            


            tablaDatos.appendChild(fila); // Agregar la fila a la tabla
        });
    }

    // Eliminar producto
    async function eliminarProducto(id) {
        try {
            await deleteDoc(doc(db, "productos", id));
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    }


    // Actualizar la tabla cada vez que se agreguen nuevos datos
    function actualizarTabla() {
        const productosRef = collection(db, "productos");
        onSnapshot(productosRef, (snapshot) => {
            const datos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            mostrarDatosTabla(datos);
        });
    }




    

    
// Mostrar datos al cargar la página
actualizarTabla();



