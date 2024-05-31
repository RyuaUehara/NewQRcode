"use client";

import Link from "next/link";
import { visitType } from "@/app/api/inout/type";
import { useEffect, useState } from "react";

const Logs = () => {
    const [Logs, setLogs] = useState<visitType[]>([]);
    useEffect(() => {
        const fetchLogs = async () => {
            const response = await fetch("/api/inout", {
                method: "GET",
            });
            const data = await response.json();
            setLogs(data);
        };
        fetchLogs();
    }, []);

    return (
        <div>
            <ul className='space-y-2'>
                <div>
                    <Link href="/admin" className="flex flex-col items-center justify-start">[戻る]</Link>
                </div>
                {Logs.map((log) => (
                    <li
                        key={log.id}
                        className='rounded-lg shadow-md p-4 border-4 border-pink-300 border-opacity-100'
                    >
                        <p>スタッフID: {log.staffid}</p>
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
    );
};
export default Logs;
