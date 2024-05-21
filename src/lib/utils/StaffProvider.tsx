"use client";

import { setConfig } from "next/config";
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext({
    staffid: 0,
    setStaffid: (value: any) => { },
    staff: "",
    setStaff: (value: any) => { },
    customer: "",
    setCustomer: (value: any) => { },
});

//StaffContextの作成
export function StaffProvider({ children }: { children: React.ReactNode }) {
    const [staffid, setStaffid] = useState<number>(0);
    const [staff, setStaff] = useState("");
    const [customer, setCustomer] = useState("");

    return (
        <UserContext.Provider value={{ staffid, setStaffid, staff, setStaff, customer, setCustomer }}>
            {children}
        </UserContext.Provider>
    );
}

export function useStaff() {
    return useContext(UserContext);
}