import React, { useEffect, useRef, useState } from 'react'
import { RiSearch2Line, RiAlignJustify } from "react-icons/ri";

const Dropdown = ({ data, setSelectedOption }) => {

    console.log(data)

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <div className='w-full h-full text-left' ref={dropdownRef}>
            <div className="relative inline-block">
                <div className='flex'>
                <input
                    className="border border-r-0 outline-none h-full py-1 px-2 flex-grow"
                    onClick={toggleDropdown}
                    placeholder="Search..."
                />
                <button
                    className="h-full px-2 py-1  border border-l-0 "
                    onClick={toggleDropdown}
                >
                    <RiSearch2Line className="h-5 w-5 text-gray-500" />
                </button>
                </div>
           

                {isDropdownOpen && (
                    <div className="origin-top-right absolute left-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            {data.map((item) => (
                                <li>
                                    <button
                                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={toggleDropdown}
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dropdown;