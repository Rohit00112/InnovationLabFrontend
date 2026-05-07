"use client";

import PageLayout from "@/components/primitives/PageLayout";
import PageHeader from "@/components/primitives/PageHeader";
import { ContactInfoCard } from "@/components/Contacts/ContactInfoCard";
import Carousel from "@/components/Carousel";
import { FadeIn, StaggerIn } from "@/components/Contacts/FadeIn";
import Map from "@/components/Contacts/Map";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { publicContactText, publicPageTitles } from "@/constants/ui/public";
import { useState } from "react";
import { postApiV1Contacts } from "@/lib/services/generated/frontend";
import { t } from "@/lib/i18n/messages";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function validate(values: Record<string, string>) {
    const errors: Record<string, string> = {};
    if (!values.email || values.email.trim() === "") {
      errors.email = t("public.contact.validation.emailRequired" as const);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = t("public.contact.validation.invalidEmail" as const);
    }

    if (!values.message || values.message.trim() === "") {
      errors.message = t("public.contact.validation.messageRequired" as const);
    }

    return errors;
  }

  return (
    <PageLayout>
      <PageHeader title={publicPageTitles.contact} />

      <div className="grid w-full border border-gray-300 bg-white">
        <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
          <FadeIn delay={0.08} y={26}>
            <form
              className="border border-gray-300 p-4 duration-300 sm:p-6 md:p-10"
              onSubmit={async (e) => {
                e.preventDefault();
                setStatusMessage(null);
                setFieldErrors({});

                const form = e.currentTarget as HTMLFormElement;
                const fd = new FormData(form);
                const values: Record<string, string> = {
                  name: String(fd.get("contact-name") ?? "").trim(),
                  email: String(fd.get("contact-email") ?? "").trim(),
                  title: String(fd.get("contact-title") ?? "").trim(),
                  message: String(fd.get("contact-message") ?? "").trim(),
                };

                const errors = validate(values);
                if (Object.keys(errors).length > 0) {
                  setFieldErrors(errors);
                  return;
                }

                setLoading(true);
                try {
                  await postApiV1Contacts({
                    name: values.name || null,
                    email: values.email || null,
                    subject: values.title || null,
                    message: values.message || null,
                    phoneNumber: null,
                  });

                  setStatusMessage(t("public.contact.sendSuccess" as const));
                  form.reset();
                } catch (err) {
                  console.error("Contact submit error:", err);
                  setStatusMessage(t("public.contact.sendError" as const));
                } finally {
                  setLoading(false);
                }
              }}
            >
              <div className="relative z-10 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {publicContactText.heroTitle}
                </h2>
                <p className="text-gray-500 text-base leading-relaxed">
                  {publicContactText.heroSubtitle}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="group">
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-900">
                    {publicContactText.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    name="contact-name"
                    type="text"
                    placeholder={publicContactText.namePlaceholder}
                    className="h-12 w-full border border-neutral-900 bg-white px-4 text-xs uppercase tracking-[0.12em] outline-none"
                  />
                  {fieldErrors.name && (
                    <p className="mt-1 text-xs text-error">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div className="group">
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-900">
                    {publicContactText.emailLabel}
                  </label>
                  <input
                    id="contact-email"
                    name="contact-email"
                    type="email"
                    placeholder={publicContactText.emailPlaceholder}
                    className="h-12 w-full border border-neutral-900 bg-white px-4 text-xs uppercase tracking-[0.12em] outline-none"
                  />
                  {fieldErrors.email && (
                    <p className="mt-1 text-xs text-error">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 group">
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-900">
                  {publicContactText.titleLabel}
                </label>
                <input
                  id="contact-title"
                  name="contact-title"
                  type="text"
                  defaultValue={publicContactText.titleDefault}
                  className="w-full border border-neutral-900 bg-white px-4 py-3 text-xs uppercase tracking-[0.12em] outline-none"
                />
              </div>

              <div className="mt-4 group">
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-900">
                  {publicContactText.messageLabel}
                </label>
                <textarea
                  id="contact-message"
                  name="contact-message"
                  rows={5}
                  placeholder={publicContactText.messagePlaceholder}
                  className="w-full resize-none border border-neutral-900 bg-white px-4 py-3 text-xs uppercase tracking-[0.12em] outline-none"
                />
                {fieldErrors.message && (
                  <p className="mt-1 text-xs text-error">
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-400">
                  <span className="mr-2 inline-block h-2 w-2 bg-cyan-400 animate-pulse" />
                  {publicContactText.statusAwaiting}
                </p>

                {statusMessage && (
                  <div className="ml-4 text-sm text-(--neutral-700)">
                    {statusMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 border border-black bg-black px-10 text-[12px] font-extrabold uppercase tracking-[0.2em] text-white sm:w-auto"
                >
                  {loading ? "Sending..." : publicContactText.send}
                  <span aria-hidden>→</span>
                </button>
              </div>
            </form>
          </FadeIn>

          <FadeIn delay={0.15} y={30}>
            <div className="relative w-full h-full min-h-90 overflow-hidden border border-neutral-300 bg-linear-to-b from-[#1a1a1a] to-[#0a0a0a]">
              <Map />
            </div>
          </FadeIn>
        </div>

        <StaggerIn
          className="mt-8 grid border border-neutral-300 md:grid-cols-4"
          delayChildren={0.12}
          staggerChildren={0.09}
        >
          <ContactInfoCard
            title={publicContactText.infoEmailTitle}
            content={publicContactText.infoEmailContent}
            Icon={Mail}
            isBordered
          />
          <ContactInfoCard
            title={publicContactText.infoPhoneTitle}
            content={publicContactText.infoPhoneContent}
            Icon={Phone}
            isBordered
          />
          <ContactInfoCard
            title={publicContactText.infoLocationTitle}
            content={publicContactText.infoLocationContent}
            Icon={MapPin}
            isBordered
          />
          <ContactInfoCard
            title={publicContactText.infoUptimeTitle}
            content={publicContactText.infoUptimeContent}
            Icon={Clock3}
            isBordered={false}
          />
        </StaggerIn>
      </div>

      <div className="overflow-hidden px-0 min-w-full">
        <Carousel />
      </div>
    </PageLayout>
  );
}
