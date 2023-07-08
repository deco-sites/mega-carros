import { JSX } from "preact";
import IMask from "mc/helpers/IMask.tsx";
import { forwardRef } from "preact/compat";
import { useEffect, useId, useImperativeHandle, useRef } from "preact/hooks";

export interface Props
  extends Omit<JSX.HTMLAttributes<HTMLInputElement>, "onChange"> {
  name: string;
  label?: string;
  error?: boolean;
  required?: boolean;
  mask?: string | string[];
  onChange?: (value: string) => void;
}

export type BasicInputRef = { input: HTMLInputElement | null };

const BasicInput = forwardRef<BasicInputRef, Props>(
  (props, ref) => {
    const { name, mask, label, error, required, onChange, ...input } = props;

    // refs
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => ({ input: inputRef.current }));

    // ids
    const generatedId = useId();
    const id = `${name}-${generatedId}`;
    const errorClass = error ? "border-2 border-red-500" : "";

    // proxy to simplify onChange fn
    const onChangeProxy: JSX.GenericEventHandler<HTMLInputElement> = (e) => {
      if (!onChange) {
        return;
      }

      const value = e.currentTarget.value;
      onChange(value);
    };

    // apply masks, if its given
    useEffect(() => {
      if (inputRef.current && mask) {
        const options = buildMaskOptions(mask);
        IMask(inputRef.current, options);
      }
    }, [inputRef]);

    return (
      <div class="flex flex-col gap-1">
        <label for={id} class="font-semibold text-sm text-white">
          {required && <span class="text-red-500 mr-1">*</span>}
          {label}
        </label>

        <input
          id={id}
          {...input}
          ref={inputRef}
          required={required}
          onInput={onChangeProxy}
          class={`text-black h-12 flex items-center p-2 rounded-lg ${errorClass}`}
        />
      </div>
    );
  },
);

function buildMaskOptions(mask: string | string[]) {
  if (Array.isArray(mask)) {
    return { mask: mask.map((item) => ({ mask: item })) };
  }

  return { mask };
}

export default BasicInput;
