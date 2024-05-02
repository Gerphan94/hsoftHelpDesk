import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";


function DKDat({ dkData, setDkData }) {

    const opts = ["", "<", "<=", "=", ">=", ">"]

    const [formData, setFormData] = useState({
        name: '',
        selectedOption: '',
        value: ''
    });

    // const [dkData, setDkData] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = {
            name: formData.name,
            selectedOption: formData.selectedOption,
            value: formData.value
        }
        setDkData(prevData => [...prevData, newData]);

        setFormData({
            name: '',
            selectedOption: '',
            value: ''
        })
        // Perform further actions with the data as needed
    };

    return (
        <>
            <div className="">
                <form onSubmit={(e) => handleSubmit(e)} autoComplete="off" className="flex gap-4 mb-4">
                <input
                    name='name'
                    type="text"
                    className="w-56 border outline-none px-2 py-1 ml-2"
                    value={formData.name}
                    onChange={handleChange}
                    required={true}
                    
                />
                <select
                    name="selectedOption"
                    className="border px-2 py-1 rounded-md"
                    value={formData.selectedOption}
                    onChange={handleChange}
                    required={true}
                >
                    {opts.map((opt, index) => (
                        <option key={index} value={opt}>{opt}</option>
                    ))}
                </select>
                <input
                    name="value"
                    type="number"
                    className="w-24 border outline-none px-2 py-1 ml-2"
                    value={formData.value}
                    onChange={handleChange}
                    required={true}
                />
                <button
                    className="border rounded-sm w-10 text-green-600 flex justify-center items-center text-xl hover:bg-gray-100"
                    type="submit"
                >
                    <IoMdAddCircle />
                </button>
                </form>
                
            </div>
            {dkData.map((ele) =>
                <div className="flex gap-4 mb-2">
                    <input
                        name='name'
                        type="text"
                        className="w-56 border outline-none px-2 py-1 ml-2"
                        value={ele.name}
                        disabled={true}
                        autoComplete="off"
                    />
                    <select
                        name="selectedOption"
                        className="border px-2 py-1 rounded-md"
                        value={ele.selectedOption}
                        disabled={true}
                    >
                        {opts.map((opt, index) => (
                            <option key={index} value={opt}>{opt}</option>
                        ))}
                    </select>
                    <input
                        name="value"
                        type="number"
                        className="w-24 border outline-none px-2 py-1 ml-2"
                        value={ele.value}
                        disabled={true}
                    />
                    <button
                        className="border rounded-sm w-10 text-red-600 flex justify-center items-center text-xl hover:bg-gray-100"
                        onClick={handleSubmit}
                    >
                        <MdDelete />
                    </button>
                </div>
            )}




        </>
    )
}

export default DKDat;