// Fork of Paul Irish's image loaded method http://gist.github.com/268257
// Added support for calling the callback on each image load event
// It's all Paul's work, I just added tests and added that small feat.

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
