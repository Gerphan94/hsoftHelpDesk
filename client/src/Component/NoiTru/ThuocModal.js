import React, { useEffect, useState } from "react";
import styles from "../styles.module.css"
import { RiFile3Line, RiFileTransferLine } from "react-icons/ri";
import { RiFileChart2Line } from "react-icons/ri";
import { FaRegSquareCheck } from "react-icons/fa6";
import { LuFolderCheck } from "react-icons/lu";
import { BsFillSendFill } from "react-icons/bs";
import { RiNumbersFill } from "react-icons/ri";
import { IoCheckbox } from "react-icons/io5";


function ThuocModal({ site, setModalShow, selectedIdKhoaOfPatinent }) {

    const title = 'THUỐC';

    const apiURL = process.env.REACT_APP_API_URL;

    const [dutrull, setDutrull] = useState([]);


    const fetchDutrull = async () => {

        const fetchUrl = apiURL + "noitru/dutrull_ofBN_inHiendien/" + site + "/" + selectedIdKhoaOfPatinent
        console.log(fetchUrl)
        const response = await fetch(fetchUrl);
        const data = await response.json();
        console.log(data)
        setDutrull(data);
    }

    useEffect(() => {
        fetchDutrull();
    }, [selectedIdKhoaOfPatinent]);


    const onClickReload = () => {
        fetchDutrull();
    }



    return (
        <>
            <div>
                <div className="fixed inset-0 z-50 outline-none focus:outline-none p-14 w-screen h-screen ">
                    <div className="relative w-full h-full  mx-auto bg-white">
                        <div className="h-full flex flex-col justify-between">
                            {/* HEADER */}
                            <div className="text-left text-lg font-bold border-b-black w-full px-4 py-3 bg-[#9BB0C1]">
                                {title}
                            </div>

                            {/* BODY */}
                            <div className="flex h-full p-4 overflow-hidden ">
                                <div className="w-1/3 flex-grow h-full text-left overflow-y-auto ">
                                    <div className="p-2">
                                        {dutrull.map((item) => (
                                            <div className="py-4">
                                                <div className={`relative border rounded-md p-2 hover:bg-[#EEEDEB] ${item.loai}`}>
                                                    <span className={`absolute top-[-18px] left-1 text-xs border rounded-xl px-2 py-0.5 text-[#fff] ${item.loai === 1 && item.xuatvien === 0 ? 'bg-[#667BC6]' : item.loai === 1 && item.xuatvien === 1 ? 'bg-[#379777]' : 'bg-[#E68369]'}`}>
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
                                                                    <BsFillSendFill className="text-[#4535C1]"  />
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

                                        ))}
                                    </div>

                                </div>
                                <div className="w-2/3 h-full">
                                    <div className="mt-2 px-4 w-full lg:h-[720px] overflow-y-auto" >
                                        <table className="w-full">
                                            <thead className="sticky top-0">
                                                <tr className="bg-gray-200 ">
                                                    <th></th>
                                                    <th className="text-center"><div className=" py-1 text-center">STT</div></th>
                                                    <th className=""><div className="">PID</div></th>
                                                    <th className=""><div>Họ tên</div></th>
                                                    <th><div>Năm sinh</div></th>
                                                    <th><div className="text-center">Ngày VV</div></th>
                                                    <th><div className="text-center">Ngày VK</div></th>
                                                    <th><div>Đối tượng</div></th>
                                                    <th><div className="text-center">BHYT</div></th>
                                                    <th><div className="text-center">Số ngày ĐT</div></th>
                                                    <th><div className="text-center">...</div></th>
                                                </tr>

                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                            {/* FOOTER  */}
                            <div className="w-full flex gap-4 items-center justify-end px-4 py-3 bg-[#f5f5f5] relative">
                                <button
                                    className={`${styles.btn} ${styles.btnNew}`}
                                    onClick={onClickReload}
                                >
                                    Xem
                                </button>

                                <button
                                    className={`${styles.btn} ${styles.btnClose}`}
                                    type="button"
                                    onClick={() => setModalShow(false)}
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>



                    </div>
                </div>
                <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
            </div>
        </>
    )
}

export default ThuocModal;

