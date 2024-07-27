// Define the car dataset
const carData = [
    { name: "Ford", mpg: 25, hp: 120 },
    { name: "Chevy", mpg: 20, hp: 130 },
    { name: "Toyota", mpg: 35, hp: 100 },
    { name: "Honda", mpg: 30, hp: 110 },
    { name: "BMW", mpg: 15, hp: 150 },
    { name: "Mercedes", mpg: 10, hp: 200 },
  ];
  
  // Parameters
  let currentScene = 0;
  
  // Define the scenes
  const scenes = [
    { 
      title: "Scene 1: MPG vs Horsepower",
      x: "mpg", 
      y: "hp", 
      annotation: "This scene shows the relationship between miles per gallon (MPG) and horsepower (HP)."
    },
    { 
      title: "Scene 2: MPG Bar Chart",
      x: "name", 
      y: "mpg", 
      annotation: "This scene shows the miles per gallon (MPG) for different car brands.",
      isBarChart: true
    },
    { 
      title: "Scene 3: Horsepower Bar Chart",
      x: "name", 
      y: "hp", 
      annotation: "This scene shows the horsepower (HP) for different car brands.",
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
        .domain(carData.map(d => d[scene.x]))
        .range([40, 560])
        .padding(0.1);
  
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(carData, d => +d[scene.y])])
        .range([360, 40]);
  
      // Create axes
      svg.append("g")
        .attr("transform", "translate(0,360)")
        .call(d3.axisBottom(xScale));
  
      svg.append("g")
        .attr("transform", "translate(40,0)")
        .call(d3.axisLeft(yScale));
  
      // Add bars
      svg.selectAll(".bar")
        .data(carData)
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
        .domain([0, d3.max(carData, d => +d[scene.x])])
        .range([40, 560]);
  
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(carData, d => +d[scene.y])])
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
        .data(carData)
        .enter().append("circle")
        .attr("class", "point")
        .attr("cx", d => xScale(+d[scene.x]))
        .attr("cy", d => yScale(+d[scene.y]))
        .attr("r", 5)
        .attr("fill", "steelblue");
    }
  
    // Add annotation
    if (d3.annotation) {
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
  