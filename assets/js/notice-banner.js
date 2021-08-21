function randomItem(e) {
    return e[Math.floor(Math.random() * e.length)]
}
$('#notice-news').hide();

function welcome() {
    var e = new Array();
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