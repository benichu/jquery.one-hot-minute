#
#  Title:     jquery.one-hot-minute (oneHotMinute)
#  Homepage:  https://github.com/benichu/jquery.one-hot-minute
#  Copyright: (c)2012: Benjamin Thouret <ben@2ret.com>
#  License:   MIT, https://github.com/benichu/jquery.one-hot-minute/LICENSE-MIT
#

jQuery ->
  $.oneHotMinute = ( element, options ) ->
    # current state
    state = 'waiting'

    # plugin settings
    @settings = {}

    # jQuery version of DOM element attached to the plugin
    @$element = $ element

    # set current state
    @setState = ( _state ) -> state = _state

    #get current state
    @getState = -> state

    # get particular plugin setting
    @getSetting = ( key ) ->
      @settings[ key ]

    # call one of the plugin setting functions
    @callSettingFunction = ( name, args = [] ) ->
      @settings[name].apply( this, args )

    # Format an element's display value to a duration format: HH:MM
    # That HTML element should have a `data-minute` attribute with the raw
    # value to be converted
    #
    # Example (pseudo-code):
    #
    #   <span id="my_element" data-minute="130">130</span>
    #   minutesToHours("#my_element")
    #   #=> <span id="my_element" data-minute="130">2h10</span>
    #
    minutesToHours = (el) =>
      log "applying minutesToHours"
      # do we force at `0` if dataAttr is empty
      raw_minutes = parseInt el.attr(@settings.dataAttr) or 0
      sign = if raw_minutes < 0 then "-" else ""
      raw_minutes = Math.abs(raw_minutes)
      hours = Math.floor(raw_minutes / 60)
      minutes = raw_minutes % 60
      minutes = @zeroFill(minutes, 2)

      result = sign + hours + "h" + minutes

      # If we have a value attribute, like with an <input>
      if el.attr("value")?
        el.attr("value", result)
      else
        el.html result

    # Format an element's content value into minutes, and saves it
    # into a pre-defined element's data attribute (ex: data-minute)
    #
    # Triggered at init() or by a `blur()` event (element will probably be an input)
    #
    # Examples (pseudo-code):
    #
    #   1/ value is a float or integer
    #   <input id="my_element" value="1.5" />
    #   valueToMinutes("#my_element")
    #   #=> <input id="my_element" data-minute="90" value="1.5" />
    #
    #   2/ value is a duration string
    #   <input id="my_element" value="1h30" />
    #   #=> <input id="my_element" data-minute="90" value="1h30" />
    #
    valueToMinutes = (el) =>
      log "valueToMinutes"

    # Homemade zero-padding function
    # zeroFill(1, 3)
    # #=> "001"
    @zeroFill = (number, width) ->
      if not number? # protect against `null` or `undefined`
        number = ""
      width -= number.toString().length
      return new Array(width + ((if /\./.test(number) then 2 else 1))).join("0") + number  if width > 0
      number + "" # always return a string

    # Simple logger.
    log = (msg) =>
      console?.log msg if @settings.debug

    @init = ->
      @settings = $.extend( {}, @defaults, options )

      @setState 'waiting'

      # Check the existence of the element
      if @$element.length
        log "Element is defined."

        # look for processableElements
        log "processableElements: #{@settings.processableElements}"
        @$processableElements =  @$element.find(@settings.processableElements.toString())

        settings = @settings
        self = @

        log "processMethod: #{@settings.processMethod}"
        switch @settings.processMethod
          when 'minutesToHours'
            @$processableElements.each ->
              minutesToHours($(this))
            @setState 'ready'
          when 'valueToMinutes'
            @$processableElements.each ->
              valueToMinutes($(this))
            @setState 'ready'
          else
            @setState 'error'

        if @getState() is "ready"
          @callSettingFunction 'onReady', [@$element]
        else
          @callSettingFunction 'onError', [@$element]


    # initialise the plugin
    @init()

    # make the plugin chainable
    this

  # default plugin settings
  $.oneHotMinute::defaults =
      debug: false
      processMethod: "minutesToHours"           # ["minutesToHours", "valueToMinutes"]
      processableElements: ['span', 'input']    # What elements are we trying to process?
      dataAttr: "data-minute"                   # attribute with the raw value to be converted (used with processMethod: `minutesToHours`)
      saveAttr: "data-minute"                   # attribute where the converted value is saved (used with processMethod: `valueToMinutes`)

      onReady: ->                               # Function(), called when oneHotMinute has processed all the elements
      onError: ->                               # Function(), called when oneHotMinute has experienced an error

  $.fn.oneHotMinute = ( options ) ->
    this.each ->
      if $( this ).data( 'oneHotMinute' ) is undefined
        plugin = new $.oneHotMinute( this, options )
        $( this ).data( 'oneHotMinute', plugin )

