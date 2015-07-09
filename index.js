var React = require('react');

var styles = {
  flipContainer: {
    perspective: "10000",
    position: "relative",
    width: "100%"
  },

  flipper: {
  	transition: "0.6s",
  	transformStyle: "preserve-3d",
  	position: "relative",
    transformOrigin: "100% 50%"
  },

  front: {
  	zIndex: 2,
  	transform: "rotateX(0deg)",
  	backfaceVisibility: "hidden",
  	top: 0,
  	left: 0,
  	width: "100%",
  },

  back: {
  	transform: "rotateX(180deg)",
  	backfaceVisibility: "hidden",
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
    display: "table-cell",
    textAlign: "center"
  }
};

var Flippable = React.createClass({
  propTypes: {
    callback: React.PropTypes.func.isRequired,
    options: React.PropTypes.oneOfType([
       React.PropTypes.array,
       React.PropTypes.object
    ]).isRequired
  },

  getInitialState: function() {
    return {
      flipped: false
    };
  },

  render: function() {
    var flipperStyle = clone(styles.flipper);
    if (this.state.flipped) {
      flipperStyle.transform = "rotateX(180deg)";
    }

    var options = {};
    if (this.props.options instanceof Array) {
      this.props.options.forEach(function(item, index) {
        options[index] = item;
      });
    } else {
      options = this.props.options;
    }

    return (
      <div style={styles.flipContainer}>
        <div style={flipperStyle} ref="flipper">
          <div style={styles.front} className="ttro-front" onClick={this.flip}>
            {this.props.children}
          </div>
          <div style={styles.back} className="ttro-back">
            <div style={styles.optionsWrapper}>
              {Object.keys(options).map(function(key) {
                return (
                  <div style={styles.option}
                    key={key}
                    className={"ttro-item ttro-item-" + key}
                    onClick={this.callback.bind(this, key)}>
                    {options[key]}
                  </div>
                );
              }.bind(this))}
            </div>
          </div>
        </div>
      </div>
    );
  },

  flip: function() {
    this.setState({flipped: !this.state.flipped});
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