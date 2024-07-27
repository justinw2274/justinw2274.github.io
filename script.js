// Load the dataset
d3.csv('all_seasons.csv').then(data => {
    // Convert data types
    data.forEach(d => {
      d.Age = +d.Age;
      d.G = +d.G;
      d.PTS = +d.PTS;
    });
  
    // Log data to ensure it's being loaded correctly
    console.log("Loaded Data:", data);
  
    // Parameters
    let currentScene = 0;
  
    // Define the scenes
    const scenes = [
      { 
        title: "Scene 1: Player Age vs Points",
        x: "Age", 
        y: "PTS", 
        annotation: "This scene shows the relationship between player age and average points per game."
      },
      { 
        title: "Scene 2: Games Played vs Points",
        x: "G", 
        y: "PTS", 
        annotation: "This scene shows the relationship between the number of games played and average points per game."
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
  }).catch(error => {
    console.error("Error loading the data: ", error);
  });
  