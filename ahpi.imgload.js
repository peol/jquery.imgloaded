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
/*global jQuery*/
(function ($) {
	$.event.special.load = {
		setup: function () {
			// Attach to DOM
			return false;
		},
		add: function (handleObj) {
			var handler, src;

			if (this.nodeName.toLowerCase() === 'img' && this.src) {

				// Image is already complete, fire the handler (fixes browser issues were cached
				// images isn't triggering the load event)
				if (this.complete || this.readyState === 'complete') {

					handler = handleObj.handler;

					// this wrapper prevents the handler for being invoked twice if loading
					// completed and an event got queued during this javascript exectution.
					// The handler is only called again if img.src changes.
					handleObj.handler = function () {

						// only call handler if src has changed
						if (src !== this.src) {
							src = this.src;
							return handler.apply(this, arguments);
						}
					};

					handleObj.handler.call(this, $.Event(handleObj.type));
				}

				// Check if data URI images is supported, fire 'error' event if not
				else if (this.readyState === 'uninitialized' && this.src.indexOf('data:') === 0) {
					$(this).trigger('error');
				}
			}
		}
	};
}(jQuery));
