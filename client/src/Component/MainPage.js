import React, { useState } from "react";

import Inpatient from "./Inpatient";
import HoSoBA from "./HoSo/HoSoBA";
import GoiKham from "./GoiKham/GoiKham";
import KhamBenh from "./KhamBenh/KhamBenh";
import DatKham from "./DatKham/DatKham";
import SQLCol from "./SQL/SQLCollection";
import DanhMuc from "./DanhMuc/DanhMuc";
import Duoc from "./Duoc/Duoc";
import KPI from "./KPI/KPI";
import styles from "./styles.module.css"

import SideMenu from "./SideMenu";


function MainPage() {

    const [site, setSite] = useState('HCM_DEV')
    const [selectedFunc, setSelectedFunc] = useState(1);
    const [pageTitle, setPageTitle] = useState('')

    const handleChangeEnv = (event) => {
        console.log(event.target.value);
        setSite(event.target.value);
    }

    return (
        <>
            <div className={styles.bodyPage}>
                <div className="flex">
                    <div className="w-56  h-screen border-r-2 bg-[#031C30]">
                        <div className="text-left p-2">
                            <select className="bg-gray-300 border w-full px-2 py-1 rounded-md" value={site} onChange={handleChangeEnv}>
                                <option value="HCM_DEV">HCM - DEV</option>
                                <option value="HN_DEV">HN - Dev</option>
                                <option value="HN_LIVE">HN - Live</option>
                            </select>
                        </div>

                        <SideMenu selectedFunc={selectedFunc} setSelectedFunc={setSelectedFunc} setPageTitle={setPageTitle} />
                    </div>
                    <div className={styles.MainPage}>
                        <div className="p-2 w-full border-b">
                            <div className="text-left text-2xl font-bold">{pageTitle}</div>

                        </div>
                        <div>
                            {selectedFunc === 'hosobenhan' && <HoSoBA site={site} />}
                            {selectedFunc === 1 && <Inpatient site={site} />}
                            {selectedFunc === 'goikham' && <GoiKham site={site} />}
                            {selectedFunc === 'khambenh' && <KhamBenh site={site} />}
                            {selectedFunc === 'datkham' && <DatKham site={site} />}
                            {selectedFunc === 'duoc' && <Duoc site={site} />}
                            {selectedFunc === 'danhmuc' && <DanhMuc />}
                            {selectedFunc === 99 && <SQLCol />}
                            {selectedFunc === 999 && <KPI />}
                        </div>



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