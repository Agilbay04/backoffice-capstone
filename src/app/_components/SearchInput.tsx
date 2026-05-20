import React, { useEffect, useState } from "react";

interface SearchInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    debounceDelay?: number;
    placeholder?: string;
    style?: React.CSSProperties;
}

function SearchInput({ 
    label = "Search",
    value, 
    onChange, 
    debounceDelay = 500, 
    placeholder = "Search...", 
    style,
}: SearchInputProps) {
    console.log(`SearchInput [${label}] is rendered with value: "${value}"`);

    const [innerValue, setInnerValue] = useState<string>(value);

    const [prevValue, setPrevValue] = useState<string>(value);

    if (value !== prevValue) {
        setInnerValue(value);
        setPrevValue(value);
    }

    useEffect(() => {
        if (innerValue === value) return;

        const delayDebounce = setTimeout(() => {
            onChange(innerValue);
        }, debounceDelay);

        return () => clearTimeout(delayDebounce);
    }, [innerValue, debounceDelay, onChange, value]);

    return (
        <div className="flex flex-col gap-1.5 w-full" style={style}>
            <label className="text-sm font-bold text-slate-600">
                {label}
            </label>
            <input
                type="text"
                placeholder={placeholder}
                value={innerValue}
                onChange={(e) => setInnerValue(e.target.value)}
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
                    placeholder-slate-400 
                    focus:outline-none 
                    focus:border-slate-900 
                    focus:ring-1 
                    focus:ring-slate-900 
                    transition-all
                    font-medium
                "
            />
        </div>
    );
}

export default React.memo(SearchInput);
