
jQuery(function() {
  $.oneHotMinute = function(element, options) {
    var log, state,
      _this = this;
    state = 'waiting';
    this.settings = {};
    this.$element = $(element);
    this.setState = function(_state) {
      return state = _state;
    };
    this.getState = function() {
      return state;
    };
    this.getSetting = function(key) {
      return this.settings[key];
    };
    this.callSettingFunction = function(name, args) {
      if (args == null) {
        args = [];
      }
      return this.settings[name].apply(this, args);
    };
    log = function(msg) {
      if (_this.settings.debug) {
        return typeof console !== "undefined" && console !== null ? console.log(msg) : void 0;
      }
    };
    this.init = function() {
      this.settings = $.extend({}, this.defaults, options);
      return this.setState('ready');
    };
    this.init();
    return this;
  };
  $.oneHotMinute.prototype.defaults = {
    debug: false
  };
  return $.fn.oneHotMinute = function(options) {
    return this.each(function() {
      var plugin;
      if ($(this).data('oneHotMinute') === void 0) {
        plugin = new $.oneHotMinute(this, options);
        return $(this).data('oneHotMinute', plugin);
      }
    });
  };
});
