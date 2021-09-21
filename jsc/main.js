var current = 0;
var mouseX = 0;
var mouseY = 0;
var touchX = 0;
var touchY = 0;
var offsetX = 0;
var offsetY = 0;
var isDown = false;
var isMove = false;
var imgs = ["images/img01.jpg","images/img02.jpg","images/img03.jpg"]
var items = '';
var imglight = '';
var lightstatus = false;
var sliderli = '';
var slider = document.querySelector(".slider");
var handleRight = document.querySelector("#handleRight");
var handleLeft = document.querySelector("#handleLeft");
var sliderContent = document.querySelector(".slider-content");
var closelightbox = document.querySelector("#closebtn");
var imglist = document.querySelector(".slider-ul");
var devicewidth = sliderContent.offsetWidth;
console.log(devicewidth);
function reportWindowSize() {
    devicewidth = sliderContent.offsetWidth;
    items.forEach((item,index) => {
        items[index].style.transform = 'translate(0px, 0px)';
    })
    console.log(devicewidth)
  }
window.onresize = reportWindowSize;
// -----------------------------------初始
function init () {
    var imgHtml = '';
    var imgli = '';
    imgs.forEach((item,index) => {
        imgobj = '<div class="slider-item" ><img class="imglight"  data-key="'+index+'" src="'+item+'"/></div>';
        liobj = '<li class="slider-ul-li" data-key="'+index+'"><a></a></li>'
        imgHtml += imgobj;
        imgli += liobj;
    })
    sliderContent.innerHTML = imgHtml;
    imglist.innerHTML = imgli;
    items = document.querySelectorAll(".slider-item");
    imglight = document.querySelectorAll(".imglight");
    sliderli = document.querySelectorAll(".slider-ul-li");
    sliderli[current].style.backgroundColor = "#FFF";
}
//-----------------------------重整圖片位置
function initItem (e) {
    items.forEach((item,index) => {
        sliderli[index].style.backgroundColor = "transparent";
    })
}

// ------------------滑動判斷
sliderContent.addEventListener("click",(e) => {
    var key = e.target.getAttribute("class");
    console.log(key);
    if (key === "imglight" ) {
        if (lightstatus == false && isMove == false) {
            console.log(lightstatus)
            var imgcount = e.target.getAttribute("data-key");
            items[current].classList.add("lightbox");
            imglight[imgcount].style.maxHeight = "600px";
            document.querySelector("body").style.cssText = 'background:#000';
            document.querySelector(".slider-controls-left").classList.add("clightbox");
            document.querySelector(".slider-controls-right").classList.add("clightbox");
            document.querySelector(".slider-ul").classList.add("clightbox");
            closelightbox.style.zIndex = "1";
            closelightbox.style.opacity = "1";
            // setTimeout( function() {
            //      lightstatus = true ;
            // }, 1000);
            lightstatus = true ;
        } else {
            isMove = false;
            deletelight();
        }
    } else {
        return
    }
})
//------------------------- ul
imglist.addEventListener("click", (e) => { 
    var key = e.target.getAttribute("class");
    if (key === "slider-ul-li") {
        var licount = e.target.getAttribute("data-key");
        current = parseInt(licount);
        initItem("1000");
        var itemSite = current*devicewidth;
        console.log(current);
        sliderli[current].style.backgroundColor = "#FFF";
        items.forEach((item,index) => {
            items[index].style.transform = 'translate(-' + itemSite + 'px, 0px)';
        })
    }
})
// --------------------------------刪除燈箱效果
function deletelight() {
    console.log("delete")
    imglight[current].style.maxHeight = "";
    document.querySelector("body").style.cssText = '';
    document.querySelector(".slider-controls-left").classList.remove("clightbox");
    document.querySelector(".slider-controls-right").classList.remove("clightbox");
    document.querySelector(".slider-ul").classList.remove("clightbox");
    items[current].classList.remove("lightbox");
    closelightbox.style.zIndex = "-1";
    closelightbox.style.opacity = "0";
    lightstatus = false ;
}
// ---------------------------右邊按鈕
handleRight.addEventListener ("click",() => {
    initItem(1000);
    rightSlider();
});
// ---------------------------左邊按鈕
handleLeft.addEventListener ("click" ,() => {
    initItem("-1000");
    leftSlider();
});
// ---------------------------右圖片向左滑動
function rightSlider() {
    var itemSite = (current+1)*devicewidth;
    items[current].style.transform = 'translate(-' + itemSite + 'px, 0px)';
    items[current >= items.length - 1 ? 0 : current + 1].style.transform = 'translate(-' + itemSite + 'px, 0px)';
    sliderli[current >= items.length - 1 ? 0 : current + 1].style.backgroundColor = "#FFF";
    if (current < items.length - 1) {
        current++;
        deletelight();
    } else {
        current = 0;
        items.forEach((item,index) => {
            items[index].style.transform = "translate(0px, 0px)";
        })
        deletelight();
    }
}
// ---------------------------左圖片向右滑動
function leftSlider() {
    var itemSite = (current-1)*devicewidth;
    var nextitemSite = (items.length - 1)*devicewidth;
    if (current > 0) {
        items[current].style.transform ='translate(-' + itemSite + 'px, 0px)';
        items[current-1].style.transform = 'translate(-' + itemSite + 'px, 0px)';
        sliderli[current - 1].style.backgroundColor = "#FFF";
        current--;
        deletelight();
    } else {
        items.forEach((item,index) => {
            items[index].style.transform = 'translate(-' + nextitemSite + 'px, 0px)';
        })
        items[current].style.transform ='translate(' + itemSite + 'px, 0px)';
        items[items.length - 1].style.transform = 'translate(-' + nextitemSite + 'px, 0px)';
        sliderli[items.length - 1].style.backgroundColor = "#FFF";
        current = items.length - 1;
        deletelight();
    }
}
// ---------------------------滑鼠按下後移動圖片
sliderContent.addEventListener ("mousedown",(e) => {
    isDown = true
    mouseX = e.pageX
    mouseY = e.pageY
    document.addEventListener('mousemove',  move);
})
// ---------------------------手機移動圖片
sliderContent.addEventListener ("touchstart",(e) => {
    isDown = true
    touchX = e.changedTouches[0].pageX
    touchY = e.changedTouches[0].pageY
    document.addEventListener('touchmove',  touchmove);
})

sliderContent.addEventListener('mouseup',mouseupPc);
function mouseupPc (e) {
    console.log(offsetX)
    isDown = false;
    var itemSite = current*devicewidth;
    if (lightstatus) {
        items[current].style.transform = 'translate(-' + itemSite + 'px,0px)';
        console.log(current)
        // deletelight();
        // return;
    } else {
        if(offsetX != 0 && offsetX < (-itemSite)) {
            console.log(offsetX)
            isMove = true;
            initItem("1000");
            rightSlider();
            offsetX = 0;
        } else if(offsetX != 0 && offsetX > (-itemSite)) {
            isMove = true;
            initItem("-1000");
            leftSlider();
            offsetX = 0;
        } else {
            // items[current].style.transform = "translate(0px, 0px)";
        }
    }
}
// ---------------------------手機移動圖片
sliderContent.addEventListener('touchend', mouseupPc);
function move(e) {
    var itemSite = current*devicewidth;
    if (isDown && lightstatus!=true) {
        console.log("789")
        offsetX = (-itemSite) + (e.pageX - mouseX);
        console.log(offsetX,mouseX,e.pageX)
        items.forEach((item,index) => {
            items[index].style.transform = 'translate('+offsetX+'px, 0px)';
        })
    }else if (isDown && lightstatus) {
        console.log("123")
        offsetY = e.pageY - mouseY;
        items.forEach((item,index) => {
            items[index].style.transform = 'translate(-' + itemSite + 'px, '+offsetY+'px)';
        })
    }
};
// ---------------------------手機移動圖片
function touchmove(e) {
    var itemSite = current*devicewidth;
    if (isDown && lightstatus!=true) {
        offsetX = (-itemSite) + (e.changedTouches[0].pageX - touchX);
        console.log(offsetX,mouseX,e.pageX)
        items.forEach((item,index) => {
            items[index].style.transform = 'translate('+offsetX+'px, 0px)';
        })
    }else if (isDown && lightstatus) {
        offsetY = e.changedTouches[0].pageY - touchY;
        items[current].style.transform = 'translate(0px, '+offsetY+'px)';
    }
};
init();