import React, { useEffect, useState } from "react";
import styles from "../../styles.module.css"
import CouponComponent from "./CouponComponent";
import ThuocDetail from "./ThuocModalDetail";
import CouponList from "./CouponList";
function ThuocModal({ site, pid, hoten, setModalShow, selectedIdKhoaOfPatinent }) {

    const title = 'THUỐC - ' + pid + ' - ' + hoten;

    const apiURL = process.env.REACT_APP_API_URL;

    const [dutrull, setDutrull] = useState([]);
    const [selectedCouponID, setSelectedCouponID] = useState('');
    const [selectedCouponType, setSelectedCouponType] = useState(0);
    const [groupedData, setGroupedData] = useState({});
    const [medicineDetail, setMedicineDetail] = useState([]);
    const [dutrullDetail, setDutrullDetail] = useState({});


    const fetchDutrull = async () => {
        const fetchUrl = apiURL + "noitru/dutrull_ofBN_inHiendien/" + site + "/" + selectedIdKhoaOfPatinent
        const response = await fetch(fetchUrl);
        const data = await response.json();

        const grouped = data.reduce((acc, item) => {
            const date = item.ngaytao;
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(item);
            return acc;

        }, {});
        console.log(grouped)
        setDutrull(grouped);
    }

    useEffect(() => {
        fetchDutrull();
    }, [selectedIdKhoaOfPatinent]);

    const onClickReload = () => {
        setMedicineDetail([]);
        setSelectedCouponID('');
        setSelectedCouponType(0);
        fetchDutrull();
    }
    useEffect(() => {
        setGroupedData(dutrull);
    }, [dutrull]);


    useEffect(() => {
        const fetchUrl = apiURL + "/noitru/phieuct/" + site + "/" + selectedCouponType + "/" + selectedCouponID;
       
        const fetchMedicineDetail = async () => {
            const response = await fetch(fetchUrl);
            const data = await response.json();
            console.log(data)
            setMedicineDetail(data);
        }
        fetchMedicineDetail();
    }, [selectedCouponID])

    return (
        <>
            <div className="fixed inset-0 z-50 outline-none focus:outline-none p-14 w-screen h-screen ">
                <div className="relative w-full h-full  mx-auto bg-white">
                    <div className="h-full flex flex-col justify-between">
                        {/* HEADER */}
                        <div className="text-left text-lg font-bold border-b-black w-full px-4 py-3 bg-[#9BB0C1]">
                            {title}
                        </div>
                        {/* BODY */}
                        <div className="flex h-full p-4 overflow-hidden ">
                            <div className="w-1/3 flex-grow h-full text-left overflow-y-scroll ">
                                <div className="p-2">
                                    {Object.keys(dutrull).map((date) => (
                                        <CouponList
                                            date={date}
                                            entries={dutrull[date]}
                                            selectedCouponID={selectedCouponID}
                                            setSelectedCouponID={setSelectedCouponID}
                                            setSelectedCouponType={setSelectedCouponType}
                                            setDutrullDetail={setDutrullDetail}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="w-2/3 h-full">
                                <div className="mt-2 flex-grow px-4 w-full h-full overflow-y-auto my-4" >
                                    {selectedCouponID !== '' &&
                                        <ThuocDetail 
                                        site={site}
                                        couponType={selectedCouponType} 
                                        data={medicineDetail}
                                        couponId={selectedCouponID}
                                        
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                        {/* FOOTER  */}
                        <div className="w-full flex gap-4 items-center justify-end px-4 py-3 bg-[#f5f5f5] relative">
                            <button
                                className={`${styles.btn} ${styles.btnNew}`}
                                onClick={onClickReload}
                            >
                                Xem
                            </button>

                            <button
                                className={`${styles.btn} ${styles.btnClose}`}
                                type="button"
                                onClick={() => setModalShow(false)}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>



                </div>
            </div>
            <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default ThuocModal;

