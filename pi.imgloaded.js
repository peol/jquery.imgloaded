// $('img.photo',this).imagesLoaded(myFunction)
// execute a callback when all images have loaded.
// needed because .load() doesn't work on cached images

// mit license. paul irish & andreé hansson. 2010.

// callback function is passed the last image to load
//   as an argument, and the collection as `this`


// Added support for calling the callback on each image load event


(function ($) {

var undefined;

$.event.special.imgload = {

	setup: function(data, namespaces, hollaback) {
		if (this.tagName.toLowerCase() != "img") return false;

		// Bind the actual load event
		$.event.add(this, 'load', hollaback);

			// Fix for certain browsers not triggering on cached images,  we reset .src to
			// trigger this
			if (this.complete || this.complete === undefined) {
				this.src = this.src;
			}
	},

	teardown: function(namespaces) {
		$.event.remove(this, 'load', hollaback);
	},
}

}(jQuery));
