var React = require('react');
var Flippable = require('../index');

var DATA = [
  {name: "Alice", phone: "+44 1632 960920"},
  {name: "Bob", phone: "+44 1632 960810"},
  {name: "Fred", phone: "+44 1632 960739"}
];

var optionsArray = ["Poke", "Call", "Message"];
var optionsObject = [
  {key: "pokePerson", label: "Poke"},
  {key: "callPerson", label: "Call"},
  {key: "messagePerson", label: "Message"}
];

var List = React.createClass({
  render: function() {
    return (
      <div>
        <h2>String options</h2>
        {DATA.map(function(item, index) {
          return (
            <Flippable key={item.name}
                ref={'item-' + index}
               resetSiblings={this.resetSiblings.bind(this, index)}
                options={optionsArray} callback={alert.bind(window)}>
              <div className="name">{item.name}</div>
              <div className="phone">{item.phone}</div>
            </Flippable>
          );
        }.bind(this))}
        <h2>Object options</h2>
        {DATA.map(function(item, index) {
          return (
            <Flippable key={item.name}
               ref={'item-obj-' + index}
               resetSiblings={this.resetSiblings.bind(this, 'obj-' + index)}
               options={optionsObject} callback={alert.bind(window)}>
              <div className="name">{item.name}</div>
              <div className="phone">{item.phone}</div>
            </Flippable>
          );
        }.bind(this))}
      </div>
    );
  },

  resetSiblings: function(excludeIndex) {
    for (var ref in this.refs) {
      if (ref.indexOf('item-') !== -1 && ref !== 'topic-' + excludeIndex) {
        this.refs[ref].reset();
      }
    }
  }
});

React.render(<List />, document.getElementById('example'));
