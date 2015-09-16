"use strict";

document.addEventListener( "DOMContentLoaded", function () {
        var getImageList = function (self) {
            // get image list
            return $.ajax({
                    url: "http://localhost:3000/images"
            }).then(function(json){
                    var images = json["images"];
                    console.log(images);
                    self.image_list = images;
            });
        };

        var createImageWithOnload = function (max_width, max_height) {
            var img = new Image();
            img.onload = function () {
                var rate = 1.0;
                var width  = img.width;
                var height = img.height;

                img.style.width = 'auto';
                img.style.height = 'auto';

                // adjust height to fit height
                rate = max_height / img.height;
                width  *= rate;
                height *= rate;

                // if width is over inner window, resize again
                if( width > max_width ){
                    rate = max_width / img.width;
                    width  *= rate;
                    height *= rate;
                }

                // set size
                img.width  = width;
                img.height = height;

                // clear style
                img.style.width = '';
                img.style.height = '';
            }
            return img;
        };

        var vm = new Vue({
                el: '#slideshow',
                data: {
                    message: '',
                    image_list: [],
                    ab_buffer: [undefined, undefined],
                    ab_index: 0,
                    image_index: 0,
                    max_width:  window.innerWidth,
                    max_height: window.innerHeight
                },
                created: function(){
                    var self = this;  // bind
                    getImageList(this).done(function () {
                            var img = createImageWithOnload(self.max_width,
                                                            self.max_height);
                            img.src = self.image_list[self.image_index];
                            self.ab_buffer[0] = img;
                    });
                }
        });

        // update images
        setInterval(function () {
                var next_ab_index = (vm.ab_index == 0) ? 1 : 0;
                var img = createImageWithOnload(vm.max_width, vm.max_height);

                // set image path and pre-load
                vm.image_index += 1;
                vm.image_index = vm.image_index % vm.image_list.length;
                img.src = vm.image_list[vm.image_index];

                vm.ab_buffer[next_ab_index] = img;

                // remove and append images
                $("#slideshow img").remove();
                $("#slideshow").append(vm.ab_buffer[vm.ab_index]);

                // update message
                vm.message = vm.ab_buffer[vm.ab_index].src.split("/").pop();

                // toggle ab_index
                vm.ab_index = (vm.ab_index == 0) ? 1 : 0;
            },
            4000
        );

        // update image list every 5 minitus
        setInterval(function () { getImageList(vm); }, 1000 * 60 * 5);
});
