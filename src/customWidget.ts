import { Widget } from '@lumino/widgets';
import * as d3 from 'd3';
import {INotebookTracker} from '@jupyterlab/notebook';
import {KernelConnection} from '@jupyterlab/services';

export function createCustomWidget(): Widget {
  const widget = new Widget();
  widget.id = 'custom-widget';
  createTitle(widget);
  visualizeTS(widget);
  return widget;
}

function visualizeTS(widget: Widget): void {
  // Declare the chart dimensions and margins.
  const width = 400;
  const height = 200;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;
  // Declare the x (horizontal position) scale.
  const x = d3.scaleUtc()
    .domain([new Date("2023-01-01"), new Date("2024-01-01")])
    .range([marginLeft, width - marginRight]);
  // Declare the y (vertical position) scale.
  const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height - marginBottom, marginTop]);
  // add SVG element
  const svg = d3.select(widget.node).append('svg')
    .attr('width', width)
    .attr('height', height)
  // Add the x-axis.
  svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x));
  // Add the y-axis.
  svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));
}

function createTitle(widget: Widget): void {
  const title = document.createElement('h1');
  title.textContent = "TSAssistant"
  widget.node.appendChild(title);
}

// Establishing a connection to the kernel
function createConnection(){

}