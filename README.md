# [oneHotMinute](https://github.com/benichu/jquery.one-hot-minute) [![Build Status](https://travis-ci.org/benichu/jquery.one-hot-minute.png)](https://travis-ci.org/benichu/jquery.one-hot-minute)

    WORK IN PROGRESS, HIGHLY UNSTABLE

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


### Basic HTML, processingMethod: `minutesToHours`

Format an element's display value to a duration format: HH:MM
That HTML element should have a `data-minute` (or an option `dataAttr` set) attribute
with the raw value to be converted

__Example__

```html
   <span id="my_element" data-minute="130">130</span>
   #=> <span id="my_element" data-minute="130">02h10</span>
```

__Basic Initialization__

```javascript
$("#main").oneHotMinute({
  processableElements: ['span', 'input'],
  processMethod: "minutesToHours",
  onReady: function(el) {
    // do whatever you want, for example, formatting your sub-totals...
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
