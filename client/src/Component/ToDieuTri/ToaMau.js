import React, { useState, useEffect } from "react";

import { FcFilingCabinet, FcHome, FcViewDetails } from "react-icons/fc";
import Dropdown from "../Dropdown";
import TableCheckTon from "./TableCheckTon";
import TableDetail from "./TableDetail";

import styles from "../styles.module.css";

function ToaMau({ site }) {

    const apiURL = process.env.REACT_APP_API_URL;

    const [toaMaus, setToaMaus] = useState([]);
    const [detail, setDetail] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);
    const [selectedMauId, setSelectedMauId] = useState(null);
    const [mauType, setMauType] = useState(1);
    const [khos, setKhos] = useState([]);
    const [selectedKho, setSelectedKho] = useState({ id: '', name: '' });
    const [khoas, setKhoas] = useState([]);
    const [tutrucs, setTutrucs] = useState([]);

    // /duoc/tonkho/theokho/dskho/
    const fetchMauDetail = async () => {
        try {
            const fecthURL = apiURL + "/todieutri/toamau/" + site;
            const response = await fetch(fecthURL);
            const data = await response.json();
            setToaMaus(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const fetchMauTonKho = async () => {
        try {
            const fecthURL = apiURL + "/todieutri/toamau/tonkho/" + site + "/" + selectedKho.id;
            const response = await fetch(fecthURL);
            const data = await response.json();
            setToaMaus(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => async () => {
        fetchMauDetail();
    }, [site]);

    const fetchKhoList = async () => {
        try {
            const fecthURL = apiURL + "/duoc/tonkho/theokho/dskho/" + site;
            const response = await fetch(fecthURL);
            const data = await response.json();
            setKhos(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


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
    // const handleOptionChange = (event) => {
    //     setRadioCheck(event.target.value);
    // };
    const handClickBTN = (type) => {
        setMauType(type);
        
        if (type === 1) {
            fetchMauDetail();
        }
        if (type === 2) {
            fetchKhoList();
        }
    }

    return (
        <>
            <div className=" px-3 mb-4 ">
                <div className="bg-slate-100 w-full flex gap-10">
                    <div className="flex gap-3 items-center h-[50px] px-4 py-1 select-none">
                        <button onClick={() => handClickBTN(1)}>
                            <FcViewDetails size={mauType === 1 ? 32 : 20} />
                        </button>
                        <button className="" onClick={() => handClickBTN(2)}>
                            <FcHome size={mauType === 2 ? 32 : 20} /></button>
                        <button onClick={() => handClickBTN(3)}>
                            <FcFilingCabinet size={mauType === 3 ? 32 : 20} /></button>
                    </div>
                    {mauType === 2 && (
                        <div className="flex gap-3 items-center px-4 py-1 select-none">
                            <label>Kho:</label>
                            <div className="w-96">
                                <Dropdown data={khos} setSelectedOption={setSelectedKho} placeholder="Chọn kho" />
                            </div>
                            <button
                                className={`${styles.btn} ${styles.btnNew}`}
                                onClick={fetchMauTonKho}

                            >Xem</button>
                        </div>
                    )}
                    {mauType === 3 && (
                        <div className="flex gap-3 items-center px-4 py-1 select-none">
                            <div className="flex gap-3 items-center px-4 py-1 select-none">
                                <label>Khoa:</label>
                                <div className="w-96">
                                    <Dropdown data={[]} placeholder="Chọn khoa" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>


            <div className="px-4 overflow-y-auto h-[750px]">
                {toaMaus.map((item, index) => (
                    <div className="mb-4">
                        <div className="flex gap-2 items-center font-bold text-[#5A639C]">
                            <div>{index + 1}</div>-
                            <div className="text-left py-1 ">{item.ten}</div>
                            <span className="border rounded-full px-3 bg-slate-200 text-sm">{item.details.length}</span>
                            <div className="italic text-sm">{item.bs}</div>
                        </div>
                        {mauType === 1 ? (
                            <TableDetail data={item.details} />
                        ) : (
                            <TableCheckTon data={item.details} />
                        )

                        }


                    </div>
                ))}

            </div>








        </>
    )
}

export default ToaMau;