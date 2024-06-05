import React, { useState, useEffect } from "react";
import TonBHYT from "./TonBHYT";
import TonKho from "./TonKho";

function Duoc({ site }) {

    const [curNar, setCurNar] = useState('')


    const narbar = [
        { id: 'tonkho', name: 'Tồn kho' },
        { id: 'tonbhyt', name: "Tồn BHYT" },
        { id: 'khac', name: "Khác" }
    ]
    return (
        <>
            <div className="flex p-2 bg-white">
                {narbar.map((nar) =>
                    <button
                        className={`border px-2 py-1 w-32 hover:bg-[#7E8EF1] ${curNar === nar.id ? 'bg-[#7E8EF1]' : ''}  `}
                        onClick={() => setCurNar(nar.id)}
                    >{nar.name}</button>
                )}

            </div>
            <div>
                {curNar === 'tonkho' && <TonKho site={site} />}
                {curNar === 'tonbhyt' && <TonBHYT site={site} />}
            </div>




        </>
    )
}

export default Duoc;