        import React from "react";
        import ReactApexChart from "react-apexcharts";

      class ApexChart extends React.Component {
        constructor(props) {
          super(props);
          // console.log(this.props.titles);
          let series = [];
          for (let i = 0; i < this.props.titles.length; i++) {
            let num = Math.floor(Math.random() * 100);
            series.push(num);
          }

          this.state = {
          
            series: series,
            options: {
              chart: {
                width: 380,
                type: 'pie',
              },
              labels: [...this.props.titles],
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },
          
          
          };
        }

      

        render() {
          return (
            <div>
              <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="pie" width={380} />
              </div>
              <div id="html-dist"></div>
            </div>
          );
        }
      }

      export default ApexChart;