import Link from "next/link"

import { staffType } from "@/app/api/staff/type";
import { useState } from "react";

export default function Home() {
  const [staffid, setstaffid] = useState<number | null>(null);
  const [staffname,setstaffname] = useState<string | null>(null);
  

  
  }
  return (
<<<<<<< HEAD
    <div className='w-screen'>
      <div className='bg-pink-400 text-white font-semibold text-4xl p-2 flex items-center justify-center'>
        訪問介護時間管理
      </div>
      {/* <div className='mt-8'>
        <Link className='p-5 bg-slate-300 rounded-xl' href='/admin'>
          管理者画面
        </Link>
      </div> */}

      <div className='flex h-screen items-center justify-center rounded-lg'>
        <CameraJsQR2 />
        <div className='flex justify-center items-center'></div>
      </div>
    </div>
  );
}
=======
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
>>>>>>> 9ff55d636ae5613c19a94780bcd2283cdcc169fe
