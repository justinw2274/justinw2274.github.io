// Load the dataset
d3.csv('https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv').then(data => {

    // Parameters
    let currentScene = 0;
    
    // Define the scenes
    const scenes = [
      { 
        title: "Scene 1: Sepal Dimensions",
        x: "sepal_length", 
        y: "sepal_width", 
        annotation: "This scene shows the relationship between sepal length and sepal width for the three species of Iris."
      },
      { 
        title: "Scene 2: Petal Dimensions",
        x: "petal_length", 
        y: "petal_width", 
        annotation: "This scene shows the relationship between petal length and petal width for the three species of Iris."
      },
      { 
        title: "Scene 3: Sepal vs Petal Length",
        x: "sepal_length", 
        y: "petal_length", 
        annotation: "This scene shows the relationship between sepal length and petal length for the three species of Iris."
      }
    ];
    
    // Function to update the scene
    function updateScene() {
      console.log(`Updating to scene ${currentScene + 1}`);
      const scene = scenes[currentScene];
      
      // Clear existing content
      d3.select("#visualization").html("");
  
      // Create SVG
      const svg = d3.select("#visualization").append("svg")
        .attr("width", 600)
        .attr("height", 400);
      
      // Create scales
      const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => +d[scene.x]))
        .range([40, 560]);
      
      const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => +d[scene.y]))
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
        .attr("cx", d => xScale(+d[scene.x]))
        .attr("cy", d => yScale(+d[scene.y]))
        .attr("r", 3)
        .style("fill", d => {
          if (d.species === "setosa") return "red";
          else if (d.species === "versicolor") return "green";
          else return "blue";
        });
  
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
      console.log(`Changing to scene ${currentScene + 1}`);
      updateScene();
    }
  
    // Initial scene
    updateScene();
  
    // Add event listeners for navigation
    d3.select("#next").on("click", () => {
      console.log("Next button clicked");
      changeScene(1);
    });
    d3.select("#prev").on("click", () => {
      console.log("Previous button clicked");
      changeScene(-1);
    });
  });
  
  