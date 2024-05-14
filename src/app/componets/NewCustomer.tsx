"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const NewCustomer = () => {
  const router = useRouter();

  const [customerName, setName] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const handleSubmit = async () => {
    setIsFetching(true);
    {
      const response = await fetch("/api/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerName }),
      });
      const data = await response.json();
    }
    setIsFetching(false);

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="flex flex-col space-y-10 w-1/2 p-10 items-center">
      <form className="border-2 w-2/3 p-5">
        <p className="text-center font-bold">Form (NewUser.tsx)</p>
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="mb-2">
            customerName
          </label>
          <input
            onChange={(event) => {
              setName(event.target.value);
            }}
            type="text"
            name="name"
            id="name"
            className="border-2 p-2"
          />
        </div>
        {isFetching ? (
          <p className="text-center">Creating...</p>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-2 py-1"
          >
            Submit
          </button>
        )}
      </form>

      <div className="flex flex-col w-full">
        <p className="font-bold">REST-API Payload:</p>
        <div className="border-2 items-center justify-center p-5 overflow-auto whitespace-normal">
          {JSON.stringify({ customerName })}
        </div>
      </div>
    </div>
  );
};

export default NewCustomer;