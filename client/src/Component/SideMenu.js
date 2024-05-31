import React from "react";
import { GiEarbuds, GiAlarmClock } from "react-icons/gi";
import { TbCategoryFilled } from "react-icons/tb";
import { CiPill } from "react-icons/ci";
import { PiFileSqlDuotone } from "react-icons/pi";
import { IoFileTrayFullSharp } from "react-icons/io5";

function SideMenu({ selectedFunc, setSelectedFunc }) {

    const funcs = [
        { id: 'hosobenhan', name: 'Hồ sơ bệnh án', icon: IoFileTrayFullSharp },
        { id: 1, name: 'Hiện diện BN' , icon: GiEarbuds },
        { id: 'goikham', name: 'Gói khám' , icon: GiEarbuds },
        { id: 'khambenh', name: 'Khám bệnh' , icon: GiEarbuds },
        { id: 'datkham', name: "Đặt khám" , icon: GiAlarmClock },
        { id: 'duoc', name: "Dược" , icon: CiPill },
        { id: 'danhmuc', name: "Danh mục"  , icon: TbCategoryFilled},
        { id: 'sql', name: 'SQL', icon: PiFileSqlDuotone  },
        { id: 999, name: "KPI" , icon: GiEarbuds}
    ];

    return (

        <>
            {funcs.map((func, index) => (
                <div className={`px-2 flex gap-1 text-white text-lg items-center hover:opacity-100  ${func.id === selectedFunc ? 'opacity-100' : 'opacity-50'} `}>
                    <func.icon />
                    <button
                        key={index}
                        className={`block py-2 w-full text-left px-1 `}
                        onClick={() => setSelectedFunc(func.id)}

                    >{func.name}</button>


                </div>

            )
            )}
        </>
    )

}

export default SideMenu;