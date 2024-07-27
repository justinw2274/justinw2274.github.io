// Load the data
d3.csv('https://raw.githubusercontent.com/uiuc-cse/data-fa14/gh-pages/data/iris.csv').then(data => {
    // Convert numerical values from strings to numbers
    data.forEach(d => {
        d.sepal_length = +d.sepal_length;
        d.sepal_width = +d.sepal_width;
        d.petal_length = +d.petal_length;
        d.petal_width = +d.petal_width;
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

        // Create scatter plot for Sepal Length vs Sepal Width
        const x = d3.scaleLinear().domain(d3.extent(data, d => d.sepal_length)).range([50, 750]);
        const y = d3.scaleLinear().domain(d3.extent(data, d => d.sepal_width)).range([450, 50]);

        svg.selectAll("circle")
            .data(data)
            .enter().append("circle")
            .attr("cx", d => x(d.sepal_length))
            .attr("cy", d => y(d.sepal_width))
            .attr("r", 5)
            .style("fill", "steelblue");

        // Add annotations
        const annotations = [
            {
                note: { label: "Sepal Length vs Sepal Width" },
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

        // Create scatter plot for Petal Length vs Petal Width
        const x = d3.scaleLinear().domain(d3.extent(data, d => d.petal_length)).range([50, 750]);
        const y = d3.scaleLinear().domain(d3.extent(data, d => d.petal_width)).range([450, 50]);

        svg.selectAll("circle")
            .data(data)
            .enter().append("circle")
            .attr("cx", d => x(d.petal_length))
            .attr("cy", d => y(d.petal_width))
            .attr("r", 5)
            .style("fill", "orange");

        // Add annotations
        const annotations = [
            {
                note: { label: "Petal Length vs Petal Width" },
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

        // Create scatter plot for Sepal Length vs Petal Length
        const x = d3.scaleLinear().domain(d3.extent(data, d => d.sepal_length)).range([50, 750]);
        const y = d3.scaleLinear().domain(d3.extent(data, d => d.petal_length)).range([450, 50]);

        svg.selectAll("circle")
            .data(data)
            .enter().append("circle")
            .attr("cx", d => x(d.sepal_length))
            .attr("cy", d => y(d.petal_length))
            .attr("r", 5)
            .style("fill", "green");

        // Add annotations
        const annotations = [
            {
                note: { label: "Sepal Length vs Petal Length" },
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

            // Create scatter plot for Sepal Length vs Sepal Width with interactive controls
            const x = d3.scaleLinear().domain(d3.extent(data, d => d.sepal_length)).range([50, 750]);
            const y = d3.scaleLinear().domain(d3.extent(data, d => d.sepal_width)).range([450, 50]);

            svg.selectAll("circle")
                .data(data)
                .enter().append("circle")
                .attr("cx", d => x(d.sepal_length))
                .attr("cy", d => y(d.sepal_width))
                .attr("r", 5)
                .style("fill", "steelblue");

            // Add interactive controls
            d3.select("#controls").append("label").text("Sepal Length: ");
            d3.select("#controls").append("input")
                .attr("type", "range")
                .attr("min", d3.min(data, d => d.sepal_length))
                .attr("max", d3.max(data, d => d.sepal_length))
                .attr("value", d3.mean(data, d => d.sepal_length))
                .on("input", function() {
                    const value = +this.value;
                    svg.selectAll("circle")
                        .style("opacity", d => d.sepal_length > value ? 0.1 : 1);
                });
        }
    }
});