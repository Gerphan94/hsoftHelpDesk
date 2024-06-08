import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";

import TonBHYT from "./TonBHYT";
import TonKho from "./TonKho";
import TonKhoKeToa from "./TonKhoKeToa";

function Duoc({ site }) {

    const [curnav, setCurnav] = useState('')
    const [ selectedOption, setSelectedOption ] = useState({id:0, name:''})

    return (
        <>
            <div className="flex items-center">
                <Dropdown setSelectedOption={setSelectedOption} />
                <div className="font-bold text-xl">{selectedOption.name}</div>
            </div>


            <div>



                {selectedOption.id === 1 && <TonKhoKeToa site={site} type={'BHYT'} />}
            </div>




        </>
    )
}

export default Duoc;