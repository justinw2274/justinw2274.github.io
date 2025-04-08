---
name: UFO Sighting Visualizations
tools: [Python, HTML, altair, vega-lite]
image: assets/pngs/ufo_thumb.png
description: An exploration of UFO sightings using Python and Altair, featuring a geospatial scatter plot and a bar chart of UFO shapes.
custom_js:
  - vega.min
  - vega-lite.min
  - vega-embed.min
  - justcharts
permalink: /projects/ufo
---

## UFO Sighting Visualizations

This page presents two visualizations created using Python and Altair based on a UFO sightings dataset. One visualization maps the geospatial distribution of sightings, while the other examines the frequency distribution of different UFO shapes.

---

###  Viz 1: Scatter Plot of UFO Sightings

<iframe src="/assets/scatter_plot.html" width="100%" height="600" style="border:none;"></iframe>

<p style="font-size:16px;">
Here, I provide a geospatial scatter plot wherein I plot the reported UFO sightings against their latitude and longitude coordinates. The map provides a spatial indication of where sightings occur, making it easy to identify clusters and geographical trends. I encoded the datetime variable as a temporal field using the inferno sequential color scheme, mapping darker hues to more recent sightings and lighter hues to older ones. In my analysis, I parsed raw date strings into datetime objects and filtered out entries lacking valid coordinate or date information. Interactive tooltips display additional details (date and coordinates) on hover, adding valuable context beyond basic panning and zooming.
</p>
---

### Viz 2: Bar Chart of UFO Shapes

<iframe src="/assets/bar_chart.html" width="100%" height="650" style="border:none;"></iframe>

<p style="font-size:16px;">
The second visualization is a bar chart that shows the frequency distribution of UFO shapes reported in the dataset. I aggregated the data by grouping on the 'shape' column and counting the number of occurrences per shape. The x-axis encodes the categorical variable (UFO shape) while the y-axis displays the number of sightings (a quantitative variable). I chose to keep the base color of each bar clear in order to promote the interactivity feature of the chart. To enhance interactivity, I added a hover effect that highlights an individual bar in steelblue while dimming the others, enabling users to focus on and compare specific categories more effectively. This data transformation step ensures that the visualization accurately presents the most and least frequently reported UFO shapes.
</p>
---

### Links

- [Data](https://github.com/UIUC-iSchool-DataViz/is445_data/raw/main/ufo-scrubbed-geocoded-time-standardized-00.csv)  
- [Python Notebook](https://github.com/justinw2274/justinw2274.github.io/blob/main/Workbook.ipynb)
