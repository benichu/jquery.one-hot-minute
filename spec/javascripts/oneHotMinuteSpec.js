
describe('oneHotMinute', function() {
  var options;
  options = {
    debug: false,
    processableElements: ['span', 'input']
  };
  beforeEach(function() {
    loadFixtures('fragment.html');
    return this.$element = $('#fixtures');
  });
  describe('processMethod: .valueToMinutes(), on <input> elements at init()', function() {
    beforeEach(function() {
      return this.plugin = new $.oneHotMinute(this.$element, {
        processMethod: 'valueToMinutes'
      });
    });
    it('should process an undefined value', function() {
      return expect(this.$element.find("#valueToMinutes input.empty.undefined").attr("data-minute")).toEqual("0");
    });
    it('should process a blank value', function() {
      return expect(this.$element.find("#valueToMinutes input.empty.blank").attr("data-minute")).toEqual("0");
    });
    it('should process a value of 0', function() {
      return expect(this.$element.find("#valueToMinutes input.zero").attr("data-minute")).toEqual("0");
    });
    it('should process a duration string value (ex: 1h30)', function() {
      return expect(this.$element.find("#valueToMinutes input.normal.string").attr("data-minute")).toEqual("90");
    });
    it('should process a duration string with uppercase value (ex: 1H30)', function() {
      return expect(this.$element.find("#valueToMinutes input.normal.string.uppercase").attr("data-minute")).toEqual("90");
    });
    it('should process a duration string value, without hours (ex: h30)', function() {
      return expect(this.$element.find("#valueToMinutes input.normal.no-hours").attr("data-minute")).toEqual("30");
    });
    it('should process a duration string value, with only 1 minute number (ex: 1h1)', function() {
      return expect(this.$element.find("#valueToMinutes input.normal.one-minute").attr("data-minute")).toEqual("61");
    });
    it('should process a duration string value with colon (ex: 1:30)', function() {
      return expect(this.$element.find("#valueToMinutes input.normal.string.colon").attr("data-minute")).toEqual("90");
    });
    it('should process a duration string value with colon, without hours (ex: :30)', function() {
      return expect(this.$element.find("#valueToMinutes input.normal.string.colon.no-hours").attr("data-minute")).toEqual("30");
    });
    it('should process a duration string value with colon, with only 1 minute number (ex: 1:1)', function() {
      return expect(this.$element.find("#valueToMinutes input.normal.string.colon.one-minute").attr("data-minute")).toEqual("61");
    });
    it('should process an integer value', function() {
      return expect(this.$element.find("#valueToMinutes input.normal.integer").attr("data-minute")).toEqual("120");
    });
    it('should process a decimal value', function() {
      return expect(this.$element.find("#valueToMinutes input.normal.decimal").attr("data-minute")).toEqual("54");
    });
    it('should process a decimal value with a comma instead of a point', function() {
      return expect(this.$element.find("#valueToMinutes input.normal.decimal.comma").attr("data-minute")).toEqual("54");
    });
    return it('should process a negative value', function() {
      return expect(this.$element.find("#valueToMinutes input.normal.decimal.negative").attr("data-minute")).toEqual("-54");
    });
  });
  describe('processMethod: .valueToMinutes(), on <input> elements on blur()', function() {
    beforeEach(function() {
      return this.plugin = new $.oneHotMinute(this.$element, {
        processMethod: 'valueToMinutes'
      });
    });
    return it('should catch a blur event of an element, and automatically update the attribute', function() {});
  });
  describe('processMethod: .minutesToHours()', function() {
    beforeEach(function() {
      return this.plugin = new $.oneHotMinute(this.$element, {
        processMethod: 'minutesToHours'
      });
    });
    it('should properly deal with undefined data-minute attributes', function() {
      return expect(this.$element.find("#minutesToHours span.empty.undefined").html()).toEqual("0h00");
    });
    it('should properly deal with blank data-minute attributes', function() {
      return expect(this.$element.find("#minutesToHours span.empty.blank").html()).toEqual("0h00");
    });
    it('should format 0', function() {
      return expect(this.$element.find("#minutesToHours span.zero").html()).toEqual("0h00");
    });
    it('should format decimals', function() {
      return expect(this.$element.find("#minutesToHours span.normal.decimal").html()).toEqual("3h30");
    });
    it('should format integers', function() {
      return expect(this.$element.find("#minutesToHours span.normal.integer").html()).toEqual("2h08");
    });
    it('should format integers and add the value of a field, when there is a blank value', function() {
      return expect(this.$element.find("#minutesToHours input.field.integer.blank").attr("value")).toEqual("2h08");
    });
    it('should format integers and add the value of a field, when there is an undefined value', function() {
      return expect(this.$element.find("#minutesToHours input.field.integer.undefined").attr("value")).toEqual("2h08");
    });
    return it('should format integers and add the value of a field, when there is alaready a value', function() {
      return expect(this.$element.find("#minutesToHours input.field.integer.filled").attr("value")).toEqual("2h08");
    });
  });
  describe('String: ._zeroFill()', function() {
    beforeEach(function() {
      return this.plugin = new $.oneHotMinute(this.$element);
    });
    it('should be defined', function() {
      return expect(this.plugin._zeroFill).toBeDefined();
    });
    it('should prepend `0` to a string', function() {
      return expect(this.plugin._zeroFill('1', 8)).toBe("00000001");
    });
    it('should prepend `0` to an integer', function() {
      return expect(this.plugin._zeroFill(1, 8)).toBe("00000001");
    });
    it('should prepend `0` to an empty string', function() {
      return expect(this.plugin._zeroFill("", 2)).toBe("00");
    });
    it('should prepend `0` to a null value', function() {
      return expect(this.plugin._zeroFill(null, 2)).toBe("00");
    });
    return it('should prepend `0` to an undefined value', function() {
      return expect(this.plugin._zeroFill(void 0, 2)).toBe("00");
    });
  });
  describe('String: ._normalizeDecimalSeparator()', function() {
    beforeEach(function() {
      return this.plugin = new $.oneHotMinute(this.$element);
    });
    it('should be defined', function() {
      return expect(this.plugin._normalizeDecimalSeparator).toBeDefined();
    });
    it('should normalize a comma into a point', function() {
      return expect(this.plugin._normalizeDecimalSeparator("1,20")).toBe("1.20");
    });
    return it('should keep a point separator', function() {
      return expect(this.plugin._normalizeDecimalSeparator("1.20")).toBe("1.20");
    });
  });
  describe('String: ._trimWhitespace()', function() {
    beforeEach(function() {
      return this.plugin = new $.oneHotMinute(this.$element);
    });
    it('should be defined', function() {
      return expect(this.plugin._trimWhitespace).toBeDefined();
    });
    it('should right trim', function() {
      return expect(this.plugin._trimWhitespace("111 ")).toBe("111");
    });
    it('should left trim', function() {
      return expect(this.plugin._trimWhitespace(" 111")).toBe("111");
    });
    it('should left-right trim', function() {
      return expect(this.plugin._trimWhitespace(" 111 ")).toBe("111");
    });
    it('should trim a null value', function() {
      return expect(this.plugin._trimWhitespace(null)).toBe("");
    });
    return it('should trim an undefined value', function() {
      return expect(this.plugin._trimWhitespace(void 0)).toBe("");
    });
  });
  describe('plugin behavior', function() {
    it('should be available on the jQuery object', function() {
      return expect($.fn.oneHotMinute).toBeDefined();
    });
    it('should be chainable', function() {
      return expect(this.$element.oneHotMinute()).toBe(this.$element);
    });
    it('should offers default values', function() {
      var plugin;
      plugin = new $.oneHotMinute(this.$element);
      return expect(plugin.defaults).toBeDefined();
    });
    return it('should overwrites the settings', function() {
      var plugin;
      plugin = new $.oneHotMinute(this.$element, options);
      return expect(plugin.settings.cssClass).toBe(options.cssClass);
    });
  });
  return describe('plugin state', function() {
    beforeEach(function() {
      return this.plugin = new $.oneHotMinute(this.$element);
    });
    it('should have a ready state', function() {
      return expect(this.plugin.getState()).toBe('ready');
    });
    return it('should be updatable', function() {
      this.plugin.setState('new state');
      return expect(this.plugin.getState()).toBe('new state');
    });
  });
});
