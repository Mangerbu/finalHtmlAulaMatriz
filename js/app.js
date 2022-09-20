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
