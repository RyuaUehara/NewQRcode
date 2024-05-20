"use client";

import Link from "next/link"
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
    const selectedstaff = staffs.find(staff => staff.staffname === event.target.value);
    if (selectedstaff) {
      setstaffid(selectedstaff.id);
      setstaffname(selectedstaff.staffname);
    }
  }

  return (
    <div>
      <div>
        ヘルパー名を選んでください
      </div>
      <label
        className='text-center font-bold text-3xl'
        htmlFor='staffid'
      >
        <select onChange={handleselectstaff} value={staffid || ""}>

          <option key={staffid}>
            ID:{staffid} ヘルパー名:{staffname}
          </option>
          {staffs.map((staff) => (
            <option key={staff.id} value={staff.staffname}>
              {staff.staffname}
              {JSON.stringify(staff)}
            </option>
          ))}
        </select>
      </label>
      <div>
        <Link href="/qr">次へ</Link>
      </div>
    </div>
  );
}