# CLAUDE.md

# Susi Escolano SL — Design System & Development Guide

## Filosofía del proyecto

Este proyecto NO es una web de reformas convencional.

Debe transmitir la misma sensación que un estudio de interiorismo o arquitectura de alto nivel.

La experiencia debe sentirse:

- Premium
- Atemporal
- Elegante
- Muy cuidada
- Visual
- Limpia
- Cercana
- Sofisticada

El usuario debe percibir confianza desde los primeros segundos.

La web debe hacer pensar:

> "Si cuidan así su propia imagen, cuidarán igual mi vivienda."

Nunca debe sentirse como una plantilla de WordPress ni como una landing genérica.

---

# Objetivo

Generar solicitudes de presupuesto de clientes que buscan reformas de calidad.

El objetivo NO es vender por precio.

El objetivo es transmitir confianza, diseño y profesionalidad.

---

# Público objetivo

Personas que quieren reformar:

- vivienda habitual
- chalet
- ático
- apartamento
- cocina
- baño

Buscan una empresa que se encargue de todo el proceso.

Valoran:

- confianza
- diseño
- experiencia
- acabados
- comunicación
- tranquilidad

No buscan la opción más barata.

---

# Empresa

Susi Escolano SL

Empresa familiar especializada en:

- Reformas integrales
- Interiorismo
- Diseño de espacios
- Proyectos
- Reformas de cocinas
- Reformas de baños

Zona principal:

- Elche
- Alicante
- Santa Pola
- Crevillente
- El Altet
- Arenales del Sol
- alrededores

---

# Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Framer Motion
- shadcn/ui
- Lucide React

No instalar librerías innecesarias.

---

# Arquitectura

Landing One Page.

No crear múltiples páginas salvo petición expresa.

Cada bloque será un componente independiente.

Ejemplo:

components/

Hero.tsx

Navbar.tsx

Services.tsx

Projects.tsx

BeforeAfter.tsx

Process.tsx

Testimonials.tsx

Contact.tsx

Footer.tsx

---

# Orden de la Landing

1 Hero

2 Servicios

3 Proyectos destacados

4 Antes / Después

5 Nuestro proceso

6 Sobre nosotros

7 Opiniones

8 Contacto

9 Footer

Este orden puede modificarse si mejora la experiencia.

---

# Dirección artística

Inspiración:

- Norm Architects
- Vincent Van Duysen
- Studio McGee
- John Pawson
- Apple
- Foster + Partners

No copiar.

Inspirarse en la limpieza visual.

---

# Paleta de color

Nunca usar blanco puro.

Nunca usar negro puro.

## Fondo principal

#F6F3EE

## Fondo secundario

#EFE8DF

## Texto principal

#202020

## Texto secundario

#6B665F

## Color de acento

#B08B64

## Hover

#92704F

Todo debe sentirse cálido.

---

# Tipografía

Títulos:

Serif elegante.

Preferiblemente:

- Cormorant Garamond

Texto:

Sans moderna.

Preferiblemente:

- Inter

Mucho aire.

Nunca bloques enormes.

---

# Estilo visual

Muchísimo espacio en blanco.

Fotografía muy grande.

Mucho margen.

Mucho respiro.

No saturar.

No utilizar tarjetas innecesarias.

No utilizar fondos con demasiada textura.

Todo debe sentirse muy limpio.

---

# Hero

El Hero debe ser la sección más espectacular.

No debe parecer una landing.

Debe sentirse como la portada de una revista de interiorismo.

Elementos:

- Navbar transparente
- Imagen protagonista
- Poco texto
- Dos CTAs
- Animaciones muy suaves

Nunca llenar el Hero de cajas o overlays.

---

# Navbar

Muy minimalista.

Transparente sobre el Hero.

Al hacer scroll:

- fondo crema
- blur ligero
- borde inferior muy sutil

No utilizar sombras grandes.

---

# Animaciones

Siempre muy suaves.

Nunca exageradas.

Duraciones largas.

Preferir:

opacity

translateY

scale muy leve

Nunca abusar de:

rotate

bounce

elastic

Todo debe sentirse premium.

---

# Imágenes

Prioridad absoluta.

Siempre utilizar fotografías grandes.

Evitar imágenes pequeñas.

Mantener una relación de aspecto coherente.

Optimizar siempre con Next/Image.

Usar formato WEBP.

---

# Componentes

Todos los componentes deben ser reutilizables.

Nunca duplicar código.

Mantener separación clara de responsabilidades.

---

# Responsive

Mobile First.

No esconder contenido importante.

La experiencia móvil debe sentirse igual de premium que escritorio.

No intentar copiar exactamente el Hero desktop.

Adaptar composición.

---

# CTAs

Principal:

Solicitar presupuesto

Secundarios:

Ver proyectos

Hablar por WhatsApp

Llamar

Nunca abusar de botones.

---

# SEO

Optimizar para búsquedas locales:

- Reformas en Elche
- Reformas integrales en Elche
- Interiorismo en Elche
- Reformas de cocinas
- Reformas de baños
- Empresa de reformas en Alicante

Los textos deben ser naturales.

Nunca hacer keyword stuffing.

---

# Código

Priorizar:

legibilidad

reutilización

componentización

performance

accesibilidad

No complicar el proyecto innecesariamente.

Explicar siempre el plan antes de realizar cambios grandes.

---

# Regla principal

Ante cualquier decisión de diseño, preguntarse:

"¿Esto hace que la web parezca más exclusiva y más elegante?"

Si la respuesta es no,

buscar una solución mejor.

La simplicidad siempre gana.

# Lo que NO queremos

Nunca hacer una web que parezca:

- una plantilla de ThemeForest
- una landing de marketing agresiva
- un dashboard
- una empresa low-cost
- una web recargada
- una web llena de tarjetas
- una web con demasiados iconos
- una web con exceso de texto
- una web oscura
- una web con demasiados efectos
- una web donde las animaciones sean protagonistas

La protagonista siempre debe ser la calidad de los proyectos.

# Regla de oro

Antes de generar cualquier componente, comprobar que cumple estas cuatro condiciones:

1. Es visualmente limpio.
2. Es fácil de usar en móvil.
3. Mantiene coherencia con el resto de la web.
4. Parece el trabajo de un estudio de diseño premium.

Si no cumple las cuatro, replantear la solución antes de escribir código.
