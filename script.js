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
    createScene1(data);

    // Function to create Scene 1
    function createScene1(data) {
        const svg = d3.select("#chart1").append("svg")
            .attr("width", 800)
            .attr("height", 500);

        // Create scatter plot for Age vs Points
        const x = d3.scaleLinear().domain(d3.extent(data, d => d.age)).range([50, 750]);
        const y = d3.scaleLinear().domain(d3.extent(data, d => d.pts)).range([450, 50]);

        svg.selectAll("circle")
            .data(data)
            .enter().append("circle")
            .attr("cx", d => x(d.age))
            .attr("cy", d => y(d.pts))
            .attr("r", 5)
            .style("fill", "steelblue");

        // Add annotations
        const annotations = [
            {
                note: { label: "Age vs Points" },
                x: 100, y: 100,
                dy: -30, dx: 30
            }
        ];

        const makeAnnotations = d3.annotation()
            .annotations(annotations);

        svg.append("g")
            .attr("class", "annotation-group")
            .call(makeAnnotations);

        // Add transition button
        d3.select("#controls").append("button")
            .text("Next")
            .on("click", () => {
                currentScene++;
                updateScene(data);
            });
    }

    // Function to create Scene 2
    function createScene2(data) {
        d3.select("#chart1").select("svg").remove();
        const svg = d3.select("#chart2").append("svg")
            .attr("width", 800)
            .attr("height", 500);

        // Create scatter plot for Height vs Rebounds
        const x = d3.scaleLinear().domain(d3.extent(data, d => d.player_height)).range([50, 750]);
        const y = d3.scaleLinear().domain(d3.extent(data, d => d.reb)).range([450, 50]);

        svg.selectAll("circle")
            .data(data)
            .enter().append("circle")
            .attr("cx", d => x(d.player_height))
            .attr("cy", d => y(d.reb))
            .attr("r", 5)
            .style("fill", "orange");

        // Add annotations
        const annotations = [
            {
                note: { label: "Height vs Rebounds" },
                x: 100, y: 100,
                dy: -30, dx: 30
            }
        ];

        const makeAnnotations = d3.annotation()
            .annotations(annotations);

        svg.append("g")
            .attr("class", "annotation-group")
            .call(makeAnnotations);

        // Add transition button
        d3.select("#controls").append("button")
            .text("Next")
            .on("click", () => {
                currentScene++;
                updateScene(data);
            });
    }

    // Function to create Scene 3
    function createScene3(data) {
        d3.select("#chart2").select("svg").remove();
        const svg = d3.select("#chart3").append("svg")
            .attr("width", 800)
            .attr("height", 500);

        // Create scatter plot for Weight vs Assists
        const x = d3.scaleLinear().domain(d3.extent(data, d => d.player_weight)).range([50, 750]);
        const y = d3.scaleLinear().domain(d3.extent(data, d => d.ast)).range([450, 50]);

        svg.selectAll("circle")
            .data(data)
            .enter().append("circle")
            .attr("cx", d => x(d.player_weight))
            .attr("cy", d => y(d.ast))
            .attr("r", 5)
            .style("fill", "green");

        // Add annotations
        const annotations = [
            {
                note: { label: "Weight vs Assists" },
                x: 100, y: 100,
                dy: -30, dx: 30
            }
        ];

        const makeAnnotations = d3.annotation()
            .annotations(annotations);

        svg.append("g")
            .attr("class", "annotation-group")
            .call(makeAnnotations);

        // Add transition button
        d3.select("#controls").append("button")
            .text("Explore")
            .on("click", () => {
                currentScene++;
                updateScene(data);
            });
    }

    // Function to update the scene
    function updateScene(data) {
        if (currentScene === 2) {
            createScene2(data);
        } else if (currentScene === 3) {
            createScene3(data);
        } else if (currentScene === 4) {
            // Allow user to manipulate parameters
            d3.select("#chart3").select("svg").remove();
            d3.select("#controls").html("");

            const svg = d3.select("#chart3").append("svg")
                .attr("width", 800)
                .attr("height", 500);

            // Create scatter plot for Age vs Points with interactive controls
            const x = d3.scaleLinear().domain(d3.extent(data, d => d.age)).range([50, 750]);
            const y = d3.scaleLinear().domain(d3.extent(data, d => d.pts)).range([450, 50]);

            svg.selectAll("circle")
                .data(data)
                .enter().append("circle")
                .attr("cx", d => x(d.age))
                .attr("cy", d => y(d.pts))
                .attr("r", 5)
                .style("fill", "steelblue");

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
    }
});