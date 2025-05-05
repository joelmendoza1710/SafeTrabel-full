import { Component, Input, ViewChild, type ElementRef, type AfterViewInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import * as d3 from "d3"

@Component({
  selector: "app-line-chart",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-container">
      <svg #chart class="w-full h-64"></svg>
    </div>
  `,
})
export class LineChartComponent implements AfterViewInit {
  @Input() data: any[] = []
  @ViewChild("chart") private chartContainer!: ElementRef

  ngAfterViewInit(): void {
    this.createChart()
  }

  private createChart(): void {
    const element = this.chartContainer.nativeElement
    const svg = d3.select(element)

    // Clear any previous chart
    svg.selectAll("*").remove()

    // Set dimensions
    const width = element.clientWidth
    const height = element.clientHeight
    const margin = { top: 20, right: 30, bottom: 40, left: 40 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // Create scales
    const x = d3
      .scaleBand()
      .domain(this.data.map((d) => d.month))
      .range([0, innerWidth])
      .padding(0.1)

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(this.data, (d) => d.reseñas) || 0])
      .nice()
      .range([innerHeight, 0])

    // Create the chart group
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    // Add the x-axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "middle")
      .attr("fill", "#666")

    // Add the y-axis
    g.append("g").call(d3.axisLeft(y).ticks(5)).selectAll("text").attr("fill", "#666")

    // Add grid lines
    g.append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(y)
          .ticks(5)
          .tickSize(-innerWidth)
          .tickFormat(() => ""),
      )
      .selectAll("line")
      .attr("stroke", "#e5e7eb")
      .attr("stroke-opacity", 0.7)

    // Create the line
    const line = d3
      .line<any>()
      .x((d) => (x(d.month) || 0) + x.bandwidth() / 2)
      .y((d) => y(d.reseñas))
      .curve(d3.curveMonotoneX)

    // Add the line path
    g.append("path")
      .datum(this.data)
      .attr("fill", "none")
      .attr("stroke", "#10b981")
      .attr("stroke-width", 2.5)
      .attr("d", line)

    // Add dots
    g.selectAll(".dot")
      .data(this.data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => (x(d.month) || 0) + x.bandwidth() / 2)
      .attr("cy", (d) => y(d.reseñas))
      .attr("r", 4)
      .attr("fill", "#10b981")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2)
  }
}
