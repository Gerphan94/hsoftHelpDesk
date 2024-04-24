import React, { useState, useEffect } from "react";
import DKDat from "./Dieukiendat";

function KPI() {

    const [kpis, setKpis] = useState([
        {
            "nd": "abv",
            "ct": "xxxx",
            "dk": [{
                name: 'a',
                selectedOption: '=',
                value: '2'
            }]

        }

    ]);

    useEffect(() => {



    });

    const [number, setNumber] = useState(1);
    const [dkData, setDkData] = useState([]);

    return (
        <>
            <div>KPI</div>
            <div className="grid grid-cols-3 w-full p-4">
                <div className="text-left w-full p-4">
                    <label className="font-bold">Nội dung đánh giá</label>
                    <textarea className="border outline-none p-2 block w-full mt-2" rows={3} />

                </div>
                <div className="text-left p-4">
                    <label className="font-bold" >Cách thức đo lường</label>
                    <textarea className="border outline-none p-2 block w-full mt-2" spellCheck={false} rows={3} />
                </div>
                <div className="text-left p-4">
                    <label className="font-bold" >Điều kiện đạt</label>
                    <div className="mt-2">
                        <DKDat dkData={dkData} setDkData={setDkData} />
                    </div>
                </div>
                <div className="flex">
                    <button className="w-24 px-2 py-1 bg-blue-500 text-white hover:bg-blue-600">Thêm</button>
                </div>

            </div>
            <div>
                <div className="w-full bg-blue-600 text-white text-left px-2 py-1">Tiêu chí điều kiện cần</div>
                <div>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="w-8">#</th>
                                <th>Nội dung đánh giá</th>
                                <th>Cách thức đo lường</th>
                                <th>Điều kiện đạt</th>
                                <th>Kết quả</th>
                                <th>...</th>
                            </tr>
                        </thead>
                        <tbody>
                            {kpis.map((kpi) =>
                                <tr>
                                    <td>

                                    </td>

                                    <td>
                                        <textarea className="w-full border px-2 py-1 min-h-20">{kpi.nd}</textarea>
                                    </td>
                                    <td>
                                        <textarea className="w-full border px-2 py-1 min-h-20">{kpi.ct}</textarea>
                                    </td>
                                    <td>
                                        <div className="p-4">
                                            {kpi.dk.map((ele) =>
                                                <div className="flex gap-4">
                                                    <div>{ele.name}</div>
                                                    <div>{ele.selectedOption}</div>
                                                    <div>{ele.value}</div>
                                                  

                                                </div>
                                            )}
                                        </div>

                                    </td>


                                </tr>




                            )}
                        </tbody>
                    </table>


                </div>

            </div >
        </>
    )
}

export default KPI;