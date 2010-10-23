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
 * Note that you can bind the 'error' event on data uri images, this will trigger
 * when data uri images isn't supported.
 * 
 * Tested in:
 * FF 3+
 * IE 6-8
 * Chromium 5-6
 * Opera 9-10
 */
(function ($) {

	$.event.special.load = {
		setup: function () {
			// Attach to DOM
			return false;
		},
		add: function (handleObj) {
			var img, src, handler;

			if (this.nodeName.toLowerCase() === 'img' && this.src) {
				img = this;
				src = img.src;

				// Image is already complete, fire the handler (fixes browser issues were
				// cached images isn't triggering the load event)
				if (img.complete || img.readyState === 'complete') {

					handler = handleObj.handler;

					// this wrapper prevents the handler for being invoked twice if loading
					// completed and an event got queued during this javascript execution.
					// The handler is only called again if img.src changes.
					handleObj.handler = function (event) {

						//trigger() event objects do not have browser properties
						//(offsetX is chosen arbitrarily)
						var browserEvent = 'offsetX' in event;

						// only call handler if src has changed, or if trigger'ed
						if (!browserEvent || src !== img.src) {
							src = img.src;
							return handler.apply(img, arguments);
						}
					};

					// delayed trigger; binding gets a chance to finish and the required
					// jquery event object is passed to handler.
					setTimeout(function () { $(img).trigger('load'); }, 0);
				}

				// Check if data URI images is supported, fire 'error' event if not
				else if (img.readyState === 'uninitialized' && img.src.indexOf('data:') === 0) {
					$(img).trigger('error');
				}
			}
		}
	};
}(jQuery));
