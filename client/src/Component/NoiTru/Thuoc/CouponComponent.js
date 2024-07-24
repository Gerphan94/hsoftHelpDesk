import React, { useEffect, useState } from "react";
import { RiFile3Line, RiFileTransferLine } from "react-icons/ri";

import { BsFillSendFill } from "react-icons/bs";
import { RiNumbersFill } from "react-icons/ri";
import { IoCheckbox } from "react-icons/io5";

function CouponComponent({ item, selectedCouponID, setSelectedCouponID, setSelectedCouponType, setMedicineDetail }) {

    const apiURL = process.env.REACT_APP_API_URL;

    const [color, setColor] = useState({
        'bg': '',
        'border': ''
    })
    useEffect(() => {
        if (item.loaiphieu === 1) {
            setColor({
                'bg': 'bg-[#379777]',
                'border': 'border-[#379777]'
            })
        } else if (item.loaiphieu === 3) {
            setColor({
                'bg': 'bg-[#667BC6]',
                'border': 'border-[#667BC6]'
            })
        } else {
            setColor({
                'bg': 'bg-[#E76F51]',
                'border': 'border-[#E76F51]'
            })
        }

    }, [item])


    const fetchMedidicineDetail = async (id) => {
        const response = await fetch(`${apiURL}/api/medicines/${id}`);
        const data = await response.json();
        setMedicineDetail(data)
    }


    const onClick = (id, type) => {
        console.log(id, type)
        setSelectedCouponType(type);
        setSelectedCouponID(id)
    }
    return (
        <>
            <div className="py-4">
                <div
                    className={`relative border rounded-md p-2 hover:bg-[#EEEDEB] cursor-pointer ${item.id === selectedCouponID ? color.border : ''} ${item.id === selectedCouponID ? 'bg-[#EEEDEB]' : ''}`}
                    onClick={() => onClick(item.id, item.loaiphieu)}
                >
                    <span className={`absolute top-[-18px] left-1 text-xs border rounded-xl px-2 py-0.5 text-[#fff] ${color.bg}`}>
                        {item.loaiphieu === 1 ? "Phiếu lĩnh thường quy"
                            : item.loaiphieu === 3 ? "Toa thuốc ra viện" :
                                "Xuất tủ trực"
                        }
                    </span>
                    <div className="flex justify-between ">
                        <div className="flex gap-2 items-center">
                            {
                                item.done === 0 ? (
                                    <RiFile3Line />
                                ) : item.done === 1 ? (
                                    <BsFillSendFill className="text-[#4535C1]" />
                                ) : item.done === 2 ? (
                                    <IoCheckbox className="text-[#379777]" />
                                ) : (
                                    <RiNumbersFill />
                                )
                            }
                            <div className="text-left">{item.tenphieu}</div>
                        </div>
                        <div className="italic text-sm">{item.ngaytao} {item.giotao}</div>
                    </div>
                </div>


            </div>
        </>
    )

}
export default CouponComponent;