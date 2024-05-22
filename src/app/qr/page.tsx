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
  //const [staffname, setStaffname] = useState<staffType[]>([]);
  //const [customername, setCustomer] = useState<string | null>(null);
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
  };

  const handlesubmitout = async () => {
    const response = await fetch("/api/inout", {
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
  };

  const handleQRCodeScanned = () => {
    setState(2);
  };

  return (
    <div className='container m-auto'>
      <div className='flex flex-col h-screen w-full items-center'>
        <div className='bg-pink-300 text-white py-4 text-center mb-4 w-full items-center'>
          <div>
            <h1 className='text-5xl font-bold text-center w-full'>
              メインページ
            </h1>
          </div>
        </div>
        {state === 0 && (
          <div className='bg-white w-full h-screen flex flex-col justify-center items-center content-center font-bold'>
            <p>
              <Link href="/">最初に戻る</Link>
            </p>
            <div>
              <p>日付：{currentDate}</p>
            </div>
            <div className='text-black text-2xl  '>
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
          {state === 1 && <CamerajsQR2 onQRCodeScanned={handleQRCodeScanned} />}
          {state === 1 && (
            <div className=' flex justify-center gap-20 '>
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
            <div className='flex justify-start mt-0 h-screen'>
              <div className='flex flex-col items-center'>
                <div className='text-black text-2xl  '>
                  <p>ヘルパー名：{staff}</p>
                </div>

                {/* Display customer name */}
                <div className='mb-6 text-xl'>
                  <p>利用者名：{customer}</p>
                </div>

                <div className='flex flex-col items-center justify-start'>
                  {/* Label for helperID */}
                  <label
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
                    htmlFor='helperID'
                  ></label>
                </div>

                <div className='flex justify-center mb-8'>
                  {/* Button for entry */}
                  <button onClick={handlesubmitin} className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>
                    入出
                  </button>
                  {/* Button for exit */}
                  <button onClick={handlesubmitout} className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
                    退出
                  </button>
                </div>

                <hr />

              </div>
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
