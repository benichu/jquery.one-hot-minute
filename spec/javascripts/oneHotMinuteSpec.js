
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
