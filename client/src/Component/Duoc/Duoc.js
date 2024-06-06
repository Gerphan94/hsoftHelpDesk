import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";

import TonBHYT from "./TonBHYT";
import TonKho from "./TonKho";

function Duoc({ site }) {

    const [curnav, setCurnav] = useState('')

    return (
        <>
            <div className="flex items-center">
                <Dropdown />
                <div className="font-bold text-xl">Title</div>
            </div>


            <div>
                {curnav === 'tonkho' && <TonKho site={site} />}
                {curnav === 'tonbhyt' && <TonBHYT site={site} />}
            </div>




        </>
    )
}

export default Duoc;