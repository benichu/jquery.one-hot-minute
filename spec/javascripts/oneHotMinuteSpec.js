
describe('oneHotMinute', function() {
  var options;
  options = {
    debug: false
  };
  beforeEach(function() {
    loadFixtures('fragment.html');
    return this.$element = $('#fixtures');
  });
  describe('String: .zeroFill()', function() {
    beforeEach(function() {
      return this.plugin = new $.oneHotMinute(this.$element);
    });
    it('should be defined', function() {
      return expect(this.plugin.zeroFill).toBeDefined();
    });
    it('should prepend `0` to a string', function() {
      return expect(this.plugin.zeroFill('1', 8)).toBe("00000001");
    });
    it('should prepend `0` to an integer', function() {
      return expect(this.plugin.zeroFill(1, 8)).toBe("00000001");
    });
    it('should prepend `0` to an empty string', function() {
      return expect(this.plugin.zeroFill("", 2)).toBe("00");
    });
    it('should prepend `0` to a null value', function() {
      return expect(this.plugin.zeroFill(null, 2)).toBe("00");
    });
    return it('should prepend `0` to an undefined value', function() {
      return expect(this.plugin.zeroFill(void 0, 2)).toBe("00");
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
