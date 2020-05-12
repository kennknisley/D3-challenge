// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = 20;

// Create an SVG canvas, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("class", "chart");

var circRadius = 5;

// A) Bottom Axis Labels 
svg.append("g").attr("class","xText");
var xText = d3.select(".xText");
function xTextRefresh(){
  xText.attr(
    "transform",
    "tranlate"
  );
}
xTextRefresh();

xText
  .append("text")
  .attr("y",0) // can be changed
  .attr("data-name","age")
  .attr("data-axis","x")
  .attr("class","aText active x")
  .text("Age (median)");

// B) Left Axis
svg.append("g").attr("class","yText");
var yText = d3.select(".yText");
function yTextRefresh(){
  yText.attr(
    "transform",
    "translate"
  );
}
yTextRefresh();

yText
  .append("text")
  .attr("x", 0)
  .attr("data-name", "smokes")
  .attr("data-axis", "y")
  .attr("class", "aText active y")
  .text("Smokes (Precentage)");

// Import csv
d3.csv("assets/data/data.csv").then(function(data) {
  visualize(data); 
});

function visualize(thedata){
  var curX="smokers";
  var curY="age";

  function xMinMax(){
    xMin=d3.min(thedata, function(d){
      return parseFloat(d[curX])* 0.90;
    });
    xMax=d3.max(thedata, function(d){
      return parseFloat(d[curX])* 1.10;
    });
  }

  function yMinMax(){
    yMin=d3.min(thedata, function(d){
      return parseFloat(d[curY])* 0.90;
    });
    yMax=d3.max(thedata, function(d){
      return parseFloat(d[curY])* 1.10;
    });
  }

  xMinMax();
  yMinMax();

  var xScale =d3
  .scaleLinear()
  .domain([xMin, xMax]) // can be changed
  .range([margin,svgWidth-margin]);

  var xAxis = d3.axisBottom(xScale) 

  var yScale = d3
  .scaleLinear()
  .domain([yMin, yMax])
  .range([svgHeight-margin,margin]);

  var yAxis = d3.axisLeft(yScale)

  svg
    .append("g")
    .call(xAxis)
    .attr("class","xAxis")
    .attr("transform","translate");

  svg
    .append("g")
    .call(yAxis)
    .attr("class", "yAxis")
    .attr("transform","translate");

  var theCircles = svg.selectAll("g theCircles").data(thedata).enter();
    
  // append the cicles for each row of data 
  theCircles
    .append("circle")
    .attr("cx",function(d){
      return xScale(d[curX])
    })
    .attr("cy", function(d){
      return yScale(d[curY])
    })
    .attr("r",circRadius)
    .attr("class",function(d){
      return "statesCircle " +d.abbr;
    });

  theCircles
    .append("text")
    .text(function(d){
      return d.abbr;
    })
    .attr("dx",function(d){
      return xScale(d[curX])
    })
    .attr("dy",function(d){
      return yScale(d[curY] + circRadius);
    })
    .attr("font-size",circRadius)
    .attr("class","stateText");
}



