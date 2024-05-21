"use client";

import Link from "next/link";
import React, { useState } from "react";
import CamerajsQR2 from "@/app/componets/CameraJsQR2";
import { json } from "stream/consumers";
import { staffType } from "@/app/api/staff/type";
import { useEffect } from "react";


const MainPage = () => {
    const [state, setState] = useState(0);

    return (
        <div className="container m-auto">
            <div className="flex flex-col h-screen w-full items-center">
                <div className="bg-black w-full text-white">
                    <h1 className="text-5xl font-bold">Main Page</h1>
                    <div>
                        <div className="text-white">
                            <p>ヘルパー名：</p>
                        </div>
                    </div>
                    <Link href="/">Back to Home</Link>
                    <div className="flex space-x-10">
                        <button onClick={() => setState(0)}>Page A</button>
                        <button onClick={() => setState(1)}>Page B</button>
                        <button onClick={() => setState(2)}>Page C</button>
                    </div>
                </div>
                {state === 0 &&

                    <div className="bg-blue-100 w-full h-screen">
                        <button onClick={() => setState(1)}>カメラ起動</button>
                    </div>
                }
                {state === 1 && <CamerajsQR2 />}
                {state === 2 && 2}
            </div>
        </div>
    );
};

export default MainPage;
