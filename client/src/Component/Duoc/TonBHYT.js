import React, { useState, useEffect } from "react";
import styles from "../styles.module.css"

function TonBHYT( { site }) {

    const apiURL = process.env.REACT_APP_API_URL;

    const [pharmars, setPharmars] = useState([]);

    const handeleView = async () => {
        try {
            const fecthURL = apiURL + "/duoc/tonbhyt/" + site;

            const response = await fetch(fecthURL);
            const data = await response.json();
            setPharmars(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    

    return (
        <>
        <div className="text-left px-4">
            <button 
            className={styles.buttonSubmit}
            onClick={() => handeleView()}
            
            >XEM</button></div>
        <div className="p-2">
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-300">
                        <th>#</th>
                        <th>Mã thuốc</th>
                        <th>Tên thuốc</th>
                        <th>Tồn đầu</th>
                        <th>Tồn thực</th>
                        <th>Đã xuất</th>
                        <th>Tồn BH Treo</th>
                        <th>Tồn BH KD</th>
                    </tr>
                </thead>
                <tbody>
                    {pharmars.map((pharmar, index) =>
                    
                    <tr className={`${pharmar.tonthuc !== (pharmar.tontreo + pharmar.tonkd) ? "bg-red-500": ""} even:bg-gray-100 odd:bg-white hover:bg-blue-200`}>
                        <td>{index+1}</td>
                        <td><div>{pharmar.ma}</div></td>
                        <td><div className="text-left">{pharmar.ten}</div></td>
                        <td><div>{pharmar.tonbd}</div></td>
                        <td><div>{pharmar.tonthuc}</div></td>
                        <td><div>{pharmar.dadung}</div></td>
                        <td><div>{pharmar.tontreo}</div></td>
                        <td><div>{pharmar.tonkd}</div></td>
                    </tr>
                    
                    )}
                </tbody>
            </table>
        </div>
        
        </>
    )


}

export default TonBHYT;
