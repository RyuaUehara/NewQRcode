"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import CamerajsQR2 from "@/app/componets/CameraJsQR2";
import { useStaff } from "@/lib/utils/StaffProvider";
import { staffType } from "../api/staff/type";
import { visitType } from "../api/inout/type";

const MainPage = () => {
    const [state, setState] = useState(0);
    const [staffid, setStaffid] = useState<staffType[]>([]);
    const [staffname, setStaffname] = useState<staffType[]>([]);
    const [customername, setCustomer] = useState<string | null>(null);
    const [in_time, setIn_time] = useState<visitType[]>([]);
    const [out_time, setOut_time] = useState<visitType[]>([]);

    const { staff } = useStaff();
    useEffect(() => {
        console.log("staff", staff);
        
    })

    const handlesubmitin = async () => {
        const response = await fetch("/api/inout",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                staffid,
                staffname,
                customername,
            }),
        });
    };

    const handlesubmitout = async () => {

    };

    const { customer } = useStaff();

    return (
        <div className="container m-auto">
            <div className="flex flex-col h-screen w-full items-center">
                <div className="bg-black w-full text-white">
                    <h1 className="text-5xl font-bold">Main Page</h1>
                    <div>
                        <div className="text-white">
                            <p>ヘルパー名：{staff}</p>
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
                {state === 1 &&
                    <div>
                        <button onClick={() => setState(2)}>次へ</button>
                    </div>
                }
                {state === 2 &&
                    <div>
                        <p>利用者名：{customer}</p>
                        <button onClick={handlesubmitin}>入室</button>
                        <button onClick={handlesubmitout}>退室</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default MainPage;
