import React, { useEffect, useState } from "react";


import ThuocModal from "./ThuocModal";
import ThuocBenhNhan from "./ThuocBenhNhan";
import Hiendien from "./Hiendien";


function NoiTru({ site }) {

    const apiURL = process.env.REACT_APP_API_URL;

    const [selectedBTN, setSelectedBNT] = useState(1);

    const [khoas, setKhoas] = useState([]);
    const [selectedKhoa, setSelectedKhoa] = useState({ id: 0, name: '' });
    const [hiendiens, setHiendiens] = useState([]);

    const [selectedPatient, setSelectedPatient] = useState({ 'pid': '', 'name': '' });
    const [selectedIdKhoaOfPatinent, setSelectedIdKhoaOfPatinent] = useState('');

    const [isShowModalThuoc, setIsShowModalThuoc] = useState(false);

    const funcBTN = [
        { id: 'thuoc', name: 'Thuốc' },
        { id: 'dichvu,', name: 'Dịch vụ' }
    ]

    return (
        <>
            <div className="p-4 flex flex-row justify-between">
                <button
                    className="border px-2 py-1 select-none"
                    onClick={() => setIsShowModalThuoc(true)}
                >Hiện diện
                </button>

                <div className="flex gap-2 items-center text-left">
                    <div>{selectedPatient.pid}</div>
                    <div>{selectedPatient.name}</div>
                    <div>{selectedIdKhoaOfPatinent}</div>

                </div>

                <button
                    className="w-20 border px-2 py-1 select-none"
                    onClick={() => setIsShowModalThuoc(true)}
                >Thuốc
                </button>

            </div>
            {selectedBTN === 1 &&
                <Hiendien
                    site={site}
                    setSelectedPatient={setSelectedPatient}
                    setSelectedIdKhoaOfPatinent={setSelectedIdKhoaOfPatinent}
                />}
            {isShowModalThuoc &&
                <ThuocModal
                    site={site}
                    pid={selectedPatient.pid}
                    hoten={selectedPatient.name}
                    selectedIdKhoaOfPatinent={selectedIdKhoaOfPatinent}
                    setModalShow={setIsShowModalThuoc}
                />}
        </>
    );
}
export default NoiTru;