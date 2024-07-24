import React, { useEffect, useState } from "react";
import Dausinhton from "./Dausinhton";
function ThuocDetail({ couponType, site, data, couponId }) {

    const apiURL = process.env.REACT_APP_API_URL;

    const title_ar = ['DỰ TRÙ THƯỜNG QUY', 'XUẤT TỦ TRỰC', 'TOA THUỐC RA VIỆN']
    const TITLE = title_ar[couponType-1];


    const [detail, setDetail] = useState({});

    useEffect(() => {
        const fetchURL = apiURL + "noitru/phieu_info/" + site + "/" + couponType + "/" + couponId;
        const fetchDetail = async () => {
            try {
                const response = await fetch(fetchURL);
                const data = await response.json();
                setDetail(data);
                console.log(data);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchDetail();
        }, [couponId, couponType, site, apiURL]);



    return (
        <>
        <div>
        <div className="flex items-center w-full bg-gray-100">
                <div className="font-bold px-2">{TITLE}</div>
                <div className="flex-1 text-left">{detail && detail.ten}</div>
                <div>
                    <Dausinhton />
                </div>
            </div>
            <div>
                <div className="px-2 py-1 flex gap-2 items-center">
                    <label>ICD</label>
                    <input type="text" className="w-32 border outline-none px-2 py-0.5" readOnly={true} value={detail && detail.maicd} />
                </div>
                <div className="px-2 py-1 flex gap-2 items-center">
                    <label className="w-20">Chẩn đoán</label>
                    <input type="text" className="w-full border outline-none px-2 py-0.5" readOnly={true} value={detail && detail.chandoan} />
                </div>

            </div>
        </div>
            
            {data.map((item) => (
                <div className="pt-2 text-sm">
                    <div className="relative border rounded-md p-3 mb-3">
                        {/* <span className="absolute top-0 text-[10px] right-0 w-10 rounded-md bg-slate-300">{item.stt_index}</span> */}
                        <div className="flex justify-between">
                            <div className="flex gap-2">
                                <span className="size-6 rounded-full bg-[#379777] border">
                                    {item.tt}
                                </span>
                                <div><strong>{item.mabd} | </strong></div>
                                <div className="font-bold text-left">{item.ten_hamluong}</div>
                            </div>
                            <div className={`text-sm rounded-xl px-2 py-0.5 text-white select-none ${item.doituong === 'BHYT' ? 'bg-[#4535C1]' : item.doituong === 'Thu phí' ? 'bg-[#E76F51]' : 'bg-[#379777]'} `}>
                                {item.doituong}
                            </div>
                        </div>
                        <div>
                            <div className="text-left italic py-0.5">Ngày <span className="font-bold">{item.solan}</span> lần, lần <span className="font-bold">{item.lan}</span> {item.donvidung}

                            </div>
                        </div>
                        <div className="flex text-left">
                            <div className="min-w-40"><>Liều dùng:</> {item.lieudungthuoc}</div>
                            <div className="min-w-40"><>Tốc độ:</> {item.tocdo}</div>
                            <div className="min-w-40"><>Cách dùng: </>{item.cachdung}

                            </div>

                        </div>
                        <div className="text-left">Ghi chú:
                            <input value={item.ghichu} />
                        </div>


                    </div>
                </div>
            ))}


        </>
    )
}

export default ThuocDetail;