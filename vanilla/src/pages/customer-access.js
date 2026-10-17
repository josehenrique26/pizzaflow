// src/pages/customer-access.js — tela de acesso do cliente (RF-CLI-13): informa o link ou o código do estabelecimento.
import { el, mount } from "../components/dom.js";
import { obterDados } from "../services/storage.js";
import { resolveCompany } from "../utils/company.js";

const MODES = {
  link: { tab: "Tenho o link", label: "Link do estabelecimento", placeholder: "peddi.app/forno-da-vila" },
  code: { tab: "Tenho o código", label: "Código do estabelecimento", placeholder: "VILA482" },
};
const EXAMPLES = [
  { text: "Forno da Vila (link)", mode: "link", value: "forno-da-vila" },
  { text: "Burger Quintal (código)", mode: "code", value: "BURG731" },
  { text: "Empresa inativa", mode: "code", value: "LIA905" },
  { text: "Código inexistente", mode: "code", value: "XXXX000" },
];
const MESSAGES = {
  empty: () => "Informe o link ou o código do estabelecimento.",
  not_found: () => "Não encontramos um estabelecimento com esse link ou código.",
  inactive: (company) => `${company.name} não está recebendo pedidos no momento.`,
};

export function renderCustomerAccess(app) {
  const { companies } = obterDados();
  let mode = "link";

  const label = el("label", { for: "access-input" }, MODES.link.label);
  const input = el("input", {
    id: "access-input", type: "text", name: "access", autocomplete: "off",
    placeholder: MODES.link.placeholder, "aria-describedby": "access-error",
    oninput: () => { if (!error.hidden) clearError(); },
  });
  const error = el("p", { id: "access-error", class: "access__error", role: "alert", hidden: true });
  const tabs = Object.entries(MODES).map(([key, cfg]) =>
    el("button", { type: "button", class: "access__tab", "aria-pressed": key === mode, onclick: () => setMode(key) }, cfg.tab));

  function setMode(next) {
    mode = next;
    label.textContent = MODES[next].label;
    input.placeholder = MODES[next].placeholder;
    Object.keys(MODES).forEach((key, i) => tabs[i].setAttribute("aria-pressed", String(key === next)));
    clearError();
    input.focus();
  }
  function showError(message) {
    error.textContent = message;
    error.hidden = false;
    input.setAttribute("aria-invalid", "true");
    input.focus();
  }
  function clearError() {
    error.textContent = "";
    error.hidden = true;
    input.removeAttribute("aria-invalid");
  }
  function handleSubmit(event) {
    event.preventDefault();
    const result = resolveCompany(input.value, companies);
    if (!result.ok) return showError(MESSAGES[result.reason](result.company));
    clearError();
    location.hash = `#/loja/${result.company.slug}`;
  }

  const form = el("form", { class: "access__form", novalidate: true, onsubmit: handleSubmit },
    el("div", { class: "access__tabs" }, tabs), label, input, error,
    el("button", { type: "submit", class: "access__submit" }, "Acessar cardápio"));
  const examples = el("div", { class: "access__examples" },
    el("span", {}, "Experimente:"),
    EXAMPLES.map((ex) => el("button", {
      type: "button", class: "access__chip",
      onclick: () => { setMode(ex.mode); input.value = ex.value; form.requestSubmit(); },
    }, ex.text)));

  mount(app, el("main", { class: "access" },
    el("h1", {}, "Peça direto do seu restaurante favorito"),
    el("p", { class: "access__lead" }, "Informe o link ou o código do estabelecimento para ver o cardápio."),
    form, examples,
    el("p", { class: "access__hint" }, "O Peddi não é um marketplace: cada estabelecimento tem o seu próprio link e código.")));
}
