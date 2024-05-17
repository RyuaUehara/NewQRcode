"use client";
import { CustomerType } from "@/app/api/customer/type";
import { visitsType } from "@/app/api/inout/type";
import { useEffect, useState } from "react";
import Link from "next/link";
import OneCustomer from "@/app/componets/OneCustomer";
import ViewHelpers from "@/app/componets/ViewHelpers";
import { HelperType } from "@/app/api/helper/type";
import { Imprima } from "next/font/google";

export default function Home() {
  const [customerName, setCustomer] = useState<CustomerType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const id = window.location.pathname.split("/").pop(); // Get id from URL path
  const [helpers, setHelpers] = useState<HelperType[]>([]);
  const [visits, setVisits] = useState<visitsType[]>([]);
  const [helperID, setHelperID] = useState<number | null>(null);
  const [helperName, setHelperName] = useState<string | null>(null);
  const handlesubmitin = async () => {
    const response = await fetch("/api/inout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        helperID,
        helperName,
        customerName,
      }),
    });
    console.log(helperID, helperName, customerName);
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const res = await fetch(`/api/customer/${id}`);
          const customerData = await res.json();
          setCustomer(customerData);
        } catch (error) {
          console.error("Error fetching customer data:", error);
        }
        setIsLoading(false);
      }
    };
    fetchCustomer();
    const fetchHelpers = async () => {
      setIsLoading(true);
      const res = await fetch("/api/helper/");
      const helpers = await res.json();
      setHelpers(helpers);
      setIsLoading(false);
    };
    fetchHelpers();
  }, [id]);

  const handleSelectHelper = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    const helper = JSON.parse(event.target.value);
    setHelperID(helper.helperID);
    setHelperName(helper.helperName);
    //const id = parseInt(event.target.value);
    //setSelectedHelper(id);
  };

 
  return (
    <div>
      <div>
        <div className='w-1/2 flex flex-col'>
          <div className='flex justify-between mb-5'>
            <p className='text-center font-bold text-3xl'>ヘルパー入退出画面</p>
          </div>
          {customerName && (
            <div className='flex flex-col items-center justify-start'>
              <p>訪問先：{JSON.stringify(customerName)} 様 宅</p>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className='w-1/2 flex flex-col'>
          <div className='flex flex-col items-center justify-start'>
            <label
              className='text-center font-bold text-3xl'
              htmlFor='helperID'
            >
              <select onChange={handleSelectHelper} value={helperID || ""}>

                <option key={helperID}>
                  ID:{helperID} ヘルパー名:{helperName}
                </option>
                {helpers.map((helper) => (
                  <option key={helper.id} value={helper.helpername}>
                    {helper.helpername}
                    {JSON.stringify(helper)}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>
      <div>
        <button onClick={handlesubmitin}>入出</button>
        <button>退出</button>
      </div>

      <div>

      </div>

    </div>
  );
}