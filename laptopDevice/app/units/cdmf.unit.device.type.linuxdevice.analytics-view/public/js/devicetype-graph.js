/*
 * Copyright (c) 2016, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var palette = new Rickshaw.Color.Palette({scheme: "classic9"});
var sensorTypeArr = ["cpuusage","batterypercentage","memoryusage"];
var sensorTopicArr=["CPU usage over time","Battery percentage over time","Memory usage over time"];
var numSensorTypes = sensorTypeArr.length;
var highChartArray = [];
for(var i=0;i<numSensorTypes;i++){highChartArray[i]=[];}
var tzOffset = new Date().getTimezoneOffset() * 60;

function clearArrayData() {
    for(var i=0;i<numSensorTypes;i++){highChartArray[i]=[];}
}

function drawGraph_linuxdevice(from, to)
{
    clearArrayData();
    for(var j=0;j<numSensorTypes;j++) {
        getDataFromDAS(j,from,to);
    }
}

function getDataFromDAS(j,from,to) {
    var backendApiUrl = $("#devicetype-details").data("backend-api-url") + "?from=" + from + "&to=" + to
        + "&sensorType=" + sensorTypeArr[j];
    var successCallback = function (data) {
        if (data) {
            drawLineGraph(j,JSON.parse(data));
        }
    };
    invokerUtil.get(backendApiUrl, successCallback, function (message) {
        console.log(message);
    });
}

function drawLineGraph(j,data) {
    if (data.length === 0 || data.length === undefined) {
        return;
    }
    for (var i = 0; i < data.length; i++) {
        var arr=[];
        arr.push(parseInt((data[i].values.meta_time) - tzOffset*1000));
        arr.push(parseInt(data[i].values[sensorTypeArr[j]]));
        highChartArray[j].push(arr);
    }
    updateHighChart(j,highChartArray[j]);
}

function updateHighChart(j,data) {
    Highcharts.chart('container-'+sensorTypeArr[j], {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: sensorTopicArr[j]
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Percentage'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: [{
            type: 'area',
            name: '',
            data: data
        }]
    });
}



/*,"memoryusage","batterypluggedin","diskusage","diskreads","diskwrites","diskreadcount","diskwritecount","bytessent","bytesrecv"];*/

