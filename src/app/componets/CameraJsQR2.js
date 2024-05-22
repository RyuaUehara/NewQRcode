import React, { useRef, useEffect, useState } from "react";
import jsQR from "jsqr-es6";
import Link from "next/link";

const CameraJsQR2 = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [qrCodeText, setQrCodeText] = useState("");
  const [qrCodeJson, setQrCodeJson] = useState(null);
  const [error, setError] = useState(null);
  const { setCustomer } = useStaff();

  const resetQrCodeText = () => {
    setQrCodeText("");
    setQrCodeJson(null);
    setError(null);
    window.location.reload();
  };

  useEffect(() => {
    const initializeCamera = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            const scanInterval = setInterval(scanQRCode, 500);
            return () => clearInterval(scanInterval); // Cleanup on unmount
          }
        } catch (error) {
          console.error("Error accessing the camera: ", error);
          setError("カメラのアクセスに失敗しました");
        }
      } else {
        console.error("getUserMedia not supported");
        setError("カメラがサポートされていません");
      }
    };

    initializeCamera();
  }, []);

  const scanQRCode = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });
      if (code) {
        try {
          const jsonData = JSON.parse(code.data);
          console.log(jsonData.name);
          setQrCodeText(code.data);
          setQrCodeJson(jsonData.name);
          setCustomer(jsonData.name);
          setError(null);
        } catch (e) {
          console.error("Failed to parse JSON:", e);
          setQrCodeText(code.data);
          setError("QRコードのデータを解析できませんでした");
          setQrCodeJson(null);
        }
      } else {
        setQrCodeText("");
        setQrCodeJson(null);
      }
    }
  };

  return (
    <div className="">
      <p className="text-center w-full font-bold text-4xl pb-2">QRコード</p>

      <p className="text-center w-full font-bold text-4xl pb-2">
        読み込んでください
      </p>
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div>
        <video
          ref={videoRef}
          width="320"
          height="240"
          className="rounded-2xl border-double border-4 "
          autoPlay
        />
      </div>
      <p className="p-5 text-center w-full pt-5 h-20">{qrCodeText}</p>

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
    </div>
  );
};

export default CameraJsQR2;
