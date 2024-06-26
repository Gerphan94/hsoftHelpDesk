import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import ViewButton from "../Button/ViewButton";
function GiaVP( { site } ) {

    const apiURL = process.env.REACT_APP_API_URL;

    const [giavps, setGiavps] = useState([]);
    const [nhombhytys, setNhombhytys] = useState([]);

    const [nhombhyt, setNhombhyt] = useState({ id: 0, name: '' });



    useEffect(() => async () => {
        try {
            const fecthURL = apiURL + "/vienphi/nhomnbhyt/" + site;
            const response = await fetch(fecthURL);
            const data = await response.json();
            setNhombhytys(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }, []);


    return(
        <>
        <div>
            <div className="p-2 flex gap-2 items-center w-[500px]">
                <label>Nhóm: </label>
                <Dropdown data={nhombhytys} setSelectedOption={setNhombhyt} />
                <ViewButton onClick={() => {}} />
            </div>
        </div>
        
        </>
    )
}

export default GiaVP;