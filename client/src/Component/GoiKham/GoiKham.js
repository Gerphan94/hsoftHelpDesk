import React, { useState } from "react";
import { RiSearch2Line, RiAlignJustify  } from "react-icons/ri";
import DSgoi from "./GoiKhamDSModal";

function GoiKham({ site }) {

    const apiURL = process.env.REACT_APP_API_URL;


    const [pid, setPid] = useState(null);
    const [goiList, setGoiList] = useState([]);
    const [goiChitiet, setGoiChitiet] = useState([]);

    const [isSLSD, setIsSLSD] = useState(false);

    const [modalShow, setModalShow] = useState(false);



    const handleChange = (e) => {
        e.preventDefault();
        const numericValue = e.target.value.replace(/[^0-9]/g, "");
        setPid(numericValue);

    }

    const handleView = async () => {
        try {
            const fecthURL = apiURL + "goikham/" + site + "/" + pid;

            const response = await fetch(fecthURL);
            const data = await response.json();
            setGoiList(data);
            setGoiChitiet([]);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleDetailView = async (idgoi) => {
        console.log(idgoi);
        setGoiChitiet([]);
        try {
            const fecthURL = apiURL + "goikham_chitiet/" + site + "/" + idgoi;
            console.log(fecthURL);
            const response = await fetch(fecthURL);
            const data = await response.json();
            console.log(data);
            setGoiChitiet(data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleLabelClick = () => {
        setIsSLSD(!isSLSD);
    }


    return (
        <>
            <div className="p-4">
                <div className="text-left font-bold text-xl py-4">GÓI KHÁM</div>
                <div className="text-left flex gap-4 items-center">
                    <button 
                    className="w-8 h-8 text-2xl flex items-center justify-center"
                    onClick={() => setModalShow(true)}
                    
                    ><RiAlignJustify /></button>
                    <label>Mã BN:</label>
                    <div className="flex">
                        <input
                            name="inputPid"
                            type="text"
                            className="border px-2 py-1 outline-none h-8 "
                            placeholder="Nhập PID"
                            value={pid}
                            onChange={handleChange}
                        />
                        <button className="bg-blue-400 h-8 w-8 flex items-center justify-center" onClick={() => handleView()}>
                            <RiSearch2Line className="h-full text-white font-bold" />
                        </button>
                    </div>

                    <div className="text-lg font-bold">Họ và tên</div>

                    <div className="flex gap-2">
                        <input id="cdSLSD" name="cbSLSD" type="checkbox" checked={isSLSD}/>
                        <label htmlFor="cbSLSD" className="select-none cursor-pointer" onClick={handleLabelClick} >Số lượng sử dụng</label>
                    </div>

                </div>
            </div>
            
            <div className="flex p-4">
            {modalShow && 
                        <DSgoi setModalShow={setModalShow} />

            }
                <div className="w-1/4">
                    <div className="px-2 py-1.5 bg-gray-200 mb-2 text-left font-bold">Danh sách gói</div>
                    {goiList.map((goi) =>
                        <div
                            key={goi.id}
                            className="border rounded-lg bg-gray-200 px-2 py-1 cursor-pointer text-left mb-4"
                            onClick={() => handleDetailView(goi.id)}
                        >
                            <div className="text-sm italic">{goi.ngay} - {goi.id}
                            </div>
                            <div className="font-bold">
                                {goi.idgoi} - {goi.tengoi}
                            </div>
                            <div className="flex gap-10">
                                <div className="text-red-600 font-bold">
                                    {Number(goi.sotien).toLocaleString()}
                                </div>
                                {goi.idtt !== '0' ?
                                    <div>Đã tạm ứng</div> : <div>Chưa tạm ứng</div>
                                }
                            </div>
                        </div>
                    )}


                </div>
                <div className="mt-0 px-4 w-full lg:h-[720px] overflow-y-auto" >
                    <table className="w-full">
                        <thead className="sticky top-0">
                            <tr className="bg-gray-200 ">
                                <th><div className="w-10 py-1">STT</div></th>
                                <th><div className="">Mã</div></th>
                                <th><div>Tên dịch vụ</div></th>

                                <th><div>Đơn giá</div></th>
                                <th><div>Đơn giá gói</div></th>
                                <th><div className="w-10 text-center">SL</div></th>
                                <th><div className="w-10 text-center">SLSD</div></th>
                            </tr>

                        </thead>
                        <tbody>
                            {goiChitiet.map((chitiet) =>
                                <tr key={chitiet.stt} className="even:bg-gray-200"  >
                                    <td><div>{chitiet.stt}</div></td>
                                    <td><div>{chitiet.mavp}</div></td>
                                    <td><div className="text-left">{chitiet.ten}</div></td>
                                    <td><div className="text-right">{Number(chitiet.dongia).toLocaleString()}</div></td>
                                    <td><div className="text-right">{Number(chitiet.dongiagoi).toLocaleString()  }</div></td>
                                    <td><div className="text-center">{chitiet.sl}</div></td>
                                    <td><div className="text-center">{chitiet.slsudung}</div></td>
                                </tr>
                            )}
                        </tbody>
                    </table>


                </div>

            </div>
            
            



        </>
    )

}

export default GoiKham;