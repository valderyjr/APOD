$(document).ready(function () {
    let today = new Date();
    let dia = today.getDate();
    let mes = today.getMonth() + 1; //January is 0!
    let ano = today.getFullYear();
    
    if (dia < 10) {
       dia = '0' + dia;
    }
    
    if (mes < 10) {
       mes = '0' + mes;
    } 
        
    today = ano + '-' + mes + '-' + dia;
    $('#date').attr('max', today);
})

$('#btn').click(function(){
    const data = $('#date').val();
    const valida = validaEntrada(data);
    if (valida) {
        console.log(data);
        const api = $.ajax({
            method: "GET",
            url: `https://api.nasa.gov/planetary/apod?api_key=NqBxvsgm294FLGzK7ObEtTrcOQKp1wSlyu64wYmH&date=${data}`,
            success: function() {
                const type = api.responseJSON.media_type;
                const url = api.responseJSON.url;
                const autor = api.responseJSON.copyright;
                const title = api.responseJSON.title;
                const explanation = api.responseJSON.explanation;
                if (type === 'image') {
                    $('.content-img').removeClass('invisible');
                    $('#img').removeClass('invisible');
                    $('#img').attr('src', url);
                    console.log(url);
                } else {
                    $('.content-img').removeClass('invisible');
                    $('#video').removeClass('invisible');
                    $('#video').attr('src', url);
                    console.log(url);
                }

                $('.entrada').adiaClass('invisible');
                $('.resp').removeClass('invisible');

                $('#titulo-resp').html(title);
                $('#texto-resp').html(explanation);
                console.log(autor);
                console.log(title);
                console.log(explanation);
                console.log(api);
            }
        })
    }
})

$('#btn-voltar').on('click', function (){
    $('.content-img').adiaClass('invisible');
    $('.entrada').removeClass('invisible');
    $('.resp').adiaClass('invisible');
})

function validaEntrada(date) {
    if (date.length <= 0) {
        alert('Insira um valor válido!');
        return false;
    } else {
        return true;
    }
}
