import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown";

function NoiTru({ site }) {

    const apiURL = process.env.REACT_APP_API_URL;

    const [khoas, setKhoas] = useState([]);
    const [selectedKhoa, setSelectedKhoa] = useState({ id: 0, name: '' });
    const [hiendiens, setHiendiens] = useState([]);


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



    useEffect(() => {
        const gethiendien = async () => {
            try {
                const fecthURL = apiURL + "/noitru/hiendien/" + site + "/" + selectedKhoa.id;
                const response = await fetch(fecthURL);
                const data = await response.json();
                setHiendiens(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        gethiendien();
    }, [selectedKhoa.id]);

    return (
        <>
            <div className="flex p-2 gap-2 items-center">
                <label className="font-bold">Khoa: </label>
                <div className="w-[600px]">
                    <Dropdown data={khoas} setSelectedOption={setSelectedKhoa} />
                </div>
                <div className="h-full">
                    

                </div>


            </div>
            <div className="px-4 flex flex-row-reverse">
                {funcBTN.map((ele, index) => (
                    <div key={index}>
                        <button className="w-20 border px-2 py-1 select-none">{ele.name}</button>
                    </div>
                ))}

            </div>
            <div>
                <div className="mt-2 px-4 w-full lg:h-[720px] overflow-y-auto" >
                    <table className="w-full">
                        <thead className="sticky top-0">
                            <tr className="bg-gray-200 ">
                                <th className="text-center"><div className=" py-1 text-center">STT</div></th>
                                <th className=""><div className="">PID</div></th>
                                <th className=""><div>Họ tên</div></th>
                                <th><div className="text-center w-20">Giới tính</div></th>
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

                                <tr key={index}>
                                    {console.log(ele.ngayvv)}
                                    <td className="text-center"><div className=" py-1 text-center">{index + 1}</div></td>
                                    <td><div className="text-left">{ele.mabn}</div></td>
                                    <td><div className="text-left">{ele.hoten}</div></td>
                                    <td><div className="text-center">{ele.phai === 0 ? 'Nam' : 'Nữ'}</div></td>
                                    <td><div className="text-center">{ele.namsinh}</div></td>
                                    <td><div className="text-center">{ele.ngayvv}</div></td>
                                    <td><div className="text-center">{ele.ngayvk}</div></td>
                                    <td><div className="">{ele.doituong}</div></td>
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

export default NoiTru;