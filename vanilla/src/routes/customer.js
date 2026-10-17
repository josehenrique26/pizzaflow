// src/routes/customer.js — rotas do perfil cliente: [padrão da hash, função da tela(app, params)].
import { renderCustomerAccess } from "../pages/customer-access.js";
import { renderShopUnavailable } from "../pages/shop-unavailable.js";
import { renderMenu } from "../pages/menu.js";
import { renderCart } from "../pages/cart.js";
import { renderOrders } from "../pages/orders.js";
import { obterDados, lerSessao, gravarSessao } from "../services/storage.js";
import { resolveCompany } from "../utils/company.js";

// #/loja/:slug — valida o estabelecimento, guarda como última loja e abre o cardápio.
function openShop(app, { slug }) {
  const result = resolveCompany(slug, obterDados().companies);
  if (!result.ok) return renderShopUnavailable(app, result);
  gravarSessao({ ...lerSessao(), lastShop: result.company.slug });
  return renderMenu(app, { company: result.company });
}

// #/menu — atalho: volta para a última loja visitada (ou pede o link/código).
function openLastShop() {
  const { lastShop } = lerSessao();
  location.replace(lastShop ? `#/loja/${lastShop}` : "#/acesso");
}

export const customerRoutes = [
  ["#/acesso", renderCustomerAccess],
  ["#/loja/:slug", openShop],
  ["#/menu", openLastShop],
  ["#/cart", renderCart],
  ["#/orders", renderOrders],
];
