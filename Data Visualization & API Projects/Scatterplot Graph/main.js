var width = 920,
    height = 630;

var margin = {
    top: '1rem',
    right: 'auto',
    left: 'auto'
}

var jsonURL = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json'

// Tooltip element
var tooltip = d3
    .select('.sttp-graph')
    .append('div')
    .attr('id', 'tooltip')
    .attr('opacity', 0);

// Bar chart container element
var svgContainer = d3
    .select('.sttp-graph')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('transform', 'translate(60,0)');

d3.json(jsonURL)
    .then(data => {
        // Map and parse minutes and seconds
        var timeFormat = '%M:%S';
        var parsedTime = data.Time.map(d => {
            return d3.timeParse(timeFormat)(d);
        });

        // Scale, set range and domain for X axis
        var xScale = d3.scaleLinear().domain([
            d3.min(d => {
                return d.Year;
            }),
            d3.max(d => {
                return d.Year;
            })
        ]).range([0, width]);

        // Scale, set range and domain for Y axis
        var yScale = d3.scaleTime().domain([
            d3.extent(parsedTime)
        ]).range([0, height]);

        // Set and store X axis in xAxis 
        var xAxis = d3.axisBottom(xScale)
            .tickFormat(d3.format);

        // Set and store yAxisScale to the Y axis
        var yAxis = d3.axisLeft(yScale)
            .tickValues(parsedTime)
            .tickFormat(timeFormat);

        // Create and setup X axis elemnt
        svgContainer
            .append('g')
            .call(xAxis)
            .attr('id', 'x-axis')
            .attr('transform', 'translate(0,' + height + ')');

        // Create Y axis element for chart
        svgContainer
            .append('g')
            .call(yAxis)
            .attr('id', 'y-axis')
            .attr('transform', 'translate(60, 0)');

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
            .on('mouseout', function () {
                tooltip.transition().duration(200).style('opacity', 0);
            });

        // Add and rotate text element to Y axis
        svgContainer
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -160)
            .attr('y', -44)
            .text('Time in Minutes')
    })
    // Catch error and display in console
    .catch(e => console.log(e));
