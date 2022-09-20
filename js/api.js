var resultado = null;
$(document).ready(function() {
    $.ajax({
        url: 'https://thronesapi.com/api/v2/Characters',
        success: function(res) {
            resultado = res;
            console.log('data :>> ', res);
            let cards = '';
            res.forEach(usr => {
                const card = `
                    <div class="card">
                        <div class="img-card">
                            <img src="${usr.imageUrl}" alt="${usr.firstName}" class="img">
                        </div>
                        <div class="info-card">
                        <button class="abrirModa" value="${usr.id}">${usr.firstName}</button>
                            <p>${usr.firstName}</p>
                            <p>${usr.lastName}</p>
                        </div>
                    </div>`;
                cards += card;
            });
            $('.reparto').html(cards);
        },
        error: function(err) {
            console.log('err :>> ', err);
        }
    })
    .done(function() {
        console.log('Finaliza ejecucion del ajax');
    });
    $.ajax({
        url: 'https://api.got.show/api/show/episodes',
        success: function(res) {
            resultado = res;
            /* console.log('data :>> ', res); */
            let cards = '<h4 align="center">EPISODIOS</h4>';
            res.forEach(usr => {
                const card = `
                    <div class="card2">
                        <div class="relat">
                            <img src="img/capitulos.jpg" alt="" class="img">
                        </div>
                        <div class="absol">
                            <h4>Titulo: ${usr.title}</h4>
                            <h5>Temporada: ${usr.season}</h5>
                            <h5>Episodio: ${usr.episode}</h5>
                        </div>
                    </div>`;
                cards += card;
            });
            $('.info').html(cards);
        },
        error: function(err) {
            console.log('err :>> ', err);
        }
    })
    .done(function() {
        console.log('Finaliza ejecucion del ajax');
    });

    $('.form').validate({
        rules: {
            name: "campos",
            nombres: {
                required: true,
                minlength: 6,
                maxlength: 50
            }
        },
        messages: {
            nombres: {
                required: "El campo nombre es requerido.",
                minlength: "El tamaño minimo son 6 caracteres",
                maxlength: "El tamaño max son 50 caracteres."
            }
        }
    });

    
});