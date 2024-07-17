import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import ViewButton from "../Button/ViewButton";
import { AiOutlineMan, AiOutlineWoman } from "react-icons/ai";
import TouchSwitch from "../TouchSwitch";

import ButtonMenu from "../ButtonMenu";



function Hiendien ({ site, setSelectedPatient, setSelectedIdKhoaOfPatinent }) {
    const apiURL = process.env.REACT_APP_API_URL;

    const [khoas, setKhoas] = useState([]);
    const [selectedKhoa, setSelectedKhoa] = useState({ id: 0, name: '' });
    const [hiendiens, setHiendiens] = useState([]);
    const [selectedFunc, setSelectedFunc] = useState({id: '', name:''});

    const funcs = [
        { id: 'thuoc', name: 'Thuốc' },
        { id: 'dichvu', name: 'Dịch vụ' }
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
        console.log("Fetching data...");
        try {
            const fecthURL = apiURL + "noitru/hiendien/" + site + "/" + selectedKhoa.id;
            console.log(fecthURL)
            const response = await fetch(fecthURL);
            const data = await response.json();
            setHiendiens(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        gethiendien();
    }, [selectedKhoa]);


    const onClickPid = (pid, name, idkhoa) => {
        setSelectedPatient({'pid': pid, 'name': name});
        setSelectedIdKhoaOfPatinent(idkhoa);
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

            </div>
           
            <div>
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
                            {hiendiens.map((ele, index) => (

                                <tr
                                    key={index}
                                    className="even:bg-gray-100 hover:bg-blue-200"
                                    onClick={() => onClickPid(ele.mabn, ele.hoten, ele.id.toString())}
                                >
                                    <td>
                                        <div className="w-6">
                                        <ButtonMenu data={funcs}  />
                                        </div>
                                       
                                    </td>
                                    <td className="text-center"><div className=" py-1 text-center">{index + 1}</div></td>
                                    <td><div className="text-left hover:underline hover:text-blue-500 cursor-pointer">{ele.mabn} - {ele.id}</div></td>
                                    <td><div className="flex gap-2 items-center">
                                        {ele.phai === 0 ? <AiOutlineMan className="text-blue-500" /> : <AiOutlineWoman className="text-pink-500" />}
                                        {ele.hoten}</div></td>
                                    <td><div className="text-center">{ele.namsinh}</div></td>
                                    <td><div className="text-right">{ele.ngayvv}</div></td>
                                    <td><div className="text-right">{ele.ngayvk}</div></td>
                                    <td><div className="text-left px-2">{ele.doituong}</div></td>
                                    <td><div className="">{ele.sothe}</div></td>
                                    <td><div className="">{ele.songaydt}</div></td>
                                    <td><div className="">{ele.ghichu}</div></td>
                                </tr>))}

                        </tbody>
                    </table>
                </div>

            </div>


        </>
    );
}

export default Hiendien;