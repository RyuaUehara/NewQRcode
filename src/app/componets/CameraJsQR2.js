import React, { useRef, useEffect, useState } from "react";
import jsQR from "jsqr-es6";
import { useStaff } from "@/lib/utils/StaffProvider";

const CameraJsQR2 = ({ onQRCodeScanned }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [qrCodeText, setQrCodeText] = useState("");
  const [qrCodeJson, setQrCodeJson] = useState(null);
  const [error, setError] = useState(null);
  const { setCustomer } = useStaff();
  const { staff } = useStaff();

  /*const resetQrCodeText = () => {
    setQrCodeText("");
    setQrCodeJson(null);
    setError(null);
    window.location.reload();
  };*/

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
          // QRコードが正常に読み込まれたらコールバック関数を呼び出す
          onQRCodeScanned();
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
<div className=''>
      <div className='text-center'>
        <p className='text-3xl'>
          QRコード <br className='sm:hidden' />{" "}
          <span className='block'>読み込んでください</span>
        </p>
      </div>
 
      <div className='mt-96' style={{ display: "none" }}>
        <video ref={videoRef} />
        <canvas ref={canvasRef} />
      </div>
 
      <div className='flex justify-center items-center '>
        <div className='w-full sm:w-2/3 md:w-1/2 lg:w-1/3 flex justify-center'>
          <video
            ref={videoRef}
            className='rounded-2xl border-double border-4'
            autoPlay
          />
        </div>
      </div>
    </div>
  );
};

export default CameraJsQR2;
