var div = document.getElementById("div-pop");
var button = document.getElementById("button");
var map = document.getElementById("map");
var close = document.getElementById("close-button");
var scan_icon = document.getElementById("scan-icon");
var success = document.getElementById("success");
var success_close = document.getElementById("success-top");
var fail_close = document.getElementById("fail-top");
var scan = document.getElementById("scan");
var stop_scan = document.getElementById("stop-scan");

function show() {
  div.style.display = "block";
}

success_close.onclick = function close() {
  success.style.display = "none";
};

fail_close.onclick = function close() {
  fail.style.display = "none";
};

close.onclick = function close() {
  div.style.display = "none";
};

scan_icon.onclick = function close() {
  Html5Qrcode.getCameras()
    .then((devices) => {
      if (devices && devices.length) {
        //button.style.display = "none";
        //map.style.display = "none";
        scan.style.display = "block";
        div.style.display = "none";
        stop_scan.style.display = "block";

        var cameraId = devices[0].id;
        const html5QrCode = new Html5Qrcode("reader");
        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
          html5QrCode.stop();
          stop_scan.style.display = "none";
          div.style.display = "none";
          button.style.display = "block";
          map.style.display = "block";
          if (decodedText == "https://success.com.tw") {
            success.style.display = "block";
          } else if (decodedText == "https://fail.com.tw") {
            fail.style.display = "block";
          }
        };

        const config = {
          fps: 25,
          aspectRatio: 1,
          qrbox: {
            width: 250,
            height: 250
          }
        };
        html5QrCode.start(
          {
            facingMode: "environment"
          },
          config,
          qrCodeSuccessCallback
        );

        stop_scan.onclick = function close() {
          html5QrCode.stop();
          stop_scan.style.display = "none";
          div.style.display = "none";
          button.style.display = "block";
          map.style.display = "block";
        };
      }
    })
    .catch((err) => {
      // handle err
    });
};

window.onclick = function close(e) {
  if (e.target == div) {
    div.style.display = "none";
  }
};

function ShowTime() {
  var NowDate = new Date();
  var h = NowDate.getHours();
  var m = NowDate.getMinutes();
  var s = NowDate.getSeconds();
  document.getElementById("showbox").innerHTML = h + "時" + m + "分" + s + "秒";
}
