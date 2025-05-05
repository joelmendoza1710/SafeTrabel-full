import { Component, Input, ViewChild, type ElementRef, type AfterViewInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import * as d3 from "d3"

@Component({
  selector: "app-bar-chart",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-container">
      <svg #chart class="w-full h-64"></svg>
    </div>
  `,
})
export class BarChartComponent implements AfterViewInit {
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
    const margin = { top: 20, right: 30, bottom: 60, left: 50 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // Create scales
    const x = d3
      .scaleBand()
      .domain(this.data.map((d) => d.sitio))
      .range([0, innerWidth])
      .padding(0.3)

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
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)")
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

    // Add the bars
    g.selectAll(".bar")
      .data(this.data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.sitio) || 0)
      .attr("y", (d) => y(d.reseñas))
      .attr("width", x.bandwidth())
      .attr("height", (d) => innerHeight - y(d.reseñas))
      .attr("fill", "#10b981")
      .attr("rx", 4)
      .attr("ry", 4)
  }
}
