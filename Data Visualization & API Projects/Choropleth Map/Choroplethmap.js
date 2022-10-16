// Assign User Education and County data json files
const EDUCATION_FILE = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const COUNTY_FILE = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

const width = 1200,
    height = 700,
    margin = {
        top: 30,
        right: 40,
        bottom: 30,
        left: 60
    };

let path = d3.geoPath();

// Append tooltip to div with class "container"
const tooltip = d3
    .select(".container")
    .append("div")
    .attr("id", "tooltip")
    .attr("opacity", 0);
    
// Append h1 for title to div with class "container"
const title = d3.select(".container")
    .append("h1")
    .attr("id", "title")
    .text("United States Educational Attainment");

// Append h3 for description to div with class "container"
const description = d3.select(".container")
    .append("h3")
    .attr("id", "description")
    .text("Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)")

// Append SVG to div with class "container"
let svg = d3.select(".container")
    .append("svg")
    .attr("id", "choropleth-map")


let legend = svg
    .append('g')
    .attr('id', 'legend')
    .attr('transform', 'translate(0,40)');
  


// Read json files. If successful, loads data into choropleth map
Promise.all([
    d3.json(EDUCATION_FILE),
    d3.json(COUNTY_FILE)
]).then((userData, countyData) => {
    
    // Map of userData.fip from EDUCATION_FILE 
    const fipsMap = userData.map(d => {
        return d.fips
    })

    // Map of bachelorOrHigher value
    const bachelorMap = userData.map(d => {
        return d.bachelorsOrHigher;
    });

    // set up color scale range
    let color = d3
        .scaleSequential(d3.interpolateYlGnBu)
        .domain(d3.extent(bachelorMap));


    legend
        .selectAll('rect')
        .data(
            color.range().map( d => {
                d = color.invertExtent(d);
                if (d[0] === null) {
                    d[0] = x.domain()[0];
                }
                if (d[1] === null) {
                    d[1] = x.domain()[1];
                }
                return d;
            })
        )
        .enter()
        .append('rect')
        .attr('height', 8)
        .attr('x', (d => {
            return x(d[0]);
        }))
        .attr('width', (d => {
            return d[0] && d[1] ? x(d[1]) - x(d[0]) : x(null);
        }))
        .attr('fill', (d => {
            return color(d[0]);
        }));
  
//   g.append('text')
//     .attr('class', 'caption')
//     .attr('x', x.range()[0])
//     .attr('y', -6)
//     .attr('fill', '#000')
//     .attr('text-anchor', 'start')
//     .attr('font-weight', 'bold');
  
legend
    .call(
        d3
        .axisBottom(x)
        .tickSize(13)
        .tickFormat(function (x) {
            return Math.round(x) + '%';
        })
        .tickValues(color.domain())
    )
    .select('.domain')
    .remove();


    svg.append("g")
        .selectAll("path")
        // parses the GeoJSON data into a FeatureCollection data array
        .data(topojson.feature(us, us.objects.counties).features)
        .enter()
        .append("path")
        .attr("class", "county")
        .attr("data-fips", d => d.id)
        .attr("data-education", d => {
          let object = userData.filter(item => item.fips == d.id);
          return object[0] ? object[0].bachelorsOrHigher : 0;
        })
        .attr("fill", d => {
          let object = education.filter(item => item.fips == d.id);
          return object[0] ? color(object[0].bachelorsOrHigher) : color(0);
        })
        .attr("d", path)
        .on("mouseoover", (event, d) => {
            // Add transition for when Tooltip appears
            tooltip.transition().duration(200).style('opacity', 0.9);
            tooltip
                .attr("data-education", d.bachelorsOrHigher)
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



}).catch(error => {
    // Catch error and print error to console
    console.log(error);
})