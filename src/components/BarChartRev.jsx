import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const BarChartCus = ({ names, prices }) => {
  const [chartOptions, setChartOptions] = useState({
    series: [
      {
        data: [],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 380,
      },
      plotOptions: {
        bar: {
          barHeight: "100%",
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: "bottom",
          },
        },
      },
      colors: [
        "#33b2df",
        "#546E7A",
        "#d4526e",
        "#13d8aa",
        "#A5978B",
        "#2b908f",
        "#f9a3a4",
        "#90ee7e",
        "#f48024",
        "#69d2e7",
      ],
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#fff"],
        },
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
        },
        offsetX: 0,
        dropShadow: {
          enabled: true,
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      title: {
        text: "Stats of Prices",
        align: "center",
        floating: true,
      },
      subtitle: {
        text: "Foods  Names as DataLabels inside bars",
        align: "center",
      },
      tooltip: {
        theme: "dark",
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function () {
              return "";
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    setChartOptions((prevState) => ({
      ...prevState,
      series: [{ data: [...prices] }],
      options: {
        ...prevState.options,
        xaxis: {
          categories: [...names],
        },
      },
    }));
  }, [names, prices]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartOptions.options}
          series={chartOptions.series}
          type="bar"
          height={380}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default BarChartCus;
