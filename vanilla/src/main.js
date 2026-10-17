// Ponto de entrada e roteamento: lê a hash da URL (#/menu) e chama a função da tela correspondente.
import { renderHome } from "./pages/home.js";
import { renderAdminMenu } from "./pages/admin-menu.js";
import { renderAdminOrders } from "./pages/admin-orders.js";
import { renderCourierAvailable } from "./pages/courier-available.js";
import { renderCourierTrip } from "./pages/courier-trip.js";
import { customerRoutes } from "./routes/customer.js";
import { matchRoute } from "./utils/route.js";

import "./styles/main.css";
import "./styles/customer.css";

// Cada rota: [padrão da hash, função da tela(app, params)]. As rotas do cliente ficam em routes/customer.js.
const routes = [
  ...customerRoutes,
  ["#/", renderCourierAvailable], // Padrão aponta para a tela do entregador enquanto a home não é implementada
  ["#/home", renderHome],
  ["#/admin/menu", renderAdminMenu],
  ["#/admin/orders", renderAdminOrders],
  ["#/courier/available", renderCourierAvailable],
  ["#/courier/trip", renderCourierTrip],
];

function navigate() {
  const app = document.getElementById("app");
  const hash = location.hash || "#/";
  for (const [pattern, render] of routes) {
    const params = matchRoute(pattern, hash);
    if (params) return render(app, params);
  }
  renderCourierAvailable(app, {});
}

window.addEventListener("hashchange", navigate);
navigate();
