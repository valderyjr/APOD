$('#btn').click(function(){
    const data = $('#date').val();
    const valida = validaEntrada(data);
    if (valida) {
        console.log(data);
        const api = $.ajax({
            method: "GET",
            url: `https://api.nasa.gov/planetary/apod?api_key=NqBxvsgm294FLGzK7ObEtTrcOQKp1wSlyu64wYmH&date=${data}`,
            success: function() {
                const img = api.responseJSON.url;
                const autor = api.responseJSON.copyright;
                const title = api.responseJSON.title;
                const explanation = api.responseJSON.explanation;
                $('.content-img').removeClass('invisible');
                $('#img').attr('src', img);
                console.log(img);
                $('.entrada').addClass('invisible');
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
    $('.content-img').addClass('invisible');
    $('.entrada').removeClass('invisible');
    $('.resp').addClass('invisible');
})

function validaEntrada(date) {
    if (date.length <= 0) {
        alert('Insira um valor válido!');
        return false;
    } else {
        return true;
    }
}
