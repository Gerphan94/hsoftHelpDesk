import React from "react";

function ThuocDetail({ data }) {
    return (
        <>
            {data.map((item) => (
                <div className="pt-4">
                <div className="relative border rounded-md p-3 mb-3">
                    <span className="absolute top-[-14px] right-1 w-10 rounded-xl bg-slate-300">{item.stt_index}</span>
                    <div className="flex justify-between">
                        <div className="flex gap-2">
                            <span className="size-6 rounded-full bg-[#379777] border">
                                {item.tt}
                            </span>
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
                        <div className="min-w-40">Liều dùng: {item.lieudungthuoc}</div>
                        <div className="min-w-40">Tốc độ: {item.tocdo}</div>
                        <div className="min-w-40">Cách dùng: {item.cachdung}
                            
                            </div>

                    </div>
                    <div className="text-left">Ghi chú:
                        <input  value={item.ghichu}/>
                         </div>


                </div>
                </div>
            ))}


        </>
    )
}

export default ThuocDetail;