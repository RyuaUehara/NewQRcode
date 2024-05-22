"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import CamerajsQR2 from "@/app/componets/CameraJsQR2";
import { useStaff } from "@/lib/utils/StaffProvider";
import { FaCameraRetro } from "react-icons/fa6";

const MainPage = () => {
  const [state, setState] = useState(0);

  const { staff } = useStaff();
  useEffect(() => {
    console.log("staff", staff);
  });

  return (
    <div className='container m-auto'>
      <div className='flex flex-col h-screen w-full items-center'>
        <div className='bg-pink-300 text-white py-4 text-center mb-4 w-full items-center'>
          <div>
            <h1 className='text-5xl font-bold text-center'>メインページ</h1>
          </div>
        </div>

        <div></div>
        {state === 0 && (
          <div className='bg-white w-full h-screen flex flex-col justify-center items-center content-center font-bold'>
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
          {state === 2 && 2}
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
