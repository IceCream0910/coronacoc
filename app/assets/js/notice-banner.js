function randomItem(e) {
    return e[Math.floor(Math.random() * e.length)]
}

function welcome() {
    var e = new Array("지금까지 코로나콕을 이용해주신<br>모든 분께 감사드립니다.");
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
