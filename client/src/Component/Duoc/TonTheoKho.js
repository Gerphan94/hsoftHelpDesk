import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import ViewButton from "../Button/ViewButton";
import { CiPill } from "react-icons/ci";
import PharmarDetailModal from "./PharmarDetailModal";

function TonTheoKho({ site }) {

    const apiURL = process.env.REACT_APP_API_URL;

    const [khoList, setKhoList] = useState([]);
    const [selectedOption, setSelectedOption] = useState({ id: 0, name: '' });
    const [pharmars, setPharmars] = useState([]);
    const [selectedPharmarId, setSelectedPharmarId] = useState(0);
    const [isShowModal, setIsShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [viewDatas, setViewDatas] = useState([]);


    useEffect(() => async () => {
        try {
            const fecthURL = apiURL + "/duoc/tonkho/theokho/dskho/" + site;
            const response = await fetch(fecthURL);
            const data = await response.json();
            setKhoList(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }, []);



    const getPharmars = async () => {
        try {
            const fecthURL = apiURL + "duoc/tonkho/theokho/" + site + "/" + selectedOption.id;
            console.log(fecthURL)
            const response = await fetch(fecthURL);
            const data = await response.json();
            setPharmars(data);
            if (searchTerm === '') {
                setViewDatas(pharmars);
            }
            else {
                const filedata = pharmars.filter((item) =>
                    item.mabd.toLowerCase().includes(searchTerm.toLowerCase()) || item.tenbd.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setViewDatas(filedata);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }
    const onClick = () => {
        if (selectedOption.id === 0) {
            return;
        }
        getPharmars();
    }

    useEffect(() => {
        getPharmars();

    }, [selectedOption]);


    const onClickPharmar = (pharmarid) => {
        setSelectedPharmarId(pharmarid);
        setIsShowModal(true);
    }

    // Search
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        if (event.target.value === '') {
            setViewDatas(pharmars);
        }
        else {
            const filedata = pharmars.filter((item) =>
                item.mabd.toLowerCase().includes(event.target.value.toLowerCase()) || item.tenbd.toLowerCase().includes(event.target.value.toLowerCase())
            );
            setViewDatas(filedata);
        }
    };


    // /duoc/tonkho/theokho/dskho/<site>
    return (
        <div className="p-4">

            <div className="flex items-center gap-2">
                <label className="font-bold">Kho: </label>
                <div className="w-96">
                    <Dropdown data={khoList} setSelectedOption={setSelectedOption} />

                </div>
                <ViewButton onClick={onClick} />
                <input
                    type="text"
                    className="border w-56 px-2 py-1 outline-none"
                    placeholder="Nhập mã, tên, ..."
                    value={searchTerm}
                    spellCheck="false"
                    onChange={handleSearch}
                />
            </div>

            {/* Table */}
            <div>
                <div className="mt-2 w-full lg:h-[720px] overflow-y-auto" >
                    <table className="w-full">
                        <thead className="sticky top-0">
                            <tr className="bg-gray-200 ">

                                <th className="text-center"><div className="py-1 text-center">STT</div></th>
                                <th className="w-24"><div className="">Mã BD</div></th>
                                <th className="w-[600px]"><div>Tên BD</div></th>
                                <th><div className="text-left w-20">DVT-DVD</div></th>
                                <th><div>Đường dùng</div></th>
                                <th><div className="text-right">BHYT</div></th>
                                <th><div className="text-right w-20">Tồn thực</div></th>
                                <th><div className="w-20">SL YC</div></th>
                                <th><div className="text-center w-20">SLKD</div></th>
                                <th><div className="text-center w-20">TồnBH</div></th>
                            </tr>
                        </thead>
                        <tbody>

                            {viewDatas.map((item, index) => (
                                <tr key={item.mabd} className="even:bg-gray-100 hover:bg-blue-200">

                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-left">{item.mabd}</td>
                                    <td
                                        className="text-left hover:underline hover:text-blue-600"
                                        onClick={() => onClickPharmar(item.id)}
                                    >{item.tenbd}</td>
                                    <td className="text-left">{item.dvt} - {item.dvd}</td>
                                    <td className="">{item.duongdung}</td>
                                    <td className="text-center">{item.bhyt}</td>
                                    <td className="text-right">{item.tonthuc}</td>
                                    <td className="">{item.booking}</td>
                                    <td className="text-center">{item.tonkhadung}</td>
                                    <td></td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

            </div>

            {isShowModal && <PharmarDetailModal site={site} pharmarId={selectedPharmarId} setModalShow={setIsShowModal} />}

        </div>
    );
}
export default TonTheoKho;