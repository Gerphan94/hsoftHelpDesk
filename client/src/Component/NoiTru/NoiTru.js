import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import ViewButton from "../Button/ViewButton";
import TouchSwitch from "../TouchSwitch";

import ThuocModal from "./Thuoc/ThuocModal";
import DichVuModal from "./DichVu/DichVuModal";
import Hiendien from "./HiendienTable";


function NoiTru({ site }) {

    const apiURL = process.env.REACT_APP_API_URL;

    const [selectedBTN, setSelectedBNT] = useState(1);

    const [khoas, setKhoas] = useState([]);
    const [selectedKhoa, setSelectedKhoa] = useState({ id: 0, name: '' });
    const [hiendiens, setHiendiens] = useState([]);
    const [viewData, setViewData] = useState([]);

    const [selected, setSelected] = useState({ pid: '', pname: '', idkhoa: '', maql: '' });

    const [selectedIdKhoaOfPatinent, setSelectedIdKhoaOfPatinent] = useState('');

    const [isShowModalThuoc, setIsShowModalThuoc] = useState(false);
    const [isShowModalDichVu, setIsShowModalDichVu] = useState(false);


    const funcBTN = [
        { id: 'thuoc', name: 'Thuốc' },
        { id: 'dichvu,', name: 'Dịch vụ' }
    ]
    useEffect(() => async () => {
        try {
            const fecthURL = apiURL + "/noitru/dskhoa/" + site;
            const response = await fetch(fecthURL);
            const data = await response.json();
            setKhoas(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    const gethiendien = async () => {
        try {
            const fecthURL = apiURL + "noitru/hiendien/" + site + "/" + selectedKhoa.id;
            console.log(fecthURL)
            const response = await fetch(fecthURL);
            const data = await response.json();
            setHiendiens(data);
            setViewData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }




    return (
        <>

            <div className="flex p-2 gap-2 items-center">
                <label className="font-bold">Khoa: </label>
                <div className="w-[600px]">
                    <Dropdown data={khoas} selectedOption={selectedKhoa} setSelectedOption={setSelectedKhoa} />
                </div>
                <div className="h-full">
                    <ViewButton onClick={gethiendien} />
                </div>
                <TouchSwitch />
                <div>
                    <input type="text" className="border px-2 py-1 outline-none h-8 " />
                </div>

            </div>
            <div className="px-4 py-1 flex flex-row justify-between">
                <div className="flex gap-2 items-center text-left">
                    <div className="font-bold text-xl">{selected.pid}</div>
                    <div className="font-bold text-xl">{selected.pname}</div>
                </div>

                <div className="flex">
                    <button
                        className="w-20 border px-2 py-1 select-none"
                        onClick={() => setIsShowModalDichVu(true)}
                    >Dịch vụ</button>
                    <button
                        className="w-20 border px-2 py-1 select-none"
                        onClick={() => setIsShowModalThuoc(true)}
                    >Thuốc</button>
                </div>
            </div>

            {selectedBTN === 1 &&
                <Hiendien
                    site={site}
                    data={viewData}
                    selectedPid={selected.pid}
                    setSelected={setSelected}
                    setSelectedIdKhoaOfPatinent={setSelectedIdKhoaOfPatinent}
                />}
            {isShowModalThuoc &&
                <ThuocModal
                    site={site}
                    pid={selected.pid}
                    hoten={selected.name}
                    selectedIdKhoaOfPatinent={selectedIdKhoaOfPatinent}
                    setModalShow={setIsShowModalThuoc}
                />}

            {isShowModalDichVu &&
                <DichVuModal
                    site={site}
                    setModalShow={setIsShowModalDichVu}
                    selected={selected}

                />
            }
        </>
    );
}
export default NoiTru;