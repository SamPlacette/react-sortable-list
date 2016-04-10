import React from 'react'
import SortableList from '../lib/sortable-list'

var colors = ["Red","Green","Blue","Yellow","Black","White","Orange"];
React.render(<SortableList data={colors} />, document.getElementById("container"));

function renderLetterImageSrc(letter) {
  var context = document.createElement('canvas').getContext('2d')
  context.canvas.width = 50;
  context.canvas.height = 65;
  context.font = '48px sans-serif'
  context.fillStyle = 'rgb(' + [
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256)] + ')'
  context.fillText(letter, 0, 50);
  return context.canvas.toDataURL();
}

var letterImages = new Array(26)
for (var i = 0; i < 26; i++) {
  letterImages[i] = renderLetterImageSrc(String.fromCharCode(97 + i))
}

const FancyImage = React.createClass({
  render: function render () { return (<img src={this.props.src} />) }
})
const fancyImageSet = letterImages.map(function (imageSrc, index) {
  return (<FancyImage key={index} src={imageSrc}></FancyImage>)
})
React.render(
  <SortableList data={fancyImageSet} placeholderClassName='fancy-placeholder' listItemClassName='fancy-list-item' />,
  document.getElementById("fancy-container"))
