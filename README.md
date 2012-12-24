# [oneHotMinute](https://github.com/benichu/jquery.one-hot-minute) [![Build Status](https://travis-ci.org/benichu/jquery.one-hot-minute.png)](https://travis-ci.org/benichu/jquery.one-hot-minute)

<table>
  <tr>
    <td style="width:300px;">
      <img src="http://i.imgur.com/sVa20.jpg" alt="One Hot Minute - RHCP" style="width:300px;">
    </td>
    <td>
      `oneHotMinute` is a jQuery Plugin written in CoffeeScript to help you with tedious tasks involving
      `minutes` handling, such as converting minutes integers into hours (HH:MM) or hour strings (1:30) and
      floats (1.5) into integer minutes.
    </td>
  </tr>
<table>

You can pass many options explained at the bottom of this [README](#options), the best way to understand
what this plugin does is to check the example in the [documentation](#documentation).

## Website Url

https://github.com/benichu/jquery.one-hot-minute

## Bug tracker

If you find a bug, please raise it the [issue here](https://github.com/benichu/jquery.one-hot-minute/issues) on Github!

## Documentation

download this file [jquery.one-hot-minute.min.js](https://github.com/benichu/jquery.one-hot-minute/blob/master/js/jquery.one-hot-minute.min.js),
and add it to your project.


### EXAMPLE of processingMethod: `minutesToHours`

Format an element's display value to a duration format: HH:MM
That HTML element should have a `data-minute` attribute
(or whatever is defined as an option `dataAttr`) with the raw value to be converted.

__Example__

```html
   <span id="my_element" data-minute="130">130</span>
   #=> <span id="my_element" data-minute="130">2h10</span>
```
also,
```html
   <input id="my_element" data-minute="130" />
   #=> <input id="my_element" data-minute="130" value="2h10" />
```


__Basic Initialization__

```javascript
$("#main").oneHotMinute({
  processableElements: ['span', 'input'],
  processMethod: "minutesToHours",
  onReady: function(el) {
    // do whatever you want...
  },
  onBlur: function(el) {
    // apply some formatting on value change.
    this.minutesToHours(el);
  }
});
```

### EXAMPLE of processingMethod: `valueToMinutes`

Format an element's content value into minutes, and saves it
into a pre-defined element's data attribute
(ex: `data-minute` or whatever is defined as an option `saveAttr`)

__Example__

```html
  <input id="my_element" value="1.5" />
  #=> <input id="my_element" data-minute="90" value="1.5" />
```
also,
```html
  <input id="my_element" value="1h30" />
  #=> <input id="my_element" data-minute="90" value="1h30" />
```

__Basic Initialization__

```javascript
$("#main").oneHotMinute({
  processableElements: ['span', 'input'],
  processMethod: "valueToMinutes",
  onReady: function(el) {
    // do whatever you want...
  }
});
```

### Options

```javascript
debug: false
processMethod: "minutesToHours"           # ["minutesToHours", "valueToMinutes"]
processableElements: ['span', 'input']    # What elements are we trying to process?
dataAttr: "data-minute"                   # attribute with the raw value to be converted (used with processMethod: `minutesToHours`)
saveAttr: "data-minute"                   # attribute where the converted value is saved (used with processMethod: `valueToMinutes`)

onReady: ->                               # Function(), called when oneHotMinute has processed all the elements
onError: ->                               # Function(), called when oneHotMinute has experienced an error
```

## Developer

Developed by Benjamin Thouret, [benjamin.thouret.com](http://benjamin.thouret.com),
[Github Profile](http://github.com/benichu)

Based on the [MiniBoilerplate](http://miniboilerplate.com/) template.

Check [MiniBoilerplate's website](http://miniboilerplate.com/) for instructions
about the development workflow to be used for improving this plugin.
