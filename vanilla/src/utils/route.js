// src/utils/route.js — casamento de rotas por hash com parâmetros (regra pura, sem DOM).

// matchRoute("#/loja/:slug", "#/loja/forno-da-vila") -> { slug: "forno-da-vila" }; sem casamento -> null
export function matchRoute(pattern, hash) {
  const modelo = pattern.split("/");
  const atual = hash.split(/[?]/)[0].replace(/\/+$/, "").split("/");
  if (modelo.length !== atual.length) return null;
  const params = {};
  for (let i = 0; i < modelo.length; i++) {
    if (modelo[i].startsWith(":")) {
      if (!atual[i]) return null;
      params[modelo[i].slice(1)] = decodeURIComponent(atual[i]);
    } else if (modelo[i] !== atual[i]) return null;
  }
  return params;
}
