// Load the dataset
d3.csv('all_seasons.csv').then(data => {
    // Process data
    data.forEach(d => {
        d.age = +d.age;
        d.player_height = +d.player_height;
        d.player_weight = +d.player_weight;
        d.pts = +d.pts;
        d.reb = +d.reb;
        d.ast = +d.ast;
    });

    let currentScene = 1;
    createScene(data, currentScene);

    function createScene(data, sceneNumber) {
        d3.select("#chart-container").html("");
        d3.select("#controls").html("");

        const margin = {top: 40, right: 40, bottom: 60, left: 60};
        const width = 800 - margin.left - margin.right;
        const height = 480 - margin.top - margin.bottom;

        const svg = d3.select("#chart-container").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        let x, y, xLabel, yLabel, annotation, annotationTextPosition, annotationLineEnd;

        if (sceneNumber === 1) {
            x = d3.scaleLinear().domain(d3.extent(data, d => d.age)).range([0, width]);
            y = d3.scaleLinear().domain([0, d3.max(data, d => d.pts)]).range([height, 0]);
            xLabel = "Age";
            yLabel = "Points per Game";
            annotation = "Players in their mid-20s tend to score the most points";
            annotationTextPosition = {x: width - 200, y: 50}; // Adjusted position of the annotation text
            annotationLineEnd = {x: 27, y: 32}; // Point where the line should end
        } else if (sceneNumber === 2) {
            x = d3.scaleLinear().domain(d3.extent(data, d => d.player_height)).range([0, width]);
            y = d3.scaleLinear().domain([0, d3.max(data, d => d.pts)]).range([height, 0]);
            xLabel = "Height (cm)";
            yLabel = "Points per Game";
            annotation = "Height doesn't strongly correlate with points";
            annotationTextPosition = {x: width - 200, y: 50}; // Adjust as needed
            annotationLineEnd = {x: 200, y: 25}; // Adjust as needed
        } else if (sceneNumber === 3) {
            x = d3.scaleLinear().domain(d3.extent(data, d => d.player_weight)).range([0, width]);
            y = d3.scaleLinear().domain([0, d3.max(data, d => d.pts)]).range([height, 0]);
            xLabel = "Weight (kg)";
            yLabel = "Points per Game";
            annotation = "Weight doesn't strongly correlate with points";
            annotationTextPosition = {x: width - 200, y: 50}; // Adjust as needed
            annotationLineEnd = {x: 100, y: 25}; // Adjust as needed
        }

        svg.selectAll("circle")
            .data(data)
            .enter().append("circle")
            .attr("cx", d => x(d[xLabel === "Age" ? "age" : xLabel === "Height (cm)" ? "player_height" : "player_weight"]))
            .attr("cy", d => y(d.pts))
            .attr("r", 3)
            .style("fill", "steelblue")
            .style("opacity", 0.5);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .call(d3.axisLeft(y));

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .text(xLabel);

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -height / 2)
            .text(yLabel);

        // Add annotation text
        svg.append("text")
            .attr("x", annotationTextPosition.x)
            .attr("y", annotationTextPosition.y)
            .attr("text-anchor", "start")
            .style("font-style", "italic")
            .text(annotation);

        // Add annotation line
        svg.append("line")
            .attr("x1", x(annotationLineEnd.x))
            .attr("y1", y(annotationLineEnd.y))
            .attr("x2", annotationTextPosition.x - 10)
            .attr("y2", annotationTextPosition.y - 5)
            .attr("stroke", "black")
            .attr("stroke-dasharray", "5,5");

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
                .on("click", () => createExplorationScene(data));
        }
    }

    function createExplorationScene(data) {
        d3.select("#chart-container").html("");
        d3.select("#controls").html("");

        const margin = {top: 40, right: 40, bottom: 60, left: 60};
        const width = 800 - margin.left - margin.right;
        const height = 480 - margin.top - margin.bottom;

        const svg = d3.select("#chart-container").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        let x = d3.scaleLinear().domain(d3.extent(data, d => d.age)).range([0, width]);
        let y = d3.scaleLinear().domain([0, d3.max(data, d => d.pts)]).range([height, 0]);

        const xAxis = svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        const yAxis = svg.append("g")
            .call(d3.axisLeft(y));

        const xLabel = svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .text("Age");

        const yLabel = svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -height / 2)
            .text("Points per Game");

        const circles = svg.selectAll("circle")
            .data(data)
            .enter().append("circle")
            .attr("r", 3)
            .style("fill", "steelblue")
            .style("opacity", 0.5);

        function updateChart() {
            const xValue = d3.select("#x-axis").property("value");
            const yValue = d3.select("#y-axis").property("value");

            x = d3.scaleLinear().domain(d3.extent(data, d => d[xValue])).range([0, width]);
            y = d3.scaleLinear().domain([0, d3.max(data, d => d[yValue])]).range([height, 0]);

            xAxis.transition().duration(1000).call(d3.axisBottom(x));
            yAxis.transition().duration(1000).call(d3.axisLeft(y));

            circles.transition().duration(1000)
                .attr("cx", d => x(d[xValue]))
                .attr("cy", d => y(d[yValue]));

            xLabel.text(xValue.replace(/_/g, ' '));
            yLabel.text(yValue.replace(/_/g, ' '));
        }

        const controls = d3.select("#controls");
        
        controls.append("label").text("X-axis: ");
        controls.append("select").attr("id", "x-axis")
            .selectAll("option")
            .data(["age", "player_height", "player_weight"])
            .enter().append("option")
            .text(d => d.replace(/_/g, ' '))
            .attr("value", d => d);

        controls.append("label").text(" Y-axis: ");
        controls.append("select").attr("id", "y-axis")
            .selectAll("option")
            .data(["pts", "reb", "ast"])
            .enter().append("option")
            .text(d => d.replace(/_/g, ' '))
            .attr("value", d => d);

        d3.selectAll("select").on("change", updateChart);

        updateChart();
    }
});
