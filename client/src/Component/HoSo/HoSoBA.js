import React from "react";
import styles from "../styles.module.css"


function HoSoBA() {


    return(
        <>
        <div>Hồ sơ bệnh án</div>
        <div className="p-2">
        <div className="flex gap-4 items-center">
            <label>PID:</label>
            <input type="number" className="border outline-none px-2 py-1"/>
            <button className={styles.buttonSubmit} >Tìm</button>
        </div>
        <div >
        
        </div>

        </div>
        {/* THÔNG TIN BỆNH NHÂN */}
        <div>

        </div>

        {/* LỊCH SỬ KHÁM */}
        
        </>
    )

}
export default HoSoBA;