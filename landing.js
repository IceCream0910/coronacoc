var text = ["평범한 일상으로의 여정에<br>함께할 수 있어 행복했습니다", "코로나에 맞선 우리,<br>모두 수고했어요"];
var counter = 0;
var elem = $("#header-title");
setInterval(change, 4000);
function change() {
    elem.fadeOut(function () {
        elem.html(text[counter]);
        counter++;
        if (window.matchMedia("(max-width: 767px)").matches) {
            if (counter == 1) {
                $('#header-title').css('font-size', '30px');
            } else {
                $('#header-title').css('font-size', '40px');
            }
        }
        if (counter >= text.length) {
            counter = 0;
        }
        elem.fadeIn();
    });
}


try {
    var ctx = document.getElementById("chart-confirmed");
    if (ctx) {
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