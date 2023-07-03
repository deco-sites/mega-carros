import Icon from "mc/components/Icon.tsx";
import { forwardRef } from "preact/compat";
import { useSignal } from "@preact/signals";
import Button from "mc/components/Button.tsx";
import { ComponentChildren, Ref } from "preact";
import { useImperativeHandle } from "preact/hooks";

export interface DrawerRef {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export interface DrawerProps {
  size?: string;
  children: ComponentChildren;
}

function Drawer(props: DrawerProps, ref: Ref<DrawerRef>) {
  const isOpen = useSignal(false);
  const open = () => isOpen.value = true;
  const close = () => isOpen.value = false;
  const toggle = () => isOpen.value = !isOpen.value;

  useImperativeHandle<DrawerRef, DrawerRef>(ref, () => ({
    open,
    close,
    toggle,
  }));

  if (!isOpen.value) {
    return null;
  }

  const { size = "80%", children } = props;
  const drawerSize = `w-[${size}]`;

  return (
    <div
      onClick={close}
      class="fixed flex justify-end w-full h-full bg-black bg-opacity-30 top-0 left-0"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        class={`bg-white h-full text-black p-6 flex flex-col ${drawerSize}`}
      >
        <div class="ml-auto -mr-[24px] mb-6">
          <Button type="ghost" mode="tertiary" action={close}>
            <Icon id="x-circle" size={24} />
          </Button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default forwardRef(Drawer);
