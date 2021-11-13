//프록시 서버 분산
//var e = new Array("https://cors-coronacoc-v2.herokuapp.com/", "https://cors-coronacoc-v3.herokuapp.com/", "https://cors-coronacoc-v4.herokuapp.com/"),
var e = new Array("https://api.codetabs.com/v1/proxy/?quest="),

    proxyServer_raw = randomItem(e),
    proxyServer_json = randomItem(e);

function randomItem(e) {
    return e[Math.floor(Math.random() * e.length)]
}

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

//공홈 발생현황 페이지 크롤링
$.ajax({
    type: "GET",
    url: proxyServer_raw + "http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=11&ncvContSeq=&contSeq=&board_id=&gubun=",
    success: function(result) {
        //사망
        var dataIndex_d = result.toString().indexOf('<strong class="ca_top">사망</strong>');
        var dataIndexEnd_d = result.toString().indexOf('<strong class="ca_top">재원 위중증</strong>');
        var resPart_d = result.toString().substring(dataIndex_d, dataIndexEnd_d).replaceAll('<strong class="ca_top">사망</strong>','').replaceAll('<ul class="ca_body">', '').replaceAll('<li>', '').replaceAll('<dl>', '').replaceAll('</li>', '').replaceAll('</ul>', '').replaceAll('</dl>', '').replaceAll('</div>', '').replaceAll('<div>', '').replaceAll('<dt class="ca_subtit">일일</dt>', '');
        var dataIndex_d_ = resPart_d.toString().indexOf('<dd class="ca_value">');
        var dataIndexEnd_d_ = resPart_d.toString().indexOf('<dt class="ca_subtit">인구 10만명당</dt>');
        var deaths = resPart_d.substring(dataIndex_d_, dataIndexEnd_d_).replaceAll('<dd class="ca_value">', '').replaceAll('</dd>', '').replace(")", "").replaceAll(/\s/g,'');
        document.getElementById("deathPM_mb").innerHTML = '<i class="fa fa-arrow-up"></i> ' +deaths;
        document.getElementById("deathPM").innerHTML = '<i class="fa fa-arrow-up"></i> ' + deaths;
        //신규 입원 환자
        var dataIndex_h = result.toString().indexOf('<strong class="ca_top">신규입원</strong>');
        var dataIndexEnd_h = result.toString().indexOf('<strong class="ca_top">확진</strong>');
        var resPart_h = result.toString().substring(dataIndex_h, dataIndexEnd_h).replaceAll('<strong class="ca_top">신규입원</strong>','').replaceAll('<ul class="ca_body">', '').replaceAll('<li>', '').replaceAll('<dl>', '').replaceAll('</li>', '').replaceAll('</ul>', '').replaceAll('</dl>', '').replaceAll('</div>', '').replaceAll('<div>', '').replaceAll('<dt class="ca_subtit">일일</dt>', '');
        var dataIndex_h_ = resPart_h.toString().indexOf('<dd class="ca_value">');
        var dataIndexEnd_h_ = resPart_h.toString().indexOf('<dt class="ca_subtit">인구 10만명당</dt>');
        var hospitalized = resPart_h.substring(dataIndex_h_, dataIndexEnd_h_).replaceAll('<dd class="ca_value">', '').replaceAll('</dd>', '').replace(")", "");
        new numberCounter("hospitalized_mb",hospitalized);


        //재원 위중증 추이
        var dataIndex_s_chart = result.toString().indexOf('<caption><span class="hdn">재원 위중증 현황 표 - 일주일간 일일 현황과 인구 10만명당 현황으로 구성 </span></caption>');
        var dataIndexEnd_s_chart = result.toString().indexOf('<h5 class="s_title_in3">신규입원 현황 <span class="t_date">');
        var resPart_s_chart = result.toString().substring(dataIndex_s_chart, dataIndexEnd_s_chart);
        var dataIndex_s_chart_ = resPart_s_chart.toString().indexOf('<th>일일</th>');
        var dataIndexEnd_s_chart_ = resPart_s_chart.toString().indexOf('<th>인구 10만명 당</th>');
        var s_chart = resPart_s_chart.substring(dataIndex_s_chart_, dataIndexEnd_s_chart_).replaceAll('<caption><span class="hdn">사망현황표 - 일주일간 일일 현황과 인구 10만명당 현황으로 구성 </span></caption>','').replaceAll('<colgroup>', '').replaceAll('<col style="width:14%">', '').replace('<col style="width:10.75%">', '').replace('</colgroup>').replaceAll('<thead>', '').replaceAll('<tr>', '').replaceAll('<th>', '').replaceAll('<th>주간일평균</th>', '').replaceAll('<td>', '').replaceAll('</tr>', '').replaceAll('</td>', '/').replaceAll('\r', '').replaceAll('\n', '').replaceAll('\t', '').replaceAll('일일</', '').replace('th>', '').split('/');
        
        var dataIndex_s_chart_d = resPart_s_chart.toString().indexOf('<th>구분</th>');
        var dataIndexEnd_s_chart_d = resPart_s_chart.toString().indexOf('<th>주간일평균</th>');
        var s_chart_d = resPart_s_chart.substring(dataIndex_s_chart_d, dataIndexEnd_s_chart_d).replaceAll('<th>구분</th>','').replaceAll('<th>', '').replaceAll('</th>', '/').replaceAll('</tr>', '').replace('</thead>', '').replaceAll('</tbody>', '').replaceAll('<tbody>', '').replaceAll('\r', '').replaceAll('\n', '').replaceAll('\t', '').replaceAll('일일</', '').replace('th>', '').split('/');
        severe_chart(s_chart, s_chart_d);

         //신규 입원 추이
         var dataIndex_b_chart = result.toString().indexOf('<caption><span class="hdn">신규입원 현황 표 - 일주일간 일일 현황과 인구 10만명당 현황으로 구성 </span></caption>');
         var dataIndexEnd_b_chart = result.toString().indexOf('<h5 class="s_title_in3">확진 현황');
         var resPart_b_chart = result.toString().substring(dataIndex_b_chart, dataIndexEnd_b_chart);
         var dataIndex_b_chart_ = resPart_b_chart.toString().indexOf('<th>일일</th>');
         var dataIndexEnd_b_chart_ = resPart_b_chart.toString().indexOf('<th>인구 10만명 당</th>');
         var b_chart = resPart_b_chart.substring(dataIndex_b_chart_, dataIndexEnd_b_chart_).replaceAll('<caption><span class="hdn">신규입원 현황 표 - 일주일간 일일 현황과 인구 10만명당 현황으로 구성 </span></caption>','').replaceAll('<colgroup>', '').replaceAll('<col style="width:14%">', '').replace('<col style="width:10.75%">', '').replace('</colgroup>').replaceAll('<thead>', '').replaceAll('<tr>', '').replaceAll('<th>', '').replaceAll('<th>주간일평균</th>', '').replaceAll('<td>', '').replaceAll('</tr>', '').replaceAll('</td>', '/').replaceAll('\r', '').replaceAll('\n', '').replaceAll('\t', '').replaceAll('일일</', '').replace('th>', '').split('/');
         
         var dataIndex_b_chart_d = resPart_b_chart.toString().indexOf('<th>구분</th>');
         var dataIndexEnd_b_chart_d= resPart_b_chart.toString().indexOf('<th>주간일평균</th>');
         var b_chart_d = resPart_b_chart.substring(dataIndex_b_chart_d, dataIndexEnd_b_chart_d).replaceAll('<th>구분</th>','').replaceAll('<th>', '').replaceAll('</th>', '/').replaceAll('</tr>', '').replace('</thead>', '').replaceAll('</tbody>', '').replaceAll('<tbody>', '').replaceAll('\r', '').replaceAll('\n', '').replaceAll('\t', '').replaceAll('일일</', '').replace('th>', '').split('/');
         bed_chart(b_chart, b_chart_d);
        
    }
});

//공홈 메인 페이지 크롤링
$.ajax({
    type: "GET",
    url: proxyServer_raw + "http://ncov.mohw.go.kr/",
    success: function(result) {
        //중환자 병상
        var dataIndex_s = result.toString().indexOf('<th scope="row"><span>중환자 병상 <br>(중증환자전담 치료병상)</span></th>');
        var dataIndexEnd_s = result.toString().indexOf('<th scope="row"><span>일반 병상 <br>(감염병전담 병원(중등중))</span></th>');
        var resPart_s = result.toString().substring(dataIndex_s, dataIndexEnd_s).replaceAll('<th scope="row"><span>중환자 병상 <br>(중증환자전담 치료병상)</span></th>','').replaceAll('<td><span>', '').replaceAll('</span></td>', '/').replaceAll('<tr>', '').replaceAll('</li>', '').replaceAll('</tr>', '').replaceAll(/\s/g,'').split('/');
        $('#severe_sickbed').html(resPart_s[0]);
        $('#severe_sickbed_detail').html('가용 '+resPart_s[2]+'개');
       

        //일반 병상
        var dataIndex_n = result.toString().indexOf('<th scope="row"><span>일반 병상 <br>(감염병전담 병원(중등중))</span></th>');
        var dataIndexEnd_n = result.toString().indexOf('<p class="info_notice">거점전담병원 포함</p>');
        var resPart_n = result.toString().substring(dataIndex_n, dataIndexEnd_n).replaceAll('<th scope="row"><span>일반 병상 <br>(감염병전담 병원(중등중))</span></th>','').replaceAll('<td><span>', '').replaceAll('</span></td>', '/').replaceAll('<tr>', '').replaceAll('</li>', '').replaceAll('</tr>', '').replaceAll('</tbody>').replaceAll('</table>', '').replaceAll(/\s/g,'').split('/');
        $('#normal_sickbed').html(resPart_n[0]);
        $('#normal_sickbed_detail').html('가용 '+resPart_n[2]+'개');

        console.log(dataIndex_n, dataIndexEnd_n, resPart_n)

        var severeColor, normalColor = '';

        if(parseInt(resPart_s[0].replace('%', '')) <= 50) {
            severeColor = ' rgba(69, 209, 90, 0.2)'; //green
        } else if(parseInt(resPart_s[0].replace('%', '')) <= 80) {
            severeColor = 'rgba(255, 165, 0, 0.2)'; //orange
        } else {
            severeColor = 'rgba(69, 209, 90, 0.2)'; //red
        }

        if(parseInt(resPart_n[0].replace('%', '')) <= 50) {
            normalColor = ' rgba(69, 209, 90, 0.2)'; //green
        } else if(parseInt(resPart_s[0].replace('%', '')) <= 80) {
            normalColor = 'rgba(255, 165, 0, 0.2)'; //orange
        } else {
            normalColor = 'rgba(69, 209, 90, 0.2)'; //red
        }

        var styles = `.progress_severe:after {
            content: '';
            position: absolute;
            background: `+severeColor+`;
            top: 0; bottom: 0;
            left: 0; 
            width: `+parseInt(resPart_s[0].replace('%', ''))/2+`%;
        }`+ `.progress_normal:after {
            content: '';
            position: absolute;
            background: `+normalColor+`;
            top: 0; bottom: 0;
            left: 0; 
            width: `+parseInt(resPart_n[0].replace('%', ''))+`%;
        }`


var styleSheet = document.createElement("style")
styleSheet.type = "text/css"
styleSheet.innerText = styles
document.head.appendChild(styleSheet)
    }
});


$.ajax({
    type: "GET",
    url: "https://api.corona-19.kr/korea/?serviceKey=5d4143bd958c16e18abe1acef5386c12d", // Using myjson.com to store the JSN
    success: function(result2) {
        document.getElementById("whenUpdate").innerHTML = result2.updateTime.replace("코로나바이러스감염증-19 국내 발생현황 (", "").replace(')', '');

        new numberCounter("confirmed", result2.TotalCase.replaceAll(",", ""));
        new numberCounter("confirmed_mb", result2.TotalCase.replaceAll(",", ""));
        new numberCounter("cure", result2.TotalRecovered.replaceAll(",", ""));
        new numberCounter("cure_mb", result2.TotalRecovered.replaceAll(",", ""));
        new numberCounter("death", result2.TotalDeath.replaceAll(",", ""));
        new numberCounter("death_mb", result2.TotalDeath.replaceAll(",", ""));
        nowcase = result2.NowCase;
        nownewcase = result2.TotalCaseBefore;
        //document.getElementById("curePM").innerHTML = '<i class="fa fa-arrow-up"></i> ' + result2.TodayRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        //document.getElementById("deathPM").innerHTML = '<i class="fa fa-arrow-up"></i> ' + result2.TodayDeath;
        //document.getElementById("curePM_mb").innerHTML = '<i class="fa fa-arrow-up"></i> ' + result2.TodayRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        //document.getElementById("deathPM_mb").innerHTML = '<i class="fa fa-arrow-up"></i> ' + result2.TodayDeath;


        $('#casePercent').attr("data-done", (result2.casePercentage) * 10.0);
        $('#curePercent').attr("data-done", (result2.recoveredPercentage));
        $('#deathPercent').attr("data-done", (result2.deathPercentage) * 10.0);

        progressbar_case();
        progressbar_cure();
        progressbar_death();

        $.ajax({
            type: "GET",
            url: "https://api.corona-19.kr/korea/country/new/?serviceKey=5d4143bd958c16e18abe1acef5386c12d", // Using myjson.com to store the JSON
            success: function(result) {
                document.getElementById("confirmedPM").innerHTML = '<i class="fa fa-arrow-up"></i> ' + result.korea.newCase;
                document.getElementById("newConfirmed_mb").innerHTML = result.korea.newCase;

                new numberCounter("newConfirmed_mb", result.korea.newCase.replaceAll(",", ""));
                new numberCounter("nowcases", nowcase.replaceAll(",", ""));

                if (nownewcase.toString().indexOf('-') != -1) {
                    document.getElementById("nowPM").innerHTML = '<i class="fa fa-arrow-down"></i> ' + nownewcase;
                } else {
                    document.getElementById("nowPM").innerHTML = '<i class="fa fa-arrow-up"></i> ' + nownewcase;
                }

                document.getElementById("localConfirmed").innerHTML = result.korea.newCcase + "명";
                document.getElementById("abroadConfirmed").innerHTML = result.korea.newFcase + "명";

                //시도별 현황
                document.getElementById('seoulCases').innerHTML = result.seoul.totalCase + "(+" + result.seoul.newCase + ")";
                document.getElementById('seoulCure').innerHTML = result.seoul.recovered;
                document.getElementById('seoulDeath').innerHTML = result.seoul.death;

                document.getElementById('busanCases').innerHTML = result.busan.totalCase + "(+" + result.busan.newCase + ")";
                document.getElementById('busanCure').innerHTML = result.busan.recovered;
                document.getElementById('busanDeath').innerHTML = result.busan.death;

                document.getElementById('daeguCases').innerHTML = result.daegu.totalCase + "(+" + result.daegu.newCase + ")";
                document.getElementById('daeguCure').innerHTML = result.daegu.recovered;
                document.getElementById('daeguDeath').innerHTML = result.daegu.death;

                document.getElementById('incheonCases').innerHTML = result.incheon.totalCase + "(+" + result.incheon.newCase + ")";
                document.getElementById('incheonCure').innerHTML = result.incheon.recovered;
                document.getElementById('incheonDeath').innerHTML = result.incheon.death;

                document.getElementById('gwangjuCases').innerHTML = result.gwangju.totalCase + "(+" + result.gwangju.newCase + ")";
                document.getElementById('gwangjuCure').innerHTML = result.gwangju.recovered;
                document.getElementById('gwangjuDeath').innerHTML = result.gwangju.death;

                document.getElementById('daejeonCases').innerHTML = result.daejeon.totalCase + "(+" + result.daejeon.newCase + ")";
                document.getElementById('daejeonCure').innerHTML = result.daejeon.recovered;
                document.getElementById('daejeonDeath').innerHTML = result.daejeon.death;

                document.getElementById('ulsanCases').innerHTML = result.ulsan.totalCase + "(+" + result.ulsan.newCase + ")";
                document.getElementById('ulsanCure').innerHTML = result.ulsan.recovered;
                document.getElementById('ulsanDeath').innerHTML = result.ulsan.death;

                document.getElementById('sejongCases').innerHTML = result.sejong.totalCase + "(+" + result.sejong.newCase + ")";
                document.getElementById('sejongCure').innerHTML = result.sejong.recovered;
                document.getElementById('sejongDeath').innerHTML = result.sejong.death;

                document.getElementById('ggCases').innerHTML = result.gyeonggi.totalCase + "(+" + result.gyeonggi.newCase + ")";
                document.getElementById('ggCure').innerHTML = result.gyeonggi.recovered;
                document.getElementById('ggDeath').innerHTML = result.gyeonggi.death;

                document.getElementById('gangwonCases').innerHTML = result.gangwon.totalCase + "(+" + result.gangwon.newCase + ")";
                document.getElementById('gangwonCure').innerHTML = result.gangwon.recovered;
                document.getElementById('gangwonDeath').innerHTML = result.gangwon.death;

                document.getElementById('cbCases').innerHTML = result.chungbuk.totalCase + "(+" + result.chungbuk.newCase + ")";
                document.getElementById('cbCure').innerHTML = result.chungbuk.recovered;
                document.getElementById('cbDeath').innerHTML = result.chungbuk.death;

                document.getElementById('cnCases').innerHTML = result.chungnam.totalCase + "(+" + result.chungnam.newCase + ")";
                document.getElementById('cnCure').innerHTML = result.chungnam.recovered;
                document.getElementById('cnDeath').innerHTML = result.chungnam.death;

                document.getElementById('jbCases').innerHTML = result.jeonbuk.totalCase + "(+" + result.jeonbuk.newCase + ")";
                document.getElementById('jbCure').innerHTML = result.jeonbuk.recovered;
                document.getElementById('jbDeath').innerHTML = result.jeonbuk.death;

                document.getElementById('jnCases').innerHTML = result.jeonnam.totalCase + "(+" + result.jeonnam.newCase + ")";
                document.getElementById('jnCure').innerHTML = result.jeonnam.recovered;
                document.getElementById('jnDeath').innerHTML = result.jeonnam.death;

                document.getElementById('gbCases').innerHTML = result.gyeongbuk.totalCase + "(+" + result.gyeongbuk.newCase + ")";
                document.getElementById('gbCure').innerHTML = result.gyeongbuk.recovered;
                document.getElementById('gbDeath').innerHTML = result.gyeongbuk.death;

                document.getElementById('gnCases').innerHTML = result.gyeongnam.totalCase + "(+" + result.gyeongnam.newCase + ")";
                document.getElementById('gnCure').innerHTML = result.gyeongnam.recovered;
                document.getElementById('gnDeath').innerHTML = result.gyeongnam.death;

                document.getElementById('jejuCases').innerHTML = result.jeju.totalCase + "(+" + result.jeju.newCase + ")";
                document.getElementById('jejuCure').innerHTML = result.jeju.recovered;
                document.getElementById('jejuDeath').innerHTML = result.jeju.death;

                document.getElementById('gumCases').innerHTML = result.quarantine.totalCase + "(+" + result.quarantine.newCase + ")";
                document.getElementById('gumCure').innerHTML = result.quarantine.recovered;
                document.getElementById('gumDeath').innerHTML = result.quarantine.death;



            }
        });

    }

});




rtTodayGet();

setInterval(function() { //1분마다 실시간 확진자 새로고침
    rtTodayUpdate();
}, 60000);

var liveConfirmedCases;

function rollingRealtimeByRegion(data) {
    $('#rtRegionName').html(cityCode[0]);
    $('#rtTodayByRegion').html(data[0][0] + "명");

    if (data[0][1].toString().includes("-")) {
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

        if (data[cnt][1].toString().includes("-")) {
            document.getElementById('rtpmBox_byRegion').style.backgroundColor = "rgba(119, 158, 203, 0.9)";
            $('#rtPMByRegion').html("↓ " + data[cnt][1].toString().replace("-", ""));
        } else {
            document.getElementById('rtpmBox_byRegion').style.backgroundColor = "rgba(255, 105, 97, 0.7)";
            $('#rtPMByRegion').html("↑ " + data[cnt][1].toString());
        }
        if (cnt >= 16) {
            cnt = 0;
        } else {
            cnt++;
        }

    }, 3500);
}

function rtTodayGet() {

    $.ajax({
        type: "GET",
        url: proxyServer_raw + "https://apiv2.corona-live.com/domestic-init.json", // Using myjson.com to store the JSON
        success: function(result) {
            liveConfirmedCases = result.statsLive.today;
            new numberCounter("rtToday", result.statsLive.today);
            var rtpm = String(parseInt(result.statsLive.today) - parseInt(result.statsLive.yesterday));
            if (rtpm.includes("-")) {
                document.getElementById('rtpmBox').style.backgroundColor = "rgba(119, 158, 203, 0.3)";
                rtpm = "↓ " + rtpm.replace("-", "");
            } else {
                document.getElementById('rtpmBox').style.backgroundColor = "rgba(255, 105, 97, 0.3)";
                rtpm = "↑ " + rtpm;
            }
            
        //위중증 환자
        new numberCounter("severe_mb",result.stats.patientsWithSevereSymptons[0]);
        if(result.stats.patientsWithSevereSymptons[1] != 0) {
$('#severePM_mb').html('<i class="fa fa-arrow-up"></i> ' + result.stats.patientsWithSevereSymptons[1]);
        }
        

            document.getElementById('rtPM').innerHTML = rtpm;
            var cityN = result.updatesPreview[0].city.toString();
            document.getElementById('realtimeSummary').innerHTML = cityCode[cityN] + " " + result.updatesPreview[0].src + "&nbsp;&nbsp;>";
            rollingRealtimeByRegion(result.citiesLive);


            $.ajax({
                type: "GET",
                url: proxyServer_raw + "https://apiv2.corona-live.com/domestic-updates.json",
                success: function(result2) {
                    for (var i = 0; i < result2.updates.data.length; i++) {

                        var cityN_ = result2.updates.data[i].city.toString();
                        $('#realtimeList').append('<tr><td>' + result2.updates.data[i].datetime.substring(11, 16) + '</td><td>' + cityCode[cityN_] + " " + result2.updates.data[i].cases + "명 추가 확진" + '</td></tr>');
                    }
                }
            });
        }
    });
}

function rtTodayUpdate() {

    $.ajax({
        type: "GET",
        url: proxyServer_raw + "https://apiv2.corona-live.com/domestic-init.json",
        success: function(result) {
            if (liveConfirmedCases != result.statsLive.today) {
                toast("실시간 확진자 + " + (parseInt(result.statsLive.today) - parseInt(liveConfirmedCases)));
                accumulateChart_week();
            } else { console.log('실시간 확진자 변동 없음') }

            liveConfirmedCases = result.statsLive.today;
            new numberCounter("rtToday", result.statsLive.today);
            var rtpm = String(parseInt(result.statsLive.today) - parseInt(result.statsLive.yesterday));
            if (rtpm.includes("-")) {
                document.getElementById('rtpmBox').style.backgroundColor = "rgba(119, 158, 203, 0.3)";
                rtpm = "↓ " + rtpm.replace("-", "");
            } else {
                document.getElementById('rtpmBox').style.backgroundColor = "rgba(255, 105, 97, 0.3)";
                rtpm = "↑ " + rtpm;
            }
            document.getElementById('rtPM').innerHTML = rtpm;
            var cityN = result.updatesPreview[0].city.toString();
            document.getElementById('realtimeSummary').innerHTML = cityCode[cityN] + " " + result.updatesPreview[0].src + "&nbsp;&nbsp;>";

            rollingRealtimeByRegion(result.citiesLive);

            $.ajax({
                type: "GET",
                url: proxyServer_raw + "https://apiv2.corona-live.com/domestic-updates.json",
                success: function(result2) {
                    $('#realtimeList').html('');
                    for (var i = 0; i < result2.updates.data.length; i++) {

                        var cityN_ = result2.updates.data[i].city.toString();
                        $('#realtimeList').append('<tr><td>' + result2.updates.data[i].datetime.substring(11, 16) + '</td><td>' + cityCode[cityN_] + " " + result2.updates.data[i].cases + "명 추가 확진" + '</td></tr>');
                    }
                }
            });

        }
    });
}

var summaryData;
//카카오 현황판(누적 데이터)
$.ajax({
    type: "GET",
    url: proxyServer_raw + "https://news.daum.net/covid19",
    success: function(result) {
        //console.clear();
        var dataIndex = result.toString().indexOf('window.summaryList');
        var dataIndexEnd = result.toString().indexOf('window.vaccinationList');
        var data = JSON.parse(result.toString().substring(dataIndex, dataIndexEnd).replace("window.summaryList = ", "").replace(";", ""));
        summaryData = data;
        accumulateChart_week();
    }
});

function rollingDistancingLevel(data) {
    $('#distanceLevel').html(data.result[0].title + " 거리두기 " + '<span class="badge badge-danger" >' + data.result[0].level + "단계</span>")
    var cnt = 1;
    setInterval(function() {
        switch (data.result[cnt].level) {
            case "1":
                $('#distanceLevel').html(data.result[cnt].title + " 거리두기 " + '<span class="badge badge-success">' + data.result[cnt].level + "단계</span>");
                break;
            case "2":
                $('#distanceLevel').html(data.result[cnt].title + " 거리두기 " + '<span class="badge badge-warning">' + data.result[cnt].level + "단계</span>");
                break;
            case "3":
                $('#distanceLevel').html(data.result[cnt].title + " 거리두기 " + '<span class="badge badge-danger">' + data.result[cnt].level + "단계</span>");
                break;
            default:
                $('#distanceLevel').html(data.result[cnt].title + " 거리두기 " + '<span class="badge badge-danger">' + data.result[cnt].level + "단계</span>");
                break;
        }
        if (cnt >= 16) {
            cnt = 0;
        } else {
            cnt++;
        }

    }, 3500);
}

function distanceMapUpdate(data) {

    var datasets = [
        ['kr-kg', parseInt(data.result[8].level)], //경기
        ['kr-cb', parseInt(data.result[12].level)], //전북
        ['kr-kn', parseInt(data.result[15].level)], //경남
        ['kr-2685', parseInt(data.result[13].level)], //전남
        ['kr-pu', parseInt(data.result[1].level)], //부산
        ['kr-2688', parseInt(data.result[14].level)], //경북
        ['kr-sj', parseInt(data.result[7].level)], //세종
        ['kr-tj', parseInt(data.result[5].level)], //대전
        ['kr-ul', parseInt(data.result[6].level)], //울산
        ['kr-in', parseInt(data.result[3].level)], //인천
        ['kr-kw', parseInt(data.result[9].level)], //강원
        ['kr-gn', parseInt(data.result[11].level)], //충남
        ['kr-cj', parseInt(data.result[16].level)], //제주
        ['kr-gb', parseInt(data.result[10].level)], //충북
        ['kr-so', parseInt(data.result[0].level)], //서울
        ['kr-tg', parseInt(data.result[2].level)], //대구
        ['kr-kj', parseInt(data.result[4].level)] //광주
    ];

    // Create the chart
    Highcharts.mapChart('koreamap-container', {
        chart: {
            map: 'countries/kr/kr-all',
            backgroundColor: '#212529',
            height: '300px'
        },

        exporting: {
            enabled: true
        },

        tooltip: {
            formatter: function() {
                //console.log(regionName);
                var rn = (this.point.name);
                var regionDescription = "";
                switch (rn) {
                    case "경기":
                        regionDescription = (data.result[8].description);
                        break;
                    case "전북":
                        regionDescription = (data.result[12].description);
                        break;
                    case "경남":
                        regionDescription = (data.result[15].description);
                        break;
                    case "전남":
                        regionDescription = (data.result[13].description);
                        break;
                    case "부산":
                        regionDescription = (data.result[1].description);
                        break;
                    case "경북":
                        regionDescription = (data.result[14].description);
                        break;
                    case "세종":
                        regionDescription = (data.result[7].description);
                        break;
                    case "대전":
                        regionDescription = (data.result[5].description);
                        break;
                    case "울산":
                        regionDescription = (data.result[6].description);
                        break;
                    case "인천":
                        regionDescription = (data.result[3].description);
                        break;
                    case "강원":
                        regionDescription = (data.result[9].description);
                        break;
                    case "충남":
                        regionDescription = (data.result[1].description);
                        break;
                    case "제주":
                        regionDescription = (data.result[16].description);
                        break;
                    case "충북":
                        regionDescription = (data.result[10].description);
                        break;
                    case "서울":
                        regionDescription = (data.result[0].description);
                        break;
                    case "광주":
                        regionDescription = (data.result[4].description);
                        break;
                    default:
                        regionDescription = "";
                        break;
                }

                return this.point.name + '<br>거리두기 <b>' + this.point.value +
                    '</b>단계<b><br><br>' + regionDescription.toString().replaceAll(",", "<br>");
            },
            borderRadius: '15'
        },


        title: {
            text: null
        },

        mapNavigation: {
            enabled: false,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            visible: false,
            min: 1,
            max: 4,
            minColor: '#2dce89',
            maxColor: '#00361e',
        },

        series: [{
            data: datasets,
            name: '거리두기 단계',
            states: {
                hover: {
                    color: '#32325d'
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}',
            },
        }]
    });
}

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

//백신접종 현황
$.ajax({
    type: "GET",
    url: proxyServer_raw + "https://apiv2.corona-live.com/vaccine.json", // Using myjson.com to store the JSON
    success: function(result) {
        var length = result.length;
        $('#vacTotal').html(result.stats.partiallyVaccinated.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '건');
        $('#vacPM').html('↑ ' + result.stats.partiallyVaccinated.delta.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $('#vacTotal2').html(result.stats.fullyVaccinated.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '건');
        $('#vacPM2').html('↑ ' + result.stats.fullyVaccinated.delta.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

        var first_percent = result.stats.partiallyVaccinated.percentage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var second_percent = result.stats.fullyVaccinated.percentage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
        $('#first_vaccinePercent').html(first_percent + "%");
        $('#second_vaccinePercent').html(second_percent + "%");
        $(".progress_vac1").css({width: parseInt(first_percent)+"%"});
        $(".progress_vac2").css({width: parseInt(second_percent)+"%"});


    }
});
//예방접종 공홈에서 추가접종 현황 크롤링
$.ajax({
    type: "GET",
    url: proxyServer_raw + "https://ncv.kdca.go.kr/mainStatus.es?mid=a11702000000",
    success: function(result) {
        var dataIndex_v3 = result.toString().indexOf('<th scope="row">당일 누적<span class="r_txt_descript clr_1">A</span> + <span class="r_txt_descript clr_2">B</span></th>');
        var dataIndexEnd_v3 = result.toString().indexOf('<th scope="row">당일 실적<span class="r_txt_descript clr_1">A</span></th>');
        var resPart_v3 = result.toString().substring(dataIndex_v3, dataIndexEnd_v3).replaceAll('<th scope="row">당일 누적<span class="r_txt_descript clr_1">A</span> + <span class="r_txt_descript clr_2">B</span></th>','').replaceAll('<td class="d_num">', '').replaceAll('</td>', '/').replaceAll('</tr>', '').replaceAll('<tr>', '').replaceAll('\r\n', '').replaceAll(/\s/g,'').split('/');
        $('#third_vaccinePercent').html(resPart_v3[2] + "건");
        
    }
});


//검사현황 가져오기
$.getJSON(proxyServer_raw + "https://apiv2.corona-live.com/tests/all.json", function(json_data) {
    $('.loader_tests').hide();
    try {
        var ctx = document.getElementById("chart-tests");
        if (ctx) {
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: Object.keys(json_data),
                    datasets: [{
                        label: "일일 검사 건수",
                        data: Object.values(json_data),
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

    } catch (error) {
        console.log(error);
    }
});

//검사현황 가져오기
$.getJSON(proxyServer_raw + "https://apiv2.corona-live.com/tests/week.json", function(json_data) {
    try {
        var ctx = document.getElementById("chart-tests-week");
        if (ctx) {
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.keys(json_data),
                    datasets: [{
                        label: "일일 검사 건수",
                        data: Object.values(json_data),
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

    } catch (error) {
        console.log(error);
    }
});


//사망자 추이 가져오기
$.getJSON(proxyServer_raw + "https://apiv2.corona-live.com/deaths/all.json", function(json_data) {
    $('.loader_deaths').hide();
    try {
        var ctx = document.getElementById("chart-deaths");
        if (ctx) {
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: Object.keys(json_data),
                    datasets: [{
                        label: "사망자",
                        data: Object.values(json_data),
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

    } catch (error) {
        console.log(error);
    }
});

$.getJSON(proxyServer_raw + "https://apiv2.corona-live.com/deaths/week.json", function(json_data) {
    try {
        var ctx = document.getElementById("chart-deaths-week");
        if (ctx) {
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.keys(json_data),
                    datasets: [{
                        label: "사망자",
                        data: Object.values(json_data),
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

    } catch (error) {
        console.log(error);
    }
});

/**
 *  yyyyMMdd 포맷으로 반환
 */
function getFormatDate(date) {
    var year = date.getFullYear(); //yyyy
    var month = (1 + date.getMonth()); //M
    month = month >= 10 ? month : '0' + month; //month 두자리로 저장
    var day = date.getDate(); //d
    day = day >= 10 ? day : '0' + day; //day 두자리로 저장
    return year + '' + month + '' + day; //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}

/*날짜 구하기*/
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1
var day = date.getDate();
if (month < 10) {
    month = "0" + month;
}
if (day < 10) {
    day = "0" + day;
}

var today = year + "" + month + "" + day;


//연령/성별 현황
$.ajax({
    type: "GET",
    url: proxyServer_json + "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19GenAgeCaseInfJson?serviceKey=0Ii2OFEKp3FQwYT0kWzwDNlmKa3JyD2hY4PPXBL3yA5RbBmUD8JSCBGEkGlVzmMIDF%2B2YFli6qA74ybbeSot3Q%3D%3D&ServiceKey=0Ii2OFEKp3FQwYT0kWzwDNlmKa3JyD2hY4PPXBL3yA5RbBmUD8JSCBGEkGlVzmMIDF%2B2YFli6qA74ybbeSot3Q%3D%3D&pageNo=1&numOfRows=10&startCreateDt=" + today + "&endCreateDt=" + today, // Using myjson.com to store the JSON
    success: function(result) {

        var theJson = xmlToJson(result);

        if (JSON.stringify(theJson.response.body.totalCount).replace("{\"#text\":", "").replace("\"", "").replace("\"}").replace("undefined", "") <= 0) {
            console.log("오늘 데이터 없음");
            yesterdayData();

        } else {
            var cases_byAge = new Array(9);
            var death_byAge = new Array(9);
            var cases_bySex = new Array(1);

            for (var i = 0; i < 9; i++) {
                var cases_age = (theJson.response.body.items.item[i].confCase);
                var death_age = (theJson.response.body.items.item[i].death);
                cases_byAge[i] = parseInt(JSON.stringify(cases_age).replace("{\"#text\":", "").replace("\"", "").replace("\"}").replace("undefined", ""));
                death_byAge[i] = parseInt(JSON.stringify(death_age).replace("{\"#text\":", "").replace("\"", "").replace("\"}").replace("undefined", ""));
            }

            var case_male = (theJson.response.body.items.item[9].confCase);
            var case_female = (theJson.response.body.items.item[10].confCase);
            cases_bySex[0] = parseInt(JSON.stringify(case_female).replace("{\"#text\":", "").replace("\"", "").replace("\"}").replace("undefined", ""));
            cases_bySex[1] = parseInt(JSON.stringify(case_male).replace("{\"#text\":", "").replace("\"", "").replace("\"}").replace("undefined", ""));

            reloadChart(cases_byAge, death_byAge, cases_bySex);
        }





    }
});

function xmlToJson(xml) {
    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3 ||
        xml.nodeType == 4) { // text and cdata section
        obj = xml.nodeValue
    }

    // do children
    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof(obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof(obj[nodeName].length) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                if (typeof(obj[nodeName]) === 'object') {
                    obj[nodeName].push(xmlToJson(item));
                }
            }
        }
    }
    return obj;
}


////// 어제 데이터 불러오기(오늘자 데이터가 없을 때)
function yesterdayData() {
    var yesterday = new Date(Date.now() - 864e5);
    $.ajax({
        type: "GET",
        url: proxyServer_json + "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19GenAgeCaseInfJson?serviceKey=0Ii2OFEKp3FQwYT0kWzwDNlmKa3JyD2hY4PPXBL3yA5RbBmUD8JSCBGEkGlVzmMIDF%2B2YFli6qA74ybbeSot3Q%3D%3D&ServiceKey=0Ii2OFEKp3FQwYT0kWzwDNlmKa3JyD2hY4PPXBL3yA5RbBmUD8JSCBGEkGlVzmMIDF%2B2YFli6qA74ybbeSot3Q%3D%3D&pageNo=1&numOfRows=10&startCreateDt=" + getFormatDate(yesterday) + "&endCreateDt=" + getFormatDate(yesterday), // Using myjson.com to store the JSON
        success: function(result) {

            var theJson = xmlToJson(result);
            var cases_byAge = new Array(9);
            var death_byAge = new Array(9);
            var cases_bySex = new Array(1);

            for (var i = 0; i < 9; i++) {
                var cases_age = (theJson.response.body.items.item[i].confCase);
                var death_age = (theJson.response.body.items.item[i].death);
                cases_byAge[i] = parseInt(JSON.stringify(cases_age).replace("{\"#text\":", "").replace("\"", "").replace("\"}").replace("undefined", ""));
                death_byAge[i] = parseInt(JSON.stringify(death_age).replace("{\"#text\":", "").replace("\"", "").replace("\"}").replace("undefined", ""));
            }

            var case_male = (theJson.response.body.items.item[9].confCase);
            var case_female = (theJson.response.body.items.item[10].confCase);
            cases_bySex[0] = parseInt(JSON.stringify(case_female).replace("{\"#text\":", "").replace("\"", "").replace("\"}").replace("undefined", ""));
            cases_bySex[1] = parseInt(JSON.stringify(case_male).replace("{\"#text\":", "").replace("\"", "").replace("\"}").replace("undefined", ""));


            reloadChart(cases_byAge, death_byAge, cases_bySex);


        }
    });
}



// 차트 생성
function reloadChart(cases_byAge, death_byAge, cases_bySex) {
    try {
        $('.loader_caseByAge').hide();

        // 연령별 확진자 분포
        var ctx = document.getElementById("singelBarChart_case");
        if (ctx) {
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["0~9세", "10대", "20대", "30대", "40대", "50대", "60대", "70대", "80대이상"],
                    datasets: [{
                        label: "확진자 수",
                        data: cases_byAge,
                        borderColor: "rgba(255, 40, 0, 1)",
                        borderWidth: "0",
                        backgroundColor: "rgba(255, 40, 0, 0.8)"
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
                                beginAtZero: false,
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

    } catch (error) {
        console.log(error);
    }

    try {
        $('.loader_deathsByAge').hide();

        // 연령별 사망자 분포
        var ctx = document.getElementById("singelBarChart_death");
        if (ctx) {
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["0~9세", "10대", "20대", "30대", "40대", "50대", "60대", "70대", "80대이상"],
                    datasets: [{
                        label: "사망자수",
                        data: death_byAge,
                        borderColor: "rgba(255, 255, 255, 0.9)",
                        borderWidth: "0",
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

    } catch (error) {
        console.log(error);
    }

    try {
        $('.loader_caseByGender').hide();
        //성별 확진자 현황
        var ctx = document.getElementById("doughutChart_sex");
        if (ctx) {
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: cases_bySex,
                        backgroundColor: [
                            '#00b5e9',
                            '#fa4251',
                        ],
                        hoverBackgroundColor: [
                            '#00b5e9',
                            '#fa4251',
                        ]

                    }],
                    labels: [
                        "남성",
                        "여성"
                    ]
                },
                options: {
                    legend: {
                        position: 'center',
                        labels: {
                            fontFamily: 'Poppins'
                        }

                    },
                    tooltips: {
                        titleFontFamily: 'Open Sans',
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        titleFontColor: 'white',
                        caretSize: 5,
                        cornerRadius: 15,
                        xPadding: 10,
                        yPadding: 10
                    },
                    responsive: true
                }
            });
        }


    } catch (error) {
        console.log(error);
    }
}

//차트 탭
$("document").ready(function() {
    $(".tab-slider--body").hide();
    $(".tab-slider--body:first").show();
    $(".tab-slider--body2").hide();
    $(".tab-slider--body2:first").show();
});

$(".tab-slider--nav li").click(function() {
    $(".tab-slider--body").hide();
    var activeTab = $(this).attr("rel");
    $("#" + activeTab).fadeIn();
    if ($(this).attr("rel") == "tab2") {
        $('.tab-slider--tabs').addClass('slide');
    } else {
        $('.tab-slider--tabs').removeClass('slide');
    }
    $(".tab-slider--nav li").removeClass("active");
    $(this).addClass("active");
});


$(".tab-slider--nav2 li").click(function() {
    $(".tab-slider--body2").hide();
    var activeTab = $(this).attr("rel");
    $("#" + activeTab).fadeIn();
    if ($(this).attr("rel") == "tab4") {
        $('.tab-slider--tabs2').addClass('slide');
    } else {
        $('.tab-slider--tabs2').removeClass('slide');
    }
    $(".tab-slider--nav2 li").removeClass("active");
    $(this).addClass("active");
});


function progressbar_case() {
    const progress = document.querySelector('.progress-done');

    progress.style.width = progress.getAttribute('data-done') + '%';
    progress.style.opacity = 1;

    /*counter code*/
    /*adapted from answer on: https://stackoverflow.com/questions/50245161/simple-javascript-counter-without-using-jquery-or-other-frameworks */
    const final = parseInt(progress.getAttribute('data-done')) / 10;
    const duration = 1000;
    let start;

    const step = ts => {
        if (!start) { start = ts; }
        // get the time passed as a fraction of total duration
        let prog = (ts - start) / duration;
        progress.textContent = progress.getAttribute('data-done') / 10 + "%";
        if (prog < 1) { // if not done, request another frame
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step)

}

function progressbar_cure() {
    const progress2 = document.querySelector('.progress-done2');

    progress2.style.width = progress2.getAttribute('data-done') + '%';
    progress2.style.opacity = 1;

    /*counter code*/
    /*adapted from answer on: https://stackoverflow.com/questions/50245161/simple-javascript-counter-without-using-jquery-or-other-frameworks */
    const final = parseInt(progress2.getAttribute('data-done'));
    const duration = 1000;
    let start;

    const step = ts => {
        if (!start) { start = ts; }
        // get the time passed as a fraction of total duration
        let prog = (ts - start) / duration;
        progress2.textContent = progress2.getAttribute('data-done') + "%";
        if (prog < 1) { // if not done, request another frame
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step)

}


function progressbar_death() {
    const progress3 = document.querySelector('.progress-done3');

    progress3.style.width = progress3.getAttribute('data-done') + '%';
    progress3.style.opacity = 1;

    /*counter code*/
    /*adapted from answer on: https://stackoverflow.com/questions/50245161/simple-javascript-counter-without-using-jquery-or-other-frameworks */
    const final = parseInt(progress3.getAttribute('data-done')) / 10;
    const duration = 1000;
    let start;

    const step = ts => {
        if (!start) { start = ts; }
        // get the time passed as a fraction of total duration
        let prog = (ts - start) / duration;
        progress3.textContent = parseInt(progress3.getAttribute('data-done')) / 10 + "%";
        if (prog < 1) { // if not done, request another frame
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step)

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


//뉴스
$.ajax({
    type: "GET",
    url: proxyServer_raw + "https://coronacoc-news.herokuapp.com/covid19",
    success: function(result) {
        var res = JSON.parse(result);
        var length_article = res.totalResults;
        //console.clear();
        $('.newsfeed').html('');

        for (var i = 0; i < length_article; i++) {
            var description = res.articles[i].description;

            var length = 80; // 표시할 글자수 기준
            if (description.length > length) {
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
    for (var i = data.length - 2; i >= 0; i--) {
        dateArr[cnt] = data[i + 1].stdDate;
        if (i != data.length - 1) {
            casesArr[cnt] = (data[i].confirmed) - (data[i + 1].confirmed);
        }

        cnt++;
    }

    console.log(data, casesArr);
    $('.loader_confirmed').hide();
    

    try {
        // 연령별 사망자 분포
        var ctx = document.getElementById("chart-confirmed");
        if (ctx) {
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

    } catch (error) {
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
    for (var i = data.length - (data.length - 6); i >= 0; i--) {
        dateArr[cnt] = data[i + 1].stdDate;
        if (i != data.length - 1) {
            casesArr[cnt] = (data[i].confirmed) - (data[i + 1].confirmed);
        }
        cnt++;
    }

    var tommorowyear = dateArr[6].substring(0, 4);
    var tommorowmonth = dateArr[6].substring(4, 6);
    var tommorowday = dateArr[6].substring(6, 8);
    console.log(dateArr[6]);

    var tommorowDate = new Date(tommorowyear, tommorowmonth, tommorowday);
    tommorowDate.setDate(tommorowDate.getDate() + 1);
    tommorowDate = tommorowDate.getFullYear() + "." + tommorowDate.getMonth() + "." + tommorowDate.getDate();
    dateArr[7] = tommorowDate + "(실시간 집계중)";
    casesArr[7] = liveConfirmedCases;

    console.log(data, casesArr);

    $('.loader_confirmed').hide();

    try {
        // 연령별 사망자 분포
        var ctx = document.getElementById("chart-confirmed-week");
        if (ctx) {
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

    } catch (error) {
        console.log(error);
    }
    $('#chart-confirmed').hide();
    $('#chart-confirmed-week').show();
}


function severe_chart(data, date) {
    dataArr = data.slice(0, -2);
    dateArr = date.slice(0, -1);
    $('.loader_severe').hide();
    try {
        // 연령별 사망자 분포
        var ctx = document.getElementById("chart_severe");
        if (ctx) {
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dateArr,
                    datasets: [{
                        label: "재원 위중증 환자",
                        data: dataArr,
                        borderWidth: "5",
                        borderColor: "rgba(137, 101, 224, 0.7)",
                        backgroundColor: "rgba(137, 101, 224, 0)"
                    }]
                },
                options: {
                        points:{
                            visible: 'true',
                            radius: '50%'
                        },
                    legend: {
                        position: 'center',
                        labels: {
                            fontFamily: 'Poppins'
                        }

                    },
                    scales: {
                        xAxes: [{
                            display: true
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: false,
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

    } catch (error) {
        console.log(error);
    }
}


function bed_chart(data, date) {
    dataArr = data.slice(0, -2);
    dateArr = date.slice(0, -1);
    $('.loader_newbed').hide();
    try {
        // 연령별 사망자 분포
        var ctx = document.getElementById("chart-newBed");
        if (ctx) {
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: dateArr,
                    datasets: [{
                        label: "신규 입원 환자",
                        data: dataArr,
                        borderWidth: "0",
                        borderColor: "rgba(243, 164, 181, 0.7)",
                        backgroundColor: "rgba(243, 164, 181, 0.7)"
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
                            display: true
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

    } catch (error) {
        console.log(error);
    }
}

function deathsChart() {
    $('#chart-deaths').show();
    $('#chart-deaths-week').hide();
}


function deathsChart_week() {
    $('#chart-deaths').hide();
    $('#chart-deaths-week').show();
}
