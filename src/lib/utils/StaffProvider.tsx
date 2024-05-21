"use client";

import { setConfig } from "next/config";
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext({
    staff: "",
    setStaff: (value: any) => { },
    customer: "",
    setCustomer: (value: any) => { },
});

//StaffContextの作成
export function StaffProvider({ children }: { children: React.ReactNode }) {
    const [staff, setStaff] = useState("");
    const [customer, setCustomer] = useState("");

    return (
        <UserContext.Provider value={{ staff, setStaff, customer, setCustomer }}>
            {children}
        </UserContext.Provider>
    );
}

export function useStaff() {
    return useContext(UserContext);
}