// Set dimensions and margins of graph
const margin = {
    top: 100,
    right: 20,
    bottom: 30,
    left: 60
    },
    width = 920 - margin.left - margin.right,
    height = 630 - margin.top - margin.bottom;

// Link for json file
const jsonURL = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

// Scale, set range and domain for X axis
var xScale = d3
    .scaleLinear()
    .range([0, width]);

// Scale, set range for Y axis
var yScale = d3
    .scaleTime()
    .range([0, height]);

// Format for minutes and seconds
var timeFormat = d3.timeFormat('%M:%S');

// Color scale for legend
var color = d3.scaleOrdinal(d3.schemeCategory10);

// Set up ticks for X axis
var xAxis = d3
    .axisBottom(xScale)
    .tickFormat(d3.format('d'));

// Set up ticks for Y axis
var yAxis = d3
    .axisLeft(yScale)
    .tickFormat(timeFormat);

// Tooltip element
var tooltip = d3
    .select('body')
    .append('div')
    .attr('id', 'tooltip')
    .attr('opacity', 0);

// Bar chart svg container element
var svgContainer = d3
    .select('body')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .attr('class', 'scatterplot')
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Read json file from url stored in jsonURL
d3.json(jsonURL)
    .then(data => {
        
        // Map and parse minutes and seconds
        data.forEach(d => {
            var parsedTime = d.Time.split(':');
            d.Time = new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]);
        });

        // Set domain for years on X axis
        xScale.domain([
            d3.min(data, d => {
                return d.Year - 1;
            }),
            d3.max(data, d => {
                return d.Year + 1;
            })
        ]);

        // Set domain for time on Y axis
        yScale.domain(
            d3.extent(data, d => {
                return d.Time;
            })
        );

        // Create and setup X axis elemnt
        svgContainer
            .append('g')
            .attr('class', 'axis')
            .attr('id', 'x-axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);

        // Create Y axis element for chart
        svgContainer
            .append('g')
            .attr('class', 'axis')
            .attr('id', 'y-axis')
            .call(yAxis);

        // Add dots to scatterplot
        svgContainer
            .selectAll('.dot')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('r', 6)
            .attr('cx', d => {
                return xScale(d.Year);
            })
            .attr('cy', d => {
                return yScale(d.Time);
            })
            .attr('data-xvalue', d => {
                return d.Year;
            })
            .attr('data-yvalue', d => {
                return d.Time.toISOString();
            })
            .style('fill', d => {
                return color(d.Doping !== '');
            })
            // Makes changes when mouse hover overs a bar. d is for height
            .on('mouseover', (event, d) => {

                // Add transition for when Tooltip appears
                tooltip.transition().duration(200).style('opacity', 0.9);

                // Add years, quarter, and GDP amount to tooltip
                tooltip
                    .attr('data-year', d.Year)
                    .html(
                        d.Name +
                        ': ' +
                        d.Nationality +
                        '<br/>' +
                        'Year: ' +
                        d.Year +
                        ', Time: ' +
                        timeFormat(d.Time) +
                        (d.Doping ? '<br/><br/>' + d.Doping : '')
                    )
                    // Placement of tooltip
                    .style('left', event.pageX + 'px')
                    .style('top', event.pageY - 28 + 'px');
            })
            // Transition on mouseout event
            .on('mouseout', () => {
                tooltip.transition().duration(200).style('opacity', 0);
            });

        // Add and rotate text element to Y axis
        svgContainer
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -160)
            .attr('y', -44)
            .text('Time in Minutes')


        svgContainer
            .append('text')
            .attr('id', 'title')
            .attr('x', width / 2)
            .attr('y', 0 - margin.top / 2)
            .attr('text-anchor', 'middle')
            .style('font-size', '30px')
            .text('Doping in Professional Bicycle Racing');

        svgContainer
            .append('text')
            .attr('x', width / 2)
            .attr('y', 0 - margin.top / 2 + 25)
            .attr('text-anchor', 'middle')
            .style('font-size', '20px')
            .text("35 Fastest times up Alpe d'Huez");


        var legendContainer = svgContainer
            .append('g')
            .attr('id', 'legend');
        var rectSize = 18;

        var legend = legendContainer
            .selectAll('#legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr('class', 'legend-label')
            .attr('transform', (d, i) => {
                return 'translate(0,' + (height / 2 - i * 20) + ')';
            });

        legend
            .append('rect')
            .attr('x', width - rectSize)
            .attr('width', rectSize)
            .attr('height', rectSize)
            .style('fill', color);

        legend
            .append('text')
            .attr('x', width - 24)
            .attr('y', 9)
            .attr('dy', '.35em')
            .style('text-anchor', 'end')
            .text(d => {
                if (d) {
                    return 'Riders with doping allegations';
                } else {
                    return 'No doping allegations';
                }
            });
    })
    // Catch error and display in console
    .catch(e => console.log(e));
