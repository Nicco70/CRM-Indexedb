(function(){
    let DB;
    const formulario = document.querySelector('#formulario');

    
    document.addEventListener('DOMContentLoaded', () => {

        conectarDB();

        formulario.addEventListener('submit', validarCliente);
    })

    function validarCliente(e) {
        e.preventDefault();

        // Leer todos los inputs

        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if(nombre === '' || email === '' || telefono === '' || empresa === '') {
            imprimirAlerta('Todos los campos son obligatorios', 'error');

            return;
        }

        // Crear un objeto con la información

        const cliente = {
            nombre,
            email, 
            telefono,
            empresa,
            id : Date.now()
        }
        crearNuevoCliente(cliente);
    }

    function crearNuevoCliente(cliente) {
        // Nuevo registro:
        const transaction = DB.transaction(['crm'], 'readwrite');

        const objectStore = transaction.objectStore('crm');
       
        objectStore.add(cliente);

        transaction.oncomplete = () => {
            // Mostrar mensaje de que todo esta bien...
            imprimirAlerta('Se agregó correctamente');  

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        };

        transaction.onerror = () => {
            imprimirAlerta('Hubo un Error', 'error');
        };

    }
    
    function conectarDB() { 

        // ABRIR CONEXIÓN EN LA BD:
        const abrirConexion = window.indexedDB.open('crm', 1);
        
        // si hay un error, lanzarlo
        abrirConexion.onerror = function () {
            console.log('Hubo error');
        };
         
        // si todo esta bien, asignar a database el resultado
        abrirConexion.onsuccess = function() {
            // guardamos el resultado
            DB = abrirConexion.result;
        };
    }
  
})();