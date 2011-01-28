/*
 * Special event for image load events
 * Needed because some browsers does not trigger the event on cached images.

 * MIT License
 * Paul Irish     | @paul_irish | www.paulirish.com
 * Andree Hansson | @peolanha   | www.andreehansson.se
 * 2010.
 *
 * Usage:
 * $(images).bind('load', function (e) {
 *   // Do stuff on load
 * });
 * 
 * Note that you can bind the 'error' event on data uri images, this will trigger when
 * data uri images isn't supported.
 * 
 * Tested in:
 * FF 3+
 * IE 6-8
 * Chromium 5-6
 * Opera 9-10
 */
(function ($, undefined) {
	$.event.special.load = {
		add: function () {
			var el = this;
			if ( this.nodeType === 1 && this.nodeName.toUpperCase() === 'IMG' && this.src !== '' ) {
				// Image is already complete, fire the handler (fixes browser issues were cached
				// images isn't triggering the load event)
				if ( this.complete || this.complete === undefined ) {
					// Let jQuery finish binding the event handler
					setTimeout(function () {
						var src = el.src;
						// webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
						// data uri bypasses webkit log warning (thx doug jones)
						el.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
						el.src = src;
					}, 0);
				}

				// Check if data URI images is supported, fire 'error' event if not
				else if ( this.readyState === 'uninitialized' && this.src.indexOf('data:') === 0 ) {
					$(this).trigger('error');
				}
			}
		}
	};
}(jQuery));
