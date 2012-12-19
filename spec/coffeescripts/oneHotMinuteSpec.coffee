describe 'oneHotMinute', ->
  beforeEach ->
    loadFixtures 'fragment.html'
    @$element = $( '#fixtures' )

  describe 'plugin behavior', ->
    it 'should be available on the jQuery object', ->
      expect( $.fn.oneHotMinute ).toBeDefined()

    it 'should be chainable', ->
      expect( @$element.oneHotMinute() ).toBe @$element

    it 'should offers default values', ->
      plugin = new $.oneHotMinute( @$element )

      expect( plugin.defaults ).toBeDefined()

    it 'should overwrites the settings', ->
      plugin = new $.oneHotMinute( @$element, options )

      expect( plugin.settings.cssClass ).toBe( options.cssClass )

  describe 'plugin state', ->
    beforeEach ->
      @plugin = new $.oneHotMinute( @$element )

    it 'should have a ready state', ->
      expect( @plugin.getState() ).toBe 'ready'

    it 'should be updatable', ->
      @plugin.setState( 'new state' )

      expect( @plugin.getState() ).toBe 'new state'
