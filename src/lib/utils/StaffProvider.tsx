"use client";

import React, { createContext, useContext, useState } from "react";

const UserContext = createContext({
    staff: null,
    setStaff: (value: any) => { },
});

//StaffContextの作成
export function StaffProvider({ children }: { children: React.ReactNode }) {
    const [staff, setStaff] = useState("");

    return (
        <UserContext.Provider value={{ staff, setStaff }}>
            {children}
        </UserContext.Provider>
    );
}

export function useStaff() {
    return useContext(UserContext);
}