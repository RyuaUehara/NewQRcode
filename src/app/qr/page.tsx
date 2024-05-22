"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import CamerajsQR2 from "@/app/componets/CameraJsQR2";
import { useStaff } from "@/lib/utils/StaffProvider";
//import { staffType } from "../api/staff/type";
import { visitType } from "../api/inout/type";

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
    })

    const getFormattedDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = `${today.getMonth() + 1}`.padStart(2, "0");
        const day = `${today.getDate()}`.padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

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
            })
        });
        console.log(staffid, customer, out_time);
    };

    const { customer } = useStaff();

    return (
        <div className="container m-auto">
            <div className="flex flex-col h-screen w-full items-center">
                <div className="bg-pink-300 text-white py-4 text-center mb-4 w-full items-center">
                    <h1 className="text-5xl font-bold text-center">Main Page</h1>
                    <div>
                        <div className="text-white">
                            <p>ヘルパー名：{staff}</p>
                        </div>
                        <div>
                            <p>日付：{currentDate}</p>
                        </div>
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