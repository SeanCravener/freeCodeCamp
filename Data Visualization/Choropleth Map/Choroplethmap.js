// Assign User Education and County data json files
const EDUCATION_FILE =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const COUNTY_FILE =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20,
};

const width = 960;
const height = 600;

// Colors array for legend and map
const colors = d3.schemeYlOrRd[8];

// Append tooltip to div with class "container"
const tooltip = d3
  .select("body")
  .append("div")
  .attr("id", "tooltip")
  .style("visibility", "hidden");

// Append h1 for title to div with class "container"
const title = d3
  .select(".container")
  .append("h1")
  .attr("id", "title")
  .text("United States Educational Attainment");

// Append h3 for description to div with class "container"
const description = d3
  .select(".container")
  .append("h3")
  .attr("id", "description")
  .text(
    "Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)"
  );

// Append SVG to div with class "container"
const svg = d3
  .select(".container")
  .append("svg")
  .attr("id", "choropleth-map")
  .attr("width", width)
  .attr("height", height)
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const legend = svg
  .append("g")
  .attr("id", "legend")
  .attr("transform", "translate(0,40)");

//using GEOJson library, map and geoPath allow visualization of path array to form map
const path = d3.geoPath();

// Read json files. If successful, loads data into choropleth map
Promise.all([d3.json(EDUCATION_FILE), d3.json(COUNTY_FILE)])
  .then((data) => {
    const userData = data[0];
    const countyData = data[1];

    const bachelorMap = userData.map((d) => {
      return d.bachelorsOrHigher;
    });

    const maxBachelor = d3.max(bachelorMap);
    const minBachelor = d3.min(bachelorMap);

    let colorScale = d3
      .scaleThreshold()
      .domain(
        d3.range(
          minBachelor,
          maxBachelor,
          (maxBachelor - minBachelor) / colors.length
        )
      )
      .range(colors);

    const x = d3
      .scaleLinear()
      .domain([minBachelor, maxBachelor])
      .rangeRound([600, 860]);

    legend
      .selectAll("rect")
      .data(colorScale.range().map((d) => colorScale.invertExtent(d)))
      .enter()
      .append("rect")
      .attr("height", 8)
      .attr("x", (d) => x(d[0]))
      .attr("width", (d) => x(d[1]) - x(d[0]))
      .attr("fill", (d) => colorScale(d[0]));

    // Add title to legend
    legend
      .append("text")
      .attr("x", x.range()[0])
      .attr("y", -6)
      .attr("fill", "#000")
      .attr("text-anchor", "start")
      .attr("font-weight", "bold")
      .text("Bachelor or Higher Rate(%)");

    legend
      .call(
        d3
          .axisBottom(x)
          .tickSize(13)
          .tickFormat((x) => {
            return Math.round(x) + "%";
          })
          .tickValues(
            colorScale
              .range()
              .slice(1)
              .map((d) => colorScale.invertExtent(d)[0])
          )
      )
      .select(".domain")
      .remove();

    let countyFibMatch = (fips) => {
      var county = userData.find((county) => county.fips === fips);
      return county;
    };

    svg
      .append("g")
      .selectAll("path")
      .data(topojson.feature(countyData, countyData.objects.counties).features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", (d) => {
        let i = colors.indexOf(
          colorScale(countyFibMatch(d.id).bachelorsOrHigher)
        );
        return colors[i - 1];
      })
      .attr("data-fips", (d) => d.id)
      .attr("class", "county")
      .attr("data-education", (d) => {
        return countyFibMatch(d.id).bachelorsOrHigher;
      })
      .on("mouseover", (event, d) => {
        let county = countyFibMatch(d.id);

        tooltip
          .style("visibility", "visible")
          .style("left", event.pageX + 5 + "px")
          .style("top", event.pageY - 80 + "px")
          .attr("data-education", county.bachelorsOrHigher)
          // Add text with selected county data to tooltip
          .html(
            "County: " +
              county.area_name +
              "<br>" +
              "State: " +
              county.state +
              "<br>" +
              "Bachelors or Higher: " +
              county.bachelorsOrHigher +
              "%"
          );
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

    // Add space between states
    svg
      .append("path")
      .datum(topojson.mesh(countyData, countyData.objects.states))
      .attr("class", "state")
      .attr("d", path);
  })
  .catch((error) => {
    // Catch error and print error to console
    console.log(error);
  });
