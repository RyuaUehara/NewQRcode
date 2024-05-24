"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { staffType } from "@/app/api/staff/type";
import { useEffect, useState } from "react";
import { useStaff } from "@/lib/utils/StaffProvider";

export default function Home() {
  const [staffs, setstaffs] = useState<staffType[]>([]);
  const router = useRouter();
  const { staffid, setStaffid } = useStaff();
  const { staff, setStaff } = useStaff();

  useEffect(() => {
    const fetchstaffs = async () => {
      const response = await fetch("/api/staff");
      const data = await response.json();
      setstaffs(data);
    };

    console.log("staffid", staffid, "staff", staff);
    fetchstaffs();
  }, []);

  const handleselectstaff = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedstaff = staffs.find(
      (staff) => staff.staffname === event.target.value
    );
    if (selectedstaff) {
      setStaffid(selectedstaff.id);
      setStaff(selectedstaff.staffname);
    }
  };

  return (
    <div className='w-screen flex flex-col min-h-screen items-center'>
      {/* Header */}
      <header className='bg-pink-300 sticky p-4 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600'>
        <h1 className='text-3xl font-bold text-center'>ヘルパー名選択画面</h1>
      </header>

      {/* Content */}
      <div className='flex-grow py-8 px-4 flex flex-col items-center justify-center'>
        <div className='mb-4'>
          <div className='mb-3 text-3xl'>ヘルパー名を選択↓</div>
          <label className='text-center font-bold text-1xl' htmlFor='staffid'>
            <select
              className='text-2xl bg-gray-50 border border-gray-300   rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 appearance-none'
              onChange={handleselectstaff}
              value={staff || ""}
              style={{ width: "250px ", height: "100px" }} // Adjust the width as needed
            >
              <option value='' className='' disabled>
                ヘルパー名：{staff}
              </option>
              {staffs.map((staff) => (
                <option
                  key={staff.id}
                  value={staff.staffname}
                  style={{ backgroundColor: "pink" }}
                >
                  {staff.staffname}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className='mt-20'>
          <Link
            href={`/qr/${staffid}`}
            className='bg-blue-400 p-4  text-4xl text-white font-bold px-6 py-4 rounded-lg mr-2 hover:bg-blue-800'
          >
            次へ
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className='sticky bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-center md:p-6 dark:bg-gray-300 dark:border-gray-600'>
        <p className='text-2xl font-bold '>
          ヘルパーステーション{" "}
          <span className='text-yellow-500 text-3xl'>OCC</span>
        </p>
      </footer>
    </div>
  );
}