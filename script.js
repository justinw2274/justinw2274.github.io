// Load the dataset
d3.csv('/Users/justinward/Documents/directory.csv').then(data => {

    // Convert data types
    data.forEach(d => {
      d.Longitude = +d.Longitude;
      d.Latitude = +d.Latitude;
    });
  
    // Log data to ensure it's being loaded correctly
    console.log("Loaded Data:", data);
  
    // Parameters
    let currentScene = 0;
  
    // Define the scenes
    const scenes = [
      { 
        title: "Scene 1: Store Locations (Longitude vs Latitude)",
        x: "Longitude", 
        y: "Latitude", 
        annotation: "This scene shows the geographical distribution of stores based on longitude and latitude."
      },
      { 
        title: "Scene 2: Store Distribution by City",
        x: "City", 
        y: "", 
        annotation: "This scene shows the distribution of stores across different cities.",
        isHistogram: true
      }
    ];
  
    // Function to update the scene
    function updateScene() {
      const scene = scenes[currentScene];
  
      // Clear existing content
      d3.select("#visualization").html("");
  
      // Create SVG
      const svg = d3.select("#visualization").append("svg")
        .attr("width", 600)
        .attr("height", 400);
  
      if (scene.isHistogram) {
        // Create histogram
        const values = data.map(d => d[scene.x]);
        const xScale = d3.scaleBand()
          .domain(values)
          .range([40, 560])
          .padding(0.1);
  
        const histogram = d3.rollup(values, v => v.length, d => d);
  
        const yScale = d3.scaleLinear()
          .domain([0, d3.max(histogram.values())])
          .range([360, 40]);
  
        // Create axes
        svg.append("g")
          .attr("transform", "translate(0,360)")
          .call(d3.axisBottom(xScale).tickFormat(d => d.length > 10 ? d.slice(0, 7) + '...' : d));
  
        svg.append("g")
          .attr("transform", "translate(40,0)")
          .call(d3.axisLeft(yScale));
  
        // Add bars
        svg.selectAll(".bar")
          .data(histogram.entries())
          .enter().append("rect")
          .attr("class", "bar")
          .attr("x", d => xScale(d[0]))
          .attr("y", d => yScale(d[1]))
          .attr("width", xScale.bandwidth())
          .attr("height", d => 360 - yScale(d[1]))
          .attr("fill", "steelblue");
  
      } else {
        // Create scales for scatter plot
        const xScale = d3.scaleLinear()
          .domain([d3.min(data, d => d[scene.x]), d3.max(data, d => d[scene.x])])
          .range([40, 560]);
  
        const yScale = d3.scaleLinear()
          .domain([d3.min(data, d => d[scene.y]), d3.max(data, d => d[scene.y])])
          .range([360, 40]);
  
        // Create axes
        svg.append("g")
          .attr("transform", "translate(0,360)")
          .call(d3.axisBottom(xScale));
  
        svg.append("g")
          .attr("transform", "translate(40,0)")
          .call(d3.axisLeft(yScale));
  
        // Add points
        svg.selectAll(".point")
          .data(data)
          .enter().append("circle")
          .attr("class", "point")
          .attr("cx", d => xScale(d[scene.x]))
          .attr("cy", d => yScale(d[scene.y]))
          .attr("r", 3)
          .attr("fill", "steelblue");
      }
  
      // Check if d3.annotation is available
      if (d3.annotation) {
        // Add annotation
        const annotations = [{
          note: { label: scene.annotation },
          x: 100, y: 100,
          dx: 50, dy: -50
        }];
  
        const makeAnnotations = d3.annotation()
          .annotations(annotations)
          .type(d3.annotationLabel)
          .textWrap(200)
          .accessors({
            x: d => d.x,
            y: d => d.y
          })
          .accessorsInverse({
            x: d => d.x,
            y: d => d.y
          });
  
        svg.append("g").call(makeAnnotations);
      } else {
        svg.append("text")
          .attr("x", 50)
          .attr("y", 50)
          .text(scene.annotation)
          .attr("class", "annotation");
      }
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
  });
  