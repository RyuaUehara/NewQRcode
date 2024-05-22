"use client";

import Link from "next/link"
import { useRouter } from "next/navigation";
import { staffType } from "@/app/api/staff/type";
import { useEffect, useState } from "react";
import { useStaff } from "@/lib/utils/StaffProvider"

export default function Home() {
  const [staffid, setstaffid] = useState<number | null>(null);
  const [staffs, setstaffs] = useState<staffType[]>([]);
  const router = useRouter();
  const { staff,setStaff } = useStaff();

  useEffect(() => {
    const fetchstaffs = async () => {
      const response = await fetch("/api/staff");
      const data = await response.json();
      setstaffs(data);
    };
    if(staff) {
      router.push('/qr');
    }
    console.log("staff",staff);
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
  }


  return (
    <div>
      <div>ヘルパー名を選んでください</div>
      <label className='text-center font-bold text-3xl' htmlFor='staffid'>
        <select onChange={handleselectstaff} value={staff || ""}>
          <option value="" disabled>ヘルパーを選択してください</option>
          {staffs.map((staff) => (
            <option key={staff.id} value={staff.staffname}>
              {staff.staffname}
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
 