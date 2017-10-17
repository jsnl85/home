"use strict";
(function(_m) {
	var WebParts = _m.WebParts = _m.WebParts||{};
	WebParts.LinkedInConnectorWebPart = _m.WebParts.LinkedInConnectorWebPart = (function(_baseWp, $webpartConfig) {
		var _wp = this; _wp.base = _baseWp; for (var i in (_wp.base||{})) { _wp[i] = _wp.base[i]; } // extend 'this' object with same values as in the '_wp.base' variable
		var $wpConfig = $webpartConfig;
		var $ = null, $ui = null, angular = null;
		// 
		// auxiliaries
		var getRenderContainer = function() {
			var $parent = $wpConfig.closest('[webpartid]').parent(), $container = $parent.find('.sp365-wp-container');
			if($container.length == 0) { $container = $('<div>').addClass('sp365-wp-container').addClass('container-fluid'); $parent.append($container); }
			return $container;
		}
		var destroyRenderContainer = function() {
			var $parent = $wpConfig.closest('[webpartid]').parent(), $container = $parent.find('.sp365-wp-container');
			$container.detach();
		};
		var render = function() {
			var $container = getRenderContainer();
			// 
			$container.append(
				$('<div>').addClass('row-fluid').append(
					$('<div>').addClass('col-md-12').append(
						$('<button type="button">').addClass('btn btn-primary').html('Import LinkedIn details').click(function() {
							log('- clicked() :: Import LinkedIn details');
						}),
						$('<button type="button">').addClass('btn btn-primary').html('See SharePoint Profile').click(function() {
							log('- clicked() :: See SharePoint details');
						})
					)
				)
			);
		}
		// 
		// override methods
		var init = _wp.init = function() {
			var promise = newPromise(function(resolve, reject) {
				_m.logVerbose('- initialising LinkedInConnectorWebPart on \''+ $wpConfig +'\'.');
				// 
				_m.allPromise([_m.requireJQuery(), _m.requireJQueryUI(), _m.requireAngular()]).then(function(result) {
					$ = result[0], $ui = result[1], angular = result[2];
					// 
					try { render(); }
					catch(ex) { reject(ex.message); }
					// 
					_m.log('- inited a new instance of LinkedInConnectorWebPart on \''+ $wpConfig +'\'.');
					resolve();
				}, reject);
			});
			return promise;
		}
		var destroy = _wp.destroy = function() { return newPromise(function(resolve, reject) { _wp.super.destroy().then(function() { destroyRenderContainer(); resolve(_wp); }, reject); }); }
	});
})(window.SP365=(window.SP365||{}));
