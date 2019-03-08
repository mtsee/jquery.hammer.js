
// hammer.jquery.js
/**
* use Hammer.JS - v2.0.7 - 2016-04-22
* $(element).hammer(options).on("pan", myPanHandler);
* if you will use swipe, can set options={ swipe: true }
* The Hammer instance is stored at $element.data("hammer").
*/
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery", "hammerjs"], factory);
  } else if (typeof exports === "object") {
    factory(require("jquery"), require("hammerjs"));
  } else {
    factory(jQuery, Hammer);
  }
})(function($, Hammer) {
  function hammerify(el, options) {
    var $el = $(el);
    // Create a manager to manager the element
    var manager = null;
    if (!options) {
      options = {};
      manager = new Hammer($el[0]);
    } else {
      manager = new Hammer.Manager($el[0])
      manager.set(options);
      options.swipe && manager.add(new Hammer.Swipe());
    }
    if (!$el.data("hammer")) {
      $el.data("hammer", manager);
    }
  }

  $.fn.hammer = function(options) {
    return this.each(function() {
      hammerify(this, options);
    });
  };

  // extend the emit method to also trigger jQuery events
  Hammer.Manager.prototype.emit = (function(originalEmit) {
    return function(type, data) {
      originalEmit.call(this, type, data);
      $(this.element).trigger({
        type: type,
        gesture: data
      });
    };
  })(Hammer.Manager.prototype.emit);
});
