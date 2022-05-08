var div = document.getElementById("div-pop");
var preloader = document.getElementById("preloader");
var close = document.getElementById("close-button");
var main_scan = document.getElementById("main-scan");
var scan_icon = document.getElementById("scan-icon");
var success = document.getElementById("success");
var fail = document.getElementById("fail");
var pay = document.getElementById("pay");
var rescan = document.getElementById("rescan");
var scan = document.getElementById("scan");
var stop_scan = document.getElementById("stop-scan");
var info = document.getElementById("info");
var time = document.getElementById("time");

setTimeout(function(){
  div.style.display = "block";
},6000);

pay.onclick = function succes_close() {
  success.style.display = "none";
};

close.onclick = function div_close() {
  div.style.display = "none";
};

main_scan.onclick = function main_scan() {
  Html5Qrcode.getCameras()
    .then((devices) => {
      if (devices && devices.length) {
        scan.style.display = "block";
        stop_scan.style.display = "block";
        var cameraId = devices[0].id;
        const html5QrCode = new Html5Qrcode("reader");
        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
          html5QrCode.stop();
          stop_scan.style.display = "none";
          scan.style.display = 'none';
          if (decodedText == "https://success.com.tw") {
            success.style.display = "block";
            info.style.display = "block";
            time.style.display = "block";

            var temp = new Date();
            function checktime(){
                var now = new Date(),
                    diff = new Date(now - temp);
                document.getElementById("check-time").innerText = diff.Myformat();
            }
            Date.prototype.Myformat = function(){
                return ("0"+this.getUTCMinutes()).slice(-2)+":"+("0"+this.getUTCSeconds()).slice(-2)
            }
            setInterval(checktime, 1000);

          } else if (decodedText == "https://fail.com.tw") {
            fail.style.display = "block";
          }
        };

        const config = {
          fps: 25,
          aspectRatio: 0.461,
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
          scan.style.display = "none";
        };
      }
    })
    .catch((err) => {
      // handle err
      console.log('error')
    });
};

scan_icon.onclick = function qrcode() {
  Html5Qrcode.getCameras()
    .then((devices) => {
      if (devices && devices.length) {
        scan.style.display = "block";
        div.style.display = "none";
        stop_scan.style.display = "block";

        var cameraId = devices[0].id;
        const html5QrCode = new Html5Qrcode("reader");
        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
          html5QrCode.stop();
          stop_scan.style.display = "none";
          div.style.display = "none";
          scan.style.display = 'none';
          if (decodedText == "https://success.com.tw") {
            success.style.display = "block";
            info.style.display = "block";
            time.style.display = "block";

            var temp = new Date();
            function checktime(){
                var now = new Date(),
                    diff = new Date(now - temp);
                document.getElementById("check-time").innerText = diff.Myformat();
            }
            Date.prototype.Myformat = function(){
                return ("0"+this.getUTCMinutes()).slice(-2)+":"+("0"+this.getUTCSeconds()).slice(-2)
            }
            setInterval(checktime, 1000);

          } else if (decodedText == "https://fail.com.tw") {
            fail.style.display = "block";
          }
        };

        const config = {
          fps: 25,
          aspectRatio: 0.461,
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
          scan.style.display = "none";
        };
      }
    })
    .catch((err) => {
      // handle err
      console.log('error')
    });
};

rescan.onclick = function rescan() {
  fail.style.display = "none";
  Html5Qrcode.getCameras()
    .then((devices) => {
      if (devices && devices.length) {
        scan.style.display = "block";
        div.style.display = "none";
        stop_scan.style.display = "block";

        var cameraId = devices[0].id;
        const html5QrCode = new Html5Qrcode("reader");
        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
          html5QrCode.stop();
          stop_scan.style.display = "none";
          div.style.display = "none";
          scan.style.display = 'none';
          if (decodedText == "https://success.com.tw") {
            success.style.display = "block";
            info.style.display = "block";
            time.style.display = "block";

            var temp = new Date();
            function checktime(){
                var now = new Date(),
                    diff = new Date(now - temp);
                document.getElementById("check-time").innerText = diff.Myformat();
            }
            Date.prototype.Myformat = function(){
                return ("0"+this.getUTCMinutes()).slice(-2)+":"+("0"+this.getUTCSeconds()).slice(-2)
            }
            setInterval(checktime, 1000);

          } else if (decodedText == "https://fail.com.tw") {
            fail.style.display = "block";
          }
        };

        const config = {
          fps: 25,
          aspectRatio: 0.461,
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
          scan.style.display = "none";
        };
      }
    })
    .catch((err) => {
      // handle err
      console.log('error')
    });
};

function ShowTime() {
  var NowDate = new Date();
  var h = NowDate.getHours();
  var m = NowDate.getMinutes();
  var s = NowDate.getSeconds();
  document.getElementById("showbox").innerHTML = h + "時" + m + "分" + s + "秒";
}
