# react-sortable-list 

react-sortable-list is a sortable list component using react.js and html5 drag and drop api.

## Installation

`npm install react-sortable-list --save`

## Usage

```javascript
var React = require('react');
var SortableList = require('react-sortable-list');

var colors = ["Red","Green","Blue","Yellow","Black","White","Orange"];

React.render(<SortableList data={colors} />, document.getElementById("container"));

```

## Styles

react-sortable-list can be used with your own custom styles. A minimal sortable-list.css style sheet is included as a guide.
Class names may be overridden using the ``placeholderClassName`` and ``listItemClassName`` props.

## Sortable React Components

Any set of React components may be specified as the ``data`` prop. An example is included.

## Development
    
    npm install
    npm test
    npm start

## License

[MIT](http://isekivacenz.mit-license.org/)
