import React, { useRef, useState, useEffect } from "react";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";

function Filter({ filter, setFilter }) {

    const [count, setCount] = useState(0);




    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const handleClick = (id, name) => {
        closeDropdown();
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleChange = (item) => {

        const updatedCheckboxes = filter.map(checkbox =>
            checkbox.id === item.id ? { ...checkbox, value: !checkbox.value } : checkbox
        );
        if (item.value) {
            setCount(count - 1);
        }
        else {
            setCount(count + 1);
        }
        setFilter(updatedCheckboxes);
    };

    return (
        <>
            <div className='text-left p-3' ref={dropdownRef}>
                <div className="relative inline-block">
                    <button
                        className="flex items-center justify-center px-2 py-1"
                        onClick={toggleDropdown}
                    >
                        {count === 0 ?
                            <MdFilterAlt className="h-5 w-5" /> :
                            <MdFilterAltOff className="h-5 w-5" />
                        }

                    </button>

                    {isOpen && (
                        <div className="border p-4 origin-top-right absolute left-0 mt-2 w-44 shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 min-h-10">
                            <div>
                                {filter.map((item) => (
                                    <div className="w-full px-2 py-1 flex gap-1 items-center">
                                        <input
                                            id={item.id}
                                            name={item.id}
                                            type="checkbox"
                                            checked={item.value}
                                            onChange={() => handleChange(item)}
                                        />
                                        <label className="select-none" htmlFor={item.id}>{item.name}</label>
                                    </div>
                                ))}

                            </div>
                            <div className="mt-2">
                                <button className="w-full px-2 py-1 rounded-md bg-[#9BB0C1]">Clear</button>
                            </div>


                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Filter;