import React , {useState, useEffect}  from "react";
import ReactEcharts from "echarts-for-react"; 
import { getWeeklyPredictions, getLast7DaysEnergy, getHourlyPredictions, getHourlyReal } from "../requests";

export default function MainPage() {

    const [chartType, setChartType] = useState("weekly");
    const [predictionData, setPredictionData] = useState(null);
    const [dailyDates, setDailyDates] = useState([]);
    const [dailyReal, setDailyReal] = useState([]);
    const [hourlyPredictions, setHourlyPredictions] = useState([]);
    const [hourlyDates, setHourlyDates] = useState([]);
    const [hourlyReal, setHourlyReal] = useState([]);
    const [finalWeekly, setFinalWeekly] = useState([]);

    const currentDate = new Date();
    const days = [];

    const addLeadingZero = (value) => {
      return value < 10 ? `0${value}` : value;
    };


    useEffect(() => {
      // Loop to calculate the past 7 days
      for (let i = 7; i >= 0; i--) {
        const pastDate = new Date(currentDate);
        pastDate.setDate(pastDate.getDate() - i);
        const day = addLeadingZero(pastDate.getDate());
        const month = addLeadingZero(pastDate.getMonth() + 1);
        const dateString = `${day}.${month}`;
        days.push(dateString);
      }
    
      // Loop to calculate the future 7 days
      for (let i = 1; i <= 6; i++) {
        const futureDate = new Date(currentDate);
        futureDate.setDate(futureDate.getDate() + i);
        const day = addLeadingZero(futureDate.getDate());
        const month = addLeadingZero(futureDate.getMonth() + 1);
        const dateString = `${day}.${month}`;
        days.push(dateString);
        setDailyDates(days)
      }

      //daily energy real data
      getLast7DaysEnergy()
      .then((data) => {
        const dailyReal = data.data.map((item) => item.sum); // Extract the "sum" values
        setDailyReal(dailyReal.reverse());
        console.log(dailyReal)
      })
      .catch((error) => {
        console.error('Error fetching last 7 days energy data:', error);
      });

      getWeeklyPredictions()
      .then((data) => {
        setPredictionData(data.data);
        console.log(data.data)

        getHourlyPredictions()
        .then((data2) => {
          const dateStringArray = data2.data.map((item) => item[0]);
          setHourlyPredictions(data2.data.map((item) => item[1]));
          console.log(data2.data.map((item) => item[1]).slice(117, 216));


          const subsets = [];
          for (let i = 0; i < data2.data.map((item) => item[1]).length; i += 24) {
            const subset = data2.data.map((item) => item[1]).slice(i, i + 24);
            subsets.push(subset);
          }

          const cumulativeSums = subsets.map(subset => subset.reduce((sum, num) => sum + num, 0));
          const firstSevenValues = cumulativeSums.slice(0, 7);
          const combinedList = [...firstSevenValues, ...data.data];
          setFinalWeekly(combinedList);
          console.log(finalWeekly)
  
          const transformedArray = dateStringArray.map((dateString) => {
            const date = new Date(dateString);
            const formattedDate = date.toLocaleString('en-GB', {
              day: 'numeric',
              month: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: false
            });
            return formattedDate;
          });
          setHourlyDates(transformedArray)
          console.log(transformedArray)
        })
        .catch((error) => {
          console.error('Error fetching hourly prediction data:', error);
        });
      
      })
      .catch((error) => {
        console.error('Error fetching prediction data:', error);
      });

      //hourly real data
      getHourlyReal()
      .then((data) => {
        console.log(data)
        setHourlyReal(data.data.reverse().map((item) => item.sum)); // Extract the "sum" values
      })
      .catch((error) => {
        console.error('Error fetching last 7 days energy data:', error);
      });

  }, []);
  
    const weeklyOption = {
        "title": {
            "text": 'Daily energy production forecast',
            "textStyle": {
              "color": '#f5f5f5',
              "fontSize": 18,
            },
          },    
        "tooltip": {"trigger": "axis"},
        "grid": {"left": "3%", "right": "4%", "bottom": "3%", "containLabel": "True"},
        "toolbox": {"feature": {"saveAsImage": {}}},

        "xAxis": {
            "type": "category",
            "data": dailyDates,
            "boundaryGap": "False",
            "axisLine": {
                "lineStyle": {
                  "color": '#9997af', // Change x-axis line color to white
                },
              },
            "axisLabel": {
                "color": '#9997af', // Change x-axis label color to white
              },
        },
        "yAxis": {"type": "value",
                    "axisLabel": {
                        "color": '#9997af', // Change x-axis label color to white
                    },},
        "series": [
            {
                "name": "Predicted",
                "data": finalWeekly, 
                "type": "line",
                "lineStyle": {
                    "color": '#458af2', 
                    "width": "4", // Change line width
                },
            },
            {
                "name": "Real",
                "type": "line",
                "data": dailyReal,
                "lineStyle": {
                    "width": "4", // Change line width
                },
            },
    
        ],
        "legend": {"data": ["Predicted", "Real"], "textStyle": {"color": "#9997af"}},

    }


    const hourlyOption = {
        "title": {
            "text": 'Hourly energy production forecast',
            "textStyle": {
              "color": '#f5f5f5',
              "fontSize": 18,
            },
          },    
        "tooltip": {"trigger": "axis"},
        "grid": {"left": "3%", "right": "4%", "bottom": "3%", "containLabel": "True"},
        "toolbox": {"feature": {"saveAsImage": {}}},

        "xAxis": {
            "type": "category",
            "data": hourlyDates.slice(117, 216),
            "boundaryGap": "False",
            "axisLine": {
                "lineStyle": {
                  "color": '#9997af', // Change x-axis line color to white
                },
              },
            "axisLabel": {
                "color": '#9997af', // Change x-axis label color to white
              },
        },
        "yAxis": {"type": "value",
                    "axisLabel": {
                        "color": '#9997af', // Change x-axis label color to white
                        "formatter": '{value} W', // Add the unit "kW"
                    },},
        "series": [
            {
                "name": "Predicted",
                "data": hourlyPredictions.slice(117, 216),
                "type": "line",
                "lineStyle": {
                    "color": '#458af2', 
                    "width": "4", // Change line width
                },
            },
            {
                "name": "Real",
                "type": "line",
                "data": hourlyReal.slice(120),
                "lineStyle": {
                    "width": "4", // Change line width
                },
            },
    
        ],
        "legend": {"data": ["Predicted", "Real"], "textStyle": {"color": "#9997af"}},

    }
        

    const handleChartTypeChange = (type) => {
        setChartType(type);
      };
    
      return (
        <div className="main">
          <div className="chart-toggle">
            <button
                className={`button ${chartType === "weekly" ? "active" : ""}`}
                onClick={() => handleChartTypeChange("weekly")}
            >
              Daily Production
            </button>
            <button
                className={`button ${chartType === "hourly" ? "active" : ""}`}
                onClick={() => handleChartTypeChange("hourly")}
            >
              Hourly Production
            </button>
          </div>
          <ReactEcharts
            className="chart"
            option={chartType === "weekly" ? weeklyOption : hourlyOption}
            style={{ height: "500px" }}
          />
        </div>
      );
    
}
