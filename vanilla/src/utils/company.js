// src/utils/company.js — RF-CLI-13: encontra o estabelecimento a partir de um link ou código (regra pura).

// Reduz o que o cliente digitou ao identificador: "https://peddi.app/Forno-da-Vila?x=1" -> "forno-da-vila".
export function normalizeInput(raw) {
  const texto = String(raw ?? "").trim();
  const limpo = texto.replace(/^https?:\/\//i, "").replace(/^#\/?/, "").split(/[?#]/)[0];
  const partes = limpo.split("/").filter(Boolean);
  return (partes.at(-1) ?? "").toLowerCase();
}

// Retorna { ok: true, company } ou { ok: false, reason: "empty" | "not_found" | "inactive", company? }.
export function resolveCompany(raw, companies) {
  const key = normalizeInput(raw);
  if (!key) return { ok: false, reason: "empty" };
  const company = companies.find((c) => c.slug === key || c.code.toLowerCase() === key);
  if (!company) return { ok: false, reason: "not_found" };
  if (!company.active) return { ok: false, reason: "inactive", company };
  return { ok: true, company };
}
