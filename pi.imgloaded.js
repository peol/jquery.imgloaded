// $('img.photo',this).imagesLoaded(myFunction)
// execute a callback when all images have loaded.
// needed because .load() doesn't work on cached images

// mit license. paul irish & andreé hansson. 2010.

// callback function is passed the last image to load
//   as an argument, and the collection as `this`


// Added support for calling the callback on each image load event
// 

// 'fireOne' argument is optional, if set, will invoke the callback once for every
// image in the 'this' collection, thus making 'this' in the callback that element alone
// If it's not used, the callback will be invoked once all the images in the collection has
// been loaded. And 'this' will be the jQuery collection of the filtered 'img' elements.
$.fn.imagesLoaded = function(callback, fireOne) {
  var
    args = arguments,
    elems = this.filter('img'),
    elemsLen = elems.length - 1;

  elems
    .bind('load', function(e) {
        if (fireOne) {
            !elemsLen-- && callback.call(elems, e);
        } else {
            callback.call(this, e);
        }
    }).each(function() {
        // cached images don't fire load sometimes, so we reset src.
        if (this.complete || this.complete === undefined){
            this.src = this.src;
        }
    });
}
