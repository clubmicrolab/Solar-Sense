import React , {useState, useContext}  from "react";
import ReactEcharts from "echarts-for-react"; 
import { useNavigate} from "react-router-dom";


export default function MainPage() {

    const option = {
        "title": {
            "text": 'Energy Production Forecast',
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
            "data": ["09.06", "10.06", "11.06", "12.06", "13.06", "14.06", "15.06"],
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
                "data": [820, 932, 901, 934, 1290, 870, 800], 
                "type": "line",
                "lineStyle": {
                    "color": '#458af2', 
                    "width": "4", // Change line width
                },
            },
            {
                "name": "Real",
                "type": "line",
                "data": [900, 910, 908, 1000],
                "lineStyle": {
                    "width": "4", // Change line width
                },
            },
    
        ],
        "legend": {"data": ["Predicted", "Real"], "textStyle": {"color": "#9997af"}},

    }
        

    return (
        <div className="main">
            <ReactEcharts className="chart" option={option} style={{ height: "400px" }} />
        </div>
    )
}
