import React, { useEffect, useState } from "react";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";

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
            <Label className="text-sm font-bold text-slate-600">{label}</Label>
            <Input
                type="text"
                placeholder={placeholder}
                value={innerValue}
                onChange={(e) => setInnerValue(e.target.value)}
                className="
                    bg-white 
                    shadow-sm 
                    transition-all 
                    focus-visible:ring-1 
                    focus-visible:ring-slate-900 
                    focus-visible:border-slate-900
                "
            />
        </div>
    );
}

export default React.memo(SearchInput);
