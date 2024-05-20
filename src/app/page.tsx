import Link from "next/link"

import { staffType } from "@/app/api/staff/type";
import { useState } from "react";

export default function Home() {
  const [staffid, setstaffid] = useState<number | null>(null);
  const [staffname,setstaffname] = useState<string | null>(null);
  

  
  }
  return (
    <div className="w-screen">
      <div className="bg-black text-white p-2 flex items-center justify-center">
        訪問介護時間管理
      </div>
      <div className="flex h-screen items-center justify-center">
        <CameraJsQR2 />
      </div>
      <div>
        <Link href="/login">確定</Link>
      </div>
    </div>
  )
}