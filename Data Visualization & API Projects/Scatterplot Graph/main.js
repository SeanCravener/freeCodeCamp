var width = 920;
var height = 600;

// Tooltip element
var tooltip = d3
.select('.sttp-graph')
.append('div')
.attr('id', 'tooltip');

// Overlay element
var overlay = d3
.select('.sttp-graph')
.append('div')
.attr('class', 'overlay')
.style('opacity', 0);

// Bar chart container element
var svgContainer = d3
.select('.sttp-graph')
.append('svg')
.attr('width', width)
.attr('height', height);

d3.json(
'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
.then(data => {

    // Map and parse minutes and seconds
    var timeFormat = '%M:%S';
    var parsedTime = data.time.map(d => {
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

    // Add and rotate text element to Y axis
    svgContainer
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -160)
        .attr('y', -44)
        .text('Time in Minutes')

    // Add dots to scatterplot
    svgContainer
        .selectAll('.dot')
        .data(data)
        .enter()
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

            // Overlay for tooltip 
            overlay
                .transition()
                .duration(0)
                .style('height', d + 'px')
                .style('width', barWidth + 'px')
                .style('opacity', 0.9)
                .style('left', i * barWidth + 0 + 'px')
                .style('top', height - d + 'px')
                .style('transform', 'translateX(60px)');
            
            // Add opacity to tooltip when it pops up
            tooltip.transition().duration(200).style('opacity', 0.9);

            // Add years, quarter, and GDP amount to tooltip
            tooltip
                .html(
                    years[i] +
                    '<br>' +
                    '$' +
                    GDP[i].toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') +
                    ' Billion'
                )
            .attr('data-date', data.data[i][0])
            .style('left', i * barWidth + 30 + 'px')
            .style('top', height - 100 + 'px')
            .style('transform', 'translateX(60px)')
        })

        // Opacity transition to fade tooltip and overlay
        .on('mouseout', function () {
            tooltip.transition().duration(200).style('opacity', 0);
            overlay.transition().duration(200).style('opacity', 0);
        });
    })
// Catch error from d3.json
.catch(e => console.log(e));
