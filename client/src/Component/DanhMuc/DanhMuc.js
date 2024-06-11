import React, { useState } from "react";
import Dropdown from "./Dropdown";

import NhanVien from "./NhanVien";


function DanhMuc() {

    const [selectedOption, setSelectedOption] = useState({ id: 0, name: '' })


    const dm_list = [
        { id: "duoc", name: "Biệt Dược" },
        { id: "giavp", name: "Biệt Dược" }
    ]


    return (

        <>
            <div className="flex items-center">
                <Dropdown setSelectedOption={setSelectedOption} />
                <div className="font-bold text-xl">{selectedOption.name}</div>
            </div>

            {selectedOption.id === 'nhanvien' && <NhanVien />}

        </>
    )
}
export default DanhMuc;