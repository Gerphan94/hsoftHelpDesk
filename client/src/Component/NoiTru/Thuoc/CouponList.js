import React from "react";
import CouponComponent from "./CouponComponent";

function CouponList({ data, selectedCouponID, setSelectedCouponID, setSelectedCouponType, setMedicineDetail }) {

    const formatDate = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
      };

    const today = new Date();
    const homnayfo = formatDate(today);

    return (
        <div>
            {Object.keys(data).map((date) => (
                <div key={date}>
                    <div className="">
                        <div className="w-full px-2 py-1 bg-slate-200 mb-2 flex items-center justify-between">
                            <div>Ngày: {date} - {homnayfo}</div>
                            <span className="px-2 font-bold">{data[date].length}</span>
                        </div>
                    </div>
                    {data[date].map(item => (
                        <CouponComponent
                            item={item}
                            selectedCouponID={selectedCouponID}
                            setSelectedCouponID={setSelectedCouponID}
                            setSelectedCouponType={setSelectedCouponType}
                            setMedicineDetail={setMedicineDetail}
                        />
                    ))}
                </div>
            ))}

        </div>
    );
}

export default CouponList;