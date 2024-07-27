// script.js

// Load data
d3.csv("/Users/justinward/Documents/directory.csv").then(data => {
    // Parse data
    data.forEach(d => {
        d.latitude = +d.latitude;
        d.longitude = +d.longitude;
    });

    // Set dimensions and margins
    const margin = { top: 20, right: 30, bottom: 40, left: 50 },
          width = 960 - margin.left - margin.right,
          height = 600 - margin.top - margin.bottom;

    // Append SVG
    const svg = d3.select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define map projection
    const projection = d3.geoAlbersUsa()
        .scale(1200)
        .translate([width / 2, height / 2]);

    // Define path generator
    const path = d3.geoPath()
        .projection(projection);

    // Load and display the US map
    d3.json("https://d3js.org/us-10m.v1.json").then(us => {
        svg.append("g")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.states).features)
            .enter().append("path")
            .attr("d", path)
            .attr("fill", "#ccc");

        // Add Starbucks locations
        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => projection([d.longitude, d.latitude])[0])
            .attr("cy", d => projection([d.longitude, d.latitude])[1])
            .attr("r", 3)
            .attr("fill", "green");

        // Add annotations
        const annotations = [
            {
                note: { label: "Highest Density of Stores", title: "California" },
                x: projection([-119.4179, 36.7783])[0], y: projection([-119.4179, 36.7783])[1],
                dy: -30, dx: 30
            },
            {
                note: { label: "Second Highest Density of Stores", title: "New York" },
                x: projection([-74.0059, 40.7128])[0], y: projection([-74.0059, 40.7128])[1],
                dy: -30, dx: 30
            }
        ];

        const makeAnnotations = d3.annotation()
            .type(d3.annotationLabel)
            .annotations(annotations);

        svg.append("g")
            .call(makeAnnotations);

        // Scene transitions
        let scene = 1;

        const updateScene = () => {
            if (scene === 1) {
                svg.selectAll("circle")
                    .transition()
                    .duration(1000)
                    .attr("r", 3)
                    .attr("fill", "green");
            } else if (scene === 2) {
                svg.selectAll("circle")
                    .transition()
                    .duration(1000)
                    .attr("r", d => d.state === "CA" ? 6 : 3)
                    .attr("fill", d => d.state === "CA" ? "blue" : "green");
            } else if (scene === 3) {
                svg.selectAll("circle")
                    .transition()
                    .duration(1000)
                    .attr("r", d => d.state === "NY" ? 6 : 3)
                    .attr("fill", d => d.state === "NY" ? "red" : "green");
            }
        };

        // Trigger transitions
        d3.select("body").on("click", () => {
            scene = (scene % 3) + 1;
            updateScene();
        });
    });
});
