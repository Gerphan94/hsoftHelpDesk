import React, { useEffect, useState } from "react";
import { RiFile3Line, RiFileTransferLine } from "react-icons/ri";
import { RiFileChart2Line } from "react-icons/ri";
import { FaRegSquareCheck } from "react-icons/fa6";
import { LuFolderCheck } from "react-icons/lu";
import { BsFillSendFill } from "react-icons/bs";
import { RiNumbersFill } from "react-icons/ri";
import { IoCheckbox } from "react-icons/io5";

function CouponComponent({ item, selectedCoupon, setSelectedCoupon }) {

    const [bgColor, setBgColor] = useState('')
    console.log('Rending Coupon Component...')
    const [color, setColor] = useState({
        'bg': '',
        'border': ''
    })
    useEffect(() => {
        if (item.loai === 1 && item.xuatvien === 0) {
            setColor({
                'bg': 'bg-[#379777]',
                'border': 'border-[#379777]'

            })
        } else if (item.loai === 1 && item.xuatvien === 1) {
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

    return (
        <>
            <div className="py-4">
                <div
                    className={`relative border rounded-md p-2 hover:bg-[#EEEDEB] cursor-pointer ${item.id === selectedCoupon ? color.border : ''} ${item.id === selectedCoupon ? 'bg-[#EEEDEB]' : ''}`}
                    onClick={() => setSelectedCoupon(item.id)}
                >
                    <span className={`absolute top-[-18px] left-1 text-xs border rounded-xl px-2 py-0.5 text-[#fff] ${color.bg}`}>
                        {item.loai === 1 && item.xuatvien === 0 ? "Phiếu lĩnh thường quy"

                            : item.loai === 1 && item.xuatvien === 1 ? "Toa thuốc ra viện" :
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