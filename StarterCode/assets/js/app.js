// // @TODO: YOUR CODE HERE!
// var svgWidth = 960;
// var svgHeight = 500;

// var margin = 20;

// // Create an SVG canvas, append an SVG group that will hold our chart,
// // and shift the latter by left and top margins.
// var svg = d3
//   .select("#scatter")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight)
//   .attr("class", "chart");

// var circRadius = 5;

// // A) Bottom Axis Labels 
// svg.append("g").attr("class","xText");
// var xText = d3.select(".xText");
// function xTextRefresh(){
//   xText.attr(
//     "transform",
//     "tranlate"
//   );
// }
// xTextRefresh();

// xText
//   .append("text")
//   .attr("y",0) // can be changed
//   .attr("data-name","age")
//   .attr("data-axis","x")
//   .attr("class","aText active x")
//   .text("Age (median)");

// // B) Left Axis
// svg.append("g").attr("class","yText");
// var yText = d3.select(".yText");
// function yTextRefresh(){
//   yText.attr(
//     "transform",
//     "translate"
//   );
// }
// yTextRefresh();

// yText
//   .append("text")
//   .attr("x", 0)
//   .attr("data-name", "smokes")
//   .attr("data-axis", "y")
//   .attr("class", "aText active y")
//   .text("Smokes (Precentage)");

// // Import csv
// d3.csv("assets/data/data.csv").then(function(data) {
//   visualize(data); 
// });

// function visualize(thedata){
//   var curX="smokers";
//   var curY="age";

//   function xMinMax(){
//     xMin=d3.min(thedata, function(d){
//       return parseFloat(d[curX])* 0.90;
//     });
//     xMax=d3.max(thedata, function(d){
//       return parseFloat(d[curX])* 1.10;
//     });
//   }

//   function yMinMax(){
//     yMin=d3.min(thedata, function(d){
//       return parseFloat(d[curY])* 0.90;
//     });
//     yMax=d3.max(thedata, function(d){
//       return parseFloat(d[curY])* 1.10;
//     });
//   }

//   xMinMax();
//   yMinMax();

//   var xScale =d3
//   .scaleLinear()
//   .domain([xMin, xMax]) // can be changed
//   .range([margin,svgWidth-margin]);

//   var xAxis = d3.axisBottom(xScale) 

//   var yScale = d3
//   .scaleLinear()
//   .domain([yMin, yMax])
//   .range([svgHeight-margin,margin]);

//   var yAxis = d3.axisLeft(yScale)

//   svg
//     .append("g")
//     .call(xAxis)
//     .attr("class","xAxis")
//     .attr("transform","translate");

//   svg
//     .append("g")
//     .call(yAxis)
//     .attr("class", "yAxis")
//     .attr("transform","translate");

//   var theCircles = svg.selectAll("g theCircles").data(thedata).enter();
    
//   // append the cicles for each row of data 
//   theCircles
//     .append("circle")
//     .attr("cx",function(d){
//       return xScale(d[curX])
//     })
//     .attr("cy", function(d){
//       return yScale(d[curY])
//     })
//     .attr("r",circRadius)
//     .attr("class",function(d){
//       return "statesCircle " +d.abbr;
//     });

//   theCircles
//     .append("text")
//     .text(function(d){
//       return d.abbr;
//     })
//     .attr("dx",function(d){
//       return xScale(d[curX])
//     })
//     .attr("dy",function(d){
//       return yScale(d[curY] + circRadius);
//     })
//     .attr("font-size",circRadius)
//     .attr("class","stateText");
// }



// @TODO: YOUR CODE HERE!
//  Follow activity - 2, 3 of day-3 of Unit-16 with little modification as per the data
var svgWidth = 960;
var svgHeight = 500;
var margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
};
// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;
// Create an SVG canvas, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);
// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
  // import csv
  d3.csv("assets/data/data.csv").then(function(data) {
    data.forEach(function(d) {
      d.smokes= +d.smokes;
      d.age = +d.age;
    });
  // Configure a linear scale for the horizontal axis   
  var xLinearScale = d3.scaleLinear()
  .domain(d3.extent(data, d => d.smokes))
  .range([0,chartWidth]);
  // Configure a linear scale for the vertical axis 
  var yLinearScale = d3.scaleLinear()
  .domain(d3.extent(data, d => d.age))
  .range([chartHeight,0]);
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);
  // Append two SVG group elements to the chartGroup area,
//  create left axes inside of them
  chartGroup.append("g")
      .call(leftAxis);
// create the bottom axes 
  chartGroup.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis);
// Create one SVG circle per piece of data
//   // Use the linear scales to position each circle within the chart
  var theCircles = chartGroup.selectAll("scatter").data(data).enter()
    .append("circle")
    .attr("cx",function(d){
      return xLinearScale(d.smokes);
    })
    .attr("cy", function(d){
      return yLinearScale(d.age);
    })
    .attr("r", 15)
    .attr("fill", "lightblue")
    .attr("opacity", ".55")
  // Create text for states
    chartGroup.selectAll(".texts")
    .data(data)
    .enter()
    .append("text") 
    .text(function(d) {
      return (d.abbr);
    })
    .attr("x", d => xLinearScale(d.smokes))
    .attr("y", d => yLinearScale(d.age))
    .attr("font-size", "10px")
    .attr("fill", "black");
  })