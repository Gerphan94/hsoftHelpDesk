import React, { useState, useEffect } from "react";
import DKDat from "./Dieukiendat";

function KPI() {

    const [kpis, setKpis] = useState([
        {
            "nd": "Đạt số lượng tổng Khách hàng khám trung bình một ngày \ntheo quy định bệnh viện (A)",
            "ct": "Tử số: Tổng số lượng khách hàng đến khám tại \nKhoa Khám Bệnh trong 1 tháng của BS \nMẫu số: Tổng số ngày làm việc của BS trong tháng",
            "dk": [{
                name: 'Khám ngày Thường',
                selectedOption: '>=',
                value: '20'
            },
            {
                name: 'Ngày chủ nhật',
                selectedOption: '>=',
                value: '14'
            },
            {
                name: 'Ngoài giờ',
                selectedOption: '>=',
                value: '15'
            }
        
        ]
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
                            <tr className="bg-gray-300">
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
                                <tr className="border-b py-2">
                                    <td>

                                    </td>

                                    <td>
                                        <textarea 
                                        className="w-full border px-2 py-1 min-h-20 outline-none"
                                        readOnly={true}
                                        >{kpi.nd}</textarea>
                                    </td>
                                    <td>
                                        <textarea className="w-full h-full border px-2 py-1 min-h-24 outline-none">{kpi.ct}</textarea>
                                    </td>
                                    <td>
                                        <div className="p-4 border">
                                            {kpi.dk.map((ele) =>
                                                <div className="flex gap-2">
                                                    <div>{ele.name}</div>
                                                    <div>{ele.selectedOption}</div>
                                                    <div>{ele.value}</div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                    <div className="p-4 border">
                                            {kpi.dk.map((ele) =>
                                                <div className="flex gap-2">
                                                    <div>{ele.name}</div>
                                                    <div>=</div>
                                                    <input type="number" className="border w-14 px-2 py-0.5 outline-none"></input>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <select className="border px-2 py-1 bg-blue-200 rounded-md">
                                            <option>Đạt</option>
                                            <option>Không Đạt</option>
                                        </select>
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