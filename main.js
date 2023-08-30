const btnCart = document.querySelector('.container-cart-icon');
const ContainerproductosCarro = document.querySelector(
	'.container-carro-productos'
);

btnCart.addEventListener('click', () => {
	ContainerproductosCarro.classList.toggle('hidden-cart');
});

/* ========================= */
const infoCarro = document.querySelector('.carro-producto');
const rowproducto = document.querySelector('.row-producto');

// Lista de todos los contenedores de productos
const listaproductos = document.querySelector('.container-items');

// Variable de arreglos de productos
let todosproductos = [];

const valorTotal = document.querySelector('.total-pagar');

const conteoproductos = document.querySelector('#contador-productos');

const carroVacio = document.querySelector('.carro-vacio');
const totalCarro = document.querySelector('.carro-total');

// Cargar datos desde un archivo JSON local
fetch('productos.json')
  .then(response => response.json())
  .then(data => {
    // Aquí puedes procesar los datos recibidos y trabajar con ellos
    // Por ejemplo, podrías asignar los datos a la variable todosproductos
    todosproductos = data;

    // Mostrar los productos en el HTML
    showHTML();
  })
  .catch(error => {
    console.error('Error al cargar los datos:', error);
  });

listaproductos.addEventListener('click', e => {
	if (e.target.classList.contains('btn-add-cart')) {
		const producto = e.target.parentElement;

		const infoproductos = {
			quantity: 1,
			title: producto.querySelector('h2').textContent,
			price: producto.querySelector('p').textContent,
		};

		const exits = todosproductos.some(
			producto => producto.title === infoproductos.title
		);

		if (exits) {
			const productos = todosproductos.map(producto => {
				if (producto.title === infoproductos.title) {
					producto.quantity++;
					return producto;
				} else {
					return producto;
				}
			});
			todosproductos = [...productos];
		} else {
			todosproductos = [...todosproductos, infoproductos];
		}

		showHTML();
	}
});

// Dentro del evento rowproducto
rowproducto.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')) {
      const producto = e.target.parentElement;
      const title = producto.querySelector('p').textContent;
  
      Swal.fire({
        title: '¿Eliminar producto?',
        text: `¿Estás seguro de que deseas eliminar "${title}" del carrito?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.isConfirmed) {
          // Eliminar el producto del carrito aquí
          todosproductos = todosproductos.filter(producto => producto.title !== title);
          showHTML();
  
          Swal.fire({
            title: 'producto eliminado',
            text: `"${title}" ha sido eliminado del carrito.`,
            icon: 'success'
          });
        }
      });
    }
  });
  

// Funcion para mostrar  HTML
const showHTML = () => {
    if (!todosproductos.length) {
      carroVacio.classList.remove('hidden');
      rowproducto.classList.add('hidden');
      totalCarro.classList.add('hidden');
    } else {
      carroVacio.classList.add('hidden');
      rowproducto.classList.remove('hidden');
      totalCarro.classList.remove('hidden');
    }
  
    // Limpiar HTML
    rowproducto.innerHTML = '';
  
    let total = 0;
    let totalOfproductos = 0; // Inicializar contador aquí
  
    todosproductos.forEach(producto => {
      const containerproducto = document.createElement('div');
      containerproducto.classList.add('carro-producto');
  
      containerproducto.innerHTML = `
        <div class="info-carro-producto">
          <span class="cantidad-producto-carrito">${producto.quantity}</span>
          <p class="titulo-producto-carrito">${producto.title}</p>
          <span class="precio-producto-carrito">${producto.price}</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="icon-close"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      `;
  
      rowproducto.append(containerproducto);
  
      total +=
        parseInt(producto.quantity) * parseFloat(producto.price.slice(1));
      totalOfproductos += parseInt(producto.quantity); // Actualizar contador aquí
    });
  
    valorTotal.innerText = `$${total.toLocaleString(undefined, {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    })}`;
    conteoproductos.innerText = totalOfproductos; // Actualizar el contador en el HTML
  };
  