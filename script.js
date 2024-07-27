// Load the dataset
d3.csv('all_seasons.csv').then(data => {
    // Process data if needed
    data.forEach(d => {
        d.age = +d.age;
        d.player_height = +d.player_height;
        d.player_weight = +d.player_weight;
        d.pts = +d.pts;
        d.reb = +d.reb;
        d.ast = +d.ast;
    });

    // Initial parameters
    let currentScene = 1;

    // Create the initial scene
    createScene(data, currentScene);

    // Function to create a scene
    function createScene(data, sceneNumber) {
        // Clear previous content
        d3.select("#chart").html("");
        d3.select("#controls").html("");

        const margin = {top: 40, right: 40, bottom: 60, left: 60};
        const width = 760 - margin.left - margin.right;
        const height = 480 - margin.top - margin.bottom;

        const svg = d3.select("#chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        let x, y, xLabel, yLabel, title;

        if (sceneNumber === 1) {
            x = d3.scaleLinear().domain(d3.extent(data, d => d.age)).range([0, width]);
            y = d3.scaleLinear().domain(d3.extent(data, d => d.pts)).range([height, 0]);
            xLabel = "Age";
            yLabel = "Points";
            title = "Age vs Points";
        } else if (sceneNumber === 2) {
            x = d3.scaleLinear().domain(d3.extent(data, d => d.player_height)).range([0, width]);
            y = d3.scaleLinear().domain(d3.extent(data, d => d.reb)).range([height, 0]);
            xLabel = "Height (cm)";
            yLabel = "Rebounds";
            title = "Height vs Rebounds";
        } else if (sceneNumber === 3) {
            x = d3.scaleLinear().domain(d3.extent(data, d => d.player_weight)).range([0, width]);
            y = d3.scaleLinear().domain(d3.extent(data, d => d.ast)).range([height, 0]);
            xLabel = "Weight (kg)";
            yLabel = "Assists";
            title = "Weight vs Assists";
        }

        svg.selectAll("circle")
            .data(data)
            .enter().append("circle")
            .attr("cx", d => x(d[xLabel === "Age" ? "age" : xLabel === "Height (cm)" ? "player_height" : "player_weight"]))
            .attr("cy", d => y(d[yLabel === "Points" ? "pts" : yLabel === "Rebounds" ? "reb" : "ast"]))
            .attr("r", 5)
            .style("fill", sceneNumber === 1 ? "steelblue" : sceneNumber === 2 ? "orange" : "green");

        // Add X axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        // Add Y axis
        svg.append("g")
            .call(d3.axisLeft(y));

        // Add X axis label
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .text(xLabel);

        // Add Y axis label
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -height / 2)
            .text(yLabel);

        // Add title
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", -margin.top / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text(title);

        // Add annotations
        const annotations = [
            {
                note: { label: title },
                x: x(d3.mean(data, d => d[xLabel === "Age" ? "age" : xLabel === "Height (cm)" ? "player_height" : "player_weight"])),
                y: y(d3.mean(data, d => d[yLabel === "Points" ? "pts" : yLabel === "Rebounds" ? "reb" : "ast"])),
                dy: -100,
                dx: 100
            }
        ];

        const makeAnnotations = d3.annotation()
            .annotations(annotations);

        svg.append("g")
            .attr("class", "annotation-group")
            .call(makeAnnotations);

        // Add transition button
        if (sceneNumber < 3) {
            d3.select("#controls").append("button")
                .text("Next")
                .on("click", () => {
                    currentScene++;
                    createScene(data, currentScene);
                });
        } else if (sceneNumber === 3) {
            d3.select("#controls").append("button")
                .text("Explore")
                .on("click", () => {
                    createExplorationScene(data);
                });
        }
    }

    function createExplorationScene(data) {
        // Clear previous content
        d3.select("#chart").html("");
        d3.select("#controls").html("");

        const margin = {top: 40, right: 40, bottom: 60, left: 60};
        const width = 760 - margin.left - margin.right;
        const height = 480 - margin.top - margin.bottom;

        const svg = d3.select("#chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleLinear().domain(d3.extent(data, d => d.age)).range([0, width]);
        const y = d3.scaleLinear().domain(d3.extent(data, d => d.pts)).range([height, 0]);

        svg.selectAll("circle")
            .data(data)
            .enter().append("circle")
            .attr("cx", d => x(d.age))
            .attr("cy", d => y(d.pts))
            .attr("r", 5)
            .style("fill", "steelblue");

        // Add X axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        // Add Y axis
        svg.append("g")
            .call(d3.axisLeft(y));

        // Add X axis label
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .text("Age");

        // Add Y axis label
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -height / 2)
            .text("Points");

        // Add title
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", -margin.top / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Explore: Age vs Points");

        // Add interactive controls
        d3.select("#controls").append("label").text("Age: ");
        d3.select("#controls").append("input")
            .attr("type", "range")
            .attr("min", d3.min(data, d => d.age))
            .attr("max", d3.max(data, d => d.age))
            .attr("value", d3.mean(data, d => d.age))
            .on("input", function() {
                const value = +this.value;
                svg.selectAll("circle")
                    .style("opacity", d => d.age > value ? 0.1 : 1);
            });
    }
});