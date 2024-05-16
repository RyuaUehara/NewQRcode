"use client";

import { useState } from "react";
import Link from "next/link";
import OneCustomer from "@/app/componets/OneCustomer";
import ViewHelpers from "@/app/componets/ViewHelpers";
import Inout from "@/app/componets/Inout";

export default function Home() {
  return (
    <div>
      <div>
        <Inout />
      </div>
      <div>
        <ViewHelpers />
      </div>
    </div>
  );
};