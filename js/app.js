const socket = new WebSocket('wss://ws.bitmex.com/realtime');

socket.onopen = event => {
    const apiCall = {
        'op': 'subscribe',
        'args': [`orderBookL2_25:XBTUSD`]
    };
    /* console.log('Inicia socket', event); */
    socket.send(JSON.stringify(apiCall));
};

socket.onmessage = event => {
    const json = JSON.parse(event.data);
    /* console.log('json.data :>> ', json); */
    if (json.action === 'partial' || json.action === 'insert') {
        /* console.log('json.data :>> ', json.data); */
        let precioMayor = 0;
        let moneda = '';
        let tieneBuy = false;
        json.data.forEach(row => {
            if (row.side === 'Buy') {
                precioMayor = row.price > precioMayor ? row.price : precioMayor;
                tieneBuy = true;
            }
            moneda = row.symbol;
        });

        /* console.log('mensaje recibido filtrado', precioMayor); */
        if (tieneBuy) {
            $('.valores-moneda').text(`USD$ ${precioMayor}`);
            $('.label-moneda').text(`Cryptomoneda: ${moneda}`);
            var total = `${precioMayor}`;
            var h=$('#total').html();
            var f= (h*0.00023);
            /* console.log(f); */
            $('#totalxbt').text((f/total).toFixed(4));
        }
    }
};

socket.onerror = event => {
    console.log('error recibido', event);
};

//sin terminar
$(document).ready(function() {
    $('#moneda').on('change',function(){        
        $("#totalxbt").val($("#moneda").val());
        var value = $(this).val();
        
    });

    $('.abrirModa').click(function() {
        // Ventana modal
        var modal = $("#ventanaModal").val();
        /* modal.style.display = "block"; */
        console.log(modal);
    });
});

// Ventana modal
var modal = document.getElementById("ventanaModal");

// Botón que abre el modal
var boton = document.getElementById("abrirModal");

// Hace referencia al elemento <span> que tiene la X que cierra la ventana
var span = document.getElementsByClassName("cerrar")[0];

// Cuando el usuario hace click en el botón, se abre la ventana
boton.addEventListener("click",function() {
  modal.style.display = "block";
});

// Si el usuario hace click en la x, la ventana se cierra
span.addEventListener("click",function() {
  modal.style.display = "none";
});

// Si el usuario hace click fuera de la ventana, se cierra.
window.addEventListener("click",function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});