// Set dimensions and margins of graph
const margin = {
    top: 30,
    right: 20,
    bottom: 30,
    left: 50
    },
    width = 920 - margin.left - margin.right,
    height = 630 - margin.top - margin.bottom;

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const colors = [
    "#253494",
    "#2c7fb8", 
    "#41b6c4", 
    "#a1dab4", 
    "#ffffcc", 
    "#ffffb2", 
    "#fed976", 
    "#feb24c", 
    "#fd8d3c"
];

// Link for json file
const jsonURL = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';

var tooltip = d3
    .select("body")
    .append("div")
    .attr("id", "tooltip")
    .attr("opacity", 0);

// Append svg object to main-heatmap div element
var svgContainer = d3
    .select(".main-heatmap")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



// Read json file from url stored in jsonURL
d3.json(jsonURL)
    .then(data => {
    console.log(data)


    // Map years
    var heatYears = data.monthlyVariance.map(d => {
        return d.year;
    });

    var varDifference = data.monthlyVariance.map(d => {
        return Math.floor(data.baseTemperature + d.variance);
    })

    // Color scale
    var colorScale = d3
    .scaleQuantile()
    .domain(varDifference)
    .range(colors);


    // Scale and append X axis to svgContainer. Domain for each month of the year
    var x = d3
        .scaleBand()
        .domain(heatYears)
        .range([0, width])

    var xAxis = d3
        .axisBottom(x)
        .tickValues(
            x.domain().filter(d => {
                return d % 20 === 0;
            })
        )
        
    svgContainer
        .append('g')
        .attr('id', 'x-axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    // Scale and append Y axis to svgContainer. Domain for each month of the year
    var y = d3
        .scaleBand()
        .domain(months)
        .range([0, height]);

    var yAxis = d3
        .axisLeft(y)

    svgContainer
        .append('g')
        .attr('id', 'y-axis')
        .call(yAxis);

    svgContainer
        .append("g")
        .selectAll("rect")
        .data(data.monthlyVariance)
        .enter()
        .append("rect")
        .attr("class", "cell")
        .attr("data-month", d => {
            return d.month;
        })
        .attr("data-year", d => {
            return d.year;
        })
        .attr("data-temp", d => {
            return data.baseTemperature + d.variance;
        })
        .attr("x", d => x(d.year))
        .attr("y", d => {
           return y(months[d.month - 1]);
        })
        .attr("width", d => x.bandwidth(d.year))
        .attr("height", d => y.bandwidth(d.month))
        .attr("fill", d => colorScale(data.baseTemperature + d.variance))
        .on("mouseover", (event, d) => {
            var date = new Date(d.year, d.month);

            tooltip
                .transition()
                .duration(200)
                .style("opacity", 0.9)

            tooltip
                .attr("data-year", d.year)
                .html(
                    "<span class='date'>" +
                    d3.timeFormat('%Y - %B')(date) +
                    '</span>' +
                    '<br />' +
                    "<span class='temperature'>" +
                    d3.format('.1f')(data.baseTemperature + d.variance) +
                    '&#8451;' +
                    '</span>' +
                    '<br />' +
                    "<span class='variance'>" +
                    d3.format('+.1f')(d.variance) +
                    '&#8451;' +
                    '</span>'
                )
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 80) + "px")
                .style("text-align", "center")
        })
        .on("mouseout", d => {
            tooltip
                .transition()
                .duration(200)
                .style("opacity", 0)
        })

        var legend = svgContainer.selectAll(".legend")
        .data(colorScale.range())
        .enter()
        .append("g")
        .attr("class", "legend");
        legend
        .append("rect")
        .attr("x", function(d, i) {
          return width - ((i + 1) * 30);
        })
        .attr("y", -40)
        .attr("width", 30)
        .attr("height", 20)
        .attr("fill", function(d, i) {
          return colours[i];
        });
      legend
        .append("text")
        .text(function(d) {
          return d.toFixed(1);
        })
        .attr("x", function(d, i) {
          return width - ((i + 1) * 30);
        })
        .attr("y", -10)
        .style("fill", "#5f5f5f")
        .style("font-size", "10px");

    })
    .catch(error => {
        console.log(error)
    });
