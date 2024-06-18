        import React from "react";
        import ReactApexChart from "react-apexcharts";

      class BarChart extends React.Component {
        constructor(props) {
          super(props);
          const cockingTimes = this.props.cockingTimes
          const names = this.props.names
          console.log(names,cockingTimes);

          this.state = {
          
            series: [{
              data: [...cockingTimes]
            }],
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
                categories: [...names],
              }
            },
          
          
          };
        }

      

        render() {
          return (
            <div>
              <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
              </div>
              <div id="html-dist"></div>
            </div>
          );
        }
      }


      export default BarChart