import React from "react";
import type { DropdownOption } from "@/types/domain";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/_components/ui/select";
import { Label } from "@/app/_components/ui/label";

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
        <div className="flex flex-col gap-1.5 w-full" style={style}>
            <Label className="text-xs font-bold text-slate-600">{label}</Label>
            
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger 
                    className="
                        w-full 
                        bg-white 
                        shadow-sm 
                        text-slate-700 
                        font-medium 
                        transition-all 
                        focus-visible:ring-1 
                        focus-visible:ring-slate-900 
                        focus-visible:border-slate-900
                    "
                >
                    <SelectValue placeholder="Select option..." />
                </SelectTrigger>
                
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {options?.map((option) => (
                        <SelectItem key={option?.key} value={option?.value}>
                            {option?.value?.toUpperCase()}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

export default React.memo(DropdownInput);