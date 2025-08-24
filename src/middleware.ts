import { NextRequest, NextResponse } from 'next/server';

// Configuración de idiomas
const locales = ['es', 'en'];
const defaultLocale = 'es'; // Establecemos español como idioma predeterminado

// Obtener el base path desde la variable de entorno o usar un valor predeterminado
// Debe coincidir con el valor en next.config.ts
const basePath = process.env.BASE_PATH || '';

// Esta función se ejecuta en cada solicitud
export function middleware(request: NextRequest) {
  // Obtener la ruta solicitada
  const pathname = request.nextUrl.pathname;
  
  // Remover el basePath de la ruta para procesamiento
  const pathnameWithoutBasePath = pathname.replace(basePath, '') || '/';
  
  // Verificar si la ruta ya tiene un locale
  const pathnameHasLocale = locales.some(
    (locale) => pathnameWithoutBasePath.startsWith(`/${locale}/`) || pathnameWithoutBasePath === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Obtener el locale preferido del usuario desde las cabeceras
  const acceptLanguage = request.headers.get('accept-language') || '';
  let locale = defaultLocale;

  // Intentar encontrar un idioma compatible
  for (const lang of acceptLanguage.split(',')) {
    const langCode = lang.split(';')[0].trim().split('-')[0];
    if (locales.includes(langCode)) {
      locale = langCode;
      break;
    }
  }

  // Redirigir a la ruta con el locale, incluyendo el basePath
  return NextResponse.redirect(
    new URL(`${basePath}/${locale}${pathnameWithoutBasePath === '/' ? '' : pathnameWithoutBasePath}`, request.url)
  );
}

// Configurar las rutas que serán afectadas por el middleware
export const config = {
  matcher: [
    // Excluir rutas que no necesitan redirección
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
};
