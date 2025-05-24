"use client"

import { useEffect, useRef } from "react"

// Sample data for charts
const lineChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Service Requests",
      data: [65, 59, 80, 81, 56, 55, 73],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
}

const barChartData = {
  labels: ["Towing", "Battery", "Flat Tire", "Lockout", "Fuel"],
  datasets: [
    {
      label: "Revenue ($)",
      data: [12000, 8000, 6000, 5000, 4000],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
    },
  ],
}

const pieChartData = {
  labels: ["Towing", "Battery", "Flat Tire", "Lockout", "Fuel"],
  datasets: [
    {
      data: [30, 20, 25, 15, 10],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
    },
  ],
}

// Simple chart rendering function
const renderChart = (ctx: CanvasRenderingContext2D, type: string, data: any, options: any = {}) => {
  // This is a placeholder for actual chart rendering
  // In a real app, you would use a charting library like Chart.js
  const { labels, datasets } = data
  const colors = datasets[0].backgroundColor || [datasets[0].borderColor]

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  if (type === "line") {
    const dataset = datasets[0]
    const points = dataset.data
    const color = dataset.borderColor

    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = 2

    const stepX = ctx.canvas.width / (points.length - 1)
    const maxValue = Math.max(...points)
    const scale = ctx.canvas.height / maxValue

    points.forEach((point: number, i: number) => {
      const x = i * stepX
      const y = ctx.canvas.height - point * scale

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()
  } else if (type === "bar") {
    const dataset = datasets[0]
    const values = dataset.data
    const barColors = dataset.backgroundColor

    const barWidth = ctx.canvas.width / values.length - 10
    const maxValue = Math.max(...values)
    const scale = ctx.canvas.height / maxValue

    values.forEach((value: number, i: number) => {
      const x = i * (barWidth + 10) + 5
      const height = value * scale
      const y = ctx.canvas.height - height

      ctx.fillStyle = Array.isArray(barColors) ? barColors[i] : barColors
      ctx.fillRect(x, y, barWidth, height)
    })
  } else if (type === "pie") {
    const dataset = datasets[0]
    const values = dataset.data
    const pieColors = dataset.backgroundColor

    const total = values.reduce((sum: number, value: number) => sum + value, 0)
    let startAngle = 0

    const centerX = ctx.canvas.width / 2
    const centerY = ctx.canvas.height / 2
    const radius = Math.min(centerX, centerY) - 10

    values.forEach((value: number, i: number) => {
      const sliceAngle = (value / total) * 2 * Math.PI

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()

      ctx.fillStyle = Array.isArray(pieColors) ? pieColors[i] : pieColors
      ctx.fill()

      startAngle += sliceAngle
    })
  }
}

export function LineChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        renderChart(ctx, "line", lineChartData)
      }
    }
  }, [])

  return (
    <div className="h-[300px] w-full">
      <canvas ref={canvasRef} width={800} height={300} className="w-full h-full" />
    </div>
  )
}

export function BarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        renderChart(ctx, "bar", barChartData)
      }
    }
  }, [])

  return (
    <div className="h-[300px] w-full">
      <canvas ref={canvasRef} width={800} height={300} className="w-full h-full" />
    </div>
  )
}

export function PieChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        renderChart(ctx, "pie", pieChartData)
      }
    }
  }, [])

  return (
    <div className="h-[300px] w-full">
      <canvas ref={canvasRef} width={800} height={300} className="w-full h-full" />
    </div>
  )
}
