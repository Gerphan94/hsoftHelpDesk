import React from "react";
import { FaBottleDroplet } from "react-icons/fa6";
import { CiPill } from "react-icons/ci";
import { TbCircleLetterK } from "react-icons/tb";



function Table({ data }) {

    const onClickPharmar = (pharmarid) => {

    }

    return (
        <>
            <div className="mt-2 w-full lg:h-[720px] overflow-y-auto" >
                <table className="w-full">
                    <thead className="sticky top-0 z-80">
                        <tr className="bg-gray-200">
                            <th></th>

                            <th className="text-center w-10"><div className="py-1 text-center">STT</div></th>
                            <th className="w-24"><div className="">Mã BD</div></th>
                            <th className="w-[600px]"><div>Tên BD</div></th>
                            <th><div className="text-left w-20">DVT-DVD</div></th>
                            <th><div className="w-28">Đường dùng</div></th>
                            <th><div className="w-28">ATC</div></th>
                            <th><div className="text-right">BHYT</div></th>
                            <th><div className="text-right w-20">Tồn đầu</div></th>
                            <th><div className="text-right w-20">Nhập</div></th>
                            <th><div className="text-right w-20">Xuất</div></th>
                            <th><div className="text-right w-20">Tồn cuối</div></th>
                            <th><div className="text-right w-20">SLYC</div></th>
                            <th><div className="text-right w-20">SLKD</div></th>
                            <th><div className="text-center w-20">TồnBH</div></th>
                        </tr>
                    </thead>
                    <tbody>

                        {data.map((item, index) => (

                            <tr key={item.mabd} className="even:bg-gray-100 hover:bg-blue-200" >
                                <td>
                                    <div className="flex items-center gap-0.5 px-1">
                                        <button tooltip="Đa liều">
                                            {item.dalieu === 1 ?
                                                <FaBottleDroplet className="text-green-700" /> :
                                                <CiPill className="text-red-700" />
                                            }
                                        </button>
                                        <button>
                                            {item.duocbvid === 3 ?
                                                <TbCircleLetterK className="text-orange-700" /> : ''}

                                        </button>

                                    </div>
                                </td>
                                <td className="text-center">{index + 1}</td>
                                <td className="text-left">{item.mabd}</td>
                                <td
                                    className="text-left hover:underline hover:text-blue-600"
                                    onClick={() => onClickPharmar(item.id)}
                                >{item.tenbd}</td>
                                <td className="text-left">{item.dvt} - {item.dvd}</td>
                                <td>
                                    <div className="w-28 text-left truncate ...">
                                        {item.duongdung}
                                    </div>
                                </td>
                                <td className="text-center">{item.maatc}</td>
                                <td className="text-center">{item.bhyt}</td>
                                <td className="text-right">{item.tondau}</td>
                                <td className="text-right">{item.slnhap}</td>
                                <td className="text-right">{item.slxuat}</td>
                                <td className="text-right">{item.toncuoi}</td>
                                <td className="text-right">{item.slycau}</td>
                                <td className="text-right">{item.tonkhadung}</td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    )


}
export default Table;