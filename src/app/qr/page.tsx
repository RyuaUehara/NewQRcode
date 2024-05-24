"use client";
 
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CamerajsQR2 from "@/app/componets/CameraJsQR2";
import { useStaff } from "@/lib/utils/StaffProvider";
//import { staffType } from "../api/staff/type";
import { visitType } from "../api/inout/type";
import { FaCameraRetro } from "react-icons/fa";
 


 
const MainPage = () => {
  const [state, setState] = useState(0);
  const [out_time, setOut_time] = useState<visitType[]>([]);
  const [currentDate, setCurrentDate] = useState("");

  const { staffid, staff, customer } = useStaff(); // customerを上に移動
  useEffect(() => {
    console.log("staffid", staffid, "staff", staff);
    setCurrentDate(getFormattedDate());
  }, [staffid, staff]); // 依存配列を追加

  const getFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, "0");
    const day = `${today.getDate()}`.padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handlesubmitin = async () => {
    const response = await fetch("/api/inout", {
      method: "GET",
    });
    const data = await response.json();
    setVisitLogs(data);
  };

  const handlesubmitin = async () => {
    await fetch("/api/inout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        staffid,
        staff,
        customer,
      }),
    });
    fetchVisitLogs(); // データを再取得して最新の状態に更新
  };
 
  // const notify = () => toast("データを入れました");
 
  const handlesubmitout = async () => {
    await fetch("/api/inout", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        staffid,
        customer,
        out_time,
      }),
    });
    console.log(staffid, customer, out_time);
    fetchVisitLogs(); // データを再取得して最新の状態に更新
  };

  const handleQRCodeScanned = () => {
    setState(2);
  };
 
  const { customer } = useStaff();
 
  return (
    <div className='container m-auto'>
      <div className='flex flex-col h-screen w-full items-center'>
        <div className='bg-pink-300 text-white py-4 text-center mb-4 w-full items-center'>
          <div>
            <h1 className='text-5xl font-bold text-center'>メインページ</h1>
            <Link href={"/"}>最初に戻る</Link>
          </div>
          <div>
            <div>
              <p>日付：{currentDate}</p>
            </div>
          </div>
        </div>
        {state === 0 && (
          <div className='bg-white w-full h-screen flex flex-col justify-center items-center content-center font-bold'>
            <div className='text-black text-2xl'>
              <p>ヘルパー名：{staff}</p>
            </div>

            <button
              onClick={() => setState(1)}
              className='hover:bg-blue-200 hover:text-white p-2 rounded-md'
            >
              <FaCameraRetro style={{ fontSize: "10rem" }} />
            </button>
            <button
              className='hover:bg-blue-200 hover:text-white p-4 rounded-md text-4xl font-bold'
              onClick={() => setState(1)}
            >
              カメラ起動
            </button>
          </div>
        )}

        <div className='mt-36'>
          {state === 1 && <CamerajsQR2 />}
          {state === 1 && (
            <div className=' flex justify-center gap-32 '>
              {" "}
              <Link
                href='/'
                className='bg-blue-400 text-white font-bold px-6 py-4 rounded-lg  hover:bg-blue-800 '
              >
                戻る
              </Link>
              <button
                onClick={() => setState(2)}
                className='bg-blue-400 text-white font-bold px-6 py-4 rounded-lg hover:bg-blue-800 '
              >
                次へ
              </button>
            </div>
          )}
          {state === 2 && (
            <div>
              <p>利用者名：{customer}</p>
              <button onClick={handlesubmitin}>入室</button>
              <button onClick={handlesubmitout}>退室</button>
            </div>
          )}
        </div>
      </div>
      <footer className='bg-gray-300 text-black py-6 text-center     w-full'>
        <p className='text-2xl font-bold'>
          ヘルパーステーション{" "}
          <span className='text-yellow-500 text-3xl'>OCC</span>
        </p>
      </footer>
    </div>
  );
};
 
export default MainPage;