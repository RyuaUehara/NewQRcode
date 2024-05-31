"use client";

import Link from "next/link";

export default function Home() {
    return (
        <div>
            <div>
                <Link href="/admin/visit">[訪問履歴表示]</Link>
            </div>
            <div>
                <Link href="/admin/add">[ヘルパー追加]</Link>
            </div>
        </div>
    )
}