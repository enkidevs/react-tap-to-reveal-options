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
        {DATA.map(function(item) {
          return (
            <Flippable key={item.name}
                options={optionsArray} callback={alert.bind(window)}>
              <div className="name">{item.name}</div>
              <div className="phone">{item.phone}</div>
            </Flippable>
          );
        })}
        <h2>Object options</h2>
        {DATA.map(function(item) {
          return (
            <Flippable key={item.name}
               options={optionsObject} callback={alert.bind(window)}>
              <div className="name">{item.name}</div>
              <div className="phone">{item.phone}</div>
            </Flippable>
          );
        })}
      </div>
    );
  }
});

React.render(<List />, document.getElementById('example'));