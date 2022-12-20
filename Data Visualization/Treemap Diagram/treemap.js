const DATASETS = {
  videogames: {
    title: "Video Game Sales",
    description: "Top 100 Most Sold Video Games Grouped by Platform",
    fileURL:
      "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json",
  },
  movies: {
    title: "Movie Sales",
    description: "Top 100 Highest Grossing Movies Grouped By Genre",
    fileURL:
      "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json",
  },
  kickstarter: {
    title: "Kickstarter Pledges",
    description:
      "Top 100 Most Pledged Kickstarter Campaigns Grouped By Category",
    fileURL:
      "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json",
  },
};

const width = 960,
  height = 570;

const color = [
  "#1f77b4",
  "#aec7e8",
  "#ff7f0e",
  "#ffbb78",
  "#2ca02c",
  "#98df8a",
  "#d62728",
  "#ff9896",
  "#9467bd",
  "#c5b0d5",
  "#8c564b",
  "#c49c94",
  "#e377c2",
  "#f7b6d2",
  "#7f7f7f",
  "#c7c7c7",
  "#bcbd22",
  "#dbdb8d",
  "#17becf",
  "#9edae5",
];

const tooltip = d3
  .select("body")
  .append("div")
  .attr("id", "tooltip")
  .style("opacity", 0);

const container = d3.select("body").append("div").attr("class", "tm-cont");

// Add links to menu
container
  .append("div")
  .attr("class", "tm-style")
  .attr("id", "menu")
  .html(
    '<a href="?tm-data=videogames">Video Game Data Set</a>' +
      " | " +
      '<a href="?tm-data=movies">Movies Data Set</a>' +
      " | " +
      '<a href="?tm-data=kickstarter">Kickstarter Data Set</a>'
  );

// Set up menu to work with DATASET and url search params
/// Get and store url search param
let urlParams = new URLSearchParams(window.location.search);
/// Set default to kickstarter data
const defaultData = "kickstarter";
/// Set data set to matching search param, sets to default if empty
const dataset = DATASETS[urlParams.get("tm-data") || defaultData];

// Add title to treemap
container
  .append("h1")
  .attr("class", "tm-style")
  .attr("id", "title")
  .text(dataset.title);

// Add description to treemap
container
  .append("div")
  .attr("class", "tm-style")
  .attr("id", "description")
  .text(dataset.description);

const svgContainer = container.append("div").attr("class", "tm-style");

const svg = svgContainer
  .append("svg")
  .attr("id", "treemap")
  .attr("width", width)
  .attr("height", height);

let legendContainer = svgContainer
  .append("svg")
  .attr("id", "legend")
  .attr("width", width / 4)
  .attr("height", height);

var fader = (d) => {
  return d3.interpolateRgb(d, "#fff")(0.2);
};

var colors = d3.scaleOrdinal().range(color.map(fader));

var treemap = d3.treemap().size([width, height]).paddingInner(1);

d3.json(dataset.fileURL)
  .then((data) => {
    console.log(data);

    let root = d3
      .hierarchy(data)
      .eachBefore((d) => {
        d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name;
      })
      .sum(sumBySize)
      .sort((a, b) => {
        return b.height - a.height || b.value - a.value;
      });

    treemap(root);

    var cell = svg
      .selectAll("g")
      .data(root.leaves())
      .enter()
      .append("g")
      .attr("class", "group")
      .attr("transform", function (d) {
        return "translate(" + d.x0 + "," + d.y0 + ")";
      });

    cell
      .append("rect")
      .attr("id", function (d) {
        return d.data.id;
      })
      .attr("class", "tile")
      .attr("width", function (d) {
        return d.x1 - d.x0;
      })
      .attr("height", function (d) {
        return d.y1 - d.y0;
      })
      .attr("data-name", function (d) {
        return d.data.name;
      })
      .attr("data-category", function (d) {
        return d.data.category;
      })
      .attr("data-value", function (d) {
        return d.data.value;
      })
      .attr("fill", function (d) {
        return colors(d.data.category);
      })
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9);

        tooltip
          .html(
            "Name: " +
              d.data.name +
              "<br>Category: " +
              d.data.category +
              "<br>Value: " +
              d.data.value
          )
          .attr("data-value", d.data.value)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", () => {
        tooltip.transition().duration(200).style("opacity", 0);
      });

    cell
      .append("text")
      .attr("class", "tile-text")
      .selectAll("tspan")
      .data(function (d) {
        return d.data.name.split(/(?=[A-Z][^A-Z])/g);
      })
      .enter()
      .append("tspan")
      .attr("x", 4)
      .attr("y", function (d, i) {
        return 13 + i * 10;
      })
      .text(function (d) {
        return d;
      });

    var categories = root.leaves().map(function (nodes) {
      return nodes.data.category;
    });
    categories = categories.filter(function (category, index, self) {
      return self.indexOf(category) === index;
    });

    let legendBoxSize = 15;

    let legend = legendContainer
      .append("g")
      .selectAll("g")
      .data(categories)
      .enter()
      .append("g");

    legend
      .append("rect")
      .attr("class", "legend-item")
      .attr("width", legendBoxSize)
      .attr("height", legendBoxSize)
      .attr("x", 20)
      .attr("y", (d, i) => (position = (legendBoxSize + 15) * i))
      .attr("fill", (d) => colors(d));

    legend
      .append("text")
      .attr("transform", "translate(0, 10)")
      .attr("x", 40)
      .attr("y", (d, i) => (legendBoxSize + 15) * i)
      .text((d) => d);
  })
  .catch((error) => {
    console.log(error);
  });

let sumBySize = (d) => {
  return d.value;
};
