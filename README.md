React Tap To Reveal Options
===========================

A simple react component intended for use on mobile.

## Usage

```
npm install react-tap-to-reveal-options
```

### Code
```javascript
var Flippable = require('react-tap-to-reveal-options');

var options = ["One", "Two", "Three"];
// or
var options = {
  first: "One",
  second: "Two",
  last: "Three",
}

<Flippable options={options} callback={cb}>
  <div>
    Your content for front side
  </div>
  <div className="myclass">
    Supports multiple children
  </div>
</Flippable>

function cb(selectedOption) {
  console.log(selectedOption);
  //0|1|2 (index) if you passed an array or "first"|"second"|"last" if you passed an object
}

```

### Style
```css
.ttro-front {
  height: 50px; /* mandatory */
  /* Your styles for front side */
}

.ttro-back {
  /* Your styles for back side */
}

.ttro-item {
  /* Your styles for all options */
}

.ttro-item:active {
  /* Your styles for pressed option */
}

/* Your styles for individual options, based on index if you passed an array */
.ttro-item-0 {background-color: #613DC1;}
.ttro-item-1 {background-color: #542280;}
.ttro-item-2 {background-color: #2B3A67;}

/* Your styles for individual options, based on keys if you passed an object */
.ttro-item-first {background-color: #613DC1;}
.ttro-item-second {background-color: #542280;}
.ttro-item-last {background-color: #2B3A67;}
```