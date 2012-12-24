describe 'oneHotMinute', ->
  options =
    debug: false
    processableElements: ['span', 'input']

  beforeEach ->
    loadFixtures 'fragment.html'
    @$element = $( '#fixtures' )

  describe 'processMethod: .minutesToHours()', ->
    beforeEach ->
      @plugin = new $.oneHotMinute( @$element, {processMethod: 'minutesToHours'} )

    it 'should properly deal with undefined data-minute attributes', ->
      expect( @$element.find("#minutesToHours span.empty.undefined").html() ).toEqual "0h00"

    it 'should properly deal with blank data-minute attributes', ->
      expect( @$element.find("#minutesToHours span.empty.blank").html() ).toEqual "0h00"

    it 'should format 0', ->
      expect( @$element.find("#minutesToHours span.zero").html() ).toEqual "0h00"

    it 'should format decimals', ->
      expect( @$element.find("#minutesToHours span.normal.decimal").html() ).toEqual "3h30"

    it 'should format integers', ->
      expect( @$element.find("#minutesToHours span.normal.integer").html() ).toEqual "2h08"

    it 'should format integers and add the value of a field, when there is a blank value', ->
      expect( @$element.find("#minutesToHours input.field.integer.blank").attr("value") ).toEqual "2h08"

    it 'should format integers and add the value of a field, when there is an undefined value', ->
      expect( @$element.find("#minutesToHours input.field.integer.undefined").attr("value") ).toEqual "2h08"

    it 'should format integers and add the value of a field, when there is alaready a value', ->
      expect( @$element.find("#minutesToHours input.field.integer.filled").attr("value") ).toEqual "2h08"

  describe 'String: ._zeroFill()', ->
    beforeEach ->
      @plugin = new $.oneHotMinute( @$element )

    it 'should be defined', ->
      expect( @plugin._zeroFill ).toBeDefined()

    it 'should prepend `0` to a string', ->
      expect( @plugin._zeroFill('1',8) ).toBe("00000001")

    it 'should prepend `0` to an integer', ->
      expect( @plugin._zeroFill(1,8) ).toBe("00000001")

    it 'should prepend `0` to an empty string', ->
      expect( @plugin._zeroFill("",2) ).toBe("00")

    it 'should prepend `0` to a null value', ->
      expect( @plugin._zeroFill(null,2) ).toBe("00")

    it 'should prepend `0` to an undefined value', ->
      expect( @plugin._zeroFill(undefined,2) ).toBe("00")

  # Basic plugin behavior, nothing should be touched
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
