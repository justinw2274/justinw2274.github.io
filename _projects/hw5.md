---
layout: default
title: "UFO Sighting Visualizations"
---

<div class="proj-header">
  <h1>UFO Visualizations</h1>
  <p>This project uses Python and Altair to create two visualizations from a UFO sightings dataset. One visualization explores the geospatial distribution of sightings, while the other examines the frequency of different UFO shapes.</p>
</div>

<div class="proj-section">
  <h2>Scatter Plot of UFO Sightings</h2>
  <p>
    Here, I provide a geospatial scatter plot wherein I plot the reported UFO sightings against their latitude and longitude coordinates. The map provides a spatial indication of where the sightings are occurring, and therefore it is easy for one to identify clusters and trends in different geographical locations. For the design, I employed quantitative encodings for both axes (longitude for x-axis and latitude for y-axis) to place each sighting on the map accordingly. I quantified the datetime variable as a temporal field with a sequential color scheme (inferno) that encodes sightings over time by mapping darker colors to more recent incidents and lighter colors to older incidents. On the analysis end, I broke up the raw date strings into actual datetime objects and excluded any records missing coordinate or date information for the sake of data integrity. While the story itself depends on tooltips to provide interactivity through the display of the precise date and coordinate information on hovering over any point, the latter function takes learning to another level by providing viewers with more context without taking up visual space.
  </p>
  <!-- Embed the scatter plot visualization -->
  <iframe src="/assets/scatter_plot.html" width="600" height="400" frameborder="0"></iframe>
</div>

<div class="proj-section">
  <h2>Barchart of UFO Shapes</h2>
  <p>
    The second plot discloses the categorical organization of the UFO data by means of a bar graph that is used to portray the frequency of shapes in the UFO sightings. It shifts the focus from spatial-temporal patterns to an investigation of the heterogeneity found in shapes. While creating this chart, I grouped the data based on counted frequency of each and every shape, i.e., raw data converted into tabulated form with most and least frequent shapes. The category variable (category of UFO) is plotted on the x-axis and quantitative value for UFO sighting on the y-axis such that comparison is simple across categories. For better readability and user interaction, I used interactive hover effect: when you hover over one single bar, it becomes highlighted in steelblue and other bars light grayed. This interactivity allows users to highlight one single category instantly, and better readability and comparison of values of different shapes are possible. Data transformation step included splitting the data set by 'shape' column and resetting index so that it would be available for visualization to aggregate properly and as accurately as possible.
  </p>
  <!-- Embed the bar chart visualization -->
  <iframe src="/assets/bar_chart.html" width="600" height="400" frameborder="0"></iframe>
</div>

<div class="proj-links">
  <a href="https://github.com/UIUC-iSchool-DataViz/is445_data/raw/main/ufo-scrubbed-geocoded-time-standardized-00.csv" class="proj-btn">The Data</a>
  <a href="https://github.com/justinw2274/justinw2274.github.io/_projects/main/Workbook.ipynb" class="proj-btn">The Analysis</a>
</div>
