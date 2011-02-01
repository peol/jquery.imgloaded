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
		add: function (handleObj) {
			var el = this, flag = 'load-guid', old_handler;

			if ( el.nodeType === 1 && el.nodeName.toUpperCase() === 'IMG' && el.src !== '' ) {
				// Image is already complete, fire the handler (fixes browser issues were cached
				// images isn't triggering the load event)
				if ( el.complete || el.complete === undefined ) {
					old_handler = handleObj.handler;

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
							.trigger('load')
							.removeData(flag);
					}, 0);
				}

				// Check if data URI images is supported, fire 'error' event if not
				else if ( el.readyState === 'uninitialized' && el.src.indexOf('data:') === 0 ) {
					$(el).trigger('error');
				}
			}

		}
	};
}(jQuery));
