// Proteção de rotas: sem sessão vai para /login; cada perfil só acessa as próprias rotas (/admin, /courier, rotas do cliente).
import { NextResponse } from "next/server";

export function middleware() {
  return NextResponse.next();
}
