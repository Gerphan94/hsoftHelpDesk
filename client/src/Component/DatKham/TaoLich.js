import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TaoLichHen({ site }) {


    const [curDate, setCurDate] = useState(new Date());

    return (
        <>
            <div className="font-bold text-left text-lg">TẠO LỊCH HẸN TODAY</div>
            <div className="text-left p-4 flex gap-10">
                <div >
                    <label htmlFor="CreateDate" >Ngày tạo</label>

                    <DatePicker
                        name="CreateDate"
                        dateFormat="dd/MM/yyyy"
                        selected={curDate}
                        onChange={(date) => setCurDate(date)}
                        className="ml-4 border px-2 py-1 w-28 outline-none"

                    />
                </div>
                <div>
                    <label htmlFor="AppointmentDate" >Ngày hẹn</label>

                    <DatePicker
                        name="AppointmentDate"
                        dateFormat="dd/MM/yyyy"
                        selected={curDate}
                        onChange={(date) => setCurDate(date)}
                        className="ml-4 border px-2 py-1 w-28 outline-none"

                    />
                </div>
                <div>
                    <div></div>
                </div>


            </div>
            <div className="text-left p-4">

            </div>
        </>
    )
}

export default TaoLichHen;