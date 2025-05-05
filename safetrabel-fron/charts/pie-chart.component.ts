import { Component, Input, ViewChild, type ElementRef, type AfterViewInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import * as d3 from "d3"

@Component({
  selector: "app-pie-chart",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-container">
      <svg #chart class="w-full h-64"></svg>
    </div>
  `,
})
export class PieChartComponent implements AfterViewInit {
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

    // Color scale
    const color = d3
      .scaleOrdinal<string>()
      .domain(this.data.map((d) => d.categoria))
      .range(["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"])

    // Create the pie layout
    const pie = d3
      .pie<any>()
      .value((d) => d.valor)
      .sort(null)

    // Create the arc generator
    const arc = d3.arc<any>().innerRadius(0).outerRadius(radius)

    // Create the outer arc for labels
    const outerArc = d3
      .arc<any>()
      .innerRadius(radius * 1.1)
      .outerRadius(radius * 1.1)

    // Add the pie slices
    const slices = g.selectAll(".slice").data(pie(this.data)).enter().append("g").attr("class", "slice")

    slices
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.categoria))
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2)

    // Add the labels
    const labels = slices.append("g").attr("class", "label")

    labels
      .append("text")
      .attr("transform", (d) => {
        const pos = outerArc.centroid(d)
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
        pos[0] = radius * 0.8 * (midAngle < Math.PI ? 1 : -1)
        return `translate(${pos})`
      })
      .attr("text-anchor", (d) => {
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
        return midAngle < Math.PI ? "start" : "end"
      })
      .attr("dominant-baseline", "middle")
      .attr("fill", "#666")
      .attr("font-size", "12px")
      .text((d) => `${d.data.categoria} (${d.data.valor}%)`)

    // Add the polylines
    labels
      .append("polyline")
      .attr("points", (d) => {
        const pos = outerArc.centroid(d)
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
        pos[0] = radius * 0.75 * (midAngle < Math.PI ? 1 : -1)
        return [arc.centroid(d), outerArc.centroid(d), pos].join(",")
      })
      .attr("fill", "none")
      .attr("stroke", "#666")
      .attr("stroke-width", 1)
  }
}
