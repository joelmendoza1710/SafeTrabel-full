import { Component, Input, ViewChild, type ElementRef, type AfterViewInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import * as d3 from "d3"

@Component({
  selector: "app-radar-chart",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-container">
      <svg #chart class="w-full h-64"></svg>
    </div>
  `,
})
export class RadarChartComponent implements AfterViewInit {
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
    const margin = 40

    // Calculate center and radius
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2 - margin

    // Create the chart group
    const g = svg.append("g").attr("transform", `translate(${centerX},${centerY})`)

    // Scales
    const angleScale = d3
      .scalePoint()
      .domain(this.data.map((d) => d.categoria))
      .range([0, 2 * Math.PI])

    const radiusScale = d3
      .scaleLinear()
      .domain([0, 5]) // Assuming ratings from 0-5
      .range([0, radius])

    // Draw the circles
    const circles = [1, 2, 3, 4, 5]
    circles.forEach((circle) => {
      g.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", radiusScale(circle))
        .attr("fill", "none")
        .attr("stroke", "#e5e7eb")
        .attr("stroke-width", 1)
    })

    // Draw the axis lines
    this.data.forEach((d) => {
      const angle = angleScale(d.categoria) || 0
      const lineX = radius * Math.sin(angle)
      const lineY = -radius * Math.cos(angle)

      g.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", lineX)
        .attr("y2", lineY)
        .attr("stroke", "#e5e7eb")
        .attr("stroke-width", 1)

      // Add labels
      g.append("text")
        .attr("x", (radius + 10) * Math.sin(angle))
        .attr("y", -(radius + 10) * Math.cos(angle))
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", "#666")
        .attr("font-size", "12px")
        .text(d.categoria)
    })

    // Create the radar path
    const radarLine = d3
      .lineRadial<any>()
      .angle((d) => angleScale(d.categoria) || 0)
      .radius((d) => radiusScale(d.valor))
      .curve(d3.curveLinearClosed)

    // Add the radar path
    g.append("path")
      .datum(this.data)
      .attr("d", radarLine)
      .attr("fill", "#10b981")
      .attr("fill-opacity", 0.3)
      .attr("stroke", "#10b981")
      .attr("stroke-width", 2)

    // Add dots
    g.selectAll(".dot")
      .data(this.data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => radiusScale(d.valor) * Math.sin(angleScale(d.categoria) || 0))
      .attr("cy", (d) => -radiusScale(d.valor) * Math.cos(angleScale(d.categoria) || 0))
      .attr("r", 4)
      .attr("fill", "#10b981")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2)
  }
}
