
$(document).ready(function(){
    $.ajax({
      type: "GET",
      url: "https://cors-anywhere.herokuapp.com/https://onedelay-crawler-server.herokuapp.com/naver?category=%EC%A0%95%EC%B9%98", // Using myjson.com to store the JSON
      success: function(result) {

        for(var i=0; i<10; i++) {
            $(".news").append('<div onclick="javascript:location.href=\''+result[i].url+'\';" style="width:100%;"><div><h5>'+result[i].name+'</h5><span>'+result[i].content+'</span></div></div><hr>');
            console.log(result[i]);
        }
        
    }
    });
});


$(document).ready(function(){
navigator.geolocation.getCurrentPosition(function(position) {

        // 위치 로딩
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
  getApi(lat, lng);
  });
  
});

//날씨 코드 -> 한글 변환
function wDescEngToKor(w_id) {
var w_id_arr = [201,200,202,210,211,212,221,230,231,232,
300,301,302,310,311,312,313,314,321,500,
501,502,503,504,511,520,521,522,531,600,
601,602,611,612,615,616,620,621,622,701,
711,721,731,741,751,761,762,771,781,800,
801,802,803,804,900,901,902,903,904,905,
906,951,952,953,954,955,956,957,958,959,
960,961,962];
var w_kor_arr = ["가벼운 비를 동반한 천둥구름","비를 동반한 천둥구름","폭우를 동반한 천둥구름","약한 천둥구름",
"천둥구름","강한 천둥구름","불규칙적 천둥구름","약한 연무를 동반한 천둥구름","연무를 동반한 천둥구름",
"강한 안개비를 동반한 천둥구름","가벼운 안개비","안개비","강한 안개비","가벼운 적은비","적은비",
"강한 적은비","소나기와 안개비","강한 소나기와 안개비","소나기","악한 비","중간 비","강한 비",
"매우 강한 비","극심한 비","우박","약한 소나기 비","소나기 비","강한 소나기 비","불규칙적 소나기 비",
"가벼운 눈","눈","강한 눈","진눈깨비","소나기 진눈깨비","약한 비와 눈","비와 눈","약한 소나기 눈",
"소나기 눈","강한 소나기 눈","박무","연기","연무","모래 먼지","안개","모래","먼지","화산재","돌풍",
"토네이도","구름 한 점 없는 맑은 하늘","약간의 구름이 낀 하늘","드문드문 구름이 낀 하늘","구름이 거의 없는 하늘",
"구름으로 뒤덮인 흐린 하늘","토네이도","태풍","허리케인","한랭","고온","바람","우박","바람 한 점 없는 하늘",
"약한 바람","부드러운 바람","중간 세기 바람","신선한 바람","센 바람","돌풍에 가까운 센 바람","돌풍",
"심각한 돌풍","폭풍","강한 폭풍","허리케인"];
for(var i=0; i<w_id_arr.length; i++) {
if(w_id_arr[i]==w_id) {
return w_kor_arr[i];
break;
}
}
return "none";
}


function getApi(lat, lng) {
  //날씨 api 호출
  $.ajax({
  type: "GET",
  url: "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lng+"&appid=9f3d19cce1b93dbc69455be5d70e33f9&units=metric",
}).done(function(data) {
  var temp =Math.round(data.current.temp);
    $('#temp').html(temp+"°");
    
    var description = wDescEngToKor(data.current.weather[0].id);
    $('#desc').html(description);
    
    let weatherIcon = {
        '01d' : 'https://assets3.lottiefiles.com/temp/lf20_Stdaec.json',
        '02d' : 'https://assets3.lottiefiles.com/temp/lf20_dgjK9i.json',
        '03d' : 'https://assets3.lottiefiles.com/temp/lf20_VAmWRg.json',
        '04d' : 'https://assets3.lottiefiles.com/temp/lf20_VAmWRg.json',
        '09d' : 'https://assets3.lottiefiles.com/temp/lf20_rpC1Rd.json',
        '10d' : 'https://assets3.lottiefiles.com/temp/lf20_XkF78Y.json',
        '11d' : 'https://assets3.lottiefiles.com/temp/lf20_Kuot2e.json',
        '13d' : 'https://assets3.lottiefiles.com/temp/lf20_BSVgyt.json',
        '50d' : 'https://assets3.lottiefiles.com/temp/lf20_kOfPKE.json',
      
        '01n' : 'https://assets3.lottiefiles.com/temp/lf20_y6mY2A.json',
        '02n' : 'https://assets3.lottiefiles.com/temp/lf20_Jj2Qzq.json',
        '03n' : 'https://assets3.lottiefiles.com/temp/lf20_VAmWRg.json',
        '04n' : 'https://assets3.lottiefiles.com/temp/lf20_VAmWRg.json',
        '09n' : 'https://assets3.lottiefiles.com/temp/lf20_I5XMi9.json',
        '10n' : 'https://assets3.lottiefiles.com/temp/lf20_rpC1Rd.json',
        '11n' : 'https://assets3.lottiefiles.com/temp/lf20_XkF78Y.json',
        '13n' : 'https://assets3.lottiefiles.com/temp/lf20_RHbbn6.json',
        '50n' : 'https://assets3.lottiefiles.com/temp/lf20_kOfPKE.json',
    };
    
    var iconcode = data.current.weather[0].icon;
    var Icon = iconcode.substr(0,3);
    const player = document.querySelector("lottie-player");
    player.load(weatherIcon[Icon]);
    
});
  
  
    //현재 날씨
  $.ajax({
  type: "GET",
  url: "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&appid=9f3d19cce1b93dbc69455be5d70e33f9&units=metric",
}).done(function(data) {
    var temp_max =Math.round(data.main.temp_max);
    $('#temp_max').html("↑ "+temp_max+"°");
    
    var temp_min =Math.round(data.main.temp_min);
    $('#temp_min').html("↓ "+temp_min+"°");
    
});
  ///
}