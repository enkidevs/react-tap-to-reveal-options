var React = require('react');

var styles = {
  flipContainer: {
    perspective: "10000",
    WebkitPerspective: "10000",
    position: "relative",
    width: "100%"
  },

  flipper: {
  	transition: "0.6s",
  	WebkitTransition: "0.6s",
  	transformStyle: "preserve-3d",
  	WebkitTransformStyle: "preserve-3d",
  	position: "relative",
    transformOrigin: "100% 50%",
    WebkitTransformOrigin: "100% 50%"
  },

  front: {
  	zIndex: 2,
  	transform: "rotate3d(1, 0, 0, 0deg)",
  	WebkitTransform: "rotate3d(1, 0, 0, 0deg)",
  	backfaceVisibility: "hidden",
  	WebkitBackfaceVisibility: "hidden",
  	top: 0,
  	left: 0,
  	width: "100%",
  },

  back: {
  	transform: "rotate3d(1, 0, 0, 180deg)",
  	WebkitTransform: "rotate3d(1, 0, 0, 180deg)",
  	backfaceVisibility: "hidden",
  	WebkitBackfaceVisibility: "hidden",
  	position: "absolute",
  	top: 0,
  	left: 0,
  	width: "100%",
  },

  optionsWrapper: {
    display: "table",
    tableLayout: "fixed",
    width: "100%"
  },

  option: {
    textAlign: "center",
    display: "table-cell",
    verticalAlign: "top"
  }
};

var Flippable = React.createClass({displayName: "Flippable",
  propTypes: {
    callback: React.PropTypes.func.isRequired,
    options: React.PropTypes.array.isRequired,
    selected: React.PropTypes.any,
    resetSiblings: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      flipped: false
    };
  },

  render: function() {
    var flipperStyle = clone(styles.flipper);
    if (this.state.flipped) {
      flipperStyle.transform = "rotate3d(1, 0, 0, 180deg)";
    }

    return (
      React.createElement("div", {style: styles.flipContainer, className: this.props.className}, 
        React.createElement("div", {style: flipperStyle, ref: "flipper"}, 
          React.createElement("div", {style: styles.front, className: "ttro-front", onClick: this.flip}, 
            this.props.children
          ), 
          React.createElement("div", {style: styles.back, className: "ttro-back"}, 
            React.createElement("div", {style: styles.optionsWrapper}, 
              this.props.options.map(function(item) {
                var key, label;
                switch (typeof item) {
                  case 'string':
                    key = label = item;
                    break;
                  case 'object':
                    key = item.key;
                    label = item.label;
                    break;
                  default:
                    throw new Error('Each option should be a string or an object with "key" and "label" properties');
                }
                var selected = key === this.props.selected ? " selected" : "";
                return (
                  React.createElement("div", {style: styles.option, 
                    key: key, 
                    className: "ttro-item ttro-item-" + key + selected, 
                    onClick: this.callback.bind(this, key)}, 
                    label
                  )
                );
              }.bind(this))
            )
          )
        )
      )
    );
  },

  flip: function() {
    if (!this.state.flipped && this.props.resetSiblings) {
      this.props.resetSiblings();
    }
    this.setState({flipped: !this.state.flipped});
  },

  reset: function() {
    this.setState(this.getInitialState());
  },

  callback: function(key) {
    this.flip();
    this.props.callback(key);
  }
});

function clone(obj) {
  var copy = {};
  for (var key in obj) {
    copy[key] = obj[key];
  }
  return copy;
}

module.exports = Flippable;