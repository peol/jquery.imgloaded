// $('img.photo',this).imagesLoaded(myFunction)
// execute a callback when all images have loaded.
// needed because .load() doesn't work on cached images

// mit license. paul irish & andreé hansson. 2010.

// callback function is passed the last image to load
//   as an argument, and the collection as `this`


// Added support for calling the callback on each image load event
// 

$.fn.imagesLoaded = function() {
  var
    args = arguments,
    elems = this.filter('img'),
    elemsLen = elems.length - 1,
    fireOne = args.length === 2,
    callback = args[1] || args[0];

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
