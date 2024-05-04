import React, { useState, useEffect } from "react";
import DKDat from "./Dieukiendat";
import { MdDelete } from "react-icons/md";
import { NumericFormat } from 'react-number-format';
import { IoMdAddCircle } from "react-icons/io";

function KPI() {

    const opts = ["<", "<=", "=", ">=", ">"]

    const [kpis, setKPIS] = useState([
        {
            "noidung": "Đạt số lượng tổng Khách hàng khám trung bình một ngày \ntheo quy định bệnh viện (A)",
            "cachthuc": "Tử số: Tổng số lượng khách hàng đến khám tại \nKhoa Khám Bệnh trong 1 tháng của BS \nMẫu số: Tổng số ngày làm việc của BS trong tháng",
            "dieukien": [{
                name: 'Khám ngày Thường',
                selectedOption: '>=',
                value: 20
            },
            {
                name: 'Ngày chủ nhật',
                selectedOption: '>=',
                value: 14
            },
            {
                name: 'Ngoài giờ',
                selectedOption: '>=',
                value: 15
            }

            ],
            "ketqua": [{
                name: 'Khám ngày Thường',
                selectedOption: '',
                value: null
            },
            {
                name: 'Ngày chủ nhật',
                selectedOption: '',
                value: null
            },
            {
                name: 'Ngoài giờ',
                selectedOption: '',
                value: null
            }
            ], "trangthai": 0
        },
        {
            "noidung": "Tỉ lệ hài lòng của khách hàng dành cho Bệnh viện",
            "cachthuc": "Tử số: Số lượng khách hàng được khảo sát đánh giá hài lòng khi đến khám tại bệnh viện Tâm Anh\nTổng số lượng khách hàng được khảo sát",
            "dieukien": [{
                name: '',
                selectedOption: '>=',
                value: 94
            }


            ],
            "ketqua": [{
                name: '',
                selectedOption: '',
                value: null

            }
            ], "trangthai": 0
        }
    ]);

    const [formData, setFormData] = useState({
        "noidung": '',
        "cachthuc": '',
        "dieukien": [],
        "ketqua": [],
        "trangthai": 0

    });




    const [textareaHeight, setTextareaHeight] = useState('auto');

    const handleTextareaChange = (e) => {
        // Set textarea height based on its content
        setTextareaHeight(`${e.target.scrollHeight}px`);
    };

    useEffect(() => {

    });

    const [number, setNumber] = useState(1);
    const [dkData, setDkData] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAdd = () => {
        const newData = {
            "noidung": formData.noidung,
            "cachthuc": formData.cachthuc,
            "dieukien": [],
            "ketqua": [],
            "trangthai": 0
        }
        setKPIS(prevData => [...prevData, newData]);

        setFormData({
            noidung: '',
            cachthuc: '',
            dieukien: []
        })
        // Perform further actions with the data as needed
    };


    return (
        <>
            <div>KPI</div>
            <form onSubmit={(e) => handleAdd(e)}>
                <div className="grid grid-cols-3 w-full p-4">
                    <div className="text-left w-full p-4">
                        <label className="font-bold">Nội dung đánh giá</label>
                        <textarea
                            name="noidung"
                            value={formData.noidung}
                            onChange={handleChange}
                            className="border outline-none p-2 block w-full mt-2" rows={3}
                            required={true}
                        />

                    </div>
                    <div className="text-left p-4">
                        <label className="font-bold" >Cách thức đo lường</label>
                        <textarea
                            name="cachthuc"
                            className="border outline-none p-2 block w-full mt-2" rows={3}
                            value={formData.cachthuc}
                            onChange={handleChange}
                            required={true}

                        />
                    </div>
                    <div className="text-left p-4">
                        <label className="font-bold" >Điều kiện đạt</label>
                        <div className="mt-2">
                            <DKDat dkData={dkData} setDkData={setDkData} />
                        </div>
                    </div>
                    <div className="flex">
                        <button
                            className="w-24 px-2 py-1 bg-blue-500 text-white hover:bg-blue-600"
                            type="submit"
                        >Thêm</button>
                    </div>

                </div>
            </form>

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
                            {kpis.length > 0 && kpis.map((kpi, index) =>
                                <tr className="border-b py-2">
                                    <td>
                                        <div className="flex justify-center items-center flex-col">
                                            <button className="block text-xl text-red-500"><MdDelete /></button>
                                        </div>
                                    </td>

                                    <td className="p-2">
                                        <textarea
                                            className="h-auto min-h-[120px] resize-none w-full border p-2"
                                            style={{ height: textareaHeight }}
                                            onChange={handleTextareaChange}
                                        >{kpi.noidung}</textarea>
                                    </td>
                                    <td className="p-2">
                                        <textarea
                                            className="h-auto min-h-[120px] resize-none w-full border p-2"
                                            style={{ height: textareaHeight }}
                                            onChange={handleTextareaChange}
                                        >{kpi.cachthuc}</textarea>
                                    </td>
                                    <td className="p-2">
                                        <div className="h-auto min-h-[120px] resize-none w-full border p-2"
                                            style={{ height: textareaHeight }}>
                                            {kpi.dieukien.map((ele) =>
                                                <div className="flex gap-2 mb-1">
                                                    <div className="flex justify-center items-center text-red-600"><MdDelete /></div>
                                                    <div className="w-1/2 text-left border px-2 py-1">{ele.name}</div>
                                                   
                                                        <select className="border outline-none">
                                                            {opts.map((opt, index) => (
                                                                <option key={index} value={opt}>{opt}</option>
                                                            ))}
                                                        </select>


                                                    
                                                    <input 
                                                    className="w-1/4 border px-2 py-1 outline-none" 
                                                    type="number"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex">
                                                <button className=" text-blue-500">
                                                    <IoMdAddCircle />
                                                </button>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        <div className="p-4 border min-h-28">
                                            {kpi.ketqua.map((ele) =>
                                                <div className="flex gap-2 mb-1">


                                                    <input
                                                        type="number"
                                                        className="w-full border outline-none  bg-orange-100 px-2 py-1"

                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="border min-h-28 flex justify-center items-center ">
                                            <select className="border px-2 py-1 bg-blue-200 rounded-md">
                                                <option className="bg-white py-2"></option>
                                                <option className="bg-white py-2">Đạt</option>
                                                <option className="bg-white py-2">Không Đạt</option>
                                            </select>
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