document.addEventListener( "DOMContentLoaded", function () {
        var getImageList = function (self) {
            // get image list
            $.ajax({
                    url: "http://localhost:3000/images"
            }).then(function(json){
                    var images = json["images"];
                    console.log(images);
                    self.images = images;
            }).done(function () {
                    self.image = self.images[self.index];
                    self.message = self.image;
            });
        }

        var vm = new Vue({
                el: '#slideshow',
                data: {
                    message: '',
                    images: [],
                    image: "",
                    index: 0,
                    max_width:  window.innerWidth,
                    max_height: window.innerHeight
                },
                created: function(){
                    getImageList(this);
                },
                methods: {
                    resize: function () {
                        var img = $("#slideshow img");
                        img.css('width', 'auto');
                        img.css('height', 'auto');

                        var rate = 1.0;
                        var width  = img.width();
                        var height = img.height();

                        // adjust height to fit height
                        rate = this.max_height / height;
                        width  *= rate;
                        height *= rate;

                        // if width over inner window, resize again
                        if( width > this.max_width ){
                            rate = this.max_width / width;
                            width  *= rate;
                            height *= rate;
                        }

                        // set size
                        img.width(width);
                        img.height(height);
                    }
                }
        });

        // update images
        setInterval(function () {
                if( vm.index === (vm.images.length - 1) ){
                    vm.index = 0;
                } else {
                    vm.index++;
                }

                vm.image = vm.images[vm.index];
                vm.message = vm.image;
            },
            4000
        );

        // update image list every 5 minitus
        setInterval(function () { getImageList(vm); }, 1000 * 60 * 5);
});
