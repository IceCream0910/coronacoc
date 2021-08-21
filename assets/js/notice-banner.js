function randomItem(e) {
    return e[Math.floor(Math.random() * e.length)]
}
$('#notice-news').hide();

function welcome() {
    var e = new Array("최전선에서 사투를 벌이는<br>의료진분들을 응원합니다.", "우리는 극복할 수 있어요.<br>함께 이겨낼 거예요.", "건강한 내일을 위해,<br>적극적인 동참이 필요합니다.", "백신 접종 후에도<br>방역수칙을 준수해주세요.", "일상이 다시 반짝일 때까지<br>조금만 힘내봐요, 우리.", "힘든 시기를 보내고 계신<Br>소상공인을 응원합니다.", "모든 방역 관계자분들의<br>노고에 감사드립니다.");
    $('#welcome_t').html(randomItem(e));
}
window.onload = function() {
    welcome();
};


function isApp() {
    return navigator.userAgent.indexOf('android_app') > 0;
}

var latest_version_name = "1.2";

function isAppLatestVersion() {
    return navigator.userAgent.indexOf("android_app_" + latest_version_name) > 0;
}

if (isApp() == true) {
    if (isAppLatestVersion() == true) {
        $('#notice-news').hide();
    }
}