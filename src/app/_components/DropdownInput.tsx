import React from 'react';
import type { DropdownOption } from '../../types/domain';

interface DropdownInputProps {
    label: string;
    value: string | undefined;
    options: DropdownOption[];
    onChange: (value: string) => void;
    style?: React.CSSProperties; // Tetap dipertahankan jika parent mengirimkan style kustom luar
}

function DropdownInput({
    label,
    value,
    options,
    onChange,
    style,
}: DropdownInputProps) {
    console.log(`DropdownInput [${label}] is rendered with value: "${value}"`);

    return (
        <div className="flex flex-col gap-1.5 w-full" style={style}>
            <label className="text-sm font-bold text-slate-600">
                {label}
            </label>

            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="
                    w-full 
                    px-3 
                    py-2 
                    text-sm 
                    bg-white 
                    border 
                    border-slate-300 
                    rounded-md 
                    shadow-sm 
                    cursor-pointer 
                    focus:outline-none 
                    focus:border-slate-900 
                    focus:ring-1 
                    focus:ring-slate-900 
                    transition-all 
                    text-slate-700 
                    font-medium
                "
            >
                <option key="all" value="all">All</option>
                {options?.map((option) => (
                    <option key={option?.key} value={option?.value}>
                        {option?.value?.toUpperCase()}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default React.memo(DropdownInput);