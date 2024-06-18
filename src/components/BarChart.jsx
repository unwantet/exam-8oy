        import React from "react";
        import ReactApexChart from "react-apexcharts";

      class BarChart extends React.Component {
        constructor(props) {
          super(props);

          const { data } = this.props;
          console.log(data);
          let names = [];
          let prices = [];
      
          if (data && data.length > 0) {
              data.forEach((item) => {
                  names.push(item.name);
                  prices.push(item.price);
              });
          }

          console.log(names,prices);
          this.state = {
          
            series: [{
              data: [...prices]
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