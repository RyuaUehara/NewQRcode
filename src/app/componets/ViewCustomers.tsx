"use client";

import { CustomerType } from "@/app/api/customer/type";
import Link from "next/link";
import { useEffect, useState } from "react";

const ViewCustomers = () => {
    const [customers, setCustomers] = useState<CustomerType[]>([]);
    const [reload, setReload] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        const fetchCustomers = async () => {
            setIsLoading(true);
            {
                const res = await fetch("/api/customer/");
                const customers = await res.json();
                setCustomers(customers);
            }
            setIsLoading(false);
        };
        fetchCustomers();
    },[reload]);

    const handleReload = () => {
        setReload(!reload);
    };

    return (
      <div className="flex flex-col">
      <div className="flex flex-col items-center justify-start">
      <p className="flex justify-center text-center font-bold text-3xl ">Supabase: User table</p>
        {customers.map((customer) => (
          <Link
            key={customer.id}
            href={`/customer/login/${customer.id}`}
            className="flex border-2 w-full px-2 py-1"
          >
            {JSON.stringify(customer)}
          </Link>
        ))}
      </div>
      <div className="flex justify-between mt-5">
       
        {isLoading ? (
          <p>Reloading...</p>
        ) : (
          <button
            onClick={handleReload}
            type="button"
            className="bg-blue-500 text-white px-2 py-1"
          >
            Reload
          </button>
        )}
      </div>
    </div>
    
      );
    };
    
    export default ViewCustomers;
  