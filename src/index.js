import React from 'react';

const styles = {
  flipContainer: {
    perspective: '10000',
    WebkitPerspective: '10000',
    position: 'relative',
    width: '100%',
  },

  flipper: {
  	transition: '0.6s',
  	WebkitTransition: '0.6s',
  	transformStyle: 'preserve-3d',
  	WebkitTransformStyle: 'preserve-3d',
  	position: 'relative',
    transformOrigin: '100% 50%',
    WebkitTransformOrigin: '100% 50%',
  },

  front: {
  	zIndex: 2,
  	transform: 'rotate3d(1, 0, 0, 0deg)',
  	WebkitTransform: 'rotate3d(1, 0, 0, 0deg)',
  	backfaceVisibility: 'hidden',
  	WebkitBackfaceVisibility: 'hidden',
  	top: 0,
  	left: 0,
  	width: '100%',
  },

  back: {
  	transform: 'rotate3d(1, 0, 0, 180deg)',
  	WebkitTransform: 'rotate3d(1, 0, 0, 180deg)',
  	backfaceVisibility: 'hidden',
  	WebkitBackfaceVisibility: 'hidden',
  	position: 'absolute',
  	top: 0,
  	left: 0,
  	width: '100%',
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

const Flippable = React.createClass({
  propTypes: {
    onSelect: React.PropTypes.func,
    options: React.PropTypes.array.isRequired,
    selected: React.PropTypes.string,
    onFlip: React.PropTypes.func,
    children: React.PropTypes.node,
  },

  getDefaultProps() {
    return {
      onSelect: () => {},
      onFlip: () => {},
    };
  },

  getInitialState() {
    return {
      flipped: false,
    };
  },

  render() {
    const {style, onSelect, onFlip, options, selected, ...rest} = this.props;
    const flipperStyle = {...styles.flipper};
    if (this.state.flipped) {
      flipperStyle.transform = 'rotate3d(1, 0, 0, 180deg)';
      flipperStyle.WebkitTransform = 'rotate3d(1, 0, 0, 180deg)';
    }

    return (
      <div style={{...styles.flipContainer, ...style}} {...rest}>
        <div style={flipperStyle} ref="flipper">
          <div style={styles.front} className="ttro-front" onClick={this.flip}>
            {this.props.children}
          </div>
          <div style={styles.back} className="ttro-back">
            <div style={styles.optionsWrapper}>
              {this.props.options.map((item) => {
                let key;
                let label;
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
                const selected = key === this.props.selected ? ' selected' : '';
                return (
                  <div style={styles.option}
                    key={key}
                    className={'ttro-item ttro-item-' + key + selected}
                    onClick={() => this.handleSelect(key)} >
                    {label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  },

  flip() {
    if (!this.state.flipped) {
      this.props.onFlip();
    }
    this.setState({flipped: !this.state.flipped});
  },

  reset() {
    this.setState({
      flipped: false,
    });
  },

  handleSelect(key) {
    this.flip();
    this.props.onSelect(key);
  }
});

module.exports = Flippable;
