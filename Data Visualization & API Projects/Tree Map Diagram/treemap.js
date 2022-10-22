const DATASET = {
    videogameSales: {
        title: "Video Game Sales",
        description: "Top 100 Most Sold Video Games Grouped by Platform",
        fileURL: "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json"
    },
    movieSales: {
        title: "Movie Sales",
        description: "Top 100 Highest Grossing Movies Grouped By Genre",
        fileURL: "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json"
    },
    kickstarter: {
        title: "Kickstarter Pledges",
        description: "Top 100 Most Pledged Kickstarter Campaigns Grouped By Category",
        fileURL: "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json"
    }
}

const width = 960,
    height = 500;

// Colors array for legend and map
const colors = d3.schemeYlOrRd[8];

const container = d3.select(".container");

const tooltip = d3.select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("visibility", "hidden");

