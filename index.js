'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var styles = {
  flipContainer: {
    perspective: '10000',
    WebkitPerspective: '10000',
    position: 'relative',
    width: '100%'
  },

  flipper: {
    transition: '0.6s',
    WebkitTransition: '0.6s',
    transformStyle: 'preserve-3d',
    WebkitTransformStyle: 'preserve-3d',
    position: 'relative',
    transformOrigin: '100% 50%',
    WebkitTransformOrigin: '100% 50%'
  },

  front: {
    zIndex: 2,
    transform: 'rotate3d(1, 0, 0, 0deg)',
    WebkitTransform: 'rotate3d(1, 0, 0, 0deg)',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    top: 0,
    left: 0,
    width: '100%'
  },

  back: {
    transform: 'rotate3d(1, 0, 0, 180deg)',
    WebkitTransform: 'rotate3d(1, 0, 0, 180deg)',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%'
  },

  optionsWrapper: {
    display: 'table',
    tableLayout: 'fixed',
    width: '100%'
  },

  option: {
    textAlign: 'center',
    display: 'table-cell',
    verticalAlign: 'top'
  }
};

var Flippable = _react2.default.createClass({
  displayName: 'Flippable',

  propTypes: {
    onSelect: _react2.default.PropTypes.func,
    options: _react2.default.PropTypes.array.isRequired,
    selected: _react2.default.PropTypes.string,
    onFlip: _react2.default.PropTypes.func,
    children: _react2.default.PropTypes.node
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onSelect: function onSelect() {},
      onFlip: function onFlip() {}
    };
  },
  getInitialState: function getInitialState() {
    return {
      flipped: false
    };
  },
  render: function render() {
    var _this = this;

    var _props = this.props;
    var style = _props.style;
    var onSelect = _props.onSelect;
    var onFlip = _props.onFlip;
    var options = _props.options;
    var selected = _props.selected;

    var rest = _objectWithoutProperties(_props, ['style', 'onSelect', 'onFlip', 'options', 'selected']);

    var flipperStyle = _extends({}, styles.flipper);
    if (this.state.flipped) {
      flipperStyle.transform = 'rotate3d(1, 0, 0, 180deg)';
      flipperStyle.WebkitTransform = 'rotate3d(1, 0, 0, 180deg)';
    }

    return _react2.default.createElement(
      'div',
      _extends({ style: _extends({}, styles.flipContainer, style) }, rest),
      _react2.default.createElement(
        'div',
        { style: flipperStyle, ref: 'flipper' },
        _react2.default.createElement(
          'div',
          { style: styles.front, className: 'ttro-front', onClick: this.flip },
          this.props.children
        ),
        _react2.default.createElement(
          'div',
          { style: styles.back, className: 'ttro-back' },
          _react2.default.createElement(
            'div',
            { style: styles.optionsWrapper },
            this.props.options.map(function (item) {
              var key = undefined;
              var label = undefined;
              switch (typeof item === 'undefined' ? 'undefined' : _typeof(item)) {
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
              var selected = key === _this.props.selected ? ' selected' : '';
              return _react2.default.createElement(
                'div',
                { style: styles.option,
                  key: key,
                  className: 'ttro-item ttro-item-' + key + selected,
                  onClick: function onClick() {
                    return _this.handleSelect(key);
                  } },
                label
              );
            })
          )
        )
      )
    );
  },
  flip: function flip() {
    if (!this.state.flipped) {
      this.props.onFlip();
    }
    this.setState({ flipped: !this.state.flipped });
  },
  reset: function reset() {
    this.setState({
      flipped: false
    });
  },
  handleSelect: function handleSelect(key) {
    this.flip();
    this.props.onSelect(key);
  }
});

module.exports = Flippable;