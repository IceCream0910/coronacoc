//프록시 서버 분산
//var e = new Array("https://cors-coronacoc-v2.herokuapp.com/", "https://cors-coronacoc-v3.herokuapp.com/", "https://cors-coronacoc-v4.herokuapp.com/"),
var e = new Array("https://api.codetabs.com/v1/proxy/?quest="),
	proxyServer_raw = randomItem(e),
	proxyServer_json = randomItem(e);

function randomItem(e) {
	return e[Math.floor(Math.random() * e.length)]
}
$.ajax({
	type: "GET",
	url: "https://coronacoc-api.vercel.app/",
	success: function(result) {
		var data = JSON.parse(result);
		console.log(data);
		document.getElementById("confirmedPM").innerHTML = '<i class="fa fa-arrow-up"></i> ' + data.newCases;
		document.getElementById("newConfirmed_mb").innerHTML = data.newCases;
		new numberCounter("newConfirmed_mb", data.newCases);

		document.getElementById("localConfirmed").innerHTML = data.localConfirmed;
		document.getElementById("abroadConfirmed").innerHTML = '/'+data.abroadConfirmed;
		new numberCounter("confirmed", data.cases);
		new numberCounter("confirmed_mb", data.cases);
		new numberCounter("death", data.deaths);
		new numberCounter("death_mb", data.deaths);
		new numberCounter("severe", data.severe);
		new numberCounter("severe_mb", data.severe);
		document.getElementById("deathPM_mb").innerHTML = '<i class="fa fa-arrow-up"></i> ' + data.newDeaths;
		document.getElementById("deathPM").innerHTML = '<i class="fa fa-arrow-up"></i> ' + data.newDeaths;
		document.getElementById("whenUpdate").innerHTML = data.updateTime;
		new numberCounter("cure", data.cure);
		new numberCounter("cure_mb", data.cure);
		document.getElementById("curePM_mb").innerHTML = '<i class="fa fa-arrow-up"></i> ' + data.newCure;

		$('#severe_sickbed').html(data.severeBeds);
		//$('#severe_sickbed_detail').html('가용 '+resPart_s[2]+'개');
		$('#normal_sickbed').html(data.normalBeds);
		//$('#normal_sickbed_detail').html('가용 '+resPart_n[2]+'개');
		sickbedColoring(data.severeBeds, data.normalBeds);


		var first_percent = data.first_vaccine.rates.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		var second_percent = data.second_vaccine.rates.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		var third_percent = data.third_vaccine.rates.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

		$('#vacTotal').html(data.first_vaccine.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '건');
		$('#vacPM').html('↑ ' + data.first_vaccine.delta.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
		$('#vacTotal2').html(data.second_vaccine.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '건');
		$('#vacPM2').html('↑ ' + data.second_vaccine.delta.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
		$('#vacTotal3').html(data.third_vaccine.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '건');
		$('#vacPM3').html('↑ ' + data.third_vaccine.delta.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
		$('#first_vaccinePercent').html(first_percent + "%");
		$('#second_vaccinePercent').html(second_percent + "%");
		$('#third_vaccinePercent').html(third_percent + "%");

		$(".progress_vac1").css({
			width: parseInt(first_percent) + "%"
		});
		$(".progress_vac2").css({
			width: parseInt(second_percent) + "%"
		});

		if(data.newSevere != 0) {
			console.log(data.newSevere);
			if(data.newSevere.toString().indexOf('-') != -1) {
				$('#severePM_mb').html('<i class="fa fa-arrow-down"></i> ' + data.newSevere.toString().replaceAll('-', ''));
				$('#severePM').html('<i class="fa fa-arrow-down"></i> ' + data.newSevere.toString().replaceAll('-', ''));
				$('#severePM').removeClass('text-danger');
				$('#severePM').addClass('text-success');
				$('#severePM_mb').removeClass('text-danger');
				$('#severePM_mb').addClass('text-success');
			} else {
				$('#severePM_mb').html('<i class="fa fa-arrow-up"></i> ' + data.newSevere);
				$('#severePM').html('<i class="fa fa-arrow-up"></i> ' + data.newSevere.toString().replaceAll('-', ''));
				$('#severePM').removeClass('text-sucess');
				$('#severePM').addClass('text-danger');
				$('#severePM_mb').removeClass('text-sucess');
				$('#severePM_mb').addClass('text-danger');
			}
		}
		//시도별 현황
		document.getElementById('seoulCases').innerHTML = data.seoul.totalCase + "(+" + data.seoul.newCase + ")";
		document.getElementById('seoulCure').innerHTML = data.seoul.recovered;
		document.getElementById('seoulDeath').innerHTML = data.seoul.death;
		document.getElementById('busanCases').innerHTML = data.busan.totalCase + "(+" + data.busan.newCase + ")";
		document.getElementById('busanCure').innerHTML = data.busan.recovered;
		document.getElementById('busanDeath').innerHTML = data.busan.death;
		document.getElementById('daeguCases').innerHTML = data.daegu.totalCase + "(+" + data.daegu.newCase + ")";
		document.getElementById('daeguCure').innerHTML = data.daegu.recovered;
		document.getElementById('daeguDeath').innerHTML = data.daegu.death;
		document.getElementById('incheonCases').innerHTML = data.incheon.totalCase + "(+" + data.incheon.newCase + ")";
		document.getElementById('incheonCure').innerHTML = data.incheon.recovered;
		document.getElementById('incheonDeath').innerHTML = data.incheon.death;
		document.getElementById('gwangjuCases').innerHTML = data.gwangju.totalCase + "(+" + data.gwangju.newCase + ")";
		document.getElementById('gwangjuCure').innerHTML = data.gwangju.recovered;
		document.getElementById('gwangjuDeath').innerHTML = data.gwangju.death;
		document.getElementById('daejeonCases').innerHTML = data.daejeon.totalCase + "(+" + data.daejeon.newCase + ")";
		document.getElementById('daejeonCure').innerHTML = data.daejeon.recovered;
		document.getElementById('daejeonDeath').innerHTML = data.daejeon.death;
		document.getElementById('ulsanCases').innerHTML = data.ulsan.totalCase + "(+" + data.ulsan.newCase + ")";
		document.getElementById('ulsanCure').innerHTML = data.ulsan.recovered;
		document.getElementById('ulsanDeath').innerHTML = data.ulsan.death;
		document.getElementById('sejongCases').innerHTML = data.sejong.totalCase + "(+" + data.sejong.newCase + ")";
		document.getElementById('sejongCure').innerHTML = data.sejong.recovered;
		document.getElementById('sejongDeath').innerHTML = data.sejong.death;
		document.getElementById('ggCases').innerHTML = data.gyeonggi.totalCase + "(+" + data.gyeonggi.newCase + ")";
		document.getElementById('ggCure').innerHTML = data.gyeonggi.recovered;
		document.getElementById('ggDeath').innerHTML = data.gyeonggi.death;
		document.getElementById('gangwonCases').innerHTML = data.gangwon.totalCase + "(+" + data.gangwon.newCase + ")";
		document.getElementById('gangwonCure').innerHTML = data.gangwon.recovered;
		document.getElementById('gangwonDeath').innerHTML = data.gangwon.death;
		document.getElementById('cbCases').innerHTML = data.chungbuk.totalCase + "(+" + data.chungbuk.newCase + ")";
		document.getElementById('cbCure').innerHTML = data.chungbuk.recovered;
		document.getElementById('cbDeath').innerHTML = data.chungbuk.death;
		document.getElementById('cnCases').innerHTML = data.chungnam.totalCase + "(+" + data.chungnam.newCase + ")";
		document.getElementById('cnCure').innerHTML = data.chungnam.recovered;
		document.getElementById('cnDeath').innerHTML = data.chungnam.death;
		document.getElementById('jbCases').innerHTML = data.jeonbuk.totalCase + "(+" + data.jeonbuk.newCase + ")";
		document.getElementById('jbCure').innerHTML = data.jeonbuk.recovered;
		document.getElementById('jbDeath').innerHTML = data.jeonbuk.death;
		document.getElementById('jnCases').innerHTML = data.jeonnam.totalCase + "(+" + data.jeonnam.newCase + ")";
		document.getElementById('jnCure').innerHTML = data.jeonnam.recovered;
		document.getElementById('jnDeath').innerHTML = data.jeonnam.death;
		document.getElementById('gbCases').innerHTML = data.gyeongbuk.totalCase + "(+" + data.gyeongbuk.newCase + ")";
		document.getElementById('gbCure').innerHTML = data.gyeongbuk.recovered;
		document.getElementById('gbDeath').innerHTML = data.gyeongbuk.death;
		document.getElementById('gnCases').innerHTML = data.gyeongnam.totalCase + "(+" + data.gyeongnam.newCase + ")";
		document.getElementById('gnCure').innerHTML = data.gyeongnam.recovered;
		document.getElementById('gnDeath').innerHTML = data.gyeongnam.death;
		document.getElementById('jejuCases').innerHTML = data.jeju.totalCase + "(+" + data.jeju.newCase + ")";
		document.getElementById('jejuCure').innerHTML = data.jeju.recovered;
		document.getElementById('jejuDeath').innerHTML = data.jeju.death;
		document.getElementById('gumCases').innerHTML = data.quarantine.totalCase + "(+" + data.quarantine.newCase + ")";
		document.getElementById('gumCure').innerHTML = data.quarantine.recovered;
		document.getElementById('gumDeath').innerHTML = data.quarantine.death;

        $('.loader').fadeOut(600);
	}, error : function(error) {
        $('#errorModal').modal('show');
        $('.loader').fadeOut(600);

    }
});

function sickbedColoring(data1, data2) {
	var severeColor, normalColor = '';
	if(parseInt(data1.replace('%', '')) <= 50) {
		severeColor = ' rgba(69, 209, 90, 0.2)'; //green
	} else if(parseInt(data1.replace('%', '')) <= 68) {
		severeColor = 'rgba(255, 165, 0, 0.2)'; //orange
	} else {
		severeColor = 'rgba(220, 20, 60, 0.2)'; //red
	}
	if(parseInt(data2.replace('%', '')) <= 50) {
		normalColor = ' rgba(69, 209, 90, 0.2)'; //green
	} else if(parseInt(data2.replace('%', '')) <= 70) {
		normalColor = 'rgba(255, 165, 0, 0.2)'; //orange
	} else {
		normalColor = 'rgba(220, 20, 60, 0.2)'; //red
	}
	var styles = `.progress_severe:after {
        content: '';
        position: absolute;
        background: ` + severeColor + `;
        top: 0; bottom: 0;
        left: 0; 
        width: ` + parseInt(data1.replace('%', '')) / 2 + `%;
    }` + `.progress_normal:after {
        content: '';
        position: absolute;
        background: ` + normalColor + `;
        top: 0; bottom: 0;
        left: 0; 
        width: ` + parseInt(data2.replace('%', '')) + `%;
    }`
	var styleSheet = document.createElement("style")
	styleSheet.type = "text/css"
	styleSheet.innerText = styles
	document.head.appendChild(styleSheet)
}

$.ajax({
	type: "GET",
	url: "https://coronacoc-api-chart.vercel.app/",
	success: function(result) {
		var data = JSON.parse(result);
		console.log(data);
		summaryData = data.casesDatasets;
		accumulateChart_week();
		drawTestChart(data.testsChart);
		drawDeathsChart(data.deathsChart);
		drawRatesChart(data.testRatesChart);
		drawSevereChart(data.severeChartData);
		
        $('.loader').fadeOut(600);
	}, error : function(error) {
        $('#errorModal').modal('show');
        $('.loader').fadeOut(600);
    }
});

var liveConfirmedCases;
var cityCode = {
	"0": "서울",
	"1": "부산",
	"2": "인천",
	"3": "대구",
	"4": "광주",
	"5": "대전",
	"6": "울산",
	"7": "세종",
	"8": "경기",
	"9": "강원",
	"10": "충북",
	"11": "충남",
	"12": "경북",
	"13": "경남",
	"14": "전북",
	"15": "전남",
	"16": "제주",
	"17": "검역"
};

function rollingRealtimeByRegion(data) {
	$('#rtRegionName').html(cityCode[0]);
	$('#rtTodayByRegion').html(data[0][0] + "명");
	if(data[0][1].toString().includes("-")) {
		document.getElementById('rtpmBox_byRegion').style.backgroundColor = "rgba(119, 158, 203, 0.9)";
		$('#rtPMByRegion').html("↓ " + data[0][1].toString().replace("-", ""));
	} else {
		document.getElementById('rtpmBox_byRegion').style.backgroundColor = "rgba(255, 105, 97, 0.7)";
		$('#rtPMByRegion').html("↑ " + data[0][1].toString());
	}
	var cnt = 1;
	setInterval(function() {
		$('#rtRegionName').html(cityCode[cnt]);
		$('#rtTodayByRegion').html(data[cnt][0] + "명");
		if(data[cnt][1].toString().includes("-")) {
			document.getElementById('rtpmBox_byRegion').style.backgroundColor = "rgba(119, 158, 203, 0.9)";
			$('#rtPMByRegion').html("↓ " + data[cnt][1].toString().replace("-", ""));
		} else {
			document.getElementById('rtpmBox_byRegion').style.backgroundColor = "rgba(255, 105, 97, 0.7)";
			$('#rtPMByRegion').html("↑ " + data[cnt][1].toString());
		}
		if(cnt >= 16) {
			cnt = 0;
		} else {
			cnt++;
		}
	}, 3500);
}

let socket = io('https://coronacoc-live-api.herokuapp.com/');

        socket.on('connect', function() {
            console.log("실시간 확진자 서버 연결");
        });

        socket.on('live', (data) => {
			var data_json = JSON.parse(data);
			const result_init = data_json.init;
			const result_updates = data_json.updates;
			liveConfirmedCases = result_init.statsLive.today;
			new numberCounter("rtToday", result_init.statsLive.today);
			var rtpm = String(parseInt(result_init.statsLive.today) - parseInt(result_init.statsLive.yesterday));
			if(rtpm.includes("-")) {
				document.getElementById('rtpmBox').style.backgroundColor = "rgba(119, 158, 203, 0.3)";
				rtpm = "↓ " + rtpm.replace("-", "");
			} else {
				document.getElementById('rtpmBox').style.backgroundColor = "rgba(255, 105, 97, 0.3)";
				rtpm = "↑ " + rtpm;
			}
			document.getElementById('rtPM').innerHTML = rtpm;
			var cityN = result_init.updatesPreview[0].city.toString();
			document.getElementById('realtimeSummary').innerHTML = cityCode[cityN] + " " + result_init.updatesPreview[0].src + "&nbsp;&nbsp;>";
			rollingRealtimeByRegion(result_init.citiesLive);

			$('#realtimeList').html('');
			for(var i = 0; i < result_updates.updates.data.length; i++) {
				var cityN_ = result_updates.updates.data[i].city.toString();
				$('#realtimeList').append('<tr><td>' + result_updates.updates.data[i].datetime.substring(11, 16) + '</td><td>' + cityCode[cityN_] + " " + result_updates.updates.data[i].cases + "명 추가 확진" + '</td></tr>');
			}
        });


var summaryData;
//전세계 현황
$.ajax({
	type: "GET",
	url: proxyServer_raw + "https://apiv2.corona-live.com/world-init.json", // Using myjson.com to store the JSON
	success: function(result) {
		var result2 = result.countries.WORLD;
		new numberCounter("newConfirmedWorld_mb", result2.casesDelta.toString().replaceAll(",", ""));
		new numberCounter("confirmedWorld_mb", result2.cases.toString().replaceAll(",", ""));
		new numberCounter("permilWorld_mb", result2.casesPerMil.toString().replaceAll(",", ""));
		new numberCounter("deathWorld_mb", result2.deaths.toString().replaceAll(",", ""));
		document.getElementById("deathPMWorld_mb").innerHTML = '<i class="fa fa-arrow-up"></i> ' + result2.deathsDelta.toString();
	}
});

function drawTestChart(all_data) {
	console.clear();
	var keys = Object.keys(all_data);
	var values = Object.values(all_data);
	var length = Object.keys(all_data).length;
	var keys_week = [];
	var values_week = [];
	for(var i=(keys.length); i>(keys.length-7); i--) {
		keys_week.unshift(keys[i-1]);
		values_week.unshift(values[i-1]);
	}
	
	$('.loader_tests').hide();
	try {
		var ctx = document.getElementById("chart-tests");
		if(ctx) {
			var myChart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: keys,
					datasets: [{
						label: "일일 검사 건수",
						data: values,
						borderColor: "rgba(255, 255, 255, 0)",
						backgroundColor: "rgba(255, 255, 255, 0.5)"
					}]
				},
				options: {
					legend: {
						position: 'center',
						labels: {
							fontFamily: 'Poppins'
						}
					},
					scales: {
						xAxes: [{
							ticks: {
								fontFamily: "Poppins"
							}
						}],
						yAxes: [{
							ticks: {
								beginAtZero: true,
								fontFamily: "Poppins"
							}
						}]
					},
					tooltips: {
						titleFontFamily: 'Open Sans',
						backgroundColor: 'rgba(0,0,0,0.6)',
						titleFontColor: 'white',
						caretSize: 5,
						cornerRadius: 15,
						xPadding: 10,
						yPadding: 10
					}
				}
			});
		}
	} catch(error) {
		console.log(error);
	}
	try {
		var ctx = document.getElementById("chart-tests-week");
		if(ctx) {
			var myChart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: keys_week,
					datasets: [{
						label: "일일 검사 건수",
						data: values_week,
						borderColor: "rgba(255, 255, 255, 0.9)",
						backgroundColor: "rgba(255, 255, 255, 0.5)"
					}]
				},
				options: {
					legend: {
						position: 'center',
						labels: {
							fontFamily: 'Poppins'
						}
					},
					scales: {
						xAxes: [{
							ticks: {
								fontFamily: "Poppins"
							}
						}],
						yAxes: [{
							ticks: {
								beginAtZero: true,
								fontFamily: "Poppins"
							}
						}]
					},
					tooltips: {
						titleFontFamily: 'Open Sans',
						backgroundColor: 'rgba(0,0,0,0.6)',
						titleFontColor: 'white',
						caretSize: 5,
						cornerRadius: 15,
						xPadding: 10,
						yPadding: 10
					}
				}
			});
		}
	} catch(error) {
		console.log(error);
	}
}
//사망자 추이 가져오기
function drawDeathsChart(all_data) {
	console.clear();
	var keys = Object.keys(all_data);
	var values = Object.values(all_data);
	var length = Object.keys(all_data).length;
	var keys_week = [];
	var values_week = [];
	for(var i=(keys.length); i>(keys.length-7); i--) {
		keys_week.unshift(keys[i-1]);
		values_week.unshift(values[i-1]);
	}
	$('.loader_deaths').hide();
	try {
		var ctx = document.getElementById("chart-deaths");
		if(ctx) {
			var myChart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: keys,
					datasets: [{
						label: "사망자",
						data: values,
						borderColor: "rgba(0, 0, 0, 0)",
						backgroundColor: "rgba(0, 0, 0, 0.5)"
					}]
				},
				options: {
					legend: {
						position: 'center',
						labels: {
							fontFamily: 'Poppins'
						}
					},
					scales: {
						xAxes: [{
							ticks: {
								fontFamily: "Poppins"
							}
						}],
						yAxes: [{
							ticks: {
								beginAtZero: true,
								fontFamily: "Poppins"
							}
						}]
					},
					tooltips: {
						titleFontFamily: 'Open Sans',
						backgroundColor: 'rgba(0,0,0,0.6)',
						titleFontColor: 'white',
						caretSize: 5,
						cornerRadius: 15,
						xPadding: 10,
						yPadding: 10
					}
				}
			});
		}
	} catch(error) {
		console.log(error);
	}
	try {
		var ctx = document.getElementById("chart-deaths-week");
		if(ctx) {
			var myChart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: keys_week,
					datasets: [{
						label: "사망자",
						data: values_week,
						borderColor: "rgba(0, 0, 0, 0.9)",
						backgroundColor: "rgba(0, 0, 0, 0.5)"
					}]
				},
				options: {
					legend: {
						position: 'center',
						labels: {
							fontFamily: 'Poppins'
						}
					},
					scales: {
						xAxes: [{
							ticks: {
								fontFamily: "Poppins"
							}
						}],
						yAxes: [{
							ticks: {
								beginAtZero: true,
								fontFamily: "Poppins"
							}
						}]
					},
					tooltips: {
						titleFontFamily: 'Open Sans',
						backgroundColor: 'rgba(0,0,0,0.6)',
						titleFontColor: 'white',
						caretSize: 5,
						cornerRadius: 15,
						xPadding: 10,
						yPadding: 10
					}
				}
			});
		}
	} catch(error) {
		console.log(error);
	}
}

function drawRatesChart(all_data) {
	console.clear();
	var keys = Object.keys(all_data);
	var values = Object.values(all_data);
	var length = Object.keys(all_data).length;
	var keys_week = [];
	var values_week = [];
	for(var i=(keys.length); i>(keys.length-7); i--) {
		keys_week.unshift(keys[i-1]);
		values_week.unshift(values[i-1]);
	}
	$('.loader_rates').hide();
	try {
		var ctx = document.getElementById("chart-rates");
		if(ctx) {
			var myChart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: keys,
					datasets: [{
						label: "확진율",
						data: values,
						borderColor: "rgba(128, 0, 128, 0)",
						backgroundColor: "rgba(128, 0, 128, 0.5)"
					}]
				},
				options: {
					legend: {
						position: 'center',
						labels: {
							fontFamily: 'Poppins'
						}
					},
					scales: {
						xAxes: [{
							ticks: {
								fontFamily: "Poppins"
							}
						}],
						yAxes: [{
							ticks: {
								beginAtZero: true,
								fontFamily: "Poppins"
							}
						}]
					},
					tooltips: {
						titleFontFamily: 'Open Sans',
						backgroundColor: 'rgba(0,0,0,0.6)',
						titleFontColor: 'white',
						caretSize: 5,
						cornerRadius: 15,
						xPadding: 10,
						yPadding: 10
					}
				}
			});
		}
	} catch(error) {
		console.log(error);
	}
	try {
		var ctx = document.getElementById("chart-rates-week");
		if(ctx) {
			var myChart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: keys_week,
					datasets: [{
						label: "확진율",
						data: values_week,
						borderColor: "rgba(128, 0, 128, 0)",
						backgroundColor: "rgba(128, 0, 128, 0.5)"
					}]
				},
				options: {
					legend: {
						position: 'center',
						labels: {
							fontFamily: 'Poppins'
						}
					},
					scales: {
						xAxes: [{
							ticks: {
								fontFamily: "Poppins"
							}
						}],
						yAxes: [{
							ticks: {
								beginAtZero: true,
								fontFamily: "Poppins"
							}
						}]
					},
					tooltips: {
						titleFontFamily: 'Open Sans',
						backgroundColor: 'rgba(0,0,0,0.6)',
						titleFontColor: 'white',
						caretSize: 5,
						cornerRadius: 15,
						xPadding: 10,
						yPadding: 10
					}
				}
			});
		}
	} catch(error) {
		console.log(error);
	}
}


function drawSevereChart(all_data) {
	var keys = Object.keys(all_data);
	var values = Object.values(all_data);
	var length = Object.keys(all_data).length;
	var keys_week = [];
	var values_week = [];
	for(var i=(keys.length); i>(keys.length-7); i--) {
		keys_week.unshift(keys[i-1]);
		values_week.unshift(values[i-1]);
	}
	$('.loader_severe').hide();
	try {
		var ctx = document.getElementById("chart-severe");
		if(ctx) {
			var myChart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: keys,
					datasets: [{
						label: "재원 위중증 환자",
						data: values,
						borderColor: "rgba(220,20,60, 0)",
						backgroundColor: "rgba(220,20,60, 0.5)"
					}]
				},
				options: {
					legend: {
						position: 'center',
						labels: {
							fontFamily: 'Poppins'
						}
					},
					scales: {
						xAxes: [{
							ticks: {
								fontFamily: "Poppins"
							}
						}],
						yAxes: [{
							ticks: {
								beginAtZero: true,
								fontFamily: "Poppins"
							}
						}]
					},
					tooltips: {
						titleFontFamily: 'Open Sans',
						backgroundColor: 'rgba(0,0,0,0.6)',
						titleFontColor: 'white',
						caretSize: 5,
						cornerRadius: 15,
						xPadding: 10,
						yPadding: 10
					}
				}
			});
		}
	} catch(error) {
		console.log(error);
	}
	try {
		var ctx = document.getElementById("chart-severe-week");
		if(ctx) {
			var myChart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: keys_week,
					datasets: [{
						label: "재원 위중증 환자",
						data: values_week,
						borderColor: "rgba(220,20,60, 0)",
						backgroundColor: "rgba(220,20,60, 0.5)"
					}]
				},
				options: {
					legend: {
						position: 'center',
						labels: {
							fontFamily: 'Poppins'
						}
					},
					scales: {
						xAxes: [{
							ticks: {
								fontFamily: "Poppins"
							}
						}],
						yAxes: [{
							ticks: {
								beginAtZero: true,
								fontFamily: "Poppins"
							}
						}]
					},
					tooltips: {
						titleFontFamily: 'Open Sans',
						backgroundColor: 'rgba(0,0,0,0.6)',
						titleFontColor: 'white',
						caretSize: 5,
						cornerRadius: 15,
						xPadding: 10,
						yPadding: 10
					}
				}
			});
		}
	} catch(error) {
		console.log(error);
	}
}

//질병청 보도자료 크롤링
$.ajax({
	type: "GET",
	url: proxyServer_json + "http://ncov.mohw.go.kr/tcmBoardList.do?brdId=3&brdGubun=", // Using myjson.com to store the JSN
	success: function(newsreleaseData) {
		var result = newsreleaseData.substring(newsreleaseData.indexOf('<div class="board_list">'), newsreleaseData.indexOf('<!--페이징-->'));
		$('.newsrelease').html(result.replace("새글", "").replace("전체 목록 : 번호, 제목, 담당, 작성일, 첨부 구성 제목 클릭시 게시물 상세 내용으로 이동", "").substring(0, result.indexOf('첨부파일')) + "<style>.m_dp_n{display:none;}.hdn{display:none;}</style>");
	}
});

function fn_tcm_boardView(schema, blank, blank2, id, blank3, all) {
	window.open('http://ncov.mohw.go.kr/tcmBoardView.do?brdId=' + blank + '&brdGubun=' + blank2 + '&dataGubun=&ncvContSeq=' + id + '&contSeq=' + id + '&board_id=' + blank3 + '&gubun=' + all, '_blank');
}

$.ajax({
	type: "GET",
	url: proxyServer_raw + "https://coronacoc-news.herokuapp.com/covid19",
	success: function(result) {
		var res = JSON.parse(result);
		var length_article = res.totalResults;
		$('.newsfeed').html('');
		for(var i = 0; i < length_article; i++) {
			var description = res.articles[i].description;
			var length = 80; // 표시할 글자수 기준
			if(description.length > length) {
				description = description.substr(0, length - 2) + '...';
			}
			$('.newsfeed').append('<div class="newsfeed_item ripple-effect" onclick="window.open(\'' + res.articles[i].url + '\', \'_blank\');"> <h4 class="title">' + res.articles[i].title + '</h4><span class="description">' + description + '</span></div>');
		}
	}
});

function accumulateChart() {
	// console.log(data);
	var data = summaryData;
	var dateArr = [];
	var casesArr = [];
	var cnt = 0;
	for(var i = data.length - 2; i >= 0; i--) {
		dateArr[cnt] = data[i + 1].stdDate;
		if(i != data.length - 1) {
			casesArr[cnt] = (data[i].confirmed) - (data[i + 1].confirmed);
		}
		cnt++;
	}
	console.log(data, casesArr);
	$('.loader_confirmed').hide();
	try {
		// 연령별 사망자 분포
		var ctx = document.getElementById("chart-confirmed");
		if(ctx) {
			var myChart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: dateArr,
					datasets: [{
						label: "신규 확진자 수",
						data: casesArr,
						borderColor: "rgba(251, 99, 64, 0.7)",
						borderWidth: "0",
						backgroundColor: "rgba(251, 99, 64, 0.5)"
					}]
				},
				options: {
					legend: {
						position: 'center',
						labels: {
							fontFamily: 'Poppins'
						}
					},
					scales: {
						xAxes: [{
							ticks: {
								fontFamily: "Poppins"
							}
						}],
						yAxes: [{
							ticks: {
								beginAtZero: true,
								fontFamily: "Poppins"
							}
						}]
					},
					tooltips: {
						titleFontFamily: 'Open Sans',
						backgroundColor: 'rgba(0,0,0,0.6)',
						titleFontColor: 'white',
						caretSize: 5,
						cornerRadius: 15,
						xPadding: 10,
						yPadding: 10
					}
				}
			});
		}
	} catch(error) {
		console.log(error);
	}
	$('#chart-confirmed').show();
	$('#chart-confirmed-week').hide();
}

function stringToDate(str) {
	var m = str.split(/\D/);
	return new Date(+m[0], +m[1] - 1, +m[2], +m[3], +m[4], +m[5]);
}

function accumulateChart_week() {
	var data = summaryData;
	var dateArr = [];
	var casesArr = [];
	var cnt = 0;
	for(var i = data.length - (data.length - 6); i >= 0; i--) {
		dateArr[cnt] = data[i + 1].stdDate;
		if(i != data.length - 1) {
			casesArr[cnt] = (data[i].confirmed) - (data[i + 1].confirmed);
		}
		cnt++;
	}
	var tommorowyear = dateArr[6].substring(0, 4);
	var tommorowmonth = dateArr[6].substring(4, 6);
	var tommorowday = dateArr[6].substring(6, 8);
	dateArr[7] = "실시간 집계중";
	casesArr[7] = liveConfirmedCases;
	console.log(data, casesArr);
	$('.loader_confirmed').hide();
	try {
		// 연령별 사망자 분포
		var ctx = document.getElementById("chart-confirmed-week");
		if(ctx) {
			var myChart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: dateArr,
					datasets: [{
						label: "신규 확진자 수",
						data: casesArr,
						borderColor: ["rgba(251, 99, 64, 0.7)", "rgba(251, 99, 64, 0.7)", "rgba(251, 99, 64, 0.7)", "rgba(251, 99, 64, 0.7)", "rgba(251, 99, 64, 0.7)", "rgba(251, 99, 64, 0.7)", "rgba(251, 99, 64, 0.7)", "rgba(255, 255, 255, 0.5)"],
						borderWidth: "0",
						backgroundColor: ["rgba(251, 99, 64, 0.5)", "rgba(251, 99, 64, 0.5)", "rgba(251, 99, 64, 0.5)", "rgba(251, 99, 64, 0.5)", "rgba(251, 99, 64, 0.5)", "rgba(251, 99, 64, 0.5)", "rgba(251, 99, 64, 0.5)", "rgba(255, 255, 255, 0.3)"]
					}]
				},
				options: {
					visible: false,
					legend: {
						position: 'center',
						labels: {
							fontFamily: 'Poppins'
						}
					},
					scales: {
						xAxes: [{
							display: false
						}],
						yAxes: [{
							ticks: {
								beginAtZero: true,
								fontFamily: "Poppins"
							},
							gridLines: {
								display: false
							}
						}]
					},
					tooltips: {
						titleFontFamily: 'Open Sans',
						backgroundColor: 'rgba(0,0,0,0.6)',
						titleFontColor: 'white',
						caretSize: 5,
						cornerRadius: 15,
						xPadding: 10,
						yPadding: 10
					}
				}
			});
		}
	} catch(error) {
		console.log(error);
	}
	$('#chart-confirmed').hide();
	$('#chart-confirmed-week').show();
}

function deathsChart() {
	$('#chart-deaths').show(100);
	$('#chart-deaths-week').hide(100);
}

function deathsChart_week() {
	$('#chart-deaths').hide(100);
	$('#chart-deaths-week').show(100);
}