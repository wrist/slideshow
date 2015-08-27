document.addEventListener( "DOMContentLoaded", function () {
        var slideshow = new Vue({
                el: '#slideshow',
                data: {
                    message: 'Hello Vue.js!',
                    images: [],
                    image: "",
                    index: 0
                },
                created: function(){
                    this.image = "img/test0.jpg";
                }
        });

        // update images
        setInterval(function () {
                if( slideshow.$data.index == 2 ){
                    slideshow.$data.index = 0;
                } else {
                    slideshow.$data.index++;
                }

                slideshow.$data.image = "img/test" + slideshow.$data.index + ".jpg";
            },
            4000
        );
});
