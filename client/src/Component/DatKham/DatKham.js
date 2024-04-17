import React, { useState, forwardRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles.module.css"



function DatKham({ site }) {

    const apiURL = process.env.REACT_APP_API_URL;

    const [curDate, setCurDate] = useState(new Date());
    const [upper, setUpper] = useState(false);
    const [dsLichHen, setDSLichHen] = useState([]);


    const handleClick = async () => {
        try {
            const fecthURL = apiURL + "/datkham/error_datkham/" + site + "/" + "240417" + "/" + upper;

            const response = await fetch(fecthURL);
            const data = await response.json();
            setDSLichHen(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="bg-blue-300 px-2 py-1 rounded-md" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));

    return (
        <>
            <div className="p-4">
                <div className="text-xl font-bold text-left">ĐẶT KHÁM</div>
                <div className="mt-2">
                    <div className='flex p-4 gap-3 items-center'>
                        <label>Ngày: </label>
                        <DatePicker
                            selected={curDate}
                            customInput={<ExampleCustomInput />}
                            onChange={(date) => setCurDate(date)}/>
                    </div>
                    <div className="font-bold text-left">DANH SÁCH LỊCH HẸN SAI</div>
                    <div className='flex'>

                        <div>
                            <button
                                className={`${styles.buttonSubmit}`}
                                onClick={() => handleClick()}
                            >Xem</button>
                        </div>
                    </div>
                    <div>
                        <table className="w-full mb-10">
                            <thead>
                                <tr className="border bg-gray-200">
                                    <th className="w-10">#</th>
                                    <th>PID</th>
                                    <th>HỌ TÊN</th>
                                    <th>LH - PK</th>
                                    <th>MÃ PK</th>
                                    <th>TÊN PK</th>
                                    <th>NGÀY</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dsLichHen.map((lich, index) =>
                                    <tr className={`  `}>
                                        <td>{index + 1}</td>
                                        <td>{lich.mabn}</td>
                                        <td>{lich.hoten}</td>
                                        <td>{lich.khamhen}</td>
                                        <td>{lich.makp}</td>
                                        <td>{lich.tenkp}</td>
                                        <td>{lich.ngay}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}
export default DatKham;