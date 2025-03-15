"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ParamProps } from "@/types/appNode";
import { useEffect, useId, useState } from "react";

function NumberParam({
  param,
  value,
  updateNodeParamValue,
  disabled
}: ParamProps) {
  const [internalValue, setInternalValue] = useState(value);
  const id = useId();

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-400 px-2">*</p>}
      </Label>
      <Input
        id={id}
        type="number"
        disabled={disabled}
        value={internalValue}
        className="text-xs"
        placeholder="Enter value here"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInternalValue(e.target.value)
        }
        onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
          updateNodeParamValue(e.target.value)
        }
      />
      {param.helperText && (
        <p className="text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  );
}

export default NumberParam;
