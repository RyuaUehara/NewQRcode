import React, { useRef, useEffect, useState } from "react";
import jsQR from "jsqr-es6";
import { useStaff } from "@/lib/utils/StaffProvider";

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
    // ページをリロードする
    window.location.reload();
  };

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          scanQRCode();
        })
        .catch((error) => {
          console.error("Error accessing the camera: ", error);
          setError("カメラのアクセスに失敗しました");
        });
    } else {
      console.error("getUserMedia not supported");
      setError("カメラがサポートされていません");
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
          requestAnimationFrame(scan);
        }
      } else {
        setQrCodeText("");
        setQrCodeJson(null);
        requestAnimationFrame(scan);
      }
    };
    scan();
  };

  return (
    <div className="">
      <p className="text-center w-full font-bold text-4xl pb-2">QRコード</p>
      <p className="text-center w-full font-bold text-4xl pb-2">読み込んでください</p>
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div>
        <video
          ref={videoRef}
          width="320"
          height="240"
          className="rounded-2xl border-double border-4"
          autoPlay
        />
      </div>
      {qrCodeJson && (
        <pre className="p-5 text-center w-full pt-5 h-20">
         利用者名 {JSON.stringify(qrCodeJson, null, 2)} 様
        </pre>
      )}
      {error && (
        <p className="p-5 text-center w-full pt-5 h-20 text-red-500">{error}</p>
      )}
      <div className="w-full flex justify-center">
        <button
          onClick={resetQrCodeText}
          className="bg-pink-400 text-white font-semibold text-5xl px-10 py-4 mb-10 rounded-3xl"
        >
          更新
        </button>
      </div>
    </div>
  );
};

export default CameraJsQR2;
