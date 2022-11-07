var width = 800;
var height = 400;
var barWidth = width / 275;

const jsonURL = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";

// Tooltip element
var tooltip = d3
    .select(".chart-container")
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0);

// Overlay element
var overlay = d3
    .select(".chart-container")
    .append("div")
    .attr("class", "overlay")
    .style("opacity", 0);

// Bar chart container element
var svgContainer = d3
    .select(".chart-container")
    .append("svg")
    .attr("width", width + 100)
    .attr("height", height + 60);

d3.json(jsonURL)
    .then(data => {

        // Create and rotate required text to Y axis
        svgContainer
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -200)
            .attr("y", 80)
            .text("Gross Domestic Product");

        // Create and rotate required text to X axis
        svgContainer
            .append("text")
            .attr("x", width / 2 + 120)
            .attr("y", height + 50)
            .text("More Information: http://www.bea.gov/national/pdf/nipaguid.pdf")
            .attr("class", "info");

        // Map and store years along with their quarters
        var years = data.data.map(function (item) {
            var quarter;
            var temp = item[0].substring(5, 7);

            if (temp === "01") {
                quarter = "Q1";
            } else if (temp === "04") {
                quarter = "Q2";
            } else if (temp === "07") {
                quarter = "Q3";
            } else if (temp === "10") {
                quarter = "Q4";
            }

            return item[0].substring(0, 4) + " " + quarter;
        });

        // Store and map dates from JSON file
        var yearsDate = data.data.map(function (item) {
            return new Date(item[0]);
        });

        // Find and set the max date from dates stored in yearsDate
        var xMax = new Date(d3.max(yearsDate));
        xMax.setMonth(xMax.getMonth() + 3);

        // Set domain and range for scale of the X axis
        var xScale = d3.scaleTime()
            .domain([d3.min(yearsDate), xMax])
            .range([0, width]);

        // Set and store X axis in xAxis 
        var xAxis = d3.axisBottom().scale(xScale);

        // Create and setup X axis elemnt
        svgContainer
            .append("g")
            .call(xAxis)
            .attr("id", "x-axis")
            .attr("transform", "translate(60, 400)");

        // Map and store GDP data from JSON file
        var GDP = data.data.map(function (item) {
            return item[1];
        });

        // Set the max GDP
        var gdpMax = d3.max(GDP);

        // Set linear scale, domain, and range for y axes using GDP range
        var linearScale = d3.scaleLinear().domain([0, gdpMax]).range([0, height]);

        // Map and store Scaled Linear GDP data from JSON file
        var scaledGDP = GDP.map(function (item) {
            return linearScale(item);
        });

        // Set and store scaled GDP data for Y axis
        var yAxisScale = d3.scaleLinear().domain([0, gdpMax]).range([height, 0]);

        // Set and store yAxisScale to the Y axis
        var yAxis = d3.axisLeft(yAxisScale);

        // Create Y axis element for chart
        svgContainer
            .append("g")
            .call(yAxis)
            .attr("id", "y-axis")
            .attr("transform", "translate(60, 0)");

        // Section for bars to be created and added
        d3.select("svg")
            .selectAll("rect")
            .data(scaledGDP)
            .enter()
            .append("rect")
            // Give each bar element an attribute to store their own dates
            .attr("data-date", function (d, i) {
                return data.data[i][0];
            })
            // Give each bar element an attribute to store their GDP amount
            .attr("data-gdp", function (d, i) {
                return data.data[i][1];
            })
            .attr("class", "bar")
            // Set each bar"s position on the X axis
            .attr("x", function (d, i) {
                return xScale(yearsDate[i]);
            })
            // Set each bar"s position on the Y axis
            .attr("y", function (d) {
                return height - d;
            })
            .attr("width", barWidth)
            .attr("height", function (d) {
                return d;
            })
            // Give and assign an index attr for each element for the tooltip
            .attr("index", (d, i) => i)
            .style("fill", "#33adff")
            .attr("transform", "translate(60, 0)")

            // Makes changes when mouse hover overs a bar. d is for height
            .on("mouseover", function (event, d) {
                var i = this.getAttribute("index");

                // Overlay for tooltip 
                overlay
                    .transition()
                    .duration(0)
                    .style("height", d + "px")
                    .style("width", barWidth + "px")
                    .style("opacity", 0.9)
                    .style("left", i * barWidth + 0 + "px")
                    .style("top", height - d + "px")
                    .style("transform", "translateX(60px)");

                // Add opacity to tooltip when it pops up
                tooltip.transition().duration(200).style("opacity", 0.9);

                // Add years, quarter, and GDP amount to tooltip
                tooltip
                    .html(
                        years[i] +
                        "<br>" +
                        "$" +
                        GDP[i].toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") +
                        " Billion"
                    )
                    .attr("data-date", data.data[i][0])
                    .style("left", i * barWidth + 30 + "px")
                    .style("top", height - 100 + "px")
                    .style("transform", "translateX(60px)")
            })

            // Opacity transition to fade tooltip and overlay
            .on("mouseout", function () {
                tooltip.transition().duration(200).style("opacity", 0);
                overlay.transition().duration(200).style("opacity", 0);
            });
    })
    // Catch error from d3.json
    .catch(e => console.log(e));
