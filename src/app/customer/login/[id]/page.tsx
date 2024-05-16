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
        <ViewHelpers />
      </div>
    </div>
  );
};