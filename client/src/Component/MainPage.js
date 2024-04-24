import React, { useState } from "react";

import Inpatient from "./Inpatient";
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
        { id: 1, name: 'Hiện diện BN' },
        { id: 2, name: 'Khám bệnh' },
        { id: 3, name: "Đặt khám" },
        { id: 4, name: "Dược" },
        { id: 98, name: "Danh mục" },
        { id: 99, name: 'SQL' },
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
            {site === 'HCM_DEV' ?
                <div className="w-full h-4 bg-red-500"></div> :
                <div className="w-full h-4 bg-green-600"></div>
            }
            <div className="p-2">
                <div className="text-left">
                    <select className="border w-40 px-2 py-1 rounded-md" value={site} onChange={handleChangeEnv}>
                        <option value="HCM_DEV">HCM - DEV</option>
                        <option value="HN_LIVE">HN - Live</option>
                    </select>
                </div>
            </div>

            <div className="flex">
                <div className="w-40 h-screen mt-4 border-r-2">
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
                    {selectedFunc === 1 &&
                        <Inpatient site={site} />

                    }
                    {selectedFunc === 2 &&
                        <KhamBenh site={site} />

                    }
                    {selectedFunc === 3 &&
                        <DatKham site={site} />
                    }

                    {selectedFunc === 4 &&
                        <Duoc site={site} />
                    }

                    {selectedFunc === 98 &&
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



        </>
    )
}
export default MainPage;