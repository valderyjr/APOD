
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
    document.getElementById('date').value = ''

})

let botao = document.getElementById('btn')
botao.addEventListener('click', function() {

})

$('#btn').click(function(){

})


$('#btn').click(function () {
    const dataValor = $('#date').val();
    const dataReal = new Date (dataValor.split('-'))
    const timeData = dataReal.getTime()
    const valida = validaEntrada(dataValor, timeData);
    if (valida) {
        const api = $.ajax({
            method: "GET",
            url: `https://api.nasa.gov/planetary/apod?api_key=NqBxvsgm294FLGzK7ObEtTrcOQKp1wSlyu64wYmH&date=${dataValor}`,
            success: function () {
                const type = api.responseJSON.media_type;
                const url = api.responseJSON.url;
                const autor = api.responseJSON.copyright;
                const title = api.responseJSON.title;
                const explanation = api.responseJSON.explanation;
                if (type === 'image') {
                    $('#video').addClass('invisible');
                    $('.content-img').removeClass('invisible');
                    $('#img').removeClass('invisible');
                    $('#img').attr('src', url);                    
                } else {
                    $('#img').addClass('invisible');
                    $('.content-img').removeClass('invisible');
                    $('#video').removeClass('invisible');
                    $('#video').attr('src', url);
                }

                $('.entrada').addClass('invisible');
                $('.resp').removeClass('invisible');

                $('#titulo-resp').html(title);
                $('#texto-resp').html(explanation);
            }
        })
    }
})

$('#btn-voltar').on('click', function () {
    $('.content-img').addClass('invisible');
    $('.entrada').removeClass('invisible');
    $('.resp').addClass('invisible');
    $('#date').val('');
})

function validaEntrada(date, time) {
    const diaMinimo = new Date(1996, 5, 20).getTime()
    const diaAtual = new Date().getTime()

    if (date.length <= 0 || time < diaMinimo || time > diaAtual) {
        alert('Insira um valor válido!');
        return false;
    } else {
        return true;
    }
}

$('#chk').on('click', function () {
    chck = document.getElementById('chk')
    if (chck.checked === true) {
        $('.container-principal').addClass('darkmode');
        $('nav').addClass('darkmode');
        $('#img-logo').attr('src', 'imagens/1logo.png');
        $('nav').css('box-shadow', '0px 0px 10px rgb(255, 255, 255, 0.2)');
        $('.content-user').css('box-shadow', '0px 0px 10px rgb(255, 255, 255, 0.2)');
        $('#date').css('background-color', 'whitesmoke')
        $('#date').css('color', 'rgb(17, 33, 63)')
    } else {
        $('.container-principal').removeClass('darkmode');
        $('nav').removeClass('darkmode');
        $('#img-logo').attr('src', 'imagens/logo.png');
        $('nav').css('box-shadow', '0px 0px 10px rgb(17, 33, 63, 0.2)');
        $('.content-user').css('box-shadow', '0px 0px 10px rgb(17, 33, 63, 0.2)');
        $('#date').css('background-color', 'rgb(17, 33, 63)')
        $('#date').css('color', 'whitesmoke')
    }

})
