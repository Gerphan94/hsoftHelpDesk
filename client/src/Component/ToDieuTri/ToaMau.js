import React, { useEffect } from "react";


function ToaMau({ site }) {

    const apiURL = process.env.REACT_APP_API_URL;

    const [toaMaus, setToaMaus] = React.useState([]);

    useEffect(() => async () => {
        try {
            const fecthURL = apiURL + "/todieutri/toamau/" + site;
            const response = await fetch(fecthURL);
            const data = await response.json();
            setToaMaus(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [site]);

    return (
        <>
            <div className="flex px-4">
                <div className="flex-1 px-4 w-1/3  lg:h-[750px] overflow-y-auto">
                    <table className=" w-full">
                        <thead className="sticky top-0 z-80">
                            <tr className="bg-gray-200 ">
                                <th></th>
                                <th className="text-center w-10"><div className="py-1 text-center">STT</div></th>

                                <th className=""><div>Mã</div></th>
                                <th><div className="text-center">Tên</div></th>

                            </tr>
                        </thead>

                        <tbody>
                            {toaMaus.map((item, index) => (
                                <tr key={index} className="even:bg-gray-200">
                                    <td></td>
                                    <td className="text-center py-1">{index + 1}</td>
                                    <td className="text-left py-1">{item.ma}</td>
                                    <td className="text-left">
                                        <div className="inline-block">
                                            <p>{item.ten}</p>
                                        </div>
                                    </td>


                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="w-2/3 lg:h-[750px] overflow-y-auto">
                <table className=" w-full">
                        <thead className="sticky top-0 z-80">
                            <tr className="bg-gray-200 ">
                                <th></th>
                                <th className="text-center w-10"><div className="py-1 text-center">STT</div></th>

                                <th className=""><div>Mã</div></th>
                                <th><div className="text-center">Tên</div></th>

                            </tr>
                        </thead>

                        <tbody>
                            {toaMaus.map((item, index) => (
                                <tr key={index} className="even:bg-gray-200">
                                    <td></td>
                                    <td className="text-center py-1">{index + 1}</td>
                                    <td className="text-left py-1">{item.ma}</td>
                                    <td className="text-left">
                                        <div className="inline-block">
                                            <p>{item.ten}</p>
                                        </div>
                                    </td>


                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>





        </>
    )
}

export default ToaMau;