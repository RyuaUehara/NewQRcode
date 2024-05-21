import React, { useRef, useEffect, useState } from "react";
import jsQR from "jsqr-es6";
import Link from "next/link";


const CameraJsQR2 = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [qrCodeText, setQrCodeText] = useState("");
  const [next, setnext] = useState(2);

  const resetQrCodeText = () => {
    setQrCodeText("");
    // ページをリロードする
    window.location.reload();
  };

  const nextpage = () =>{
    
  };


  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          scanQRCode();
        })
        .catch((error) => {
          console.error("Error accessing the camera: ", error);
        });
    } else {
      console.error("getUserMedia not supported");
    }
  }, []);

  const scanQRCode = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");

    const scan = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
          // UTF-8エンコーディングを指定する
          decodeToText: true,
        });
        if (code) {
          // QRコードのデータを設定する
          setQrCodeText(code.data);
          // URL の場合はページ遷移を行う
          if (isURL(code.data)) {
            window.location.href = code.data;
          }
        } else {
          setQrCodeText("");
          requestAnimationFrame(scan);
        }
      } else {
        setQrCodeText("");
        requestAnimationFrame(scan);
      }
    };
    scan();
  };

  // URL の正規表現を使用して判定する関数
  const isURL = (text) => {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(text);
  };

  return (
    <div className="flex flex-col w-1/2 items-center border-2">
      <p className="text-center w-full font-bold text-xl pb-2">QRコードを読み込んでください</p>
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div>
        <video ref={videoRef} width="320" height="240" autoPlay />
      </div>
      <p className="p-5 text-center w-full pt-5 h-20">{qrCodeText}</p>
<<<<<<< HEAD
      <button
        onClick={resetQrCodeText}
        className="bg-red-900 text-white px-2 py-1 mb-2"
      >
        更新
      </button>
=======

      <div className="w-full flex justify-center  ">
        <button
          onClick={resetQrCodeText}
          className="bg-pink-400 text-white font-semibold text-5xl  px-10 py-4 mb-10 rounded-3xl"
        >
          更新
        </button>
        <div>
          <button onClick={nextpage}>次へ</button>
        </div>
      </div>
>>>>>>> 988627abf5f0e5dad25e193e652c715c2dc808e1
    </div>
  );
};

export default CameraJsQR2;
