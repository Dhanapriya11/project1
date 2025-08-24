import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './ClassPerformance.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const mockPerformanceData = {
  averageScore: 82,
  passRate: 93,
  topPerformer: 'Alice Johnson',
  gradeDistribution: {
    'A (90-100)': 8,
    'B (80-89)': 12,
    'C (70-79)': 6,
    'D (60-69)': 2,
    'F (<60)': 2,
  },
};

const chartData = {
  labels: Object.keys(mockPerformanceData.gradeDistribution),
  datasets: [
    {
      label: 'Number of Students',
      data: Object.values(mockPerformanceData.gradeDistribution),
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Overall Grade Distribution',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Number of Students'
      }
    }
  }
};

const ClassPerformance = () => {
  return (
    <div className="performance-container">
      <h1 className="performance-header">Class Performance</h1>

      <div className="summary-metrics">
        <div className="metric-card">
          <div className="metric-value">{mockPerformanceData.averageScore}%</div>
          <div className="metric-label">Average Score</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">{mockPerformanceData.passRate}%</div>
          <div className="metric-label">Pass Rate</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">{mockPerformanceData.topPerformer}</div>
          <div className="metric-label">Top Performer</div>
        </div>
      </div>

      <div className="charts-container">
        <Bar options={chartOptions} data={chartData} />
      </div>
    </div>
  );
};

export default ClassPerformance;
