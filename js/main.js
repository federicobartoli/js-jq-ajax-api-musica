$(document).ready(function () {

var source = $('#template-mix').html();
var templateAlbum = Handlebars.compile(source);

$('.selettore').change(function () {
     var valore = $(this).val().toLowerCase();
     console.log(valore); //debug
     if(valore == '') {
          $('.mixcontainer').show();
     }else {
          $('.mixcontainer').each(function () {
               if (valore == $(this).data('genere').toLowerCase()) {
                    $(this).show()
               }else {
                    $(this).hide()
               };

          });

     };

});

$.ajax({
     url : 'https://flynn.boolean.careers/exercises/api/array/music',
     method: 'GET' ,
     success: function (data) {
          var albumMix = data.response; //Fisso in un array tutti gli oggetti in entrata ajax.
          // console.log(albumMix); //Debug
          for (var i = 0; i < albumMix.length; i++) {
               /* In questo modo vado a crearmi [i] array quanti sono gli oggetti
               definiti nell'array in entrata dalla chiamata Ajax. */
               var albumMixSingle = albumMix[i];
               console.log(albumMixSingle); //Debug
               var albumMixSingleTemplate = { // dichiaro dentro un oggetto le informazioni che userò come template per Handlebars
                    immagineCover : albumMixSingle.poster,
                    artista : albumMixSingle.author,
                    titoloAlbum : albumMixSingle.title,
                    annoDiUscita: albumMixSingle.year,
                    genereMusicale: albumMixSingle.genre
               }
               console.log(albumMixSingleTemplate);
               var html = templateAlbum(albumMixSingleTemplate);

               $('.itemcontainer').append(html);
          };
     },
     error: function () {
               alert('error');
          }

})




});
