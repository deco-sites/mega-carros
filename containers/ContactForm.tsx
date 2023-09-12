import Button from "mc/components/Button.tsx";
import { useRef, useState } from "preact/hooks";
import { LoaderReturnType } from "$live/types.ts";
import { ContactHandler } from "mc/types/types.ts";
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import type { HTML } from "deco-sites/std/components/types.ts";
import BasicInput, { BasicInputRef } from "mc/components/BasicInput.tsx";

export interface Props {
  cta: string;
  terms: HTML;
  contact: LoaderReturnType<ContactHandler>;

  /**
   * @description The success message to be shown when form is sent
   */
  successMessage: HTML;
}

export default function ContactForm(props: Props) {
  const { cta, terms, successMessage, contact } = props;

  const [isSending, setIsSending] = useState(false);
  const [isFormSent, setIsFormSent] = useState(false);
  const [err, setErr] = useState({ name: false, email: false, phone: false });

  const nameRef = useRef<BasicInputRef>(null);
  const getName = () => nameRef.current?.input?.value || "";

  const emailRef = useRef<BasicInputRef>(null);
  const getEmail = () => emailRef.current?.input?.value || "";

  const phoneRef = useRef<BasicInputRef>(null);
  const getPhone = () => phoneRef.current?.input?.value || "";

  const isEmailInvalid = () => {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return !regex.test(getEmail());
  };

  const isPhoneInvalid = () => {
    const regex = /^(\([0-9]{2}\)\s[0-9]{4,5}-[0-9]{4})$/;
    return !regex.test(getPhone());
  };

  const validate = () => {
    const errors: typeof err = {
      email: isEmailInvalid(),
      phone: isPhoneInvalid(),
      name: getName().length < 3,
    };

    setErr(errors);
    return !errors.name && !errors.email && !errors.phone;
  };

  const submit = async () => {
    if (!validate() || isSending) {
      return;
    }

    const name = getName();
    const email = getEmail();
    const phone = getPhone();

    setIsSending(true);
    const endpoint = `${contact.api}/contact`;
    const headers = { Authorization: `Bearer ${contact.token}` };
    const payload = { email, name, page: window.location.href, phone };
    await axiod.post(endpoint, payload, { headers });
    setIsFormSent(true);
  };

  return (
    <div class="relative flex flex-col gap-6 w-full bg-gray-800 bg-opacity-80 p-6">
      <div class={`flex flex-col gap-6 ${isFormSent ? "invisible" : ""}`}>
        <BasicInput
          required
          name="name"
          label="Nome"
          ref={nameRef}
          error={err.name}
        />

        <BasicInput
          required
          name="email"
          type="email"
          label="E-mail"
          ref={emailRef}
          error={err.email}
        />

        <BasicInput
          required
          name="phone"
          ref={phoneRef}
          error={err.phone}
          label="Telefone/Whatsapp"
          mask={["(00) 0000-0000", "(00) 00000-0000"]}
        />

        <Button loading={isSending} action={submit}>
          {cta}
        </Button>
      </div>

      {isFormSent && (
        <div
          class="absolute top-6"
          dangerouslySetInnerHTML={{ __html: successMessage }}
        />
      )}

      <hr />

      <div
        class="text-sm text-gray-400"
        dangerouslySetInnerHTML={{ __html: terms }}
      />
    </div>
  );
}
