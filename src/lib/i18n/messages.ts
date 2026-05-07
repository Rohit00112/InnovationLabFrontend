import enMessages from "@/i18n/locales/en.json";

type Primitive = string | number | boolean | null;

type NestedMessageKeys<T> = T extends Primitive
  ? never
  : {
      [K in keyof T & string]: T[K] extends Primitive
        ? K
        : `${K}.${NestedMessageKeys<T[K]>}`;
    }[keyof T & string];

export type MessageKey = NestedMessageKeys<typeof enMessages>;

function getMessageByKey(key: MessageKey): string {
  const path = key.split(".");
  let value: unknown = enMessages;

  for (const segment of path) {
    if (!value || typeof value !== "object" || !(segment in value)) {
      return key;
    }

    value = (value as Record<string, unknown>)[segment];
  }

  return typeof value === "string" ? value : key;
}

export function t(
  key: MessageKey,
  params?: Record<string, string | number>,
): string {
  const template = getMessageByKey(key);

  if (!params) {
    return template;
  }

  return Object.entries(params).reduce(
    (message, [token, value]) =>
      message.replaceAll(`{${token}}`, String(value)),
    template,
  );
}
