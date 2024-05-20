import Link from "next/link"

import { staffType } from "@/app/api/staff/type";
import { useState } from "react";

export default function Home() {
  const [staffid, setstaffid] = useState<number | null>(null);
  const [staffname,setstaffname] = useState<string | null>(null);
  

  
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
        <Link href="/login">確定</Link>
      </div>
    </div>
  )
}