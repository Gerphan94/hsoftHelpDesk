import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import ViewButton from "../Button/ViewButton";


function GiaVP({ site }) {

    const apiURL = process.env.REACT_APP_API_URL;

    const [giavps, setGiavps] = useState([]);
    const [nhombhytys, setNhombhytys] = useState([]);

    const [nhombhyt, setNhombhyt] = useState({ id: 0, name: '' });

    const [treeLoaiVps, setTreeLoaiVps] = useState([]);
    const [showIndex, setShowIndex] = useState(0);
    const [selectedNhomBHYT, setSelectedNhomBHYT] = useState(0);
    const [selectedLoaiVP, setSelectedLoaiVP] = useState(0);

    useEffect(() => async () => {
        try {
            const fecthURL = apiURL + "/vienphi/treeloaivp/" + site;
            const response = await fetch(fecthURL);
            const data = await response.json();
            setTreeLoaiVps(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }, []);

    const handleClick1 = async (id) => {
        if (showIndex === id && selectedLoaiVP === 0) {
            setShowIndex(0);
            return
        }
        setShowIndex(id);
        setSelectedLoaiVP(0);
        setSelectedNhomBHYT(id);
        try {
            const fecthURL = apiURL + "vienphi/giavp/theonhombhyt/" + site + "/" + id;
            const response = await fetch(fecthURL);
            const data = await response.json();
            setGiavps(data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const handleClick2 = async (id) => {
        if (selectedLoaiVP === id) {
            return
        }
        setSelectedLoaiVP(id);
        try {
            const fecthURL = apiURL + "vienphi/giavp/theoloaivp/" + site + "/" + id;
            const response = await fetch(fecthURL);
            const data = await response.json();
            setGiavps(data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    return (
        <>
            <div>
                <div className="mt-2 " >
                    <div className="flex lg:h-[750px]">
                        <div className="overflow-y-scroll">
                            {treeLoaiVps.map((item) => (
                                <div className="text-left text-[#17273D] ">
                                    <div className={`px-2 py-1  hover:bg-[#667BC6] hover:border-b-white select-none ${showIndex === item.id ? 'bg-[#667BC6]' : ''}`}
                                        onClick={() => handleClick1(item.id)}>
                                        {item.name}
                                    </div>
                                    {showIndex === item.id && (
                                        <div className="border-lime-300 ml-5">
                                            {item.child.map((item1) => (
                                                <div
                                                    className={`flex justify-between px-2 py-1 select-none hover:bg-[#B6BBC4] ${selectedLoaiVP === item1.id ? 'bg-[#B6BBC4]' : ''}`}
                                                    onClick={() => handleClick2(item1.id)}
                                                >
                                                    <div>
                                                    {item1.name}
                                                        </div>
                                                    <span className="rounded-xl px-2 text-sm">{item1.total}</span>
                                                    
                                                    </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="px-4 w-full overflow-y-auto">
                            <table className=" w-full">
                                <thead className="sticky top-0 z-80">
                                    <tr className="bg-gray-200 ">
                                        <th></th>
                                        <th className="text-center w-10"><div className="py-1 text-center">STT</div></th>

                                        <th className=""><div>Tên VP</div></th>
                                        <th><div className="text-center">DVT</div></th>
                                        <th className="w-8"><div className="text-center">BHYT</div></th>
                                        <th className=""><div className="px-2 text-right">Giá TH</div></th>
                                        <th><div className="text-right">Giá BHYT</div></th>
                                        <th><div className="text-right w-20">Giá DV</div></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {giavps.map((giavp, index) => (
                                        <tr key={index} className="even:bg-gray-200">
                                            <td></td>
                                            <td className="text-center py-1">{index + 1}</td>
                                            <td className="text-left">
                                                <div className="inline-block">
                                                    <p>{giavp.ten}</p>
                                                </div>
                                            </td>
                                            <td className="text-center">{giavp.dvt}</td>
                                            <td><div className="text-center">{giavp.bhyt}</div></td>
                                            <td className="text-right px-2">{Number(giavp.giath).toLocaleString()}</td>
                                            <td className="text-right px-2"> {Number(giavp.giabh).toLocaleString()}</td>
                                            <td className="text-right px-2">{Number(giavp.giadv).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default GiaVP;