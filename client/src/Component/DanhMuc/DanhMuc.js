import React, { useState } from "react";
import Dropdown from "./Dropdown";

import NhanVien from "./NhanVien";
import GiaVP from "./GiaVP";
import ButtonMenu from "../ButtonMenu";


function DanhMuc( { site } ) {

    const [selectedOption, setSelectedOption] = useState({ id: 0, name: '' })


    const dm_list = [
        { id: "nhanvien", name: "Nhân viên" },
        { id: "duoc", name: "Biệt Dược" },
        { id: "giavp", name: "Giá viện phí" }
    ]


    return (

        <>
            <div className="flex items-center">
                
                
                <ButtonMenu className="mr-4 " data={dm_list} setSelectedOption={setSelectedOption} />
                <div className="font-bold text-xl">{selectedOption.name}</div>
            </div>

            {selectedOption.id === 'nhanvien' && <NhanVien site={site} />}
            {selectedOption.id === 'giavp' && <GiaVP site={site} />}




        </>
    )
}
export default DanhMuc;