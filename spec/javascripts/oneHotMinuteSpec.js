
describe('oneHotMinute', function() {
  var options;
  options = {
    debug: false
  };
  beforeEach(function() {
    loadFixtures('fragment.html');
    return this.$element = $('#fixtures');
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
