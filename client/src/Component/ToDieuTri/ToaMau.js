import React, { useState, useEffect } from "react";
import { FaBottleDroplet, FaJar } from "react-icons/fa6";
import { CiPill } from "react-icons/ci";
import { TbCircleLetterK } from "react-icons/tb";
function ToaMau({ site }) {

    const apiURL = process.env.REACT_APP_API_URL;

    const [toaMaus, setToaMaus] = useState([]);
    const [detail, setDetail] = useState([]);

    const [isShowModal, setIsShowModal] = useState(false);

    const [selectedMauId, setSelectedMauId] = React.useState(null);

    useEffect(() => async () => {
        try {
            const fecthURL = apiURL + "/todieutri/toamau/" + site;
            const response = await fetch(fecthURL);
            const data = await response.json();
            setToaMaus(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [site]);


    const handleClick = async (id) => {
        setSelectedMauId(id);
        setIsShowModal(true);
        try {
            const fecthURL = apiURL + "/todieutri/toamauCT/" + site + "/" + id;
            const response = await fetch(fecthURL);
            const data = await response.json();
            setDetail(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
            <div className="px-4 overflow-y-auto h-[750px]">
                {toaMaus.map((item, index) => (
                    <div className="mb-4">
                        <div className="flex gap-2 items-center font-bold text-[#5A639C]">
                            <div>{index + 1}</div>-
                            <div className="text-left py-1 ">{item.ten}</div>
                            <span className="border rounded-full px-3 bg-slate-200 text-sm">{item.details.length}</span>

                        </div>
                        <div className="w-full px-4">
                            <table className=" text-sm w-[1600px]">
                                <thead className="sticky top-0 z-80">
                                    <tr className="bg-gray-200 font-normal text-[#102C57] font-thick ">
                                        <th className="w-10"></th>
                                        <th className="text-center w-10"><div className="py-1 text-center">STT</div></th>
                                        <th className="text-center w-20"><div>Mã</div></th>
                                        <th className=""><div className="text-center">Tên</div></th>
                                        <th className="w-56"><div className="text-center">HC</div></th>
                                        <th className="w-10"><div className="text-center w-10">ĐVT</div></th>
                                        <th className="w-10"><div className="text-center w-10">ĐVD</div></th>
                                        <th className="w-20"><div className="text-center">S.Lần/ngày</div></th>
                                        <th className="w-20"><div className="text-center">SL/Lần</div></th>
                                        <th className="w-20"><div className="text-center">Số lượng</div></th>

                                        <th className="w-20"><div className="text-center">Tốc độ</div></th>
                                        <th className="w-20"><div className="text-center">Giờ BĐ</div></th>
                                        <th className="w-20"><div className="text-center">TG dùng</div></th>
                                        <th className="w-20"><div className="text-center">Liều dùng</div></th>
                                        <th className="w-56"><div className="text-center">Cách dùng</div></th>
                                        <th className="w-20"><div className="text-center">Ghi chú</div></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.details.map((detail, index) => (
                                        <tr key={index} className="even:bg-gray-100">
                                            <td>
                                                <div className="flex items-center gap-0.5 px-1 py-1">
                                                    <button tooltip="Đa liều">
                                                        {detail.dalieu === 1 ?
                                                            <FaBottleDroplet className="text-green-700" /> :
                                                            <CiPill className="text-red-700" />
                                                        }
                                                    </button>
                                                    <button>
                                                        {detail.nhombo === 3 ?
                                                            <TbCircleLetterK className="text-orange-700" /> : ''}
                                                    </button>
                                                </div>



                                            </td>
                                            <td className="text-center py-1">{detail.stt}</td>
                                            <td className="border-l px-2 text-left py-1">{detail.ma_mau}</td>
                                            <td className="border-l px-2 text-left">
                                                <div className="inline-block">
                                                    <p>{detail.tenbd_mau}</p>
                                                </div>
                                            </td>
                                            <td className="text-left border-l px-2">{detail.tenhc_mau}</td>
                                            <td className="border-l">{detail.dang}</td>
                                            <td className="border-l">{detail.donvidung}</td>

                                            <td>{detail.solan}</td>
                                            <td>{detail.lan}</td>
                                            <td>{detail.soluong}</td>

                                            <td>{detail.tocdo}</td>
                                            <td>{detail.giobd}</td>
                                            <td>{detail.cachnhau}</td>

                                            <td>{detail.lieudung}</td>
                                            <td className="text-left">{detail.cachdung}</td>
                                            <td className="text-left">{detail.ghichu}</td>




                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>

                    </div>


                ))}

            </div>








        </>
    )
}

export default ToaMau;