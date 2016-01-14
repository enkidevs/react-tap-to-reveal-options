React Tap To Reveal Options
===========================

A simple react component intended for use on mobile.

## [Demo](http://enkidevs.github.io/react-tap-to-reveal-options/)

## Usage

```
npm install react-tap-to-reveal-options
```

### Code
```javascript
import Flippable from 'react-tap-to-reveal-options';

const options = ['One', 'Two', 'Three'];
// or
const options = [
  {label: 'One', key: 'first'},
  {label: 'Two', key: 'second'},
  {label: 'Three', key: 'last'}
];

<Flippable options={options} onSelect={cb} selected={'first'}>
  <div>
    Your content for front side
  </div>
  <div className="myclass">
    Supports multiple children
  </div>
</Flippable>

function cb(selectedOption) {
  console.log(selectedOption);
  // "One" | "Two" | "Three" if you passed an array of strings
  // "first" | "second" | "last" if you passed an array of objects
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
.ttro-item-One {background-color: #613DC1;}
.ttro-item-Two {background-color: #542280;}
.ttro-item-Three {background-color: #2B3A67;}

/* Your styles for individual options, based on keys if you passed an object */
.ttro-item-first {background-color: #613DC1;}
.ttro-item-second {background-color: #542280;}
.ttro-item-last {background-color: #2B3A67;}
```

### How to flip other items back to default state
See the [example](https://github.com/enkidevs/react-tap-to-reveal-options/blob/master/example/example.js).
