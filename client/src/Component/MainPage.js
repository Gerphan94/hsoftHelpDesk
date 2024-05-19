import React, { useState } from "react";

import Inpatient from "./Inpatient";
import HoSoBA from "./HoSo/HoSoBA";
import KhamBenh from "./KhamBenh/KhamBenh";
import DatKham from "./DatKham/DatKham";
import SQLCol from "./SQL/SQLCollection";
import DanhMuc from "./DanhMuc/DanhMuc";
import Duoc from "./Duoc/Duoc";

import KPI from "./KPI/KPI";
import styles from "./styles.module.css"
import Select from 'react-select'

import Navbar from "./navBar";

function MainPage() {

    const funcs = [
        { id: 'hosobenhan', name: 'Hồ sơ bệnh án' },
        { id: 1, name: 'Hiện diện BN' },
        { id: 'khambenh', name: 'Khám bệnh' },
        { id: 'datkham', name: "Đặt khám" },
        { id: 'duoc', name: "Dược" },
        { id: 'danhmuc', name: "Danh mục" },
        { id: 'sql', name: 'SQL' },
        { id: 999, name: "KPI" }
    ];

    const [site, setSite] = useState('HCM_DEV')
    const [selectedFunc, setSelectedFunc] = useState(1);

    const [module, setModule] = useState();

    const handleChangeEnv = (event) => {
        console.log(event.target.value);
        setSite(event.target.value);
    }

    return (
        <>
            <div className={styles.bodyPage}>
                <div className="flex">
                    <div className="w-40 mt-4 border-r-2">
                        <div className="text-left p-2">
                            <select className="bg-gray-300 border w-full px-2 py-1 rounded-md" value={site} onChange={handleChangeEnv}>
                                <option value="HCM_DEV">HCM - DEV</option>
                                <option value="HN_DEV">HN - Dev</option>
                                <option value="HN_LIVE">HN - Live</option>
                            </select>
                        </div>
                        {funcs.map((func, index) => (
                            <button
                                key={index}
                                className={`block py-2 w-full text-left px-4 border-b ${func.id === selectedFunc ? 'bg-blue-200' : ''}`}
                                onClick={() => setSelectedFunc(func.id)}

                            >{func.name}</button>
                        )
                        )}

                    </div>
                    <div className={styles.MainPage}>
                        {selectedFunc === 'hosobenhan' &&
                            <HoSoBA site={site} />
                        }


                        {selectedFunc === 1 &&
                            <Inpatient site={site} />

                        }
                        {selectedFunc === 'khambenh' &&
                            <KhamBenh site={site} />

                        }
                        {selectedFunc === 'datkham' &&
                            <DatKham site={site} />
                        }

                        {selectedFunc === 'duoc' &&
                            <Duoc site={site} />
                        }

                        {selectedFunc === 'danhmuc' &&
                            <DanhMuc />
                        }

                        {selectedFunc === 99 &&
                            <SQLCol />
                        }

                        {selectedFunc === 999 &&
                            <KPI />
                        }
                    </div>



                    <div>
                    </div>
                </div>

                <div>

                </div>



            </div>
            {/* FOOTER */}
            <div className={`w-full h-4 ${site === 'HCM_DEV' || site === 'HN_DEV' ? "bg-red-500" : "bg-green-500"}  `} ></div>


        </>

    )
}
export default MainPage;