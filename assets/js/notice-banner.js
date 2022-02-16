function randomItem(e) {
    return e[Math.floor(Math.random() * e.length)]
}

function welcome() {
    var e = new Array("일상으로의 한 걸음,<br>자발적 방역이 필요합니다.", "일상 회복이 멈추지 않도록,<br>기본 방역 수칙 준수는 필수", "백신 접종 후에도<br>방역 수칙을 준수해주세요", "다시 일상으로, 자발적 방역으로<br>다시 우리의 힘을");
//var e = new Array("새해에는 소망하는 일<br>모두 이루세요!", "새해에는 평범한 일상이<br>다시 평범해지길 바랍니다.", "2022년, 다시 반짝일 우리의<br>일상을 기다립니다.", "검은 호랑이의 해 2022년,<br>새해 복 많이 받으세요!");
    $('#welcome_t').html(randomItem(e));
}
welcome();


//앱 하이브리드 체크
var latest_version_name = "1.6";

function isAppLatestVersion() {
    return navigator.userAgent.indexOf("android_app_" + latest_version_name) > 0;
}

function isApp() {
    return navigator.userAgent.indexOf('android_app') > 0;
}


function isAppLatestVersion() {
    if (!navigator.userAgent.indexOf("android_app_") > 0) {
        var result = false;
    } else {
        var result = navigator.userAgent.indexOf("android_app_" + latest_version_name) > 0;
    }
    return result;
}

if (isApp() == true) {
    $('#android_settings_btn').show();
    $('#notice-app-promote').hide();
    $('#default-notice').hide();

    if (isAppLatestVersion() != true) { //앱 최신버전인지 체크
        $('#notice-app-update').show();
    } else {
        $('#notice-app-update').hide();
        $('#notice-news').show();
        $('#default-notice').hide();
    }

} else {
    $('#notice-app-promote').hide();
    $('#notice-news').show();
    $('#default-notice').hide();
}
