"use client";
 
import Link from "next/link";
import { staffType } from "@/app/api/staff/type";
import { useEffect, useState } from "react";
 
export default function Home() {
  const [staffid, setstaffid] = useState<number | null>(null);
  const [staffname, setstaffname] = useState<string | null>(null);
  const [staffs, setstaffs] = useState<staffType[]>([]);
 
  useEffect(() => {
    const fetchstaffs = async () => {
      const response = await fetch("/api/staff");
      const data = await response.json();
      setstaffs(data);
    };
    fetchstaffs();
  }, []);
 
  const handleselectstaff = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedstaff = staffs.find(
      (staff) => staff.staffname === event.target.value
    );
    if (selectedstaff) {
      setstaffid(selectedstaff.id);
      setstaffname(selectedstaff.staffname);
    }
  };
  return (
    <div className='w-screen flex flex-col min-h-screen'>
      {/* Header */}
      <header className='bg-pink-300 text-white py-4 text-center mb-4'>
        <h1 className='text-3xl font-bold'>訪問介護時間管理</h1>
      </header>
 
      {/* Content */}
      <div className='flex-grow py-40 px-4 text-center'>
        <div className='mb-4'>
          <div className='mb-3'>ヘルパー名を選択↓</div>
          <label className='text-center font-bold text-1xl' htmlFor='staffid'>
            <select
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 appearance-none'
              onChange={handleselectstaff}
              value={staffid || ""}
              style={{ width: "150px" }} // Adjust the width as needed
            >
              <option key={staffid}>
                {staffid} ヘルパー名:{staffname}
              </option>
              {staffs.map((staff) => (
                <option
                  key={staff.id}
                  value={staff.staffname}
                  style={{ backgroundColor: "yellow" }}
                >
                  {staff.staffname}
                  {JSON.stringify(staff)}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className='mt-20'>
          <Link
            href='/qr'
            className='bg-blue-400 text-white px-6 py-4 rounded-lg mr-2 hover:bg-blue-800 '
          >
            次へ
          </Link>
        </div>
      </div>
 
      {/* Footer */}
      <footer className='bg-gray-300 text-black py-4 text-center mt-auto'>
        <p className='text-2xl font-bold'>
          ヘルパーステーション{" "}
          <span className='text-yellow-500 text-3xl'>OCC</span>
        </p>
      </footer>
    </div>
  );
}
 