import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Lenis from 'lenis'
import logoBlack from './imports/IMAGOTIPO_HORIZONTAL__1__cortado_negro.png'
import logoHeroWhite from './imports/CORTADO-1.png'
import isotipoBlack from './imports/ISOTIPO__1_.png'
import residenciaNosotros from './assets/ideenhaus/nosotros-fachada.jpg'
import mallServicios from './assets/ideenhaus/mall-servicios.png'
import canchasPerspectiva from './assets/ideenhaus/mall-arquitectura.png'
import residenciaNocturna from './assets/ideenhaus/residencia-nocturna.png'
import interiorMisionVision from './assets/ideenhaus/interior-mision-vision.png'
import interiorMateriales from './assets/ideenhaus/interior-materiales.jpg'
import interiorPanoramica from './assets/ideenhaus/interior-panoramica.jpg'
import interiorServicios from './assets/ideenhaus/interior-servicios.png'
import interiorFilosofia from './assets/ideenhaus/interior-filosofia.png'
import palmarFachada from './assets/ideenhaus/palmar-29/fachada.png'
import palmarTerraza from './assets/ideenhaus/palmar-29/terraza.png'
import palmarPiscina from './assets/ideenhaus/palmar-29/piscina.png'
import palmarSala from './assets/ideenhaus/palmar-29/sala.png'
import palmarComedor from './assets/ideenhaus/palmar-29/comedor.png'
import palmarSuite from './assets/ideenhaus/palmar-29/suite-vista.png'
import palmarDormitorio from './assets/ideenhaus/palmar-29/dormitorio.png'
import palmarBano from './assets/ideenhaus/palmar-29/bano.png'
import palmarVestidor from './assets/ideenhaus/palmar-29/vestidor.png'
import yerbabuenaPaseo from './assets/ideenhaus/yerbabuena-iii/paseo.jpg'
import yerbabuenaConjunto from './assets/ideenhaus/yerbabuena-iii/conjunto.jpg'
import yerbabuenaFachadas from './assets/ideenhaus/yerbabuena-iii/fachadas.jpg'
import yerbabuenaComparativa from './assets/ideenhaus/yerbabuena-iii/antes-despues.png'
import casaLVFachada from './assets/ideenhaus/casa-lv/fachada.jpg'
import casaLVAcceso from './assets/ideenhaus/casa-lv/acceso.jpg'
import casaLVPatio from './assets/ideenhaus/casa-lv/patio-interior.jpg'
import casaLVSala from './assets/ideenhaus/casa-lv/sala-comedor.jpg'
import casaLVEscalera from './assets/ideenhaus/casa-lv/escalera.jpg'
import boulevardSala from './assets/ideenhaus/boulevard-heights/sala.png'
import boulevardComedor from './assets/ideenhaus/boulevard-heights/comedor.png'
import boulevardTerraza from './assets/ideenhaus/boulevard-heights/terraza.png'
import boulevardAntesSala from './assets/ideenhaus/boulevard-heights/antes-sala.jpg'
import boulevardAntesComedor from './assets/ideenhaus/boulevard-heights/antes-comedor.jpg'
import boulevardAntesTerraza from './assets/ideenhaus/boulevard-heights/antes-terraza.jpg'
import viventiSala from './assets/ideenhaus/apto-viventi/sala.jpg'
import viventiSalaDetalle from './assets/ideenhaus/apto-viventi/sala-detalle.jpg'
import viventiDormitorio from './assets/ideenhaus/apto-viventi/dormitorio.jpg'
import viventiDormitorioTV from './assets/ideenhaus/apto-viventi/dormitorio-tv.jpg'
import viventiAntesCocina from './assets/ideenhaus/apto-viventi/antes-cocina.jpg'
import viventiAntesSala from './assets/ideenhaus/apto-viventi/antes-sala.jpg'
import viventiSalaComedor from './assets/ideenhaus/apto-viventi/sala-comedor.jpg'
import viventiSofaDetalle from './assets/ideenhaus/apto-viventi/sofa-detalle.jpg'
import valverdeSala from './assets/ideenhaus/valverde-21/sala-comedor.png'
import valverdeTerraza from './assets/ideenhaus/valverde-21/terraza.png'
import valverdePatio from './assets/ideenhaus/valverde-21/patio.png'
import valverdeDormitorioPrincipal from './assets/ideenhaus/valverde-21/dormitorio-principal.png'
import valverdeDormitorio from './assets/ideenhaus/valverde-21/dormitorio.png'
import valverdeBano from './assets/ideenhaus/valverde-21/bano-vestidor.png'
import valverdeBanoDetalle from './assets/ideenhaus/valverde-21/bano-detalle.png'
import valverdeVestidor from './assets/ideenhaus/valverde-21/vestidor.png'
import valverdeCine from './assets/ideenhaus/valverde-21/cine.png'
import terraBellaEstudio from './assets/ideenhaus/terra-bella/estudio.jpg'
import terraBellaSofa from './assets/ideenhaus/terra-bella/sofa.jpg'
import terraBellaBiblioteca from './assets/ideenhaus/terra-bella/biblioteca.jpg'
import terraBellaDormitorio from './assets/ideenhaus/terra-bella/dormitorio.jpg'
import terraBellaObraIluminacion from './assets/ideenhaus/terra-bella/obra-iluminacion.jpg'
import terraBellaObraMobiliario from './assets/ideenhaus/terra-bella/obra-mobiliario.jpg'

// ─── Types ────────────────────────────────────────────────────────────────────
type FilterType = 'todos' | 'arquitectura' | 'interior'
type ViewType = 'home' | 'servicios' | 'arquitectura' | 'interior' | 'nosotros' | 'contacto'

interface Project {
  id: number; name: string; category: 'arquitectura' | 'interior'
  location: string; year: number; area?: string; concept: string
  img: string; imgDetail: string; pattern: number
  gallery?: string[]
  scope?: string
}

// Shared Lenis instance so overlays can pause/resume smooth scroll
let sharedLenis: Lenis | null = null

// ─── Design tokens ────────────────────────────────────────────────────────────
const DISPLAY = { fontSize: 'clamp(40px,11vw,200px)', letterSpacing: '-0.04em', lineHeight: 0.86 }
const DISPLAY_MD = { fontSize: 'clamp(32px,7.2vw,128px)', letterSpacing: '-0.035em', lineHeight: 0.88 }
const BTN = 'ih-btn-motion inline-flex items-center justify-center gap-3 text-[13px] tracking-[0.2em] uppercase px-8 py-4 font-medium max-w-full'
const BTN_PRI = `${BTN} bg-[#FE5100] text-white hover:bg-black`
const BTN_GHOST = `${BTN} border border-black/20 text-black hover:bg-black hover:text-white hover:border-black`
const BTN_BACK = 'mb-10 flex items-center gap-2 text-[#898989] hover:text-black text-[13px] tracking-[0.2em] uppercase transition-colors duration-200 w-fit'
const LABEL_ROW = 'flex items-center gap-3 mb-5'
const LABEL_LINE = 'w-8 h-px bg-[#FE5100] flex-shrink-0'
const LABEL_TEXT = 'text-[#898989] text-[12px] tracking-[0.3em] uppercase'
const BODY = 'text-[16px] md:text-[17px] leading-relaxed text-[#898989]'
const SECTION = 'px-8 md:px-20 py-20 md:py-28'
const SECTION_MX = 'px-8 md:px-20'

// ─── Data ─────────────────────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  { id: 1, name: 'Palmar 29', category: 'arquitectura', location: 'Valle del Cauca', year: 2026, area: '300 m²', pattern: 0, concept: 'Un proyecto integral de arquitectura e interiores concebido para el clima tropical cálido del Valle del Cauca. Espacios abiertos al paisaje, sombra y materiales naturales conectan la vida interior y exterior en una experiencia de habitar serena y contemporánea.', img: palmarTerraza, imgDetail: palmarTerraza, gallery: [palmarTerraza, palmarFachada, palmarPiscina, palmarSala, palmarComedor, palmarSuite, palmarDormitorio, palmarBano, palmarVestidor] },
  { id: 2, name: 'Boulevard Heights Dubai', category: 'interior', location: 'Dubai, EAU', year: 2024, area: '150 m²', pattern: 1, concept: 'Un proyecto integral de diseño interior contemporáneo que transforma un apartamento en Dubai en un espacio de elegancia serena. Tonos neutros, madera e iluminación cuidada articulan ambientes fluidos y acogedores, en diálogo con la luz natural y las vistas urbanas.', img: boulevardSala, imgDetail: boulevardSala, gallery: [boulevardSala, boulevardComedor, boulevardTerraza, boulevardAntesSala, boulevardAntesComedor, boulevardAntesTerraza] },
  { id: 3, name: 'Canchas 2500', category: 'arquitectura', location: 'Pereira, RIS', year: 2026, scope: 'Propuesta de fachada', pattern: 2, concept: 'Una exploración de fachada para un mall comercial integrado a canchas de fútbol sintéticas. Ritmos, materiales e iluminación articulan una identidad contemporánea que conecta la actividad comercial con la experiencia deportiva.', img: mallServicios, imgDetail: mallServicios, gallery: [mallServicios, canchasPerspectiva] },
  { id: 4, name: 'Apto. Viventi', category: 'interior', location: 'Pereira, RIS', year: 2024, area: '70 m²', pattern: 3, concept: 'Un proyecto integral de diseño interior contemporáneo que transforma un apartamento de 70 m² en Pereira en un hogar cálido y funcional. Materiales, mobiliario e iluminación se integran en una composición serena que aprovecha cada espacio y refleja la identidad de quienes lo habitan.', img: viventiSala, imgDetail: viventiSala, gallery: [viventiSala, viventiSalaDetalle, viventiSalaComedor, viventiDormitorio, viventiDormitorioTV, viventiSofaDetalle, viventiAntesCocina, viventiAntesSala] },
  { id: 5, name: 'Yerbabuena III', category: 'arquitectura', location: 'Támesis, ANT', year: 2024, scope: 'Propuesta bioclimática', pattern: 4, concept: 'Una propuesta de medidas bioclimáticas para mejorar la habitabilidad de un conjunto multifamiliar de vivienda de interés social (VIS). El proyecto obtuvo el segundo puesto en el premio Líderes que Transforman del Consejo Colombiano de Construcción Sostenible.', img: yerbabuenaConjunto, imgDetail: yerbabuenaConjunto, gallery: [yerbabuenaConjunto, yerbabuenaPaseo, yerbabuenaFachadas, yerbabuenaComparativa] },
  { id: 6, name: 'Valverde 21', category: 'interior', location: 'El Retiro, ANT', year: 2026, area: '700 m²', pattern: 5, concept: 'Un proyecto integral de diseño interior contemporáneo y ampliación de una vivienda campestre en El Retiro. Materiales naturales, iluminación cuidada y espacios abiertos al paisaje conectan los ambientes existentes con la nueva intervención, creando un hogar sereno y coherente con su entorno.', img: valverdeSala, imgDetail: valverdeSala, gallery: [valverdeSala, valverdeTerraza, valverdePatio, valverdeDormitorioPrincipal, valverdeDormitorio, valverdeBano, valverdeBanoDetalle, valverdeVestidor, valverdeCine] },
  { id: 7, name: 'Casa LV', category: 'arquitectura', location: 'Viterbo, CAL', year: 2024, area: '250 m²', pattern: 0, concept: 'Un proyecto integral de arquitectura e interiores de lenguaje moderno y contemporáneo, concebido para el clima cálido de Viterbo. Patios, celosías y espacios conectados articulan luz, sombra y vegetación para crear una experiencia de habitar fresca y serena.', img: casaLVFachada, imgDetail: casaLVFachada, gallery: [casaLVFachada, casaLVAcceso, casaLVSala, casaLVPatio, casaLVEscalera] },
  { id: 8, name: 'Apto. Terra Bella', category: 'interior', location: 'Pereira, RIS', year: 2025, area: '70 m²', pattern: 1, concept: 'Un proyecto integral de diseño interior contemporáneo para un apartamento de 70 m² en Pereira. Mobiliario a medida, tonos neutros e iluminación integrada crean ambientes funcionales y acogedores, con una identidad serena que acompaña la vida cotidiana.', img: terraBellaEstudio, imgDetail: terraBellaEstudio, gallery: [terraBellaEstudio, terraBellaSofa, terraBellaBiblioteca, terraBellaDormitorio, terraBellaObraIluminacion, terraBellaObraMobiliario] },
]

// Image galleries for the project preview carousel — the project's own detail
// shot leads, followed by others from the same category.
const GALLERY_POOL: Record<'arquitectura' | 'interior', string[]> = {
  arquitectura: [
    'https://images.unsplash.com/photo-1614595737476-42487331b8a1?w=1600&h=1100&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1498262257252-c282316270bc?w=1600&h=1100&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1549791084-5f78368b208b?w=1600&h=1100&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=1600&h=1100&fit=crop&auto=format',
  ],
  interior: [
    'https://images.unsplash.com/photo-1628744876497-eb30460be9f6?w=1600&h=1100&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=1600&h=1100&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1724582586529-62622e50c0b3?w=1600&h=1100&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1646987916641-1f3c8992daa2?w=1600&h=1100&fit=crop&auto=format',
  ],
}
function galleryFor(p: Project): string[] {
  if (p.gallery?.length) return p.gallery
  const own = p.imgDetail
  const rest = GALLERY_POOL[p.category].filter(u => u.split('?')[0] !== own.split('?')[0])
  return [own, ...rest]
}

// ─── Hooks ────────────────────────────────────────────────────────────────────
// Stage — toggles `is-in` when it enters the viewport, driving the
// layered-reveal choreography of its .lr-* children (title → line → image → text)
function Stage({ children, className = '', threshold = 0.2 }: {
  children: React.ReactNode; className?: string; threshold?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    let disposed = false
    const frames = new Set<number>()
    const timers = new Set<ReturnType<typeof setTimeout>>()
    const cleanups: Array<() => void> = []
    const clips = Array.from(el.querySelectorAll<HTMLElement>('.lr-clip, .lr-clip-r, .lr-clip-up'))
    const imageStates = clips.map(clip => ({
      clip,
      image: clip.querySelector<HTMLImageElement>('img'),
      target: clip.parentElement!,
      visible: false,
      ready: false,
      started: false,
      retries: 0,
    }))
    function revealImage(state: typeof imageStates[number]) {
      if (disposed || !state.ready || !state.visible || state.started) return
      state.started = true
      // Keep a painted, closed clip before starting the original transition.
      const first = requestAnimationFrame(() => {
        frames.delete(first)
        const second = requestAnimationFrame(() => {
          frames.delete(second)
          if (!disposed) state.clip.classList.add('lr-image-in')
        })
        frames.add(second)
      })
      frames.add(first)
    }
    function prepareImage(state: typeof imageStates[number]) {
      const image = state.image
      if (disposed || !image || !image.complete || !image.naturalWidth || state.ready) return
      const finish = () => {
        if (disposed || !image.naturalWidth) return
        state.ready = true
        revealImage(state)
      }
      // `load` is authoritative; a stalled/rejected decode must not hide it forever.
      const fallback = setTimeout(() => { timers.delete(fallback); finish() }, 1000)
      timers.add(fallback)
      image.decode().catch(() => {}).finally(() => {
        clearTimeout(fallback)
        timers.delete(fallback)
        finish()
      })
    }
    imageStates.forEach(state => {
      const image = state.image
      if (!image) return
      const onLoad = () => prepareImage(state)
      const onError = () => {
        if (disposed || state.ready || state.retries >= 2) return
        state.retries += 1
        const retry = setTimeout(() => {
          timers.delete(retry)
          if (disposed) return
          const url = new URL(image.src)
          url.searchParams.set('ih-retry', String(state.retries))
          image.src = url.href
        }, state.retries * 750)
        timers.add(retry)
      }
      image.addEventListener('load', onLoad)
      image.addEventListener('error', onError)
      cleanups.push(() => {
        image.removeEventListener('load', onLoad)
        image.removeEventListener('error', onError)
      })
    })
    const preload = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const state = imageStates.find(s => s.target === entry.target)
        if (!state?.image) return
        preload.unobserve(entry.target)
        state.image.loading = 'eager'
        prepareImage(state)
      })
    }, { rootMargin: '600px 0px' })
    const imageObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const state = imageStates.find(s => s.target === entry.target)
        if (!state) return
        state.visible = entry.isIntersecting
        revealImage(state)
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' })
    imageStates.forEach(state => {
      preload.observe(state.target)
      imageObserver.observe(state.target)
    })
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect() }
    }, { threshold: Math.min(threshold, (window.innerHeight * 0.6) / Math.max(1, el.offsetHeight)), rootMargin: '0px 0px -10% 0px' })
    obs.observe(el)
    return () => {
      disposed = true
      obs.disconnect()
      preload.disconnect()
      imageObserver.disconnect()
      frames.forEach(cancelAnimationFrame)
      timers.forEach(clearTimeout)
      cleanups.forEach(cleanup => cleanup())
      clips.forEach(clip => clip.classList.remove('lr-image-in'))
    }
  }, [threshold])
  return <div ref={ref} className={`${inView ? 'is-in' : ''} ${className}`}>{children}</div>
}

// ─── Custom cursor — orange, inverts (negative) over interactive elements ─────
function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduce.matches) return

    document.documentElement.classList.add('ih-cursor')
    const ring = ringRef.current
    if (!ring) return

    let mx = window.innerWidth / 2, my = window.innerHeight / 2
    let rx = mx, ry = my
    let raf = 0

    function loop() {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      ring!.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const interactive = 'a, button, input, textarea, select, [role="button"], label'
    function onMove(e: MouseEvent) {
      mx = e.clientX; my = e.clientY
      const active = !!(e.target as HTMLElement)?.closest?.(interactive)
      ring!.classList.toggle('is-active', active)
    }
    function onLeave() { ring!.classList.add('ih-cursor-hidden') }
    function onEnter() { ring!.classList.remove('ih-cursor-hidden') }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.documentElement.classList.remove('ih-cursor')
    }
  }, [])

  return <div ref={ringRef} className="ih-cursor-ring" aria-hidden />
}

// ─── Loading screen ───────────────────────────────────────────────────────────
function Loader({ done }: { done: boolean }) {
  return (
    <div className={`ih-loader ${done ? 'is-done' : ''}`} aria-hidden={done}>
      <img src={logoBlack} alt="IdeenHaus" className="ih-loader-mark" style={{ height: 40, width: 'auto' }} />
      <div className="ih-loader-track"><div className="ih-loader-bar" /></div>
    </div>
  )
}

// ─── Nav (scroll-driven: starts mid-screen, docks to top on scroll) ───────────
function Nav({ onNavigate, isHome, scrollY, view }: { onNavigate: (v: ViewType) => void; isHome: boolean; scrollY: number; view: ViewType }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)

  const [vh, setVh] = useState(600)
  useEffect(() => {
    const update = () => setVh(window.innerHeight || 600)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const THRESHOLD = 110
  const raw = !isHome ? 1 : scrollY / THRESHOLD
  const progress = Number.isFinite(raw) ? Math.min(1, Math.max(0, raw)) : (isHome ? 0 : 1)
  const scrolled = progress >= 1

  const navTop = (1 - progress) * (vh * 0.5 - 32)

  const animating = progress > 0 && progress < 1
  const elemTransition = animating ? 'none' : 'opacity 0.35s ease'

  useEffect(() => {
    const h = (e: MouseEvent) => { if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false) }
    document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h)
  }, [])

  function go(v: ViewType) { setMenuOpen(false); setDropOpen(false); onNavigate(v) }
  const current = (v: ViewType) => view === v || (v === 'servicios' && (view === 'arquitectura' || view === 'interior'))

  const linkBase = 'text-[12px] tracking-[0.2em] uppercase font-medium whitespace-nowrap'
  const linkColor = scrolled ? 'text-black/60 hover:text-black transition-colors duration-200' : 'text-white/80 hover:text-white transition-colors duration-200'

  return (
    <>
      {/* Nav bar — bg + border fade in on scroll */}
      <nav
        aria-label="Navegación principal"
        onKeyDown={e => {
          if (e.key === 'Escape' && menuOpen) {
            setMenuOpen(false)
            e.currentTarget.querySelector<HTMLButtonElement>('[aria-controls="mobile-menu"]')?.focus()
          }
        }}
        className="fixed left-0 right-0 z-50"
        style={{
          top: navTop,
          height: 64,
          background: `rgba(255,255,255,${progress})`,
          borderBottom: `1px solid rgba(228,228,228,${progress})`,
          overflow: 'visible',
        }}
      >
        <div className="relative h-16 flex items-center justify-between overflow-visible" style={{ padding: '0 clamp(32px,5vw,80px)' }}>

          {/* Nav logo — fades in when scrolled */}
          <button
            onClick={() => go('home')}
            className="flex-shrink-0 flex items-center h-full py-2"
            aria-label="IdeenHaus"
            tabIndex={scrolled ? 0 : -1}
            style={{ opacity: progress, pointerEvents: scrolled ? 'auto' : 'none', transition: elemTransition }}
          >
            <img src={logoBlack} alt="IdeenHaus" style={{ height: 32, width: 'auto' }} />
          </button>

          {/* Right: links + contact — right-aligned */}
          <div className="hidden md:flex items-center gap-8 flex-shrink-0">
            <button tabIndex={scrolled ? 0 : -1} onClick={() => go('home')} className={`${linkBase} ${linkColor}`} style={{ opacity: progress, pointerEvents: scrolled ? 'auto' : 'none', transition: elemTransition }}>Inicio</button>
            <button onClick={() => go('servicios')} className={`${linkBase} ${linkColor}`}>Servicios</button>
            <button onClick={() => go('nosotros')} className={`${linkBase} ${linkColor}`}>Nosotros</button>
            <button
              onClick={() => go('contacto')}
              className={`${linkBase} px-5 py-2.5 border transition-all duration-300`}
              style={scrolled
                ? { borderColor: '#FE5100', color: '#FE5100' }
                : { borderColor: 'rgba(255,255,255,0.45)', color: 'rgba(255,255,255,0.8)' }
              }
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = scrolled ? '#FE5100' : 'rgba(255,255,255,0.15)'
                el.style.color = scrolled ? '#fff' : '#fff'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'transparent'
                el.style.color = scrolled ? '#FE5100' : 'rgba(255,255,255,0.8)'
              }}
            >
              Contacto
            </button>
          </div>

          {/* Mobile hero links — mirror the centered desktop navigation */}
          <div
            inert={progress >= 0.5}
            className="md:hidden absolute inset-0 flex translate-y-20 items-center justify-center gap-4"
            style={{
              opacity: 1 - progress,
              pointerEvents: progress < 0.5 ? 'auto' : 'none',
              transition: elemTransition,
            }}
          >
            <button onClick={() => go('servicios')} className="text-[10px] tracking-[0.14em] uppercase font-medium text-white/80 hover:text-white transition-colors duration-200">Servicios</button>
            <button onClick={() => go('nosotros')} className="text-[10px] tracking-[0.14em] uppercase font-medium text-white/80 hover:text-white transition-colors duration-200">Nosotros</button>
            <button onClick={() => go('contacto')} className="text-[10px] tracking-[0.14em] uppercase font-medium text-white/80 border border-white/45 px-3 py-2 hover:text-white hover:bg-white/15 transition-all duration-300">Contacto</button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px]"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            tabIndex={scrolled ? 0 : -1}
            style={{ opacity: progress, pointerEvents: scrolled ? 'auto' : 'none', transition: elemTransition }}
            onClick={() => setMenuOpen(o => !o)}
          >
            <span className={`block w-6 h-[1.5px] bg-black origin-center transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-black transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-black origin-center transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <div id="mobile-menu" inert={!menuOpen} className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="px-8 py-6 border-t border-[#E4E4E4] bg-white flex flex-col gap-0.5">
            {[['Inicio','home'],['Servicios','servicios'],['Nosotros','nosotros'],['Contacto','contacto']].map(([label, v]) => (
              <button key={v} aria-current={current(v as ViewType) ? 'page' : undefined} onClick={() => go(v as ViewType)} className="text-left py-3 text-[17px] font-bold text-black hover:text-[#FE5100] transition-colors border-b border-[#E4E4E4] last:border-b-0">{label}</button>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ scrollY }: { scrollY: number }) {
  const vh = Math.max(400, typeof window !== 'undefined' ? window.innerHeight : 800)
  const raw = scrollY / (vh * 0.5)
  const progress = Number.isFinite(raw) ? Math.min(1, Math.max(0, raw)) : 0

  return (
    <section className="ih-hero relative overflow-hidden" style={{ height: '100svh' }}>
      <h1 className="sr-only">IdeenHaus — Arquitectura e interiores en Pereira</h1>
      <img
        src={interiorPanoramica}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-black/45" />

      {/* Big hero logo — centered on mobile, left-aligned on desktop */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none md:left-0 md:translate-x-0"
        style={{
          width: 'clamp(260px, 42vw, 700px)',
          opacity: Math.max(0, 1 - progress * 2),
        }}
      >
        <img src={logoHeroWhite} alt="IdeenHaus" style={{ width: '100%', height: 'auto' }} />
      </div>

      {/* Scroll hint — fades out quickly */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        style={{ opacity: Math.max(0, 1 - progress * 4) }}
      >
        <span className="text-white/40 text-[11px] tracking-[0.3em] uppercase mb-1">scroll</span>
        <div className="scroll-indicator w-px h-10 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  )
}

// ─── Project preview (shared) ─────────────────────────────────────────────────
// Editorial expanded view reused by Portafolio and Servicios. Scroll is paused
// while open so closing returns the user to the exact position they left.
function useProjectPreview() {
  const [selected, setSelected] = useState<Project | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  function openPreview(project: Project) {
    setSelected(project)
    sharedLenis?.stop()
    requestAnimationFrame(() => setPreviewOpen(true))
  }
  function closePreview() {
    setPreviewOpen(false)
    sharedLenis?.start()
    window.setTimeout(() => setSelected(null), 560)
  }
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') closePreview() }
    if (selected) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  // Safety: always resume scroll if the host unmounts while a preview is open
  useEffect(() => () => { sharedLenis?.start() }, [])

  return { selected, previewOpen, openPreview, closePreview }
}

// ─── Fullscreen viewer — swipe, pinch-zoom, double-tap, pan ──────────────────
function GalleryViewer({ gallery, idx, name, onGo, onClose }: {
  gallery: string[]; idx: number; name: string; onGo: (d: number) => void; onClose: () => void
}) {
  const [scale, setScale] = useState(1)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [drag, setDrag] = useState(0)
  const [active, setActive] = useState(false)
  const pts = useRef(new Map<number, { x: number; y: number }>())
  const g = useRef({ d0: 0, s0: 1, x0: 0, y0: 0, px: 0, py: 0, t: 0, moved: false, lastTap: 0 })
  const stageRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => { setScale(1); setPos({ x: 0, y: 0 }) }, [idx])
  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true })
    // Escape closes only the viewer, not the whole project preview
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') { e.stopPropagation(); onClose() } }
    document.addEventListener('keydown', onKey, true)
    return () => document.removeEventListener('keydown', onKey, true)
  }, [])

  const clampPos = (x: number, y: number, s: number) => {
    const r = stageRef.current?.getBoundingClientRect()
    if (!r) return { x, y }
    const mx = (r.width * (s - 1)) / 2, my = (r.height * (s - 1)) / 2
    return { x: Math.max(-mx, Math.min(mx, x)), y: Math.max(-my, Math.min(my, y)) }
  }
  const zoomAt = (s: number, cx: number, cy: number) => {
    const r = stageRef.current!.getBoundingClientRect()
    const ox = cx - r.left - r.width / 2, oy = cy - r.top - r.height / 2
    setScale(s); setPos(clampPos(-ox * (s - 1), -oy * (s - 1), s))
  }

  function down(e: React.PointerEvent) {
    if ((e.target as HTMLElement).closest('button')) return
    e.currentTarget.setPointerCapture(e.pointerId)
    pts.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    const a = [...pts.current.values()]
    setActive(true)
    if (a.length === 2) {
      g.current.d0 = Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y); g.current.s0 = scale
      g.current.moved = true
    } else {
      Object.assign(g.current, { px: e.clientX, py: e.clientY, x0: pos.x, y0: pos.y, t: Date.now(), moved: false })
    }
  }
  function move(e: React.PointerEvent) {
    if (!pts.current.has(e.pointerId)) return
    pts.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    const a = [...pts.current.values()]
    if (a.length === 2) {
      const s = Math.max(1, Math.min(4, g.current.s0 * Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y) / g.current.d0))
      setScale(s); setPos(p => clampPos(p.x, p.y, s))
      return
    }
    const dx = e.clientX - g.current.px, dy = e.clientY - g.current.py
    if (Math.abs(dx) + Math.abs(dy) > 8) g.current.moved = true
    if (scale > 1) setPos(clampPos(g.current.x0 + dx, g.current.y0 + dy, scale))
    else setDrag(dx)
  }
  function up(e: React.PointerEvent) {
    if (!pts.current.has(e.pointerId)) return
    pts.current.delete(e.pointerId)
    if (pts.current.size > 0) {
      const [r] = [...pts.current.values()]
      Object.assign(g.current, { px: r.x, py: r.y, x0: pos.x, y0: pos.y })
      return
    }
    setActive(false)
    if (scale < 1.05) { setScale(1); setPos({ x: 0, y: 0 }) }
    if (scale === 1 && Math.abs(drag) > 60) onGo(drag < 0 ? 1 : -1)
    setDrag(0)
    if (!g.current.moved && Date.now() - g.current.t < 300) {
      const now = Date.now()
      if (now - g.current.lastTap < 320) {
        if (scale > 1) { setScale(1); setPos({ x: 0, y: 0 }) } else zoomAt(2.5, e.clientX, e.clientY)
        g.current.lastTap = 0
      } else g.current.lastTap = now
    }
  }
  function wheel(e: React.WheelEvent) {
    const s = Math.max(1, Math.min(4, scale * (e.deltaY < 0 ? 1.15 : 1 / 1.15)))
    if (s === 1) { setScale(1); setPos({ x: 0, y: 0 }) } else zoomAt(s, e.clientX, e.clientY)
  }

  const zoomed = scale > 1
  return (
    <div role="dialog" aria-modal="true" aria-label={`Galería ${name}`}
      className="ih-viewer fixed inset-0 z-[400] bg-black text-white flex flex-col select-none"
      style={{ height: '100dvh' }}>
      <div className="flex items-center justify-between px-5 md:px-10 shrink-0"
        style={{ paddingTop: 'max(14px, env(safe-area-inset-top))', paddingBottom: 14 }}>
        <span className="font-bold tabular-nums text-[13px] tracking-[0.15em]">
          <span className="text-[#FE5100]">{String(idx + 1).padStart(2, '0')}</span>
          <span className="text-white/40 mx-1.5">/</span>
          <span className="text-white/40">{String(gallery.length).padStart(2, '0')}</span>
        </span>
        <span className="hidden sm:block text-[11px] tracking-[0.25em] uppercase text-white/50 truncate px-4">{name}</span>
        <button ref={closeRef} onClick={onClose} aria-label="Cerrar galería"
          className="w-11 h-11 -mr-2 flex items-center justify-center text-white hover:text-[#FE5100] transition-colors">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></svg>
        </button>
      </div>

      <div ref={stageRef} className="relative flex-1 min-h-0 overflow-hidden"
        style={{ touchAction: 'none', cursor: zoomed ? 'grab' : 'zoom-in' }}
        onPointerDown={down} onPointerMove={move} onPointerUp={up}
        onPointerCancel={up} onWheel={wheel}>
        <div className="flex h-full"
          style={{
            transform: `translateX(calc(${-idx * 100}% + ${drag}px))`,
            transition: active ? 'none' : 'transform 0.45s cubic-bezier(0.22,1,0.36,1)',
          }}>
          {gallery.map((src, i) => (
            <div key={src} className="w-full h-full shrink-0 flex items-center justify-center" aria-hidden={i !== idx}>
              <img src={src} alt={`${name} — ${i + 1}`} draggable={false}
                className="max-w-full max-h-full w-full h-full object-contain pointer-events-none"
                loading={Math.abs(i - idx) <= 1 ? 'eager' : 'lazy'}
                style={i === idx ? {
                  transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
                  transition: active ? 'none' : 'transform 0.3s cubic-bezier(0.22,1,0.36,1)',
                } : undefined} />
            </div>
          ))}
        </div>

        {gallery.length > 1 && !zoomed && (
          <>
            <button onClick={() => onGo(-1)} aria-label="Imagen anterior"
              className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/30 items-center justify-center text-white hover:border-[#FE5100] hover:text-[#FE5100] transition-colors">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button onClick={() => onGo(1)} aria-label="Imagen siguiente"
              className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/30 items-center justify-center text-white hover:border-[#FE5100] hover:text-[#FE5100] transition-colors">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </>
        )}
      </div>

      <div className="shrink-0 px-5 md:px-10 pt-3"
        style={{ paddingBottom: 'max(14px, env(safe-area-inset-bottom))' }}>
        <p className="text-center text-[10px] tracking-[0.25em] uppercase text-white/40 mb-3">
          {zoomed ? 'Doble toque para restablecer' : 'Desliza · Pellizca o doble toque para ampliar'}
        </p>
        {gallery.length > 1 && (
          <div className="flex gap-2 overflow-x-auto justify-start sm:justify-center pb-1" style={{ scrollbarWidth: 'none' }}>
            {gallery.map((src, i) => (
              <button key={src} onClick={() => onGo(i - idx)} aria-label={`Ver imagen ${i + 1}`} aria-current={i === idx}
                className="shrink-0 w-14 h-10 overflow-hidden transition-opacity"
                style={{ opacity: i === idx ? 1 : 0.4, outline: i === idx ? '1px solid #FE5100' : 'none', outlineOffset: 2 }}>
                <img src={src} alt="" draggable={false} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ProjectPreview({ selected, previewOpen, onClose }: {
  selected: Project | null; previewOpen: boolean; onClose: () => void
}) {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const [viewerOpen, setViewerOpen] = useState(false)
  const dragX = useRef<number | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!selected) return
    const previous = document.activeElement as HTMLElement | null
    const root = document.getElementById('root')
    const previousOverflow = document.body.style.overflow
    root?.setAttribute('inert', '')
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus({ preventScroll: true })
    return () => {
      root?.removeAttribute('inert')
      document.body.style.overflow = previousOverflow
      previous?.focus({ preventScroll: true })
    }
  }, [selected?.id])
  useEffect(() => { setIdx(0); setDir(1); setViewerOpen(false) }, [selected?.id])
  if (!selected) return null

  const gallery = galleryFor(selected)
  const go = (d: number) => { setDir(d >= 0 ? 1 : -1); setIdx(i => (i + d + gallery.length) % gallery.length) }

  function onDragStart(e: React.PointerEvent) {
    if ((e.target as HTMLElement).closest('button')) return
    dragX.current = e.clientX
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  function onDragEnd(e: React.PointerEvent) {
    if (dragX.current === null) return
    const dx = e.clientX - dragX.current
    dragX.current = null
    if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1)
    else if (Math.abs(dx) < 8) setViewerOpen(true)
  }

  // Rendered through a portal to <body> so the fixed overlay is always
  // viewport-anchored, regardless of any transformed/animated ancestor.
  return createPortal(
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="project-preview-title"
      data-lenis-prevent
      onKeyDown={e => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
        if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
        if (e.key === 'Tab') {
          const controls = dialogRef.current?.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]')
          if (!controls?.length) return
          const first = controls[0], last = controls[controls.length - 1]
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
          if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
        }
      }}
      className="ih-preview fixed inset-0 z-[300] overflow-y-auto overscroll-contain" style={{ pointerEvents: previewOpen ? 'auto' : 'none' }}>
      {/* White pause backdrop */}
      <div onClick={onClose}
        className="absolute inset-0 bg-white transition-opacity duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ opacity: previewOpen ? 1 : 0 }} />

      {/* Close — anchored inside the content area, clear of the nav, always visible */}
      <button ref={closeRef} onClick={onClose}
        className="ih-preview-close absolute top-5 md:top-28 right-8 md:right-16 z-[20] flex items-center gap-2 text-[#898989] hover:text-black text-[12px] tracking-[0.25em] uppercase transition-all duration-300"
        style={{ opacity: previewOpen ? 1 : 0, transitionDelay: previewOpen ? '0.2s' : '0s' }}>
        Cerrar <span aria-hidden className="text-[18px] leading-none">×</span>
      </button>

      {/* Content — smooth expand + fade, single screen (100vh, no scroll) */}
      <div className="ih-preview-content relative min-h-full w-full grid grid-cols-1 md:grid-cols-2"
        style={{
          opacity: previewOpen ? 1 : 0,
          transform: previewOpen ? 'none' : 'translateY(26px) scale(0.985)',
          transition: 'opacity 0.56s cubic-bezier(0.22,1,0.36,1), transform 0.56s cubic-bezier(0.22,1,0.36,1)',
        }}>
        {/* Image panel — carousel, clip reveal, full image (no crop) */}
        <div className="ih-preview-image group relative overflow-hidden bg-[#F4F4F4] h-[44svh] md:h-full select-none"
          style={{ touchAction: 'pan-y', cursor: 'zoom-in' }}
          onPointerDown={onDragStart}
          onPointerCancel={() => { dragX.current = null }}
          onPointerUp={onDragEnd}>
          <button onClick={() => setViewerOpen(true)} aria-label="Ver galería en pantalla completa"
            className="ih-preview-expand absolute top-4 right-4 md:top-6 md:right-6 z-10 w-11 h-11 bg-white/80 backdrop-blur-sm flex items-center justify-center text-black hover:text-[#FE5100] transition-colors"
            style={{ opacity: previewOpen ? 1 : 0, transition: 'opacity 0.5s ease', transitionDelay: previewOpen ? '0.4s' : '0s' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></svg>
          </button>
          <div className="ih-preview-photo absolute inset-0"
            style={{
              clipPath: previewOpen ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
              transition: 'clip-path 0.7s cubic-bezier(0.65,0,0.35,1)',
              transitionDelay: previewOpen ? '0.08s' : '0s',
            }}>
            {gallery.map((src, i) => (
              <img key={src} src={src} alt={`${selected.name} — ${i + 1}`} draggable={false}
                className="absolute inset-0 w-full h-full object-contain p-6 md:p-10 pointer-events-none"
                style={{
                  opacity: i === idx ? 1 : 0,
                  transform: i === idx ? 'translateX(0)' : `translateX(${dir * 24}px)`,
                  transition: 'opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)',
                }} />
            ))}
          </div>

          {gallery.length > 1 && (
            <>
              {/* Circular ring arrows — orange, always visible, reinforce on hover */}
              <button onClick={() => go(-1)} aria-label="Anterior"
                className="ih-preview-arrow group/arrow absolute left-5 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-[#FE5100]/60 bg-white/70 backdrop-blur-sm flex items-center justify-center text-[#FE5100] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#FE5100] hover:bg-white hover:scale-110"
                style={{ opacity: previewOpen ? 0.85 : 0, transitionDelay: previewOpen ? '0.32s' : '0s' }}>
                <span className="inline-flex transition-transform duration-300 group-hover/arrow:-translate-x-1">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><polyline points="15 18 9 12 15 6" /></svg>
                </span>
              </button>
              <button onClick={() => go(1)} aria-label="Siguiente"
                className="ih-preview-arrow group/arrow absolute right-5 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-[#FE5100]/60 bg-white/70 backdrop-blur-sm flex items-center justify-center text-[#FE5100] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#FE5100] hover:bg-white hover:scale-110"
                style={{ opacity: previewOpen ? 0.85 : 0, transitionDelay: previewOpen ? '0.32s' : '0s' }}>
                <span className="inline-flex transition-transform duration-300 group-hover/arrow:translate-x-1">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><polyline points="9 18 15 12 9 6" /></svg>
                </span>
              </button>
              {/* Position indicator + subtle progress line */}
              <div className="ih-preview-counter absolute bottom-5 left-6 md:left-10 z-10 flex items-center gap-4"
                style={{ opacity: previewOpen ? 1 : 0, transition: 'opacity 0.5s ease', transitionDelay: previewOpen ? '0.4s' : '0s' }}>
                <span className="font-bold tabular-nums text-[13px] tracking-[0.15em]">
                  <span className="text-[#FE5100]">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="text-[#C9C9C9] mx-1.5">/</span>
                  <span className="text-[#C9C9C9]">{String(gallery.length).padStart(2, '0')}</span>
                </span>
                <button onClick={() => go(1)} aria-label="Siguiente imagen"
                  className="relative w-24 md:w-32 h-px bg-[#D8D8D8] overflow-hidden">
                  <span className="absolute inset-y-0 left-0 bg-[#FE5100] transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ width: `${((idx + 1) / gallery.length) * 100}%` }} />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Text panel — fits within one screen, no scroll */}
        <div className="ih-preview-text relative flex flex-col justify-center pl-8 md:pl-16 pr-8 md:pr-16 pt-10 md:pt-28 pb-10 md:pb-16">
          <div className="ih-preview-copy max-w-xl">
            <div className="flex items-center gap-4 mb-5 md:mb-8"
              style={{ opacity: previewOpen ? 1 : 0, transform: previewOpen ? 'none' : 'translateY(16px)', transition: 'all 0.6s cubic-bezier(0.22,1,0.36,1)', transitionDelay: '0.22s' }}>
              <span className="w-12 h-px bg-[#FE5100]" />
              <span className={LABEL_TEXT}>{selected.category === 'arquitectura' ? 'Arquitectura' : 'Diseño Interior'}</span>
            </div>

            <h2 id="project-preview-title" className="font-bold mb-5 md:mb-7"
              style={{ fontSize: 'clamp(38px,5.5vw,92px)', letterSpacing: '-0.04em', lineHeight: 0.9, opacity: previewOpen ? 1 : 0, transform: previewOpen ? 'none' : 'translateY(30px)', transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)', transitionDelay: '0.3s' }}>
              {selected.name.split(' ')[0]}<br /><span className="text-[#FE5100]">{selected.name.split(' ').slice(1).join(' ') || '.'}</span>
            </h2>

            <p tabIndex={0} aria-label="Descripción del proyecto" className="ih-preview-description text-[16px] md:text-[19px] leading-relaxed text-black max-w-md"
              style={{ opacity: previewOpen ? 1 : 0, transform: previewOpen ? 'none' : 'translateY(22px)', transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)', transitionDelay: '0.42s' }}>
              {selected.concept}
            </p>

            <div className="ih-preview-meta grid grid-cols-3 gap-6 mt-8 md:mt-12 border-t border-[#E4E4E4] pt-6 md:pt-8"
              style={{ opacity: previewOpen ? 1 : 0, transform: previewOpen ? 'none' : 'translateY(18px)', transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)', transitionDelay: '0.54s' }}>
              <div>
                <span className={`${LABEL_TEXT} block mb-2`}>Ubicación</span>
                <span className="font-bold tracking-tight text-[17px]">{selected.location}</span>
              </div>
              <div>
                <span className={`${LABEL_TEXT} block mb-2`}>Año</span>
                <span className="font-bold tracking-tight text-[17px]">{selected.year}</span>
              </div>
              {(selected.area || selected.scope) && (
                <div>
                  <span className={`${LABEL_TEXT} block mb-2`}>{selected.scope ? 'Alcance' : 'Área'}</span>
                  <span className="font-bold tracking-tight text-[17px]">{selected.scope || selected.area}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {viewerOpen && (
        <GalleryViewer gallery={gallery} idx={idx} name={selected.name} onGo={go} onClose={() => setViewerOpen(false)} />
      )}
    </div>,
    document.body
  )
}

// ─── Portafolio Unificado ─────────────────────────────────────────────────────
function PortafolioUnificado({ onNavigate }: { onNavigate: (v: ViewType) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [filter, setFilter] = useState<FilterType>('todos')
  const { selected, previewOpen, openPreview, closePreview } = useProjectPreview()

  const filtered = filter === 'todos' ? PROJECTS : PROJECTS.filter(p => p.category === filter)
  const count = filtered.length
  const activeIdx = scrollProgress * Math.max(1, count - 1)
  const activeInt = Math.round(activeIdx)

  useEffect(() => {
    function onScroll() {
      const el = sectionRef.current; if (!el) return
      const scrolled = window.scrollY - el.offsetTop
      const scrollable = el.offsetHeight - window.innerHeight
      setScrollProgress(scrollable <= 0 ? 0 : Math.max(0, Math.min(1, scrolled / scrollable)))
    }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [count])

  function handleFilter(f: FilterType) {
    setFilter(f); setScrollProgress(0)
    const el = sectionRef.current; if (el) window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
  }

  const SPACING = 260
  const CARD_H = 380
  const filters: Array<{ f: FilterType; label: string }> = [
    { f: 'todos', label: 'Todos' },
    { f: 'arquitectura', label: 'Arquitectura' },
    { f: 'interior', label: 'Diseño Interior' },
  ]

  return (
    <section ref={sectionRef} id="portafolio" style={{ height: `${(count + 1) * 28}vh` }}>
      <div className="sticky top-16 overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>
        {/* Desktop */}
        <div className="h-full hidden md:grid" style={{ gridTemplateColumns: 'minmax(420px, 34vw) 1fr' }}>
          {/* Left sidebar — editorial visual language (scroll logic untouched) */}
          <div className="flex flex-col justify-between border-r border-[#E4E4E4] pl-8 md:pl-20 pr-8 md:pr-12 py-10 bg-white">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-14 h-px bg-[#FE5100]" />
                <span className={LABEL_TEXT}>01 — Portafolio</span>
              </div>
              <h2 className="font-bold leading-[0.9] mb-8" style={{ fontSize: 'clamp(32px,3.2vw,60px)', letterSpacing: '-0.035em' }}>
                Proyectos<br /><span className="text-[#FE5100]">destacados.</span>
              </h2>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-6 h-px bg-[#E4E4E4] flex-shrink-0" />
                <span className={LABEL_TEXT}>Filtrar</span>
              </div>
              <div className="flex flex-col">
                {filters.map(({ f, label }) => (
                  <button key={f} onClick={() => handleFilter(f)}
                    className={`group text-left py-3.5 font-bold transition-all duration-300 flex items-center gap-3 border-b border-[#E4E4E4] last:border-b-0 tracking-tight ${filter === f ? 'text-black' : 'text-[#C9C9C9] hover:text-black'}`}
                    style={{ fontSize: 'clamp(16px,1.5vw,22px)', letterSpacing: '-0.02em' }}>
                    <span className={`h-[2px] flex-shrink-0 transition-all duration-300 ${filter === f ? 'w-7 bg-[#FE5100]' : 'w-3 bg-[#E4E4E4] group-hover:w-5 group-hover:bg-[#898989]'}`} />
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex gap-1.5 flex-wrap mb-4">
                {filtered.map((_, i) => (
                  <div key={i} className={`h-[2px] transition-all duration-300 ${i === activeInt ? 'bg-[#FE5100] w-8' : 'bg-[#E4E4E4] w-2.5'}`} />
                ))}
              </div>
              <span className="font-bold tabular-nums block mb-6 leading-none" style={{ fontSize: 'clamp(32px,3.2vw,48px)', letterSpacing: '-0.03em' }}>
                <span className="text-[#FE5100]">{String(activeInt + 1).padStart(2, '0')}</span><span className="text-[#E4E4E4] mx-2 font-normal">/</span><span className="text-[#E4E4E4]">{String(count).padStart(2, '0')}</span>
              </span>
              <button onClick={() => onNavigate('servicios')} className={`w-full justify-center ${BTN_PRI} group`}>
                Ver Servicios <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>
          {/* Cards */}
          <div className="relative overflow-hidden bg-[#F4F4F4]">
            {filtered.map((project, i) => {
              const distance = i - activeIdx
              const abs = Math.abs(distance)
              return (
                <div key={`${filter}-${project.id}`} role="button" tabIndex={abs < 0.5 ? 0 : -1}
                  onKeyDown={e => { if (abs < 0.5 && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openPreview(project) } }}
                  onClick={() => { if (abs < 0.5) openPreview(project) }}
                  className={`group ${abs < 0.5 ? 'cursor-pointer' : 'pointer-events-none'}`}
                  style={{
                  position: 'absolute', left: '5%', top: '50%', width: '82%', height: `${CARD_H}px`,
                  transform: `translateY(calc(-50% + ${distance * SPACING}px)) scale(${Math.max(0.54, 1 - abs * 0.17)})`,
                  transformOrigin: 'left center',
                  opacity: Math.max(0, 1 - abs * 0.40),
                  zIndex: Math.round(200 - abs * 30), overflow: 'hidden',
                }}>
                  <img src={project.img} alt={project.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                  <span className="absolute top-6 right-8 text-white/30 font-bold tabular-nums leading-none" style={{ fontSize: 'clamp(28px,3vw,48px)', letterSpacing: '-0.03em' }}>{String(i + 1).padStart(2, '0')}</span>
                  <span className="absolute top-6 left-8 flex items-center gap-2 text-white text-[11px] tracking-[0.25em] uppercase opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    Ver proyecto <span aria-hidden>→</span>
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 px-8 py-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-px bg-[#FE5100] transition-all duration-500 group-hover:w-14" />
                      <span className="text-[#FE5100] text-[12px] tracking-[0.3em] uppercase font-medium">
                        {project.category === 'arquitectura' ? 'Arquitectura' : 'Diseño Interior'}
                      </span>
                    </div>
                    <h3 className="text-white font-bold mb-2" style={{ fontSize: 'clamp(28px,3.4vw,52px)', letterSpacing: '-0.03em', lineHeight: 0.94 }}>{project.name}</h3>
                    <p className="text-white/50 text-[12px] tracking-[0.25em] uppercase">{project.location} · {project.year}{project.area ? ` · ${project.area}` : ''}</p>
                  </div>
                </div>
              )
            })}
            {scrollProgress < 0.05 && (
              <div className="absolute bottom-6 right-8 pointer-events-none z-10 flex flex-col items-center gap-1.5">
                <span className="text-[#898989] text-[11px] tracking-[0.3em] uppercase">scroll</span>
                <div className="scroll-indicator w-px h-6 bg-gradient-to-b from-[#898989] to-transparent" />
              </div>
            )}
          </div>
        </div>
        {/* Mobile */}
        <div className="md:hidden h-full flex flex-col">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#E4E4E4] bg-white flex-shrink-0">
            <span className="font-bold text-[15px] tracking-tight">Proyectos destacados</span>
            <div className="flex gap-4">
              {filters.map(({ f }) => (
                <button key={f} onClick={() => handleFilter(f)}
                  className={`text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-200 ${filter === f ? 'text-[#FE5100]' : 'text-[#898989]'}`}>
                  {f === 'todos' ? 'Todos' : f === 'arquitectura' ? 'Arq.' : 'Int.'}
                </button>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden bg-[#F4F4F4] flex-1">
            {filtered.map((project, i) => {
              const distance = i - activeIdx; const abs = Math.abs(distance)
              return (
                <div key={`m-${filter}-${project.id}`} role="button" tabIndex={abs < 0.5 ? 0 : -1}
                  onKeyDown={e => { if (abs < 0.5 && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openPreview(project) } }}
                  onClick={() => { if (abs < 0.5) openPreview(project) }}
                  className={abs < 0.5 ? '' : 'pointer-events-none'}
                  style={{
                  position: 'absolute', left: '4%', top: '50%', width: '88%', height: '260px',
                  transform: `translateY(calc(-50% + ${distance * 220}px)) scale(${Math.max(0.56, 1 - abs * 0.17)})`,
                  transformOrigin: 'left center',
                  opacity: Math.max(0, 1 - abs * 0.44),
                  zIndex: Math.round(200 - abs * 30), overflow: 'hidden',
                }}>
                  <img src={project.img} alt={project.name} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-[#FE5100] text-[12px] tracking-[0.25em] uppercase font-medium block mb-1">{project.category === 'arquitectura' ? 'Arquitectura' : 'Diseño Interior'}</span>
                    <h3 className="text-white font-bold text-[17px]">{project.name}</h3>
                    <p className="text-white/50 text-[12px] tracking-[0.2em] uppercase">{project.location} · {project.year}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex-shrink-0 px-5 py-3 border-t border-[#E4E4E4] bg-white flex items-center justify-between">
            <span className="text-[#FE5100] text-[12px] tabular-nums font-medium">{String(activeInt + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>
            <button onClick={() => onNavigate('servicios')} className={`${BTN_PRI} group`}>
              Ver Servicios <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </div>
        </div>
      </div>

      <ProjectPreview selected={selected} previewOpen={previewOpen} onClose={closePreview} />
    </section>
  )
}

// ─── About Preview ────────────────────────────────────────────────────────────
function AboutPreview({ onNavigate }: { onNavigate: () => void }) {
  const PREVIEW_H = { fontSize: 'clamp(36px,4.4vw,88px)', letterSpacing: '-0.035em', lineHeight: 0.9 }
  return (
    <Stage className="bg-white border-t border-[#E4E4E4] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center py-24 md:py-40 lg:gap-12">
        {/* Left — text, layered reveal, oversized display */}
        <div className="lg:col-span-5 pl-8 md:pl-20 pr-8 lg:pr-6 min-w-0">
          <div className="lr-title flex items-center gap-4 mb-10">
            <span className="lr-line w-16 h-px bg-[#FE5100]" />
            <span className={LABEL_TEXT}>02 — Nosotros</span>
          </div>
          <h2 className="lr-title font-bold mb-12" style={PREVIEW_H}>
            No diseñamos<br />espacios.<br /><span className="text-[#FE5100]">Creamos</span><br />identidades.
          </h2>
          <p className="lr-text text-[17px] md:text-[19px] leading-snug text-black mb-14 max-w-sm">
            Estudio de arquitectura y diseño interior contemporáneo con sede en Pereira, Colombia, fundado en 2024.
          </p>
          <div className="lr-text lr-text-2 grid grid-cols-3 gap-3 md:gap-10 mb-14 border-t border-[#E4E4E4] pt-10">
            {[{ num: '40+', label: 'Proyectos' }, { num: '2024', label: 'Fundación' }, { num: '100%', label: 'Personalizado' }].map(s => (
              <div key={s.label} className="min-w-0">
                <div className="font-bold mb-1.5 text-[#FE5100] leading-none" style={{ fontSize: 'clamp(30px,3.4vw,52px)', letterSpacing: '-0.03em' }}>{s.num}</div>
                <div className="text-[#898989] text-[9px] tracking-[0.04em] uppercase md:text-[12px] md:tracking-[0.25em]">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="lr-text lr-text-3">
            <button onClick={onNavigate} className={`${BTN_PRI} group`}>
              Conoce más <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </div>
        </div>
        {/* Right — image as protagonist, clip reveal */}
        <div className="lr-img-wrap relative overflow-hidden lg:col-span-6 lg:col-start-7 mt-12 lg:mt-0" style={{ height: '78vh', minHeight: '520px', maxHeight: '900px' }}>
          <div className="absolute inset-0 lr-clip">
            <img src={interiorMateriales} alt="Interior con revestimientos de madera e iluminación integrada, proyecto de IdeenHaus" loading="lazy" className="lr-img absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </Stage>
  )
}

// ─── Contact Preview ──────────────────────────────────────────────────────────
function ContactPreview({ onNavigate }: { onNavigate: () => void }) {
  const items = [
    { label: 'WhatsApp', value: '+57 300 200 2421', href: 'https://wa.me/573002002421' },
    { label: 'Instagram', value: '@ideenhaus.studio', href: 'https://instagram.com/ideenhaus.studio' },
    { label: 'Correo', value: 'arquitectura@ideenhaus.art', href: 'mailto:arquitectura@ideenhaus.art' },
  ]
  return (
    <section className="bg-white border-t border-[#E4E4E4] overflow-hidden">
      {/* Oversized headline — asymmetric, functions as graphic element */}
      <Stage className="pl-8 md:pl-20 pr-8 md:pr-20 pt-24 md:pt-40 pb-16 md:pb-24">
        <div className="lr-title flex items-center gap-4 mb-10">
          <span className="lr-line w-16 h-px bg-[#FE5100]" />
          <span className={LABEL_TEXT}>03 — Contacto</span>
        </div>
        <h2 className="lr-title font-bold leading-none" style={DISPLAY_MD}>
          Hablemos <span className="text-[#FE5100]">de tu</span><br />proyecto.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-12 mt-12 md:mt-16">
          <p className="lr-text md:col-span-5 md:col-start-8 text-[18px] md:text-[21px] leading-snug text-black">
            Estamos listos para escuchar tus ideas y transformarlas en espacios que inspiren.
          </p>
        </div>
      </Stage>

      {/* Contact channels — editorial numbered rows */}
      <Stage className="border-t border-[#E4E4E4]">
        {items.map((item, i) => (
          <a key={item.label} href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="lr-text group block border-t border-[#E4E4E4] first:border-t-0 hover:bg-[#FAFAFA] transition-colors duration-300"
            style={{ transitionDelay: `${0.3 + i * 0.1}s` }}>
            <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-3 pl-8 md:pl-20 pr-8 md:pr-20 py-8 md:py-12">
              <div className="md:col-span-3 flex items-center">
                <span className={LABEL_TEXT}>{item.label}</span>
              </div>
              <div className="md:col-span-7 min-w-0 [overflow-wrap:anywhere] font-bold tracking-tight group-hover:text-[#FE5100] transition-colors duration-300" style={{ fontSize: 'clamp(20px,2.6vw,38px)', letterSpacing: '-0.02em' }}>{item.value}</div>
              <div className="md:col-span-2 flex md:justify-end">
                <span className="text-[#E4E4E4] group-hover:text-[#FE5100] group-hover:translate-x-1 transition-all duration-300 text-[22px]">→</span>
              </div>
            </div>
          </a>
        ))}
      </Stage>

      {/* CTA */}
      <Stage className="border-t border-[#E4E4E4] pl-8 md:pl-20 pr-8 md:pr-20 py-20 md:py-32">
        <button onClick={onNavigate} className={`lr-text ${BTN_PRI} group`}>
          Iniciar conversación <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
        </button>
      </Stage>
    </section>
  )
}

// ─── Servicios Page ───────────────────────────────────────────────────────────
function ServiciosPage({ onNavigate }: { onNavigate: (v: ViewType) => void }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [])

  const services = [
    { v: 'arquitectura' as ViewType, num: '01', title: 'Arquitectura', lead: 'Espacios que redefinen el entorno construido.', desc: 'Proyectamos edificios y estructuras que nacen de un proceso profundo de investigación, contexto y experimentación formal. Desde residencias unifamiliares hasta proyectos de uso mixto, cada obra responde con rigor técnico y visión creativa.', img: mallServicios, tags: ['Residencial', 'Comercial', 'Institucional', 'Renovación'] },
    { v: 'interior' as ViewType, num: '02', title: 'Diseño Interior', lead: 'Espacios interiores con identidad propia.', desc: 'Diseñamos interiores que van más allá de la decoración: cada espacio es una experiencia sensorial construida desde la materialidad, la luz y la composición. Trabajamos con residencias, oficinas y espacios comerciales.', img: interiorServicios, tags: ['Residencial', 'Oficinas', 'Comercial', 'Hotelería'] },
  ]

  return (
    <div className="pt-16 bg-white overflow-hidden">
      {/* Oversized title — functions as a graphic element */}
      <Stage className="pl-8 md:pl-20 pr-8 md:pr-10 pt-16 md:pt-28 pb-24 md:pb-40">
        <button onClick={() => onNavigate('home')} className={`${BTN_BACK} lr-text`}>← Inicio</button>
        <div className="lr-title flex items-center gap-4 mb-10">
          <span className="lr-line w-16 h-px bg-[#FE5100]" />
          <span className={LABEL_TEXT}>Servicios — 2024</span>
        </div>
        <h1 className="lr-title font-bold" style={DISPLAY}>
          Lo que<br /><span className="text-[#FE5100]">hacemos.</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-12 mt-14 md:mt-20">
          <p className="lr-text md:col-span-5 md:col-start-8 text-[18px] md:text-[22px] leading-snug text-black">
            Dos disciplinas, un mismo compromiso: espacios diseñados con precisión, autenticidad y visión contemporánea.
          </p>
        </div>
      </Stage>

      {/* Services — alternating asymmetric editorial rows */}
      {services.map((s, i) => {
        const imgLeft = i % 2 === 1
        return (
          <Stage key={s.v} className="border-t border-[#E4E4E4]">
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-10 items-center py-20 md:py-36">
              {/* Image */}
              <div className={`lr-img-wrap relative overflow-hidden ${imgLeft ? 'lg:col-span-6 lg:order-1' : 'lg:col-span-6 lg:col-start-7 lg:order-2'}`} style={{ minHeight: '440px', height: '62vh', maxHeight: '760px' }}>
                <div className={`absolute inset-0 ${imgLeft ? 'lr-clip-r' : 'lr-clip'}`}>
                  <img src={s.img} alt={s.title} loading="lazy" className="lr-img absolute inset-0 w-full h-full object-cover" style={{ objectPosition: s.v === 'arquitectura' ? '60% center' : 'center' }} />
                </div>
              </div>
              {/* Text */}
              <div className={`min-w-0 pl-8 md:pl-20 pr-8 md:pr-20 lg:pr-10 mt-10 lg:mt-0 ${imgLeft ? 'lg:col-span-5 lg:col-start-8 lg:order-2 lg:pl-0' : 'lg:col-span-5 lg:order-1'}`}>
                <span className="lr-title block font-bold text-[#E4E4E4] mb-4" style={{ fontSize: 'clamp(64px,9vw,140px)', lineHeight: 0.8, letterSpacing: '-0.04em' }}>{s.num}</span>
                <div className="lr-line w-20 h-px bg-[#FE5100] mb-8" />
                <h2 className="lr-title font-bold leading-none mb-6" style={{ fontSize: 'clamp(36px,4vw,80px)', letterSpacing: '-0.035em' }}>{s.title}</h2>
                <p className="lr-text text-[#FE5100] text-[19px] md:text-[22px] font-medium leading-snug mb-6">{s.lead}</p>
                <p className={`lr-text lr-text-2 ${BODY} mb-9 max-w-md`}>{s.desc}</p>
                <div className="lr-text lr-text-3 flex flex-wrap gap-2 mb-10">
                  {s.tags.map(tag => (
                    <span key={tag} className="text-[12px] tracking-[0.2em] uppercase px-3 py-1.5 border border-[#E4E4E4] text-[#898989]">{tag}</span>
                  ))}
                </div>
                <div className="lr-text lr-text-4">
                  <button onClick={() => onNavigate(s.v)} className={`${BTN_PRI} group w-fit`}>
                    Ver proyectos <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                </div>
              </div>
            </div>
          </Stage>
        )
      })}

      {/* CTA — oversized */}
      <Stage className="border-t border-[#E4E4E4] pl-8 md:pl-20 pr-8 md:pr-20 py-24 md:py-40">
        <div className="lr-line w-20 h-px bg-[#FE5100] mb-10" />
        <h2 className="lr-title font-bold leading-none mb-12" style={DISPLAY_MD}>
          ¿Tienes un<br /><span className="text-[#FE5100]">proyecto</span> en mente?
        </h2>
        <button onClick={() => onNavigate('contacto')} className={`lr-text ${BTN_PRI} group`}>
          Iniciar Proyecto <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
        </button>
      </Stage>
    </div>
  )
}

// ─── Service Detail Page ──────────────────────────────────────────────────────
function ServicePage({ type, onBack, onNavigate }: { type: 'arquitectura' | 'interior'; onBack: () => void; onNavigate: (v: ViewType) => void }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [])

  const content = type === 'arquitectura'
    ? { title: 'Arquitectura', num: '01', img: residenciaNocturna, lead: 'Espacios que redefinen el entorno construido.', body: 'Proyectamos edificios y estructuras que nacen de un proceso profundo de investigación, contexto y experimentación formal. Desde residencias unifamiliares hasta proyectos de uso mixto, cada obra responde con rigor técnico y visión creativa.\n\nNuestro proceso integra geometría, materialidad y función desde las primeras etapas del diseño, generando propuestas que dialogan con su entorno sin perder identidad propia.', pillars: [{ title: 'Concepto', text: 'Cada proyecto parte de una idea generadora que se mantiene coherente a lo largo de todo el proceso.' }, { title: 'Tecnología', text: 'Herramientas de representación y visualización fotorrealista que comunican cada decisión de diseño con claridad.' }, { title: 'Materialidad', text: 'Materiales y acabados llevados al detalle, seleccionados para expresar la personalidad única de cada proyecto.' }] }
    : { title: 'Interiores', num: '02', img: interiorPanoramica, lead: 'Espacios interiores con identidad propia.', body: 'Diseñamos interiores que van más allá de la decoración: cada espacio es una experiencia sensorial construida desde la materialidad, la luz y la composición. Trabajamos con residencias, oficinas y espacios comerciales.\n\nNuestro enfoque integra la arquitectura de interiores, el diseño de mobiliario y la curaduría de objetos para crear ambientes coherentes, sofisticados y profundamente personales.', pillars: [{ title: 'Conceptualización', text: 'Cada proyecto se concibe a partir de sus necesidades formales y estéticas para crear una propuesta coherente, funcional y con identidad propia.' }, { title: 'Materialidad', text: 'Acabados y texturas seleccionados con intención para comunicar la personalidad y el carácter de cada espacio.' }, { title: 'Luz', text: 'La iluminación como herramienta de diseño: natural y artificial en perfecta armonía.' }] }

  const related = PROJECTS.filter(p => p.category === type).slice(0, 4)
  const { selected, previewOpen, openPreview, closePreview } = useProjectPreview()

  return (
    <div className="pt-16 bg-white overflow-hidden">
      {/* Oversized title */}
      <Stage className="pl-8 md:pl-20 pr-8 md:pr-20 pt-16 md:pt-28 pb-14 md:pb-24">
        <button onClick={onBack} className={`${BTN_BACK} lr-text`}>← Todos los servicios</button>
        <div className="lr-title flex items-center gap-4 mb-8">
          <span className="lr-line w-16 h-px bg-[#FE5100]" />
          <span className={LABEL_TEXT}>{content.num} — Servicio</span>
        </div>
        <h1 className="lr-title font-bold leading-none" style={DISPLAY}>{content.title}</h1>
      </Stage>

      {/* Full-width hero image, clip reveal */}
      <Stage className="pl-8 md:pl-20 pr-8 md:pr-20 pb-24 md:pb-40">
        <div className="lr-img-wrap relative overflow-hidden" style={{ height: '70vh', minHeight: '400px', maxHeight: '860px' }}>
          <div className="absolute inset-0 lr-clip-up">
            <img src={content.img} alt={content.title} className="lr-img absolute inset-0 w-full h-full object-cover" style={{ objectPosition: type === 'arquitectura' ? '65% center' : 'center 60%' }} />
          </div>
        </div>
      </Stage>

      {/* Lead — oversized statement, asymmetric */}
      <Stage className="pl-8 md:pl-20 pr-8 md:pr-20 pb-24 md:pb-40">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-10">
            <div className="lr-line w-24 h-px bg-[#FE5100] mb-10" />
            <p className="lr-title font-bold text-[#FE5100] leading-[1.05]" style={{ fontSize: 'clamp(30px,5vw,68px)', letterSpacing: '-0.03em' }}>{content.lead}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 mt-14 md:mt-24">
          <div className="md:col-span-6 md:col-start-7 flex flex-col gap-6">
            {content.body.split('\n\n').map((para, i) => (
              <p key={i} className={`lr-text ${i === 1 ? 'lr-text-2' : ''} text-[16px] md:text-[18px] leading-relaxed text-[#3a3a3a]`}>{para}</p>
            ))}
          </div>
        </div>
      </Stage>

      {/* Pillars — editorial numbered list, not cards */}
      <Stage className="border-t border-[#E4E4E4]">
        <div className="pl-8 md:pl-20 pr-8 md:pr-20 pt-16 md:pt-24 pb-4">
          <div className="lr-title flex items-center gap-4">
            <span className="lr-line w-16 h-px bg-[#FE5100]" />
            <span className={LABEL_TEXT}>Cómo trabajamos</span>
          </div>
        </div>
        <div>
          {content.pillars.map((p, i) => (
            <div key={p.title} className="lr-text group border-t border-[#E4E4E4] first:border-t-0 hover:bg-[#FAFAFA] transition-colors duration-300" style={{ transitionDelay: `${0.4 + i * 0.12}s` }}>
              <div className="grid grid-cols-1 md:grid-cols-12 items-baseline gap-4 pl-8 md:pl-20 pr-8 md:pr-20 py-10 md:py-16">
                <span className="md:col-span-2 font-bold text-[#E4E4E4] group-hover:text-[#FE5100] transition-colors duration-500" style={{ fontSize: 'clamp(40px,4vw,72px)', lineHeight: 0.9 }}>0{i + 1}</span>
                <h4 className="md:col-span-4 font-bold tracking-tight" style={{ fontSize: 'clamp(24px,3vw,42px)', letterSpacing: '-0.02em' }}>{p.title}</h4>
                <p className={`md:col-span-5 md:col-start-8 ${BODY}`}>{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Stage>

      {/* Related projects — asymmetric editorial pair layout */}
      <Stage className="border-t border-[#E4E4E4] pt-16 md:pt-28 pb-24 md:pb-40">
        <div className="pl-8 md:pl-20 pr-8 md:pr-20 mb-12 md:mb-20">
          <div className="lr-line w-16 h-px bg-[#FE5100] mb-6" />
          <h2 className="lr-title font-bold leading-none" style={DISPLAY_MD}>Proyectos<br /><span className="text-[#FE5100]">relacionados</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-10 pl-8 md:pl-20 pr-8 md:pr-20">
          {related.map((project, i) => {
            const spans = ['md:col-span-7', 'md:col-span-5 md:mt-24', 'md:col-span-5', 'md:col-span-7 md:mt-24']
            return (
              <div key={project.id} role="button" tabIndex={0} onClick={() => openPreview(project)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPreview(project) } }}
                className={`lr-text group cursor-pointer ${spans[i % 4]}`} style={{ transitionDelay: `${0.3 + (i % 2) * 0.12}s` }}>
                <div className="lr-img-wrap relative overflow-hidden mb-5" style={{ height: '46vh', minHeight: '320px', maxHeight: '560px' }}>
                  <img src={project.img} alt={project.name} className="lr-img absolute inset-0 w-full h-full object-cover" />
                  <span className="absolute top-5 left-5 flex items-center gap-2 text-white text-[11px] tracking-[0.25em] uppercase opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    Ver proyecto <span aria-hidden>→</span>
                  </span>
                </div>
                <div className="flex flex-col lg:flex-row items-baseline justify-between gap-3">
                  <div>
                    <span className="text-[#FE5100] text-[12px] tracking-[0.3em] uppercase font-medium block mb-1.5">{project.category === 'arquitectura' ? 'Arquitectura' : 'Diseño Interior'}</span>
                    <h3 className="font-bold tracking-tight group-hover:text-[#FE5100] transition-colors duration-300" style={{ fontSize: 'clamp(22px,2.4vw,32px)', letterSpacing: '-0.02em' }}>{project.name}</h3>
                  </div>
                  <span className="text-[#898989] text-[12px] tracking-[0.25em] uppercase">{project.location} · {project.year}</span>
                </div>
              </div>
            )
          })}
        </div>
      </Stage>

      {/* CTA — oversized */}
      <Stage className="border-t border-[#E4E4E4] pl-8 md:pl-20 pr-8 md:pr-20 py-24 md:py-40">
        <div className="lr-line w-20 h-px bg-[#FE5100] mb-10" />
        <h2 className="lr-title font-bold leading-none mb-12" style={DISPLAY_MD}>
          ¿Tienes un<br /><span className="text-[#FE5100]">proyecto</span> en mente?
        </h2>
        <button onClick={() => onNavigate('contacto')} className={`lr-text ${BTN_PRI} group`}>
          Hablemos de tu proyecto <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
        </button>
      </Stage>

      <ProjectPreview selected={selected} previewOpen={previewOpen} onClose={closePreview} />
    </div>
  )
}

// ─── Nosotros Page ────────────────────────────────────────────────────────────
function NosotrosPage({ onBack, onContact }: { onBack: () => void; onContact: () => void }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [])

  return (
    <div className="pt-16 bg-white overflow-hidden">
      {/* Oversized manifesto title — fills the viewport as a graphic element */}
      <Stage className="pl-8 md:pl-20 pr-8 md:pr-10 pt-16 md:pt-28 pb-20 md:pb-32">
        <button onClick={onBack} className={`${BTN_BACK} lr-text`}>← Inicio</button>
        <div className="lr-title flex items-center gap-4 mb-10">
          <span className="lr-line w-16 h-px bg-[#FE5100]" />
          <span className={LABEL_TEXT}>Nosotros — Estudio</span>
        </div>
        <h1 className="lr-title font-bold" style={DISPLAY}>
          No diseñamos<br />espacios.<br /><span className="text-[#FE5100]">Creamos</span><br />identidades.
        </h1>
      </Stage>

      {/* Full-width statement image, clip reveal */}
      <Stage className="pl-8 md:pl-20 pr-8 md:pr-20 pb-24 md:pb-40">
        <div className="lr-img-wrap relative overflow-hidden" style={{ height: '72vh', minHeight: '420px', maxHeight: '880px' }}>
          <div className="absolute inset-0 lr-clip-up">
            <img src={residenciaNosotros} alt="Fachada residencial con celosías de madera, piedra y vegetación, proyecto de IdeenHaus" loading="lazy" className="lr-img absolute inset-0 w-full h-full object-cover" style={{ objectPosition: '50% center' }} />
          </div>
        </div>
      </Stage>

      {/* Who we are — text left, oversized wordmark */}
      <Stage className="pl-8 md:pl-20 pr-8 md:pr-20 pb-24 md:pb-40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-10">
          <div className="md:col-span-6">
            <div className="lr-title flex items-center gap-4 mb-8">
              <span className="lr-line w-16 h-px bg-[#FE5100]" />
              <span className={LABEL_TEXT}>Quiénes somos</span>
            </div>
            <h2 className="lr-title font-bold leading-none" style={DISPLAY_MD}>IdeenHaus</h2>
          </div>
          <div className="md:col-span-5 md:col-start-8 flex flex-col justify-end gap-6">
            <p className="lr-text text-[18px] md:text-[21px] leading-snug text-black">Estudio de arquitectura y diseño interior contemporáneo con sede en Pereira, Colombia, fundado en 2024. Creamos proyectos únicos que expresan autenticidad y creatividad.</p>
          </div>
        </div>
      </Stage>

      {/* Stats — full-width oversized figures */}
      <Stage className="border-t border-[#E4E4E4] pl-8 md:pl-20 pr-8 md:pr-20 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {[{ num: '40+', label: 'Proyectos entregados' }, { num: '2024', label: 'Año de fundación' }, { num: '100%', label: 'Diseño personalizado' }].map((s, i) => (
            <div key={s.label} className="lr-text" style={{ transitionDelay: `${0.3 + i * 0.12}s` }}>
              <div className="font-bold text-[#FE5100] leading-none mb-3" style={{ fontSize: 'clamp(56px,7vw,120px)', letterSpacing: '-0.04em' }}>{s.num}</div>
              <div className="text-[#898989] text-[13px] tracking-[0.25em] uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </Stage>

      {/* Quote — oversized editorial pull quote */}
      <Stage className="border-t border-[#E4E4E4] pl-8 md:pl-20 pr-8 md:pr-20 py-24 md:py-40">
        <div className="lr-line w-24 h-px bg-[#FE5100] mb-12" />
        <blockquote className="lr-title font-bold text-black leading-[1.06] max-w-6xl" style={{ fontSize: 'clamp(28px,4.4vw,64px)', letterSpacing: '-0.03em' }}>
          "Abordamos cada proyecto como una oportunidad para explorar ideas frescas y soluciones innovadoras, manteniéndonos en la <span className="text-[#FE5100]">vanguardia</span> del diseño contemporáneo."
        </blockquote>
      </Stage>

      {/* Mission / Vision — image left, text right (alternated) */}
      <Stage className="border-t border-[#E4E4E4]">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center py-20 md:py-36 lg:gap-10">
          <div className="lr-img-wrap relative overflow-hidden lg:col-span-6" style={{ height: '58vh', minHeight: '400px', maxHeight: '720px' }}>
            <div className="absolute inset-0 lr-clip-r">
              <img src={interiorMisionVision} alt="Sala de tonos neutros con sofá, mesa de piedra e iluminación circular, proyecto de IdeenHaus" loading="lazy" className="lr-img absolute inset-0 w-full h-full object-cover" style={{ objectPosition: '65% center' }} />
            </div>
          </div>
          <div className="min-w-0 lg:col-span-5 lg:col-start-8 pl-8 md:pl-20 lg:pl-0 pr-8 md:pr-20 lg:pr-20 mt-10 lg:mt-0 flex flex-col gap-16">
            <div>
              <div className="lr-title flex items-center gap-4 mb-6">
                <span className="lr-line w-14 h-px bg-[#FE5100]" />
                <span className={LABEL_TEXT}>Misión</span>
              </div>
              <h3 className="lr-title font-bold leading-none mb-5" style={{ fontSize: 'clamp(30px,3.6vw,52px)', letterSpacing: '-0.03em' }}>Lo que <span className="text-[#FE5100]">nos mueve</span></h3>
              <p className={`lr-text ${BODY}`}>Crear diseños únicos y personalizados que expresen autenticidad y creatividad, fusionando innovación y experimentación para ofrecer proyectos hechos a la medida.</p>
            </div>
            <div>
              <div className="lr-title flex items-center gap-4 mb-6">
                <span className="lr-line w-14 h-px bg-[#FE5100]" />
                <span className={LABEL_TEXT}>Visión</span>
              </div>
              <h3 className="lr-title font-bold leading-none mb-5" style={{ fontSize: 'clamp(30px,3.6vw,52px)', letterSpacing: '-0.03em' }}>Hacia dónde <span className="text-[#FE5100]">vamos</span></h3>
              <p className={`lr-text lr-text-2 ${BODY}`}>Ser un referente en diseño de vanguardia, reconocido por dar vida a proyectos auténticos y creativos que anticipen y respondan a las tendencias actuales.</p>
            </div>
          </div>
        </div>
      </Stage>

      {/* Values — editorial numbered list */}
      <Stage className="border-t border-[#E4E4E4]">
        <div className="pl-8 md:pl-20 pr-8 md:pr-20 pt-16 md:pt-24 pb-2">
          <div className="lr-title flex items-center gap-4">
            <span className="lr-line w-16 h-px bg-[#FE5100]" />
            <span className={LABEL_TEXT}>Nuestros valores</span>
          </div>
        </div>
        {[
          { num: '01', title: 'Autenticidad', desc: 'Cada proyecto refleja un compromiso genuino con el estilo y la esencia del diseño, manteniendo una identidad única y coherente.' },
          { num: '02', title: 'Innovación', desc: 'Abordamos cada proyecto como una oportunidad para explorar ideas frescas, manteniéndonos en la vanguardia del diseño.' },
          { num: '03', title: 'Personalización', desc: 'Adaptamos cada proyecto a las necesidades y aspiraciones específicas del cliente, sin perder el carácter distintivo del estudio.' },
        ].map((val, i) => (
          <div key={val.num} className="lr-text group border-t border-[#E4E4E4] hover:bg-[#FAFAFA] transition-colors duration-300" style={{ transitionDelay: `${0.4 + i * 0.12}s` }}>
            <div className="grid grid-cols-1 md:grid-cols-12 items-baseline gap-4 pl-8 md:pl-20 pr-8 md:pr-20 py-10 md:py-16">
              <span className="md:col-span-2 font-bold text-[#E4E4E4] group-hover:text-[#FE5100] transition-colors duration-500" style={{ fontSize: 'clamp(40px,4vw,72px)', lineHeight: 0.9 }}>{val.num}</span>
              <h4 className="md:col-span-4 font-bold tracking-tight" style={{ fontSize: 'clamp(24px,3vw,42px)', letterSpacing: '-0.02em' }}>{val.title}</h4>
              <p className={`md:col-span-5 md:col-start-8 ${BODY}`}>{val.desc}</p>
            </div>
          </div>
        ))}
      </Stage>

      {/* Philosophy — text left, image right */}
      <Stage className="border-t border-[#E4E4E4]">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center py-20 md:py-36 lg:gap-10">
          <div className="min-w-0 lg:col-span-5 pl-8 md:pl-20 pr-8 md:pr-20 lg:pr-0">
            <div className="lr-title flex items-center gap-4 mb-8">
              <span className="lr-line w-14 h-px bg-[#FE5100]" />
              <span className={LABEL_TEXT}>Nuestra filosofía</span>
            </div>
            <h3 className="lr-title font-bold leading-none mb-8" style={{ fontSize: 'clamp(32px,4.4vw,68px)', letterSpacing: '-0.03em' }}>El diseño <span className="text-[#FE5100]">transforma</span> espacios y experiencias</h3>
            <p className={`lr-text ${BODY} mb-5 max-w-md`}>Cada proyecto nace de una escucha profunda y un proceso de investigación que permite proponer soluciones auténticas, precisas y con identidad definida.</p>
            <p className={`lr-text lr-text-2 ${BODY} max-w-md`}>No seguimos tendencias — las anticipamos. Cada espacio que diseñamos es una respuesta honesta a las necesidades del cliente y al contexto en que habitará.</p>
          </div>
          <div className="lr-img-wrap relative overflow-hidden lg:col-span-6 lg:col-start-7 mt-10 lg:mt-0" style={{ height: '62vh', minHeight: '420px', maxHeight: '780px' }}>
            <div className="absolute inset-0 lr-clip">
              <img src={interiorFilosofia} alt="Sala y comedor con materiales naturales, iluminación integrada y vistas al jardín, proyecto de IdeenHaus" loading="lazy" className="lr-img absolute inset-0 w-full h-full object-cover" style={{ objectPosition: '60% center' }} />
            </div>
          </div>
        </div>
      </Stage>

      {/* CTA — oversized */}
      <Stage className="border-t border-[#E4E4E4] pl-8 md:pl-20 pr-8 md:pr-20 py-24 md:py-40">
        <div className="lr-line w-20 h-px bg-[#FE5100] mb-10" />
        <h2 className="lr-title font-bold mb-12" style={{ ...DISPLAY_MD, lineHeight: 0.98 }}>
          ¿Trabajamos<br /><span className="text-[#FE5100]">juntos</span>?
        </h2>
        <button onClick={onContact} className={`lr-text ${BTN_PRI} group`}>
          Hablemos de tu proyecto <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
        </button>
      </Stage>
    </div>
  )
}

// ─── Contacto Page ──────────────────────────────────────────────────────────
function ContactoPage({ onBack }: { onBack: () => void }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [])

  const WHATSAPP_URL = `https://wa.me/573002002421?text=${encodeURIComponent('Hola, estoy interesado en trabajar con IdeenHaus.')}`

  // Secondary channels — WhatsApp is the primary CTA below, not part of this list
  const contactItems = [
    { label: 'Correo', value: 'arquitectura@ideenhaus.art', href: 'mailto:arquitectura@ideenhaus.art', detail: 'Hablemos de tu próximo espacio.' },
    { label: 'Instagram', value: '@ideenhaus.studio', href: 'https://instagram.com/ideenhaus.studio', detail: 'Síguenos para ver nuestros proyectos' },
    { label: 'Ubicación', value: 'Pereira, Colombia', href: 'https://www.google.com/maps/search/?api=1&query=Pereira%2C%20Colombia', detail: 'Proyectos en distintos países' },
  ]

  return (
    <div className="pt-16 bg-white overflow-hidden">
      {/* Oversized title — graphic element, asymmetric intro */}
      <Stage className="pl-8 md:pl-20 pr-8 md:pr-10 pt-16 md:pt-28 pb-20 md:pb-32">
        <button onClick={onBack} className={`${BTN_BACK} lr-text`}>← Inicio</button>
        <div className="lr-title flex items-center gap-4 mb-10">
          <span className="lr-line w-16 h-px bg-[#FE5100]" />
          <span className={LABEL_TEXT}>Contacto</span>
        </div>
        <h1 className="lr-title font-bold" style={DISPLAY}>
          Hablemos<br /><span className="text-[#FE5100]">de tu</span> proyecto.
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-12 mt-14 md:mt-20">
          <p className="lr-text md:col-span-5 md:col-start-8 text-[18px] md:text-[22px] leading-snug text-black">
            Estamos listos para escuchar tus ideas y transformarlas en espacios que inspiren. Cada proyecto comienza con una conversación.
          </p>
        </div>
      </Stage>

      {/* WhatsApp — primary CTA, visually dominant */}
      <Stage className="border-t border-[#E4E4E4] pl-8 md:pl-20 pr-8 md:pr-20 pt-20 md:pt-32 pb-20 md:pb-32">
        <div className="lr-title flex items-center gap-4 mb-8">
          <span className="lr-line w-14 h-px bg-[#FE5100]" />
          <span className={LABEL_TEXT}>La forma más directa</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-10 items-end">
          <div className="lg:col-span-12 min-w-0">
            <h2 className="lr-title font-bold" style={{ ...DISPLAY_MD, lineHeight: 0.92 }}>
              Menos formulario,<br /><span className="text-[#FE5100]">más conversación.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col gap-6 lg:items-end">
            <p className="lr-text text-[17px] md:text-[19px] leading-snug text-black max-w-sm lg:text-right">
              Escríbenos y comencemos a dar forma a tu próximo espacio, sin intermediarios.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className={`lr-text lr-text-2 ${BTN_PRI} ih-whatsapp group text-[14px] px-10 py-6 w-fit`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="flex-shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.89 2 2 0 0 1 3.59 2.68h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l.72-.72a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.19 18" /></svg>
              Hablemos por WhatsApp <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
          </div>
        </div>
      </Stage>

      {/* Other contact channels — editorial rows */}
      <Stage className="border-t border-[#E4E4E4]">
        <div className="pl-8 md:pl-20 pr-8 md:pr-20 pt-16 md:pt-24 pb-2">
          <div className="lr-title flex items-center gap-4">
            <span className="lr-line w-16 h-px bg-[#FE5100]" />
            <span className={LABEL_TEXT}>Otros canales</span>
          </div>
        </div>
        {contactItems.map((item, i) => (
          <a key={item.label} href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="lr-text group block border-t border-[#E4E4E4] hover:bg-[#FAFAFA] transition-colors duration-300"
            style={{ transitionDelay: `${0.35 + i * 0.1}s` }}>
            <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 pl-8 md:pl-20 pr-8 md:pr-20 py-8 md:py-12">
              <div className="md:col-span-3 flex items-center">
                <span className={LABEL_TEXT}>{item.label}</span>
              </div>
              <div className="md:col-span-6 min-w-0 [overflow-wrap:anywhere] font-bold tracking-tight group-hover:text-[#FE5100] transition-colors duration-300" style={{ fontSize: 'clamp(20px,2.6vw,38px)', letterSpacing: '-0.02em' }}>{item.value}</div>
              <div className="md:col-span-3 flex items-center justify-between">
                <span className="text-[#898989] text-[15px] leading-snug">{item.detail}</span>
                <span className="text-[#E4E4E4] group-hover:text-[#FE5100] group-hover:translate-x-1 transition-all duration-300 text-[22px] ml-4">→</span>
              </div>
            </div>
          </a>
        ))}
      </Stage>

    </div>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ onNavigate }: { onNavigate: (v: ViewType) => void }) {
  const navLinks: Array<{ label: string; v: ViewType }> = [
    { label: 'Inicio', v: 'home' }, { label: 'Servicios', v: 'servicios' },
    { label: 'Nosotros', v: 'nosotros' }, { label: 'Contacto', v: 'contacto' },
  ]
  const social = [
    { label: 'Instagram', href: 'https://instagram.com/ideenhaus.studio', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> },
    { label: 'WhatsApp', href: 'https://wa.me/573002002421', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.89 2 2 0 0 1 3.59 2.68h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l.72-.72a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.19 18" /></svg> },
    { label: 'Email', href: 'mailto:arquitectura@ideenhaus.art', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg> },
  ]

  return (
    <footer className="bg-white border-t border-[#E4E4E4]">
      <div className="grid grid-cols-1 md:grid-cols-12 pl-8 md:pl-20 pr-8 md:pr-20 py-16 md:py-20 gap-12">
        {/* Brand — left col */}
        <div className="md:col-span-5">
          <button onClick={() => onNavigate('home')} className="mb-7 block">
            <img src={isotipoBlack} alt="IdeenHaus" style={{ height: '52px', width: 'auto', objectFit: 'contain' }} />
          </button>
          <p className={`${BODY} max-w-xs mb-8`}>Estudio de arquitectura y diseño interior contemporáneo.<br />Pereira, Colombia · 2024.</p>
          <div className="flex gap-3">
            {social.map(s => (
              <a key={s.label} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined} aria-label={s.label}
                className="w-8 h-8 border border-[#E4E4E4] flex items-center justify-center text-[#898989] hover:border-[#FE5100] hover:text-[#FE5100] transition-all duration-300">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        {/* Nav — middle col */}
        <div className="md:col-span-3 md:col-start-7">
          <span className={`${LABEL_TEXT} block mb-6`}>Secciones</span>
          <nav className="flex flex-col gap-3">
            {navLinks.map(link => (
              <button key={link.label} onClick={() => onNavigate(link.v)} className="text-left text-[#898989] hover:text-black text-[15px] transition-colors duration-200">{link.label}</button>
            ))}
          </nav>
        </div>
        {/* Contact — right col */}
        <div className="md:col-span-3 md:col-start-10">
          <span className={`${LABEL_TEXT} block mb-6`}>Contacto</span>
          <div className="flex flex-col gap-3">
            <a href="https://wa.me/573002002421" target="_blank" rel="noopener noreferrer" className="text-[#898989] hover:text-black text-[15px] transition-colors duration-200">+57 300 200 2421</a>
            <a href="https://instagram.com/ideenhaus.studio" target="_blank" rel="noopener noreferrer" className="text-[#898989] hover:text-black text-[15px] transition-colors duration-200">@ideenhaus.studio</a>
            <a href="mailto:arquitectura@ideenhaus.art" className="min-w-0 [overflow-wrap:anywhere] text-[#898989] hover:text-black text-[15px] transition-colors duration-200">arquitectura@ideenhaus.art</a>
          </div>
        </div>
      </div>
      <div className="px-8 md:px-20 py-5 border-t border-[#E4E4E4] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <span className="text-[#898989]/40 text-[12px] tracking-[0.2em] uppercase">© 2024 IdeenHaus Studio</span>
        <span className="text-[#FE5100] text-[12px] tracking-[0.25em] uppercase font-medium">Diseño que trasciende</span>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState<ViewType>('home')
  const [scrollY, setScrollY] = useState(0)
  const [loading, setLoading] = useState(true)
  const [covering, setCovering] = useState(false)
  const [exiting, setExiting] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.4, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, touchMultiplier: 1.5 })
    lenisRef.current = lenis
    sharedLenis = lenis
    let rafId: number
    function raf(time: number) { lenis.raf(time); rafId = requestAnimationFrame(raf) }
    rafId = requestAnimationFrame(raf)
    return () => { lenis.destroy(); lenisRef.current = null; sharedLenis = null; cancelAnimationFrame(rafId) }
  }, [])

  // Jump to the very top instantly (works with Lenis smooth scroll)
  function scrollToTop() {
    lenisRef.current?.scrollTo(0, { immediate: true })
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    function onScroll() { setScrollY(window.scrollY) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Dismiss loading screen once the app has settled in
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1900)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => { setScrollY(0) }, [view])

  // Chapter transition: outgoing fade + slight rise → brief white pause →
  // new section enters with fade + upward reveal, then its layered reveal runs.
  function navigate(v: ViewType) {
    if (covering) return
    if (v === view) { scrollToTop(); return }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setView(v)
      scrollToTop()
      setScrollY(0)
      return
    }
    setCovering(true) // veil fades to white
    setExiting(true)  // current section plays exit-rise (fade + slight rise)
    window.setTimeout(() => {
      setView(v)      // swap under the white pause; new wrapper remounts (enter anim)
      setExiting(false) // new wrapper mounts clean, not with the exit class
      scrollToTop()
      setScrollY(0)
    }, 440)
    window.setTimeout(() => {
      scrollToTop()   // pin to top once the new section has mounted
      setCovering(false) // veil lifts, revealing the entering section
    }, 520)
  }

  return (
    <div style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <CustomCursor />
      <Loader done={!loading} />
      <div className={`ih-page-veil ${covering ? 'is-covering' : ''}`} aria-hidden />
      <Nav onNavigate={navigate} isHome={view === 'home'} scrollY={scrollY} view={view} />
      <div
        key={view}
        className={
          exiting
            ? 'ih-exit-rise'
            : view === 'home'
              ? 'ih-enter-fade' // home stays opacity-only to protect Portafolio's sticky scroll
              : 'ih-enter-rise'
        }
      >
        {view === 'home' && (
          <>
            <Hero scrollY={scrollY} />
            <PortafolioUnificado onNavigate={navigate} />
            <AboutPreview onNavigate={() => navigate('nosotros')} />
            <ContactPreview onNavigate={() => navigate('contacto')} />
            <Footer onNavigate={navigate} />
          </>
        )}
        {view === 'servicios' && <><ServiciosPage onNavigate={navigate} /><Footer onNavigate={navigate} /></>}
        {(view === 'arquitectura' || view === 'interior') && <><ServicePage type={view} onBack={() => navigate('servicios')} onNavigate={navigate} /><Footer onNavigate={navigate} /></>}
        {view === 'nosotros' && <><NosotrosPage onBack={() => navigate('home')} onContact={() => navigate('contacto')} /><Footer onNavigate={navigate} /></>}
        {view === 'contacto' && <><ContactoPage onBack={() => navigate('home')} /><Footer onNavigate={navigate} /></>}
      </div>
    </div>
  )
}

