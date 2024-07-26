// Load the dataset
d3.csv('https://raw.githubusercontent.com/datasets/population/master/data/population.csv').then(data => {

    // Filter data for a specific year (e.g., 2017)
    data = data.filter(d => d.Year === '2017');

    // Log the data to check its structure
    console.log("Filtered Data:", data);

    // Parameters
    let currentScene = 0;

    // Define the scenes
    const scenes = [
        { 
            title: "Scene 1: Population vs Country",
            x: "Country Name", 
            y: "Value", 
            annotation: "This scene shows the population of various countries in 2017.",
            isBarChart: true
        }
    ];

    // Function to update the scene
    function updateScene() {
        const scene = scenes[currentScene];

        // Clear existing content
        d3.select("#visualization").html("");

        // Create SVG
        const svg = d3.select("#visualization").append("svg")
            .attr("width", 800)
            .attr("height", 600);

        if (scene.isBarChart) {
            // Create scales for bar chart
            const xScale = d3.scaleBand()
                .domain(data.map(d => d[scene.x]))
                .range([40, 760])
                .padding(0.1);

            const yScale = d3.scaleLinear()
                .domain([0, d3.max(data, d => +d[scene.y])])
                .range([560, 40]);

            // Create axes
            svg.append("g")
                .attr("transform", "translate(0,560)")
                .call(d3.axisBottom(xScale).tickFormat((d, i) => i % 5 === 0 ? d : ""));

            svg.append("g")
                .attr("transform", "translate(40,0)")
                .call(d3.axisLeft(yScale));

            // Add bars
            svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", d => xScale(d[scene.x]))
                .attr("y", d => yScale(+d[scene.y]))
                .attr("width", xScale.bandwidth())
                .attr("height", d => 560 - yScale(+d[scene.y]))
                .attr("fill", "steelblue");

        } else {
            // Create scales for scatter plot
            const xScale = d3.scaleLinear()
                .domain([0, d3.max(data, d => +d[scene.x])])
                .range([40, 760]);

            const yScale = d3.scaleLinear()
                .domain([0, d3.max(data, d => +d[scene.y])])
                .range([560, 40]);

            // Create axes
            svg.append("g")
                .attr("transform", "translate(0,560)")
                .call(d3.axisBottom(xScale));

            svg.append("g")
                .attr("transform", "translate(40,0)")
                .call(d3.axisLeft(yScale));

            // Add points
            svg.selectAll(".point")
                .data(data)
                .enter().append("circle")
                .attr("class", "point")
                .attr("cx", d => xScale(+d[scene.x]))
                .attr("cy", d => yScale(+d[scene.y]))
                .attr("r", 3)
                .attr("fill", "steelblue");
        }

        // Add annotation
        svg.append("text")
            .attr("x", 50)
            .attr("y", 50)
            .text(scene.annotation)
            .attr("class", "annotation");
    }

    // Function to handle scene change
    function changeScene(step) {
        currentScene = (currentScene + step + scenes.length) % scenes.length;
        updateScene();
    }

    // Initial scene
    updateScene();

    // Add event listeners for navigation
    d3.select("#next").on("click", () => changeScene(1));
    d3.select("#prev").on("click", () => changeScene(-1));
}).catch(error => {
    console.error("Error loading the CSV file:", error);
});

  
  
  
  
  