"use client";

import exp from "constants";
import Link from "next/link";
import React, { useState } from "react";

const mainpage = () => {
    const [state, setState] = useState(0);
    return (
        <div>
            <div>
                ホーム画面
            </div>
            <div className="flex space-x-10">
                <button onClick={() => setState(0)}>Page A</button>
                <button onClick={() => setState(1)}>Page B</button>
                <button onClick={() => setState(2)}>Page C</button>
            </div>
            <div>
                {state === 0 && 0}
                {state === 1 && 1}
                {state === 2 && 2}
            </div>
        </div>
    )
}

export default mainpage;