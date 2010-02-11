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
 * FF2-3.6
 * IE6-8
 * Chromium4 Developer
 * Opera 9-10
 */ 
(function ($) {

$.event.special.load = {
	setup: function(data, namespaces, hollaback) {
		var retVal = false;
		
		if (this.tagName.toLowerCase() === 'img' && this.src !== "") {
			// Image is already complete, fire the hollaback (fixes browser issues were cached
			// images isn't triggering the load event)
			if (this.complete || this.readyState === 4) {
				$(this).bind('load', data || {}, hollaback).trigger('load');
				retVal = true;
			}
			
			// Check if data URI images is supported, fire 'error' event if not
			else if (this.readyState === 'uninitialized' && this.src.indexOf('data:') >= 0) {
				$(this).trigger('error');
				retVal = true;
			}
		}
		
		return retVal;
	}
}

}(jQuery));
