//프록시 서버 분산
var e = new Array("https://cors-coronacoc.herokuapp.com/", "https://cors-coronacoc-v2.herokuapp.com/", "https://cors-coronacoc-v3.herokuapp.com/", "https://cors-coronacoc-v4.herokuapp.com/"),
    proxyServer_raw = new Array("https://api.allorigins.win/raw?url="),
    proxyServer_json = randomItem(e);


function welcome() {
    //var special = new Array("수험생 여러분들을<br>응원합니다!", "늘 응원하는 사람이 있다는 것,<br>잊지 말고 당신을 믿어요!", "수험생 여러분들의<br>빛나는 열정을 응원합니다.", "잘했고, 잘하고 있고,<br>잘 할 거예요", "멈추지 않은 여러분의 노력<br>좋은 결과로 이어질 거예요.", "있는 그대로, 지금 느낌<br>그대로 여러분을 보여주세요", "파란 하늘 끝까지<br>올라가 보자, 높이", "하늘을 바라봐요,<br> 어두워도 괜찮아요.", "하늘 위로 날아오를<br>시간이에요.", "지금이야,<br>하늘로 비상할 시간", "힘을 내세요,<br>여기까지 왔잖아요", "단 한 가지 약속은,<br>틀림없이 끝이 있다는 것.");
    var e = new Array("모두를 위한 거리두기에<br>동참해주세요.", "증상 발생 시,<br>1339로 전화하세요!", "올바른 손씻기는<br>비누로 30초 이상!", "예방 수칙 준수로<br>이겨낼 수 있습니다.", "기침할 땐,<br>옷소매로 가리고 해주세요.", "모든 의료진분들을<br>응원합니다!", "거리는 멀어져도,<br>마음은 가까이!", "외출할 때는<br>마스크 착용 필수!", "한순간의 방심이<br>재확산의 시작이 됩니다.", "나 하나쯤이야 라는 생각이<br>모두의 안전을 위협합니다", "진정한 인싸라면<br>클럽말고 집으로", "밀집된 사람들 속에<br>방심한 너와나 거리", "당연한 것들을 누릴<br>그날이 빨리 오길", "집콕운동,<br>모두를 위한 스포츠", "우리의 일상은 잠시 멈춤<br>서로의 마음은 계속 끈끈", "집회, 모임, 종교행사는<br>잠시 자제해주세요.", "모두 만나요.<br>온라인에서", "다시 만날 그때까지<br>힘내요, 우리!", "꼭 다시 만나자,<br>잃어버린 모든 것들아", "힘을 내요, 대한민국.<br>마음을 모아 이겨냅시다.", "비정상이 일상이 된 지금<br>함께 극복할 수 있어요!");
    //var special = new Array("수고했어요.<br>원하는 꿈을 이룰거예요", "여러분의 열정과 노력에<br>박수를 보냅니다!", "코로나19 속에서도<br>최선을 다해줘 고마워요", "앞으로의 즐거운<br>일들만 생각해요.", "여러분의 멋진<br>2021년을 기대할게요.");
    //var special = new Array("올해보다 더 나은<br>내년이 되길", "올 한 해,<br>정말 수고했어요.", "여러분의 멋진<br>2021년을 기대할게요.", "안녕, 2021<br>새해 복 많이 받으세요!", "끝이 보이지 않는 터널 속,<br>우리 모두 좀 더 힘내요!");
    $('#welcome_t').html(randomItem(e));
}
window.onload = function() {
    welcome();
};

function randomItem(e) {
    return e[Math.floor(Math.random() * e.length)]
}

$.ajax({
    type: "GET",
    url: "https://api.corona-19.kr/korea/?serviceKey=5d4143bd958c16e18abe1acef5386c12d", // Using myjson.com to store the JSN
    success: function(result2) {
        document.getElementById("whenUpdate").innerHTML = result2.updateTime.replace("코로나바이러스감염증-19 국내 발생현황 (", "").replace(")", "");
        document.getElementById("confirmed").innerHTML = result2.TotalCase;
        document.getElementById("confirmed_mb").innerHTML = result2.TotalCase;
        document.getElementById("cure").innerHTML = result2.TotalRecovered;
        document.getElementById("cure_mb").innerHTML = result2.TotalRecovered;
        document.getElementById("death").innerHTML = result2.TotalDeath;
        document.getElementById("death_mb").innerHTML = result2.TotalDeath;
        nowcase = result2.NowCase;
        nownewcase = result2.TotalCaseBefore;
        document.getElementById("curePM").innerHTML = '<i class="fa fa-arrow-up"></i> ' + result2.TodayRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        document.getElementById("deathPM").innerHTML = '<i class="fa fa-arrow-up"></i> ' + result2.TodayDeath;
        document.getElementById("curePM_mb").innerHTML = '<i class="fa fa-arrow-up"></i> ' + result2.TodayRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        document.getElementById("deathPM_mb").innerHTML = '<i class="fa fa-arrow-up"></i> ' + result2.TodayDeath;


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
                document.getElementById("newConfirmed_mb").innerHTML = '<i class="fa fa-arrow-up"></i> ' + result.korea.newCase;
                document.getElementById("nowcases").innerHTML = nowcase;

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

/*
$.ajax({
    type: "GET",
    url: proxyServer + "https://api.covid19api.com/summary", 
    success: function(result3) {

        document.getElementById("globeConfirmed").innerHTML = result3.Global.TotalConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "명";
        document.getElementById("globeDeath").innerHTML = result3.Global.TotalDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "명";
        document.getElementById("globeCure").innerHTML = result3.Global.TotalRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "명";

        document.getElementById("globeConfirmedPM").innerHTML = "확진자 (+ " + result3.Global.NewConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ")";
        document.getElementById("globeCurePM").innerHTML = "격리해제자 (+ " + result3.Global.NewRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ")";
        document.getElementById("globeDeathPM").innerHTML = "사망자 (+ " + result3.Global.NewDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ")";



    }
});
*/



rtTodayGet();


function rtTodayGet() {
    $('#refreshRT').addClass('lotation');
    // &nbsp;3초 후 함수가 실행됨

    //숫자가져오기
    $.ajax({
        type: "GET",
        url: proxyServer_raw + "https://apiv2.corona-live.com/stats.json", // Using myjson.com to store the JSON
        success: function(result) {
            document.getElementById('rtToday').innerHTML = result.overview.current[0] + "명";
            var rtpm = String(result.overview.current[1]);
            if (rtpm.includes("-")) {
                document.getElementById('rtpmBox').style.backgroundColor = "rgba(119, 158, 203, 0.3)";
                rtpm = "↓ " + rtpm;
            } else {
                document.getElementById('rtpmBox').style.backgroundColor = "rgba(255, 105, 97, 0.3)";
                rtpm = "↑ " + rtpm;
            }
            document.getElementById('rtPM').innerHTML = rtpm;
            //document.getElementById('rtDec').innerHTML = result.casesSummary.totalCases + "명 중 " + result.casesSummary.yesterdayCases + "명은 어제 집계";

            setTimeout(function() {
                $('#refreshRT').removeClass('lotation');
            }, 1000);

        }
    });

    //상세내용
    $.ajax({
        type: "GET",
        url: proxyServer_raw + "https://apiv2.corona-live.com/updates.json", // Using myjson.com to store the JSON
        success: function(result) {
            var length = result.length;

            for (var i = 0; i < result.length; i++) {
                if (result[i].total != '') {
                    //  $('#rtUpdates').prepend('<div id="pattern"><h5>' + result[i].datetime + '<span style="color:red; margin-left:10px;">' + result[i].total + '명 중 ' + result[i].cases + '명 오늘 발생</span></h5><span style="font-size:15px;">' + result[i].src + '</span><hr></div>');
                } else {
                    //  $('#rtUpdates').prepend('<div id="pattern"><h5>' + result[i].datetime + '<span style="color:red; margin-left:10px;">' + result[i].cases + '명 발생</span></h5><span style="font-size:15px;">' + result[i].src + '</span><hr></div>');
                }

            }
        }
    });
}


$.ajax({
    type: "GET",
    url: proxyServer_raw + "https://apiv2.corona-live.com/vaccine.json", // Using myjson.com to store the JSON
    success: function(result) {
        var length = result.length;
        $('#vacTotal').html(result.stats.first[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '건');
        $('#vacPM').html('↑ ' + result.stats.first[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $('#vacTotal2').html(result.stats.second[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '건');
        $('#vacPM2').html('↑ ' + result.stats.second[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

        var first_percent = (((result.stats.first[0]) / 51821669) * 100).toFixed(2);
        var second_percent = (((result.stats.second[0]) / 51821669) * 100).toFixed(2);
        $('#first_vaccinePercent').html(first_percent + "%");
        $('#second_vaccinePercent').html(second_percent + "%");

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

        console.log(result);

        $('.newsrelease').html(result.replace("새글", "").replace("전체 목록 : 번호, 제목, 담당, 작성일, 첨부 구성 제목 클릭시 게시물 상세 내용으로 이동", "").substring(0, result.indexOf('첨부파일')) + "<style>.m_dp_n{display:none;}.hdn{display:none;}</style>");
    }
});

function fn_tcm_boardView(schema, blank, blank2, id, blank3, all) {
    window.open('http://ncov.mohw.go.kr/tcmBoardView.do?brdId=' + blank + '&brdGubun=' + blank2 + '&dataGubun=&ncvContSeq=' + id + '&contSeq=' + id + '&board_id=' + blank3 + '&gubun=' + all, '_blank');
}


//뉴스
$.ajax({
    type: "GET",
    url: "https://coronacoc-news.herokuapp.com/covid19",
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