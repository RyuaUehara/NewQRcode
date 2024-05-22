"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { staffType } from "@/app/api/staff/type";
import { useEffect, useState } from "react";
import { useStaff } from "@/lib/utils/StaffProvider";

export default function Home() {
  const [staffid, setstaffid] = useState<number | null>(null);
  const [staffs, setstaffs] = useState<staffType[]>([]);
  const router = useRouter();
  const { staff, setStaff } = useStaff();

  useEffect(() => {
    const fetchstaffs = async () => {
      const response = await fetch("/api/staff");
      const data = await response.json();
      setstaffs(data);
    };

    console.log("staff", staff);
    fetchstaffs();
  }, []);

  const handleselectstaff = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedstaff = staffs.find(
      (staff) => staff.staffname === event.target.value
    );
    if (selectedstaff) {
      setstaffid(selectedstaff.id);
      setStaff(selectedstaff.staffname);
    }
  };

  return (
    <div className='w-screen flex flex-col min-h-screen items-center'>
      {/* Header */}
      <header className='bg-pink-300 text-white py-4 text-center mb-4 w-full'>
        <h1 className='text-3xl font-bold'>ヘルパー名選択画面</h1>
      </header>

      {/* Content */}
      <div className='flex-grow py-8 px-4 flex flex-col items-center justify-center'>
        <div className='mb-4'>
          <div className='mb-3'>ヘルパー名を選択↓</div>
          <label className='font-bold text-sm' htmlFor='staffid'>
            <select
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 appearance-none'
              onChange={handleselectstaff}
              value={staff || ""}
              style={{ width: "150px" }} // Adjust the width as needed
            >
              <option value='' disabled>
                ヘルパー名：
              </option>
              {staffs.map((staff) => (
                <option
                  key={staff.id}
                  value={staff.staffname}
                  style={{ backgroundColor: "yellow" }}
                >
                  {staff.staffname}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <Link
            href='/qr'
            className='bg-blue-400 text-white font-bold px-6 py-4 rounded-lg mr-2 hover:bg-blue-800 text-xl'
          >
            次へ
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className='bg-gray-300 text-black py-4 text-center w-full'>
        <p className='text-xl font-bold'>
          ヘルパーステーション{" "}
          <span className='text-yellow-500 text-2xl'>OCC</span>
        </p>
      </footer>
    </div>
  );
}
