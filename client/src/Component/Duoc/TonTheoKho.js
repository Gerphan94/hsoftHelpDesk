import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import ViewButton from "../Button/ViewButton";

function TonTheoKho({ site }) {

    const apiURL = process.env.REACT_APP_API_URL;

    const [khoList, setKhoList] = useState([]);
    const [selectedOption, setSelectedOption] = useState({id:0, name:''});
    const [pharmars, setPharmars] = useState([]);

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


    // /duoc/tonkho/theokho/dskho/<site>
    return (
        <div className="p-4">

            <div className="flex items-center gap-2 w-96">
                <label className="font-bold">Kho: </label>
                <Dropdown data={khoList} setSelectedOption={setSelectedOption} />
                <ViewButton onClick={onClick} />
            </div>

            {/* Table */}
            <div>
                <div className="mt-2 w-full lg:h-[720px] overflow-y-auto" >
                    <table className="w-full">
                        <thead className="sticky top-0">
                            <tr className="bg-gray-200 ">
                                <th><div></div></th>
                                <th className="text-center"><div className="py-1 text-center">STT</div></th>
                                <th className="w-24"><div className="">Mã BD</div></th>
                                <th className="w-[600px]"><div>Tên BD</div></th>
                                <th><div className="text-left w-20">DVT-DVD</div></th>
                                <th><div>Đường dùng</div></th>
                                <th><div className="text-right">BHYT</div></th>
                                <th><div className="text-right">Tồn thực</div></th>
                                <th><div>SL YC</div></th>
                                <th><div className="w-10 text-center">SLKD</div></th>
                                <th><div className="w-10 text-center">TồnBH</div></th>
                                <th><div className="w-10 text-center">...</div></th>
                            </tr>

                        </thead>
                        <tbody>

                            {pharmars.map((item, index) => (                                
                                <tr key={item.mabd}>
                                    <td><div>...</div></td>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{item.mabd}</td>
                                    <td className="text-left">{item.tenbd}</td>
                                    <td className="text-left">{item.dvt} - {item.dvd}</td>
                                    <td className="">{item.duongdung}</td>   
                                    <td className="text-center">{item.bhyt}</td>
                                    <td className="text-right">{item.tonthuc}</td>
                                    <td className="">{item.slyeucau}</td>
                                    <td className="text-center">{item.slketoan}</td>
                                    <td className="text-center">{item.tonban}</td>
                                    </tr>
                            ))}      

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
export default TonTheoKho;