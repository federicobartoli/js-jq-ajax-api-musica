var source = $('#template-cd').html();
var template = Handlebars.compile(source);


$('.form-control').change(function () {
     var scelta = $('.form-control').val().toLowerCase();
     console.log(scelta);
     if(scelta == '') {
          $('.mc-playlist-item').show();
     }else {
          $('.mc-playlist-item').each(function () {
               if (scelta == $(this).data('genere')) {
                    $(this).show()
               }else {
                    $(this).hide()
               };

          });

     };
});



$.ajax({
     url: 'https://flynn.boolean.careers/exercises/api/array/music',
     method: 'GET',
     success: function (data) {
          // console.log(data.response);
          var objectsArrayAlbum = data.response; //Array di oggetti
          // console.log(objectsArrayAlbum);
          for (var i = 0; i < objectsArrayAlbum.length; i++) {
               var objectAlbum = objectsArrayAlbum[i]; //prendo gli oggetti uno per uno
               // console.log(objectAlbum);
               var datiObjectArrayTemplate = {
                    titoloAlbum : objectAlbum.title,
                    annoAlbum: objectAlbum.year,
                    artistaAlbum: objectAlbum.author,
                    immagineAlbum: objectAlbum.poster,
                    genereAlbum: objectAlbum.genre.toLowerCase(),
               }
               console.log(datiObjectArrayTemplate);
               var html = template(datiObjectArrayTemplate);
               $('.mc-playlist-cont').append(html);
          };



     },
     error: function () {
          alert('error');
     }


});
