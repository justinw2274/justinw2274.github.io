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
        const margin = {top: 20, right: 20, bottom: 50, left: 50};
        const width = 760 - margin.left - margin.right;
        const height = 480 - margin.top - margin.bottom;

        const svg = d3.select("#chart1").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Create scatter plot for Age vs Points
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

        // Add annotations
        const annotations = [
            {
                note: { label: "Age vs Points" },
                x: x(25),
                y: y(20),
                dy: -50, // Move annotation higher
                dx: 50
            }
        ];

        const makeAnnotations = d3.annotation()
            .annotations(annotations);

        svg.append("g")
            .attr("class", "annotation-group")
            .call(makeAnnotations);

        // Add transition button
        d3.select("#controls").html(""); // Clear previous buttons
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
        
        const margin = {top: 20, right: 20, bottom: 50, left: 50};
        const width = 760 - margin.left - margin.right;
        const height = 480 - margin.top - margin.bottom;

        const svg = d3.select("#chart2").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Create scatter plot for Height vs Rebounds
        const x = d3.scaleLinear().domain(d3.extent(data, d => d.player_height)).range([0, width]);
        const y = d3.scaleLinear().domain(d3.extent(data, d => d.reb)).range([height, 0]);

        svg.selectAll("circle")
            .data(data)
            .enter().append("circle")
            .attr("cx", d => x(d.player_height))
            .attr("cy", d => y(d.reb))
            .attr("r", 5)
            .style("fill", "orange");

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
            .text("Height (cm)");

        // Add Y axis label
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -height / 2)
            .text("Rebounds");

        // Add annotations
        const annotations = [
            {
                note: { label: "Height vs Rebounds" },
                x: x(200),
                y: y(8),
                dy: -50, // Move annotation higher
                dx: 50
            }
        ];

        const makeAnnotations = d3.annotation()
            .annotations(annotations);

        svg.append("g")
            .attr("class", "annotation-group")
            .call(makeAnnotations);

        // Add transition button
        d3.select("#controls").html(""); // Clear previous buttons
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
        
        const margin = {top: 20, right: 20, bottom: 50, left: 50};
        const width = 760 - margin.left - margin.right;
        const height = 480 - margin.top - margin.bottom;

        const svg = d3.select("#chart3").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Create scatter plot for Weight vs Assists
        const x = d3.scaleLinear().domain(d3.extent(data, d => d.player_weight)).range([0, width]);
        const y = d3.scaleLinear().domain(d3.extent(data, d => d.ast)).range([height, 0]);

        svg.selectAll("circle")
            .data(data)
            .enter().append("circle")
            .attr("cx", d => x(d.player_weight))
            .attr("cy", d => y(d.ast))
            .attr("r", 5)
            .style("fill", "green");

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
            .text("Weight (kg)");

        // Add Y axis label
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -height / 2)
            .text("Assists");

        // Add annotations
        const annotations = [
            {
                note: { label: "Weight vs Assists" },
                x: x(100),
                y: y(5),
                dy: -50, // Move annotation higher
                dx: 50
            }
        ];

        const makeAnnotations = d3.annotation()
            .annotations(annotations);

        svg.append("g")
            .attr("class", "annotation-group")
            .call(makeAnnotations);

        // Add transition button
        d3.select("#controls").html(""); // Clear previous buttons
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

            const margin = {top: 20, right: 20, bottom: 50, left: 50};
            const width = 760 - margin.left - margin.right;
            const height = 480 - margin.top - margin.bottom;

            const svg = d3.select("#chart3").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            // Create scatter plot for Age vs Points with interactive controls
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