var fb=new Firebase("https://coronacocchat.firebaseio.com/"),messages=fb.child("messages"),messages_spring=fb.child("messages_spring"),btn=$("button"),wrap=$(".wrapper-chat"),wrapSpring=$(".wrapper_spring"),input=$("textarea.message"),inputSpring=$("textarea.messageSpring"),usernameInput=$("input.username"),user=[];jQuery.sanitize=function(e){return e.replace(/<script[^>]*?>.*?<\/script>/gi,"").replace(/<[\/\!]*?[^<>]*?>/gi,"").replace(/<style[^>]*?>.*?<\/style>/gi,"").replace(/<![\s\S]*?--[ \t\n\r]*>/gi,"")},usernameInput.on("keyup",function(e){if(13===e.keyCode&&usernameInput.val().length>0){var t=usernameInput.val();user.push(t),usernameInput.val(""),$(".initModal").css("display","none"),console.log(user)}});var UploadCnt=0;function sendBtn(){UploadCnt++;var e=ip();if(input.val().length>0){var t=input.val();messages.push({user:e,message:t}),input.val("")}}function sendBtnSpring(){var e=user.join();if(inputSpring.val().length>0){var t=inputSpring.val();messages_spring.push({user:e,message:t}),inputSpring.val("")}}messages.limitToLast(1e3).on("child_added",function(e){"admin"==$.sanitize(e.val().user)?wrap.prepend('<li style="color:white;"><div style="background-color:#fa4251; border-radius:10px; width:50px; font-size:14px; padding: 2px 4px; margin-bottom:5px;color:white;"><span style="color:white;">개발자</div></span> '+$.sanitize(e.val().message)+"</li>"):wrap.prepend('<li style="color:white"><span><i class="fa fa-quote-right" aria-hidden="true" style="margin-right:5px;"></i></span> '+$.sanitize(e.val().message)+"</li>")});var flowerIcon="https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v816-ning-03.png?auto=&bg=transparent&con=3&cs=srgb&dpr=1&fm=png&ixlib=php-3.1.0&mark=rawpixel-watermark.png&markalpha=90&markpad=13&markscale=10&markx=25&q=75&usm=15&vib=3&w=1400&s=3411567a38b1b5fc781e0e842dc48a5c";messages_spring.limitToLast(100).on("child_added",function(e){"admin"==$.sanitize(e.val().user)?wrapSpring.prepend('<li><div style="background-color:#fa4251; border-radius:10px; width:50px; font-size:14px; padding: 2px 4px; margin-bottom:5px;"><span style="color:white;">개발자</div></span> '+$.sanitize(e.val().message)+"</li>"):wrapSpring.prepend("<li><span>🌸 </span>"+$.sanitize(e.val().message)+"</li>")});var config={apiKey:"AIzaSyBuCapEMeGtlo9QhJlXlPYTsvHIhd6nQwg",authDomain:"coronacocheart.firebaseapp.com",databaseURL:"https://coronacocheart.firebaseio.com",projectId:"coronacocheart",storageBucket:"coronacocheart.appspot.com",messagingSenderId:"185995198724"};firebase.initializeApp(config);var database=firebase.database(),counter=150,initialValue=150;function renderCounter(){$(".counter").html(counter)}database.ref("counter").on("value",function(e){e.val()&&e.val().clickCounter&&(counter=e.val().clickCounter),renderCounter()},function(e){console.log("오류 : "+e.code)}),counter=counter?parseInt(counter):initialValue,$(".decrease").on("click",function(){"로딩중"!=$(".counter").html()&&(0===++counter&&(counter=initialValue),database.ref("counter").set({clickCounter:counter}),renderCounter())});var timeCnt=0,timer=setInterval(function(){++timeCnt<30?UploadCnt>=3&&(alert("도배 방지를 위해 30초 이내에 글 3개 이상을 작성하실 수 없습니다."),timeCnt=0,UploadCnt=0):(timeCnt=0,UploadCnt=0)},1e3);$("#right-button").click(function(){event.preventDefault(),$("#online-performance").scrollLeft()<1364&&$("#online-performance").animate({scrollLeft:"+=200px"},"slow")}),$("#left-button").click(function(){event.preventDefault(),$("#online-performance").scrollLeft()>=0&&$("#online-performance").animate({scrollLeft:"-=200px"},"slow")}),$("#right-button-edu").click(function(){event.preventDefault(),$("#online-edu").scrollLeft()<1364&&$("#online-edu").animate({scrollLeft:"+=200px"},"slow")}),$("#left-button-edu").click(function(){event.preventDefault(),$("#online-edu").scrollLeft()>=0&&$("#online-edu").animate({scrollLeft:"-=200px"},"slow")}),$("#right-button-book").click(function(){event.preventDefault(),$("#online-book").scrollLeft()<1364&&$("#online-book").animate({scrollLeft:"+=200px"},"slow")}),$("#left-button-book").click(function(){event.preventDefault(),$("#online-book").scrollLeft()>=0&&$("#online-book").animate({scrollLeft:"-=200px"},"slow")});var e=new Array("https://cors-coronacoc.herokuapp.com/","https://cors-coronacoc-v2.herokuapp.com/","https://cors-coronacoc-v3.herokuapp.com/"),proxyServer=randomItem(e);function randomItem(e){return e[Math.floor(Math.random()*e.length)]}new Vue({el:"#scraper",data:()=>({scraperRunning:!1,url:"",response:null}),methods:{runScraper:function(){this.scraperRunning=!0,this.url.includes("http"),this.url="https://cors-anywhere.herokuapp.com/https://www.culture.go.kr/homes/showList.do?sSdate=&sEdate=&genre=&gubun=&searchKeyword=",this.$http.get(this.url).then(e=>{this.scraperRunning=!1;for(var t=0;t<e.body.showListCnt;t++){var n=e.body.showList[t].title,r="https://www.culture.go.kr/"+e.body.showList[t].img_file,i="https://www.culture.go.kr/homes/showView.do?seq="+e.body.showList[t].seq;$("#online-performance").append('<div class="grid__item ripple-effect" style="display:inline-block;" onclick="window.open(\''+i+'\');"><div class="card"><img class="card__img" src="'+r+'" alt="Snowy Mountains"><div class="card__content"><h1 class="card__header">'+n+"</h1> </div></div></div>")}})},runScraper2:function(){this.scraperRunning=!0,this.url.includes("http"),this.url="https://cors-anywhere.herokuapp.com/https://www.culture.go.kr/homes/eduList.do",this.$http.get(this.url).then(e=>{this.scraperRunning=!1;for(var t=0;t<e.body.eduListCnt;t++){var n=e.body.eduList[t].title,r="https://www.culture.go.kr/"+e.body.eduList[t].img_file,i="https://www.culture.go.kr/homes/eduView.do?seq="+e.body.eduList[t].seq;console.log(e.body.eduList[t].seq),$("#online-edu").append('<div class="grid__item ripple-effect" style="display:inline-block;" onclick="window.open(\''+i+'\');"><div class="card"><img class="card__img" src="'+r+'" alt="Snowy Mountains"><div class="card__content"><h1 class="card__header">'+n+"</h1> </div></div></div>")}})},runScraper3:function(){this.scraperRunning=!0,this.url.includes("http"),this.url="https://cors-anywhere.herokuapp.com/https://www.culture.go.kr/homes/bookList.do",this.$http.get(this.url).then(e=>{this.scraperRunning=!1;for(var t=0;t<e.body.bookListCnt;t++){var n=e.body.bookList[t].title,r="https://www.culture.go.kr/"+e.body.bookList[t].img_file,i="https://www.culture.go.kr/homes/bookView.do?seq="+e.body.bookList[t].seq;$("#online-book").append('<div class="grid__item ripple-effect" style="display:inline-block;" onclick="window.open(\''+i+'\');"><div class="card"><img class="card__img" src="'+r+'" alt="Snowy Mountains"><div class="card__content"><h1 class="card__header">'+n+"</h1> </div></div></div>"),console.log(e.body)}})}},beforeMount(){this.runScraper(),this.runScraper2(),this.runScraper3()}});
