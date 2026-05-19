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

    useEffect(() => {
        setInnerValue(value);
    } , [value]);

    useEffect(() => {
        if (innerValue === value) return;

        const delayDebounce = setTimeout(() => {
            onChange(innerValue);
        }, debounceDelay);

        return () => clearTimeout(delayDebounce);
    }, [innerValue, debounceDelay, onChange, value]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1, width: '150px', ...style }}>
        <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>{label}</label>
        <input
            type="text"
            placeholder={placeholder}
            value={innerValue}
            onChange={(e) => setInnerValue(e.target.value)}
            style={{ 
                padding: '8px', 
                borderRadius: '4px', 
                border: '1px solid #cbd5e1', 
                ...style 
            }}
        />
        </div>
    );
}

export default React.memo(SearchInput);
