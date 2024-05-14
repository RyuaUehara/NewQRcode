import Link from "next/link";
import ViewCustomers from "../componets/ViewCustomers";

export default function Home() {
  return (
    <div className="container m-auto">
      <div className="flex h-screen justify-between p-10">
        <div className="flex flex-col w-1/2 items-center justify-center">
          <p className="font-bold text-6xl mb-5">/</p>
          <p className="font-bold text-7xl mb-10">page.tsx</p>
          <Link href="/customer">[追加]</Link>
        </div>
        <ViewCustomers />
      </div>
    </div>
  );
}
