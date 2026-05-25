import { Label } from "@/app/_components/ui/label"
import { Input } from "@/app/_components/ui/input"
import { forwardRef } from "react";

interface FormInputProps extends React.ComponentProps<"input"> {
  label?: string
  error?: string
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ type = "text", label, error, id, ...props }, ref) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined)

    return (
      <div className="space-y-1.5">
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <Input
          ref={ref}
          id={inputId}
          type={type}
          aria-invalid={error ? "true" : undefined}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500">{error}</p>
        )}
      </div>
    )
  }
)

FormInput.displayName = "FormInput"

export { FormInput }
