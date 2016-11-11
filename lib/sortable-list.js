"use strict";

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { "default": obj };
}

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

/**
 * Sortable List module
 * A sortable list component using html5 drag and drop api.
**/

var placeholder = document.createElement("li");

function isSortableListItem(element) {
  return !!(element && element.className && element.className.match(/^react-sortable/));
}

var SortableList = _react2["default"].createClass({
  displayName: "SortableList",

  getInitialState: function getInitialState() {
    return { data: this.props.data };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data })
    try {
      this.dragged.style.display = ''
      this.dragged.parentNode.removeChild(placeholder)
    } catch (e) {
      // Ignore - probably already removed.
    }
  },

  /** 
   * On drag start, set data.
  **/
  dragStart: function dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html", e.currentTarget);
  },

  /** 
   * On drag end, update the data state.
  **/
  dragEnd: function dragEnd(e) {
    this.dragged.style.display = '';
    this.dragged.parentNode.removeChild(placeholder);
    var data = this.state.data;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if (from < to) to--;
    if (this.nodePlacement == "after") to++;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({ data: data });
    if (this.props.onResort) {
      this.props.onResort(data)
    }
  },

  /** 
   * On drag over, update items.
  **/
  dragOver: function dragOver(e) {
    e.preventDefault();
    var targetNode = e.target;
    while (!isSortableListItem(targetNode) && targetNode.parentNode) {
      targetNode = targetNode.parentNode;
    }
    if (!isSortableListItem(targetNode)) {
      return;
    }
    this.dragged.style.display = "none";
    this.over = targetNode;
    var relY = e.clientY - this.over.offsetTop;
    var height = this.over.offsetHeight / 2;
    var parent = targetNode.parentNode;

    placeholder.className = this.props.placeholderClassName || "placeholder";
    if (relY > height) {
      this.nodePlacement = "after";
      parent.insertBefore(placeholder, targetNode.nextElementSibling);
    } else if (relY < height) {
      this.nodePlacement = "before";
      parent.insertBefore(placeholder, targetNode);
    }
  },

  render: function render() {
    var listItems = this.state.data.map((function (item, i) {
      return _react2["default"].createElement("li", { className: "react-sortable " + (this.props.listItemClassName || ''),
        "data-id": i,
        key: i,
        draggable: "true",
        onDragEnd: this.dragEnd,
        onDragStart: this.dragStart }, item);
    }).bind(this));

    return _react2["default"].createElement("ul",
      { onDragOver: this.dragOver, className: this.props.className || '' },
      listItems);
  }
});

module.exports = SortableList;
