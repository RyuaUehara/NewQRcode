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
 
  const { staffid, staff } = useStaff();
  useEffect(() => {
    console.log("staffid", staffid, "staff", staff);
    setCurrentDate(getFormattedDate());
  });
 
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
 
  // const notify = () => toast("データを入れました");
 
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
 
  const { customer } = useStaff();
 
  return (
    <div className='flex flex-col min-h-screen w-full items-center'>
       <header className=' bg-pink-300 p-4 sticky w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600'>
        <h1 className='text-3xl font-bold text-center'>メインページ画面</h1>
      </header>
 
      {state === 0 && (
        <div className='bg-white w-full h-screen flex flex-col justify-center items-center content-center font-bold'>
          <div className='text-black text-2xl'>
            <p className='text-center'>日付：{currentDate}</p>
            <p className='text-3xl'>ヘルパー名：{staff}</p>
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
 
          <div className=' flex justify-center gap-20 mt-10'>
            {" "}
            <Link
              href='/'
              className='focus:outline-none text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 bg-blue-400 font-bold px-6 py-4 p-4 text-4xl rounded-lg mr-2'
            >
              戻る
            </Link>
            <button
              onClick={() => setState(2)}
              className='focus:outline-none text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 bg-blue-400 font-bold px-6 py-4 p-4 text-4xl rounded-lg mr-2'
            >
              次へ
            </button>
          </div>
        </div>
      )}
 
      <div className='mt-36 overflow-y-auto'>
        {state === 1 && <CamerajsQR2 />}
        {state === 1 && (
          <div className=' flex justify-center gap-20 '>
            {" "}
            <Link
              href='/'
              className='focus:outline-none text-white  bg-blue-400 hover:bg-blue-500 focus:ring-4 bg-blue-400 font-bold px-6 py-4 p-4 text-4xl rounded-lg mr-2'
            >
              戻る
            </Link>
            <button
              onClick={() => setState(2)}
              className='focus:outline-none text-white  bg-blue-400 hover:bg-blue-500 focus:ring-4 bg-blue-400 font-bold px-6 py-4 p-4 text-4xl rounded-lg mr-2'
            >
              次へ
            </button>
          </div>
        )}
        {state === 2 && (
          <div className='flex justify-center items-center h-screen'>
            <div className='flex flex-col items-center justify-center'>
              {/* Display customer name */}
              <div className='mb-10 text-3xl font-bold'>
                <p>利用者名：{customer}</p>
              </div>
 
              <div className='flex justify-center items-center gap-20 '>
                {/* Button for entry */}
                <button
                  
                  className='focus:outline-none text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 bg-blue-400 font-bold px-6 py-4 p-4 text-4xl rounded-lg mr-2'
                >
                  入出
                </button>
               
                {/* Button for exit */}
                <button className='focus:outline-none text-white bg-pink-300 hover:bg-pink-400 focus:ring-pink-300 font-bold px-6 py-4 p-4 text-4xl rounded-lg mr-2'>
                  退出
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
 
      {/* Footer */}
      <footer className='sticky bottom-0 left-0 z-20 w-full p-4 bg-gray-300  border-gray-200 shadow md:flex md:items-center md:justify-center md:p-6 dark:bg-gray-300 dark:border-gray-600'>
        <p className='text-2xl font-bold text-center'>
          ヘルパーステーション{" "}
          <span className='text-yellow-500 text-3xl'>OCC</span>
        </p>
      </footer>
    </div>
  );
};
 
export default MainPage;