import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles.module.css"

function TaoLichHen({ site }) {

    const apiURL = process.env.REACT_APP_API_URL;



    const [pid, SetPid] = useState('');
    const [curKP, setCurKP] = useState('011');
    const [avalablePID, setAvalablePID] = useState(false);
    const [personInfo, setPersonInfo] = useState({});


    const phongkham = [
        {'makp': '011', 'tenkp': 'Phòng Khám Sản - phụ khoa 1'},
        {'makp': '012', 'tenkp': 'Phòng Khám Sản - phụ khoa 2'}

    ]


    const handleChange = (event) => {
        SetPid(event.target.value);
    }

    const handleSearch = async () => {
        try {
            const fecthURL = apiURL + "thongtin_benhnhan/" + site + "/" + pid;
            const response = await fetch(fecthURL);
            const data = await response.json();
            console.log(data);
            const code = await response.status;
            if (code === 404) {
                setAvalablePID(false);
                setPersonInfo({})
            }
            else {
                setAvalablePID(true);
                setPersonInfo(data);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };

    const handleChangeKP = (event) => {
        setCurKP(event.target.value);
    }

    

    const handleTaoLich = async () => {
        if (curKP === '') {
            console.log("Chưa chọn phòng khám");
            return
        }

        if (avalablePID) {
            console.log("tạo lịch");
            console.log(pid, curKP)

            try {
                const fecthURL = apiURL + "taolichkham/" + site + "/" + pid;
                const response = await fetch(fecthURL);
                const data = await response.json();
                
               
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            

        }
    }




    return (
        <>
            <div className="font-bold text-left text-lg">TẠO LỊCH HẸN TODAY</div>
            <div className="text-left p-4 flex gap-10">
                <div>
                <div className="flex gap-5 items-center">
                    <label htmlFor="mabn" >MaBN: </label>
                    <input 
                    name='mabn' 
                    className="border px-2 py-1 outline-none" 
                    value={pid} 
                    onChange={handleChange} />
                    <button 
                    className={styles.buttonSubmit}
                    onClick={() => handleSearch()}
                    
                    >Tìm</button>
                </div>
               
                </div>
                
                <div>
                    <div >{personInfo.HOTEN}</div>
                </div>
                
               


            </div>
            <div className="text-left p-4 flex gap-4">
                <div>
                    <select className="border outline-none px-2 py-1" value={curKP} onChange={handleChangeKP}>
                        {phongkham.map((pk) => 
                            <option value= {pk.makp}>{pk.tenkp}</option>
                        )}
                    </select>
                </div>
            <div>
                    <button
                        className={styles.buttonSubmit}
                        onClick={() => handleTaoLich()}
                    >Tạo lịch</button>
                </div>
            </div>
        </>
    )
}

export default TaoLichHen;