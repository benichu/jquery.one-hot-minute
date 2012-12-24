describe 'oneHotMinute', ->
  options =
    debug: false
    processableElements: ['span', 'input']

  beforeEach ->
    loadFixtures 'fragment.html'
    @$element = $( '#fixtures' )

  describe 'processMethod: .valueToMinutes(), on <input> elements at init()', ->
    beforeEach ->
      @plugin = new $.oneHotMinute( @$element, {processMethod: 'valueToMinutes'} )

    it 'should process an undefined value', ->
      expect( @$element.find("#valueToMinutes input.empty.undefined").attr("data-minute") ).toEqual "0"

    it 'should process a blank value', ->
      expect( @$element.find("#valueToMinutes input.empty.blank").attr("data-minute") ).toEqual "0"

    it 'should process a value of 0', ->
      expect( @$element.find("#valueToMinutes input.zero").attr("data-minute") ).toEqual "0"

    it 'should process a duration string value (ex: 1h30)', ->
      expect( @$element.find("#valueToMinutes input.normal.string").attr("data-minute") ).toEqual "90"

    it 'should process a duration string with uppercase value (ex: 1H30)', ->
      expect( @$element.find("#valueToMinutes input.normal.string.uppercase").attr("data-minute") ).toEqual "90"

    it 'should process a duration string value, without hours (ex: h30)', ->
      expect( @$element.find("#valueToMinutes input.normal.no-hours").attr("data-minute") ).toEqual "30"

    it 'should process a duration string value, with only 1 minute number (ex: 1h1)', ->
      expect( @$element.find("#valueToMinutes input.normal.one-minute").attr("data-minute") ).toEqual "61"

    it 'should process a duration string value with colon (ex: 1:30)', ->
      expect( @$element.find("#valueToMinutes input.normal.string.colon").attr("data-minute") ).toEqual "90"

    it 'should process a duration string value with colon, without hours (ex: :30)', ->
      expect( @$element.find("#valueToMinutes input.normal.string.colon.no-hours").attr("data-minute") ).toEqual "30"

    it 'should process a duration string value with colon, with only 1 minute number (ex: 1:1)', ->
      expect( @$element.find("#valueToMinutes input.normal.string.colon.one-minute").attr("data-minute") ).toEqual "61"

    it 'should process an integer value', ->
      expect( @$element.find("#valueToMinutes input.normal.integer").attr("data-minute") ).toEqual "120"

    it 'should process a decimal value', ->
      expect( @$element.find("#valueToMinutes input.normal.decimal").attr("data-minute") ).toEqual "54"

    it 'should process a decimal value with a comma instead of a point', ->
      expect( @$element.find("#valueToMinutes input.normal.decimal.comma").attr("data-minute") ).toEqual "54"

    it 'should process a negative value', ->
      expect( @$element.find("#valueToMinutes input.normal.decimal.negative").attr("data-minute") ).toEqual "-54"

  describe 'processMethod: .valueToMinutes(), on <input> elements on blur()', ->
    beforeEach ->
      @plugin = new $.oneHotMinute( @$element, {processMethod: 'valueToMinutes'} )

    it 'should catch a blur event of an element, and automatically update the attribute', ->
      # expect( @$element.find("#valueToMinutes input.empty.undefined").attr("data-minute") ).toEqual "0"

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

  describe 'String: ._normalizeDecimalSeparator()', ->
    beforeEach ->
      @plugin = new $.oneHotMinute( @$element )

    it 'should be defined', ->
      expect( @plugin._normalizeDecimalSeparator ).toBeDefined()

    it 'should normalize a comma into a point', ->
      expect( @plugin._normalizeDecimalSeparator("1,20") ).toBe("1.20")

    it 'should keep a point separator', ->
      expect( @plugin._normalizeDecimalSeparator("1.20") ).toBe("1.20")

  describe 'String: ._trimWhitespace()', ->
    beforeEach ->
      @plugin = new $.oneHotMinute( @$element )

    it 'should be defined', ->
      expect( @plugin._trimWhitespace ).toBeDefined()

    it 'should right trim', ->
      expect( @plugin._trimWhitespace("111 ") ).toBe("111")

    it 'should left trim', ->
      expect( @plugin._trimWhitespace(" 111") ).toBe("111")

    it 'should left-right trim', ->
      expect( @plugin._trimWhitespace(" 111 ") ).toBe("111")

    it 'should trim a null value', ->
      expect( @plugin._trimWhitespace(null) ).toBe("")

    it 'should trim an undefined value', ->
      expect( @plugin._trimWhitespace(undefined) ).toBe("")

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
