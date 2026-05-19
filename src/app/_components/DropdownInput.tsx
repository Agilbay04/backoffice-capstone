import React from 'react';

interface DropdownOption {
    value: string;
    label: string;
}

interface DropdownInputProps {
    label: string;
    value: string | undefined;
    options: DropdownOption[];
    onChange: (value: string) => void;
    style?: React.CSSProperties;
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '150px', ...style }}>
        <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{ 
                padding: '8px', 
                borderRadius: '4px', 
                border: '1px solid #cbd5e1', 
                background: '#fff',
                cursor: 'pointer'
            }}
        >
            {options.map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
            ))}
        </select>
        </div>
    );
}

export default React.memo(DropdownInput);
