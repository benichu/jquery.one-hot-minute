
jQuery(function() {
  $.oneHotMinute = function(element, options) {
    var log, minutesToHours, state, valueToMinutes, zeroFill,
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
    minutesToHours = function(el) {
      var hours, minutes, raw_minutes, result, sign;
      log("applying minutesToHours");
      raw_minutes = parseInt(el.attr(_this.settings.dataAttr) || 0);
      sign = raw_minutes < 0 ? "-" : "";
      raw_minutes = Math.abs(raw_minutes);
      hours = Math.floor(raw_minutes / 60);
      minutes = raw_minutes % 60;
      minutes = zeroFill(minutes, 2);
      result = sign + hours + "h" + minutes;
      if (el.attr("value")) {
        return el.attr("value", result);
      } else {
        return el.html(result);
      }
    };
    valueToMinutes = function(el) {
      return log("valueToMinutes");
    };
    zeroFill = function(number, width) {
      width -= number.toString().length;
      if (width > 0) {
        return new Array(width + (/\./.test(number) ? 2 : 1)).join("0") + number;
      }
      return number + "";
    };
    log = function(msg) {
      if (_this.settings.debug) {
        return typeof console !== "undefined" && console !== null ? console.log(msg) : void 0;
      }
    };
    this.init = function() {
      var self, settings;
      this.settings = $.extend({}, this.defaults, options);
      this.setState('waiting');
      if (this.$element.length) {
        log("Element is defined.");
        log("processableElements: " + this.settings.processableElements);
        this.$processableElements = this.$element.find(this.settings.processableElements.toString());
        settings = this.settings;
        self = this;
        log("processMethod: " + this.settings.processMethod);
        switch (this.settings.processMethod) {
          case 'minutesToHours':
            this.$processableElements.each(function() {
              return minutesToHours($(this));
            });
            break;
          case 'valueToMinutes':
            valueToMinutes($(this));
            break;
          default:
            this.setState('error');
        }
        this.setState('ready');
        return this.callSettingFunction('onReady', [this.$element]);
      }
    };
    this.init();
    return this;
  };
  $.oneHotMinute.prototype.defaults = {
    debug: false,
    processMethod: "minutesToHours",
    processableElements: ['span', 'input'],
    dataAttr: "data-minute",
    saveAttr: "data-minute",
    onReady: function() {}
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
