import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";

import TonBHYT from "./TonBHYT";
import TonKho from "./TonKho";
import TonKhoKeToa from "./TonKhoKeToa";
import TonTheoKho from "./TonTheoKho";
import DMBD from "./DMBD";
import TonTuTruc from "./TonTuTruc";

function Duoc({ site }) {

    const [ selectedOption, setSelectedOption ] = useState({id:0, name:''})

    return (
        <>
            <div className="flex items-center">
                <Dropdown setSelectedOption={setSelectedOption} />
                <div className="font-bold text-lg uppercase">{selectedOption.name}</div>
            </div>
            <div>
                {selectedOption.id === 'tonkho_ketoa_bhyt' && <TonKhoKeToa site={site} type={'BHYT'} />}
                {selectedOption.id === 'tonkho_tonbhyt' && <TonBHYT site={site}/>}
                {selectedOption.id === 'tonkho_theokho' && <TonTheoKho site={site}/>}
                {/* {selectedOption.id === 'tonkho_theokho' && <TonTheoKho site={site}/>} */}
                {selectedOption.id === 'dmbd' && <DMBD site={site}/>}
            </div>
        </>
    )
}

export default Duoc;