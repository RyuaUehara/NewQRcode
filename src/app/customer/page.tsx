"use client";

import Link from "next/link";
import NewCustomer from "../componets/NewCustomer";

const RecordPage = async () => {
  return (
    <div className='container mx-auto'>
      <div className='flex items-center justify-center h-screen'>
        <div className='mx-auto'>
          <NewCustomer />
        </div>
      </div>
    </div>
  );
};

export default RecordPage;
