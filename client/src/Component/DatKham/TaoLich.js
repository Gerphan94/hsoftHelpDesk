import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TaoLichHen({ site }) {


    const [curDate, setCurDate] = useState(new Date());

    return (
        <>
            <div className="font-bold text-left text-lg">TẠO LỊCH HẸN</div>
            <div>

                <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={curDate}
                    onChange={(date) => setCurDate(date)}
                    className="border px-2 py-1 w-28"
                    
                />
            </div>
        </>
    )
}

export default TaoLichHen;