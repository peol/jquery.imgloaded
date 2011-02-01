/*
 * Special event for image load events
 * Needed because some browsers does not trigger the event on already-loaded images.

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
	$.each({
		load: function (el) { return el.complete || el.complete === undefined; },
		error: function (el) { return el.readyState === 'uninitialized' && el.src.indexOf('data:') === 0; }
	}, function (eventName, isReady) {
		$.event.special[eventName] = {
			add: function (handleObj) {
				var el = this, flag = eventName + '-guid', old_handler = handleObj.handler;

				if ( el.nodeType === 1 && el.nodeName.toUpperCase() === 'IMG' && el.src !== '' ) {
					// Check if the image is already loaded or if data URI images are supported
					// Trigger the event handler if necessary
					if ( isReady(el) ) {
						handleObj.handler = function () {
							var guid = $.data(el, flag), ret;
							if ( guid === old_handler.guid || guid === undefined ) {
								ret = old_handler.apply(el, arguments);
							}
							return ret;
						};

						// Let jQuery finish binding the event handler
						setTimeout(function () {
							$(el)
								.data(flag, old_handler.guid)
								.trigger(eventName)
								.removeData(flag);
						}, 0);
					}
				}
			}
		};
	});
}(jQuery));
