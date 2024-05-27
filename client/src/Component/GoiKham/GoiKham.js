import React, { useState } from "react";

function GoiKham({ site }) {

    const apiURL = process.env.REACT_APP_API_URL;


    const [pid, setPid] = useState(null);

    const handleChange = (e) => {
        setPid(e.target.value);
    }

    const handleView = async () => {
        try {
            const fecthURL = apiURL + "/goikham/" + site + "/" + pid;

            const response = await fetch(fecthURL);
            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    return (
        <>
            <div className="p-4">
                <div className="text-left font-bold text-xl py-4">GÓI KHÁM</div>
                <div className="text-left flex gap-4 items-center">
                    <label>Mã BN:</label>
                    <input
                        name="inputPid"
                        type="number"
                        className="border px-2 py-1 outline-none"
                        placeholder="Nhập PID"
                        value={pid}
                        onChange={handleChange}
                    />
                    <button className="" onClick={() => handleView()}>Xem</button>
                    <div className="text-lg font-bold">Họ và tên</div>
                </div>
            </div>


        </>
    )

}

export default GoiKham;