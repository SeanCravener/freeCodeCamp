// Set dimensions and margins of graph
const margin = {
    top: 30,
    right: 20,
    bottom: 30,
    left: 20
    },
    width = 920 - margin.left - margin.right,
    height = 630 - margin.top - margin.bottom;

// Link for json file
const jsonURL = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';

// Array for legend colors
const legendColors = [
    "red",
    "blue"
];

// Append svg object to main-heatmap div element
var svgContainer = d3
    .select("main-heatmap")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Read json file from url stored in jsonURL
d3.json(jsonURL)
    .then(data => {

    var heatYears = data.monthlyVariance.map(d => {
        return d.year;
    });

    var baseDifference = data.monthlyVariance.map(d => {
        return d.baseTemperature + d.variance;
    });

    // Scale and set Y axis. Domain for each month of the year
    var y = svgContainer
        .scaleTime()
        .domain([new Date(0,0), new Date(0,11)])
        .range([0, height]);

    var yAxis = svgContainer
        .axisLeft(y)
        .tickFormat('%B');

    var x = svgContainer
        .scaleTime()
        .domain(heatYears)
        .range([0, width]);

    var xAxis = svgContainer
        .axisBottom(x)
        .tickFormat('Y')
    //    .tickValue()

    svgContainer
        .append("g")

    var tooltip = 

    // Scale colors for legend
    var legendScale = d3
        .scaleThreshold()
        .domain(d3.extent(baseDifference))
        .range(legendColors);
    })
    .catch(error => {
        console.log(error)
    });
