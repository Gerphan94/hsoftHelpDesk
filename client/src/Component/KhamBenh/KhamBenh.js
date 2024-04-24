import React, { useState, useEffect, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles.module.css"
import moment from 'moment';
import { FiCircle } from "react-icons/fi";

function KhamBenh( { site }  ) {

    const apiURL = process.env.REACT_APP_API_URL;


    const [viewDate, setViewDate] = useState(new Date());
    const [viewData, setViewData] = useState([]);
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="bg-blue-300 w-32 px-2 py-1 rounded-md" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));

    const handleView = async () => {
        let formatDate = moment(viewDate).format('YYYYMMDD');
        try {
            const fecthURL = apiURL + "/khambenh/" + site + "/" + formatDate;

            const response = await fetch(fecthURL);
            const data = await response.json();
            setViewData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleSearch = () => {
        
    }

    return (
        <>
            
            <div className="flex gap-10 w-full border-b p-2">
            <div className="font-bold text-xl">DANH SÁCH KHÁM BỆNH</div>
                <div>
                    <label>Ngày: </label>
                    <DatePicker
                        selected={viewDate}
                        customInput={<ExampleCustomInput />}
                        onChange={(date) => setViewDate(date)}
                        dateFormat="P"
                        />
                </div>

                <div>
                    <button
                        className={styles.buttonSubmit}
                        onClick={() => handleView()}

                    >Xem</button>
                </div>

            </div>
            <div className="px-4 py-2 flex">
                <div className="flex gap-4">
                    <input className="border px-2 py-1 outline-none" />
                    <button
                        className={styles.buttonSubmit}
                        onClick={() => handleSearch()}
                    >Tìm</button>
                </div>
            </div>

            {/* TABLE */}
            <div>
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-200">
                        <th className="w-10 py-1"></th>
                            <th className="w-10 py-1">STT</th>
                            <th className="w-20">PID</th>
                            <th className="w-56">Họ tên</th>
                            <th className="w-20">Giới tính</th>
                            <th className="w-24">Ngày sinh</th>
                            <th className="w-64">Phòng khám</th>
                            <th className="w-20">Đối tượng</th>
                            <th className="w-40">Ngày tiếp đón</th>
                            <th className="w-40">Ngày khám</th>
                            <th className="">Done</th>
                        </tr>
                    </thead>
                    <tbody>
                        {viewData.map((data, index) => 
                        <tr className="hover:bg-blue-50 cursor-pointer">
                            <td><div className="flex justify-center"><FiCircle className="" /></div></td>
                            <td>{index + 1}</td>
                            <td><div className="text-left px-2">{data.mabn}</div></td>
                            <td className=""><div className="text-left px-4 py-1">{data.hoten}</div></td>
                            <td><div>{data.phai}</div></td>  
                            <td>{data.ngaysinh}</td>
                            <td><div  className="text-left px-2">{data.tenkp}</div></td>
                            <td><div  className="text-left px-2">{data.doituong}</div></td>
                            <td><div  className="text-left px-2">{data.ngaytn}</div></td>
                            <td><div  className="text-left px-2">{data.ngaykb}</div></td>
                            <td><div  className="text-left px-2">{data.done}</div></td>

                        </tr>
                         )}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default KhamBenh;