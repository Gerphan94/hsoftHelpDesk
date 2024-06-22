import React, { useState } from "react";
import styles from "./styles.module.css"

import Inpatient from "./Inpatient";
import HoSoBA from "./HoSo/HoSoBA";
import GoiKham from "./GoiKham/GoiKham";
import KhamBenh from "./KhamBenh/KhamBenh";
import DatKham from "./DatKham/DatKham";
import SQLCol from "./SQL/SQLCollection";
import DanhMuc from "./DanhMuc/DanhMuc";
import Duoc from "./Duoc/Duoc";
import KPI from "./KPI/KPI";
import NoiTru from "./NoiTru/NoiTru";
import MainPageHeader from "./MainPageHeader";

import SideMenu from "./SideMenu";
import ChooseSite from "./Site/ChooseSite";

function MainPage() {

    const [site, setSite] = useState('HCM_DEV')
    const [selectedFunc, setSelectedFunc] = useState(1);
    const [pageTitle, setPageTitle] = useState('')
    const [mainIcon, setMainIcon] = useState(null);

    const [isChooseSite, setIsChooseSite] = useState(false);

    const handleChangeEnv = (event) => {
        console.log(event.target.value);
        setSite(event.target.value);
    }

    const sites = [
        { id: 'HCM_DEV', name: 'HCM - DEV' },
        { id: 'HCM_UAT', name: 'HCM - UAT' },
        { id: 'HN_DEV', name: 'HN - Dev' },
        { id: 'HN_LIVE', name: 'HN - Live' }
    ]

    return (
        <>
            <div className={styles.bodyPage}>
                <div className="flex">
                    <div className="w-56  h-screen border-r-2 bg-[#031C30]">
                        <div className="text-left p-2">
                            <select className="bg-gray-300 border w-full px-2 py-1 rounded-md" value={site} onChange={handleChangeEnv}>
                                <option value="HCM_DEV">HCM - DEV</option>
                                <option value="HCM_UAT">HCM - UAT</option>
                                <option value="HN_DEV">HN - Dev</option>
                                <option value="HN_LIVE">HN - Live</option>
                            </select>
                        </div>

                        {/* <button
                            className="w-full text-left p-2 hover:bg-gray-200"

                            onClick={() => setIsChooseSite(true)}>Choose Site</button> */}

                        <SideMenu
                            selectedFunc={selectedFunc}
                            setSelectedFunc={setSelectedFunc}
                            setPageTitle={setPageTitle}
                            setMainIcon={setMainIcon}

                        />
                    </div>
                    <div className={styles.MainPage}>
                        <MainPageHeader title={pageTitle} />
                        <div>
                            {selectedFunc === 'hosobenhan' && <HoSoBA site={site} />}
                            {selectedFunc === 1 && <Inpatient site={site} />}
                            {selectedFunc === 'goikham' && <GoiKham site={site} />}
                            {selectedFunc === 'khambenh' && <KhamBenh site={site} />}
                            {selectedFunc === 'noitru' && <NoiTru site={site} />}
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
            <div className={`w-full h-4 ${site === 'HCM_DEV' || site === 'HN_DEV' || site === 'HCM_UAT' ? "bg-red-500" : "bg-green-500"}  `} ></div>
            

            {isChooseSite && <ChooseSite sites={sites} setSite={setSite} setModalShow={setIsChooseSite} />}
        </>

    )
}
export default MainPage;