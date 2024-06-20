import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const BarChart = ({ cockingTimes, names }) => {
  const [chartOptions, setChartOptions] = useState({
    series: [{ data: [] }],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: 'end',
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: []
      }
    }
  });

  useEffect(() => {
    setChartOptions((prevState) => ({
      ...prevState,
      series: [{ data: [...cockingTimes] }],
      options: {
        ...prevState.options,
        xaxis: {
          categories: [...names]
        }
      }
    }));
  }, [cockingTimes, names]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartOptions.options} series={chartOptions.series} type="bar" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default BarChart;
