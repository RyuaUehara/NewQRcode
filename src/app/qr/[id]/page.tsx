"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import CamerajsQR2 from "@/app/componets/CameraJsQR2";
import { useStaff } from "@/lib/utils/StaffProvider";
//import { staffType } from "../api/staff/type";
import { visitType } from "@/app/api/inout/type";
import { FaCameraRetro } from "react-icons/fa";

const MainPage = () => {
  const [state, setState] = useState(0);
  const [out_time, setOut_time] = useState<visitType[]>([]);
  const [currentDate, setCurrentDate] = useState("");
  const [visitLogs, setVisitLogs] = useState<visitType[]>([]); // 新しくステートを追加
  const [isSubmittingIn, setIsSubmittingIn] = useState(false);
  const [isSubmittingOut, setIsSubmittingOut] = useState(false);

  const { staffid, staff, customer } = useStaff(); // customerを上に移動

  useEffect(() => {
    console.log("staffid", staffid, "staff", staff);
    setCurrentDate(getFormattedDate());
    fetchVisitLogs(); // visitLogsを取得する関数を呼び出す
  }, [staffid, staff]); // 依存配列を追加

  const getFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, "0");
    const day = `${today.getDate()}`.padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const fetchVisitLogs = async () => {
    const response = await fetch(`/api/inout/${staffid}`, {
      method: "GET",
    });
    const data = await response.json();
    setVisitLogs(data);
  };

  const handlesubmitin = async () => {
    if (isSubmittingIn) return;
    setIsSubmittingIn(true);
    await fetch("/api/inout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        staff,
        staffid,
        customer,
      }),
    });
    fetchVisitLogs(); // データを再取得して最新の状態に更新
    setIsSubmittingIn(false);
    window.location.href = "/";
  };

  const handlesubmitout = async () => {
    if (isSubmittingOut) return;
    setIsSubmittingOut(true);
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
    setIsSubmittingOut(false);
    window.location.href = "/";
  };

  const handleQRCodeScanned = () => {
    setState(2);
  };
  return (
    <div className='flex flex-col min-h-screen w-full items-center'>
      <div className='bg-pink-300 sticky p-4 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600'>
        <h1 className='text-3xl font-bold text-center w-full'>SMILE MEMORIES</h1>
      </div>

      {state === 0 && (
        <div className='bg-white w-full h-screen flex flex-col justify-center items-center content-center font-bold'>
          <div className='text-black text-2xl'>
            <p>日付：{currentDate}</p>
          </div>
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

          <div className=' flex justify-center gap-20 '>
            {" "}
            <Link
              href='/'
              className='bg-blue-400 p-4  text-4xl text-white font-bold px-6 py-4 rounded-lg mr-2 hover:bg-blue-800'
            >
              戻る
            </Link>
          </div>
        </div>
      )}

      <div className='flex flex-col min-h-screen w-full items-center'>
        {state === 1 && <CamerajsQR2 onQRCodeScanned={handleQRCodeScanned} />}
        {state === 1 && (
          <div className='flex justify-center gap-20 mt-20'>
            <Link
              href='/'
              className='bg-blue-400 p-4  text-4xl text-white font-bold px-6 py-4 rounded-lg mr-2 hover:bg-blue-800'
            >
              戻る
            </Link>
          </div>
        )}
        {state === 2 && (
          <div className=''>
            <div className='flex flex-col mt-24 '>
              {/* Display customer name */}
              <div className='mb-6 text-xl static'>
                <p>ヘルパー名：{staff}</p>
                <br />
                <p>利用者名：{customer}</p>

                <div className=''>
                  {/* Label for helperID */}
                  <label
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
                    htmlFor='helperID'
                  ></label>
                </div>

                <div className='flex justify-center mb-8 gap-16 mt-8'>
                  {/* Button for entry */}

                  <button
                    onClick={handlesubmitin}
                    className='bg-blue-400 p-4  text-4xl text-white font-bold px-6 py-4 rounded-lg mr-2 hover:bg-blue-500'
                  >
                    開始
                  </button>
                  {/* Button for exit */}
                  <button
                    onClick={handlesubmitout}
                    className='bg-pink-300 p-4  text-4xl text-white font-bold px-6 py-4 rounded-lg mr-2 hover:bg-pink-400'
                  >
                    終了
                  </button>
                </div>
              </div>
              <hr />

              <div className='block'>
                {/* visitLogsの表示 */}
                <h2 className='flex justify-center text-2xl font-bold mb-4'>訪問履歴</h2>

                <div className='overflow-y-scroll scroll-smooth h-80'>
                  <div className='flex flex-col items-center justify-start whitespace-normal'>
                    <ul className='space-y-2'>
                      {visitLogs.map((log) => (
                        <li
                          key={log.id}
                          className='rounded-lg shadow-md p-4 border-4 border-pink-300 border-opacity-100'
                        >
                          <p>ヘルパー名: {log.staffname}</p>
                          <p>利用者名: {log.customername}</p>
                          <p>
                            入室時間: {new Date(log.in_time).toLocaleString()}
                          </p>
                          <p>
                            退室時間:{" "}
                            {log.out_time
                              ? new Date(log.out_time).toLocaleString()
                              : "未退室"}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className='sticky bottom-0 left-0 z-20 w-full p-4 bg-gray-200 border-t shadow md:flex md:items-center md:justify-center md:p-6 dark:bg-gray-300 dark:border-gray-600'>
        <p className='text-2xl font-bold text-center'>
          ヘルパーステーション{" "}
          <span className='text-yellow-500 text-3xl'>OCC</span>
        </p>
      </footer>
    </div>);
};

export default MainPage;
