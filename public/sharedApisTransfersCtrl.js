/*global angular*/
/*global Highcharts*/
/*global google*/
/*global Morris*/
/*global FusionCharts*/

"use strict"
angular.module("tvfeesManagerApp")
    .controller("sharedApisTransfersCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("List Ctrl initialized!");
        var apiPropia = "/api/v1/transferincomes-stats"
        var api2 = "proxyMANU/api/v1/span-univ-stats";
        var api1 = "https://sos1718-04.herokuapp.com/api/v2/graduation-rates";

        var mashapeCartas = {
            method: 'GET',
            url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards",
            headers: {
                "X-Mashape-Key": "6v7fEc2RZUmshCAdwaRjB82Foz4ip15TH3PjsnAsDhGhw5PtPa",
                "Accept": "application/json"

            }
        };
        
        var mashapeDeezerMusic = {
            method: 'GET',
            url: "https://deezerdevs-deezer.p.mashape.com/search?q=eminem",
            headers:{
                "X-Mashape-Key": ""
                }
        };

        $http(mashapeCartas).then(function(response1) {
            console.log(response1);
            $http.get(apiPropia).then(function(response2) {
                FusionCharts.ready(function() {
                    var revenueChart = new FusionCharts({
                            type: 'doughnut2d',
                            renderAt: 'chart-container',
                            width: '450',
                            height: '450',
                            dataFormat: 'json',
                            dataSource: {
                                "chart": {
                                    "caption": "Resumen del coste de cartas y traspasos más caros",
                                    "subCaption": "2015/2016",
                                    "numberPrefix": "$",
                                    "paletteColors": "#0075c2,#1aaf5d,#f2c500,#f45b00,#8e0000",
                                    "bgColor": "#ffffff",
                                    "showBorder": "0",
                                    "use3DLighting": "0",
                                    "showShadow": "0",
                                    "enableSmartLabels": "0",
                                    "startingAngle": "310",
                                    "showLabels": "0",
                                    "showPercentValues": "1",
                                    "showLegend": "1",
                                    "legendShadow": "0",
                                    "legendBorderAlpha": "0",
                                    "defaultCenterLabel": "Datos de cartas y transferencias",
                                    "centerLabel": "Coste de $label: $value",
                                    "centerLabelBold": "1",
                                    "showTooltip": "0",
                                    "decimals": "0",
                                    "captionFontSize": "14",
                                    "subcaptionFontSize": "14",
                                    "subcaptionFontBold": "0"
                                },

                                "data": [{
                                        "label": "cartas básicas",
                                        "value": response1.data.Basic.length
                                    },
                                    {
                                        "label": "cartas clásicas",
                                        "value": response1.data.Classic.length
                                    },
                                    {
                                        "label": " FC Barcelona ",
                                        "value": response2.data.filter(d=>d.team=="fc barcelona").map(function(d){return d["timaxexp"]})
                                    },
                                    {
                                        "label": "Malaga CF",
                                        "value": response2.data.filter(d=>d.team=="malaga cf").map(function(d){return d["timaxexp"]})
                                    },
                                    {
                                        "label": "Sevilla FC",
                                        "value": response2.data.filter(d=>d.team=="sevilla fc").map(function(d){return d["timaxexp"]})
                                    }
                                ]
                            }
                        })
                        .render();
                });



            });
        });





        $http.get(api1).then(function(response1) {
            $http.get(apiPropia).then(function(response2) {
                Highcharts.chart('sharedStadistics1', {
                    chart: {
                        type: 'area'
                    },
                    title: {
                        text: ' sharedStadistics1 '
                    },

                    xAxis: {
                        categories: response2.data.map(function(d) { return (parseInt(d.year)) })
                    },
                    yAxis: {
                        title: {
                            text: 'Stats1'
                        },
                        labels: {
                            formatter: function() {
                                return this.value;
                            }
                        }
                    },
                    tooltip: {
                        crosshairs: true,
                        shared: true
                    },
                    plotOptions: {
                        spline: {
                            marker: {
                                radius: 4,
                                lineColor: '#666666',
                                lineWidth: 1
                            }
                        }
                    },
                    series: [{
                        name: 'TiMaxExp',
                        data: response2.data.map(function(d) { return d["timaxexp"] })
                    }, {
                        name: 'TiLessExp',
                        data: response2.data.map(function(d) { return d["tilessexp"] })
                    }, {

                        name: 'PublicSchool',
                        data: response1.data.map(function(d) { return (parseFloat(d["public-school"])) })

                    }, {
                        name: 'PrivateSchool',
                        data: response1.data.map(function(d) { return (parseFloat(d["private-school"])) })


                    }]
                });
            });
        });



        $http.get(api2).then(function(response1) {
            $http.get(apiPropia).then(function(response2) {
                Highcharts.chart('sharedStadistics2', {
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: 'sharedStadistics2'
                    },

                    xAxis: {
                        categories: response1.data.map(function(d) { return (parseInt(d.year)) }),
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {

                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        }
                    },

                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'top',
                        x: -40,
                        y: 80,
                        floating: true,
                        borderWidth: 1,
                        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                        shadow: true
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'TiMaxExp',
                        data: response2.data.map(function(d) { return d["timaxexp"] })
                    }, {
                        name: 'TiLessExp',
                        data: response2.data.map(function(d) { return (parseInt(d["tilessexp"])) })
                    }, {
                        name: 'Degree',
                        data: response1.data.map(function(d) { return (parseInt(d["degree"])) })
                    }, {
                        name: 'Master',
                        data: response1.data.map(function(d) { return (parseInt(d["master"])) })

                    }]
                });
            });
        });

    }]);
