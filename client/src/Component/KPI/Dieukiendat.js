import React, { useState } from "react";

function DKDat({ number }) {

    const opts = ["<", "<=", "=", ">=", ">"]

    const [formData, setFormData] = useState({
        name: '',
        selectedOption: '',
        value: ''
    });

    const [dkData, setDkData] = useState([]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAdd = () => {


        console.log('Name:', formData.name);
        console.log('Selected Option:', formData.selectedOption);
        console.log('Value:', formData.value);
        

        // Perform further actions with the data as needed
    };

    return (
        <>
            {dkData.map((ele) =>
                <div>
                    <div>{ele[0]}</div>
                    <div>{ele[2]}</div>
                    <div>{ele[3]}</div>
                </div>
            )}
            <div className="flex gap-4">
                <input
                    name='name'
                    type="text"
                    className="w-40 border outline-none px-2 py-1 ml-2"
                    value={formData.name}
                    onChange={handleChange}
                />
                <select
                    name="selectedOption"
                    className="border px-2 py-1 rounded-md"
                    value={formData.selectedOption}
                    onChange={handleChange}
                >
                    {opts.map((opt, index) => (
                        <option key={index} value={opt}>{opt}</option>
                    ))}
                </select>
                <input
                    name="value"
                    type="number"
                    className="w-40 border outline-none px-2 py-1 ml-2"
                    value={formData.value}
                    onChange={handleChange}
                />
                <button
                    className="border bg-green-400 w-10"
                    onClick={handleAdd}
                >
                    +
                </button>
            </div>

        </>
    )
}

export default DKDat;