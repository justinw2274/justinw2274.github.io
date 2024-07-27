// Load the dataset
d3.csv('https://raw.githubusercontent.com/fivethirtyeight/data/master/nba-elo/nbaallelo.csv').then(data => {

    // Filter data for a specific year (e.g., 2017)
    data = data.filter(d => +d.year_id === 2017);
  
    // Log data to ensure it's being loaded correctly
    console.log("Filtered Data:", data);
  
    // Parameters
    let currentScene = 0;
  
    // Define the scenes
    const scenes = [
      { 
        title: "Scene 1: Points vs Assists",
        x: "pts", 
        y: "ast", 
        annotation: "This scene shows the relationship between player points and assists for the 2017 season."
      },
      { 
        title: "Scene 2: Points vs Rebounds",
        x: "pts", 
        y: "trb", 
        annotation: "This scene shows the relationship between player points and total rebounds for the 2017 season."
      },
      { 
        title: "Scene 3: Player Efficiency Rating",
        x: "player", 
        y: "per", 
        annotation: "This scene shows the Player Efficiency Rating (PER) for players in the 2017 season.",
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
        .attr("width", 600)
        .attr("height", 400);
  
      if (scene.isBarChart) {
        // Create scales for bar chart
        const xScale = d3.scaleBand()
          .domain(data.map(d => d[scene.x]))
          .range([40, 560])
          .padding(0.1);
  
        const yScale = d3.scaleLinear()
          .domain([0, d3.max(data, d => +d[scene.y])])
          .range([360, 40]);
  
        // Log scales to ensure they are created correctly
        console.log("xScale domain:", xScale.domain());
        console.log("yScale domain:", yScale.domain());
  
        // Create axes
        svg.append("g")
          .attr("transform", "translate(0,360)")
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
          .attr("height", d => 360 - yScale(+d[scene.y]))
          .attr("fill", "steelblue");
  
      } else {
        // Create scales for scatter plot
        const xScale = d3.scaleLinear()
          .domain([0, d3.max(data, d => +d[scene.x])])
          .range([40, 560]);
  
        const yScale = d3.scaleLinear()
          .domain([0, d3.max(data, d => +d[scene.y])])
          .range([360, 40]);
  
        // Log scales to ensure they are created correctly
        console.log("xScale domain:", xScale.domain());
        console.log("yScale domain:", yScale.domain());
  
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
          .attr("cx", d => xScale(+d[scene.x]))
          .attr("cy", d => yScale(+d[scene.y]))
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
  