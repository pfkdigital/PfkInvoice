'use client'

import Image from 'next/image';
import {Dispatch, SetStateAction} from 'react';

type CheckboxProps = {
    label: ''| 'Unpaid' | 'Paid';
    currentFilter: ''| 'Unpaid' | 'Paid';
    setCurrentFilter: Dispatch<SetStateAction<''| 'Unpaid' | 'Paid'>>;
};

const Checkbox = ({label, currentFilter, setCurrentFilter}: CheckboxProps) => {
    const isChecked = currentFilter === label;

    const handleClick = () => {
        if(isChecked) {
            setCurrentFilter("")
        } else {
            setCurrentFilter(label)
        }
    }

    return (
        <div
            className={`flex items-center first:mb-[5px] cursor-pointer`}
            onClick={() => handleClick()}
        >
            <div
                className={`w-2.5 h-2.5 border border-snowWhite rounded-[2px] flex items-center justify-center ${
                    isChecked ? 'bg-oceanBlue border-none' : ''
                }`}
            >
                {isChecked && (
                    <Image src="/check.svg" alt="Checkbox" width={5} height={5}/>
                )}
            </div>
            <span className="ml-[5px] text-snowWhite text-xs">{label}</span>
        </div>
    );
};

export default Checkbox;
