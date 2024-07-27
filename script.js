// Load the dataset
d3.csv('all_seasons.csv').then(data => {
    // Convert data types
    data.forEach(d => {
      d.age = +d.age;
      d.player_height = +d.player_height;
      d.player_weight = +d.player_weight;
      d.pts = +d.pts;
    });
  
    // Log data to ensure it's being loaded correctly
    console.log("Loaded Data:", data);
  
    // Parameters
    let currentScene = 0;
  
    // Define the scenes
    const scenes = [
      { 
        title: "Scene 1: Player Age vs Points",
        x: "age", 
        y: "pts", 
        annotation: "This scene shows the relationship between player age and average points per game."
      },
      { 
        title: "Scene 2: Player Height vs Points",
        x: "player_height", 
        y: "pts", 
        annotation: "This scene shows the relationship between player height and average points per game."
      },
      { 
        title: "Scene 3: Player Weight vs Points",
        x: "player_weight", 
        y: "pts", 
        annotation: "This scene shows the relationship between player weight and average points per game."
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
  
      // Create scales
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
  
    // Interactive part
    d3.select("#interactive").on("click", () => {
      // Clear existing content
      d3.select("#visualization").html("");
  
      // Create form for user input
      const form = d3.select("#visualization").append("div")
        .attr("id", "form");
  
      form.append("label").text("X-axis: ");
      const xInput = form.append("select")
        .attr("id", "x-axis");
  
      xInput.selectAll("option")
        .data(["age", "player_height", "player_weight"])
        .enter().append("option")
        .attr("value", d => d)
        .text(d => d);
  
      form.append("label").text(" Y-axis: ");
      const yInput = form.append("select")
        .attr("id", "y-axis");
  
      yInput.selectAll("option")
        .data(["pts"])
        .enter().append("option")
        .attr("value", d => d)
        .text(d => d);
  
      form.append("button")
        .text("Update")
        .on("click", () => {
          const xAxis = d3.select("#x-axis").node().value;
          const yAxis = d3.select("#y-axis").node().value;
  
          // Update the chart based on user input
          updateCustomScene(xAxis, yAxis);
        });
    });
  
    // Function to update the custom scene
    function updateCustomScene(x, y) {
      // Clear existing content
      d3.select("#visualization").html("");
  
      // Create SVG
      const svg = d3.select("#visualization").append("svg")
        .attr("width", 600)
        .attr("height", 400);
  
      // Create scales
      const xScale = d3.scaleLinear()
        .domain([d3.min(data, d => d[x]), d3.max(data, d => d[x])])
        .range([40, 560]);
  
      const yScale = d3.scaleLinear()
        .domain([d3.min(data, d => d[y]), d3.max(data, d => d[y])])
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
        .attr("cx", d => xScale(d[x]))
        .attr("cy", d => yScale(d[y]))
        .attr("r", 3)
        .attr("fill", "steelblue");
    }
  }).catch(error => {
    console.error("Error loading the data: ", error);
  });
  