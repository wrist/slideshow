document.addEventListener( "DOMContentLoaded", function () {
        var getImageList = function (self) {
            // get image list
            $.ajax({
                    url: "http://localhost:3000/images"
            }).then(function(json){
                    var images = json["images"];
                    console.log(images);
                    self.$data.images = images;
            }).done(function () {
                    self.$data.image = self.$data.images[self.$data.index];
                    self.$data.message = self.$data.image;
            });
        }

        var slideshow = new Vue({
                el: '#slideshow',
                data: {
                    message: '',
                    images: [],
                    image: "",
                    index: 0
                },
                created: function(){
                    // this.image = "public/img/test0.jpg";
                    getImageList(this);
                }
        });

        // update images
        setInterval(function () {
                if( slideshow.$data.index === (slideshow.$data.images.length - 1) ){
                    slideshow.$data.index = 0;
                } else {
                    slideshow.$data.index++;
                }

                // slideshow.$data.image = "public/img/test" + slideshow.$data.index + ".jpg";
                slideshow.$data.image = slideshow.$data.images[slideshow.$data.index];
                slideshow.$data.message = slideshow.$data.image;

                // get image list
                // getImageList(slideshow);
                /*
                $.ajax({
                        url: "http://localhost:3000/images"
                }).then(function(json){
                        var images = json["images"];
                        console.log(images);
                        slideshow.$data.images = images;
                });
                */
            },
            4000
        );
});
