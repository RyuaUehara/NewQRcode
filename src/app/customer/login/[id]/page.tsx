"use client";

import { useState } from "react";
import Link from "next/link";
import OneCustomer from "@/app/componets/OneCustomer";
import ViewHelpers from "@/app/componets/ViewHelpers";

export default function Home() {
  return (
    <div>
      <div>
        <OneCustomer />
      </div>
      <div>
        <label htmlFor="helperID">IDを入力してください</label>
        <ViewHelpers />
      </div>
    </div>
  );
};