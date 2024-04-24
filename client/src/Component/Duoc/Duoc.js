import React, { useState, useEffect } from "react";
import TonBHYT from "./TonBHYT";


function Duoc(  { site }) {

    const [curNar, setCurNar] = useState(0)

    const narbar = [
        {id: 1, name:"Tồn BHYT"},
        {id: 2, name:"Khác"}
    ]

    return(
        <>
        <div className="text-left font-2xl font-bold p-4">DƯỢC</div>

        <div className="flex p-2 bg-white">
            {narbar.map((nar) => 
            <button 
            className="border px-2 py-1"
            onClick={() => setCurNar(nar.id)}
            >{nar.name}</button>
        )}

        </div>
        <div>
            {curNar === 1 &&
                <TonBHYT site={site} />
            }
        </div>




        </>
    )
}

export default Duoc;