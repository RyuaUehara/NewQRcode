import React, { useRef, useEffect, useState } from "react";
import jsQR from "jsqr-es6";
import QRCode from 'qrcode'; // qrcodeを直接インポートする

const CameraJsQR2 = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [qrCodeText, setQrCodeText] = useState("");
  const [qrCodeDataURL, setQrCodeDataURL] = useState(""); // QRコードのDataURLを状態として持つ

  const resetQrCodeText = () => {
    setQrCodeText("");
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

  useEffect(() => {
    // コンポーネントがマウントされたときにQRコードのDataURLを生成する
    QRCode.toDataURL(JSON.stringify(jsonData), function (err, url) {
      if (err) {
        console.error(err);
        return;
      }
      setQrCodeDataURL(url); // QRコードのDataURLを設定する
    });
  }, []);

  return (
    <div className="flex flex-col w-1/2 items-center border-2">
      <p className="text-center w-full font-bold text-xl pb-2">QRコードを読み込んでください</p>
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div>
        <video ref={videoRef} width="320" height="240" autoPlay />
      </div>
      <p className="p-5 text-center w-full pt-5 h-20">{qrCodeText}</p>
      {qrCodeDataURL && (
        // QRコードのDataURLが利用可能な場合に画像として表示する
        <img src={qrCodeDataURL} alt="QR Code" />
      )}
      <button
        onClick={resetQrCodeText}
        className="bg-red-900 text-white px-2 py-1 mb-2"
      >
        もう一回
      </button>
    </div>
  );
};

const jsonData = { "name": "ひでと" };

export default CameraJsQR2;
