import React , { useState } from "react";
import DKDat from "./Dieukiendat";

function KPI() {

    const [number, setNumber] = useState(1);

    return (
        <>
        <div>KPI</div>
        <div className="grid grid-cols-3 w-full p-4">
            <div className="text-left"> 
                <label className="font-bold">Nội dung đánh giá</label>
                <textarea className="border outline-none p-2 block" cols={50} rows={3} />

            </div>
            <div className="text-left">
                <label className="font-bold" >Cách thức đo lường</label>
            <textarea className="border outline-none p-2 block" spellCheck={false} cols={50} rows={3} />
            </div>
            <div className="text-left">
                <label className="font-bold" >Điều kiện đạt</label>
                <div>
                    <DKDat number={number} />


                </div>
            </div>
            
            
        </div>
        <div>
            <div className="w-full bg-blue-600 text-white text-left px-2 py-1">Tiêu chí điều kiện cần</div>

        </div>
        </>
    )
}

export default KPI;