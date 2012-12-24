
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
    this.minutesToHours = function(el) {
      var hours, minutes, rawMinutes, result, sign;
      log("applying minutesToHours");
      rawMinutes = parseInt(el.attr(_this.settings.dataAttr) || 0);
      sign = rawMinutes < 0 ? "-" : "";
      rawMinutes = Math.abs(rawMinutes);
      hours = Math.floor(rawMinutes / 60);
      minutes = rawMinutes % 60;
      minutes = _this._zeroFill(minutes, 2);
      result = sign + hours + "h" + minutes;
      if (el.attr("value") != null) {
        return el.attr("value", result);
      } else {
        return el.html(result);
      }
    };
    this.valueToMinutes = function(el) {
      var delimiter_index, getHours, getMinutes, minutes, rawValue, sign;
      log("valueToMinutes");
      minutes = 0;
      sign = "";
      if ((el.attr("value") != null) && el.val()) {
        rawValue = _this._trimWhitespace(el.attr("value"));
        rawValue = rawValue.toLowerCase();
        sign = rawValue.substr(0, 1) === "-" ? "-" : "";
        delimiter_index = Math.max(rawValue.indexOf(":"), rawValue.indexOf("h"));
        if (delimiter_index > -1) {
          getHours = delimiter_index > 0 ? rawValue.substr(0, delimiter_index) : 0;
          getMinutes = delimiter_index < rawValue.length ? rawValue.substr(delimiter_index + 1, 2) : 0;
          minutes = (parseInt(getHours) * 60) + parseInt(getMinutes);
        } else {
          minutes = parseFloat(_this._normalizeDecimalSeparator(rawValue)) * 60;
          sign = "";
        }
      }
      return el.attr(_this.settings.saveAttr, sign + minutes);
    };
    this._normalizeDecimalSeparator = function(value) {
      if (!(value != null)) {
        value = "";
      }
      return value.replace(/,/, ".");
    };
    this._trimWhitespace = function(value) {
      if (!(value != null)) {
        value = "";
      }
      return value.replace(/^\s+|\s+$/g, "");
    };
    this._zeroFill = function(number, width) {
      if (!(number != null)) {
        number = "";
      }
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
        this.$processableElements = this.$element.find(this.settings.processableElements.toString()) || this.$element;
        settings = this.settings;
        self = this;
        log("processMethod: " + this.settings.processMethod);
        switch (this.settings.processMethod) {
          case 'minutesToHours':
            this.$processableElements.each(function() {
              return self.minutesToHours($(this));
            });
            this.setState('ready');
            break;
          case 'valueToMinutes':
            this.$processableElements.each(function() {
              self.valueToMinutes($(this));
              return $(this).bind("blur", function() {
                self.valueToMinutes($(this));
                return self.callSettingFunction('onBlur', [$(this)]);
              });
            });
            this.setState('ready');
            break;
          default:
            this.setState('error');
        }
        if (this.getState() === "ready") {
          return this.callSettingFunction('onReady', [this.$element]);
        } else {
          return this.callSettingFunction('onError', [this.$element]);
        }
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
    onReady: function() {},
    onError: function() {},
    onBlur: function() {}
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
