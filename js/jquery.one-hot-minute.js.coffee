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

    # Simple logger.
    log = (msg) =>
      console?.log msg if @settings.debug

    @init = ->
      @settings = $.extend( {}, @defaults, options )

      @setState 'ready'


    # initialise the plugin
    @init()

    # make the plugin chainable
    this

  # default plugin settings
  $.oneHotMinute::defaults =
      debug: false

  $.fn.oneHotMinute = ( options ) ->
    this.each ->
      if $( this ).data( 'oneHotMinute' ) is undefined
        plugin = new $.oneHotMinute( this, options )
        $( this ).data( 'oneHotMinute', plugin )

