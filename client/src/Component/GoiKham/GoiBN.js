import React, { useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function GoiBNList() {

    const [fromDate, setFromDate] = useState(new Date());

    return (
        <>
        <div>
            <DatePicker 
            className="border px-2 py-1"
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            
            />

        </div>
        </>
    )


}
export default GoiBNList;