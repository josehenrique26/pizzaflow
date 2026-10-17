// src/pages/shop-unavailable.js — estabelecimento não encontrado ou inativo (RF-CLI-13).
import { el, mount } from "../components/dom.js";

export function renderShopUnavailable(app, { reason, company }) {
  const inactive = reason === "inactive";
  mount(app, el("main", { class: "access access--error" },
    el("h1", {}, inactive ? `${company.name} não está recebendo pedidos` : "Estabelecimento não encontrado"),
    el("p", { class: "access__lead" }, inactive
      ? "O estabelecimento está inativo no momento. Tente novamente mais tarde."
      : "Confira o link ou o código e tente novamente."),
    el("a", { class: "access__submit", href: "#/acesso" }, "Informar outro link ou código")));
}
