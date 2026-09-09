export type AnalyticsConsent = 'granted' | 'denied' | null

const CONSENT_KEY = 'fsd_analytics_consent'
const SCRIPT_ID = 'fsd-google-analytics'
const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim()
const allowedCampaignParameters = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
]

type GtagCommand = [string, ...unknown[]]

declare global {
  interface Window {
    dataLayer?: IArguments[]
    gtag?: (...args: GtagCommand) => void
    [key: `ga-disable-${string}`]: boolean | undefined
  }
}

function analyticsLocation() {
  const current = new URL(window.location.href)
  const filtered = new URL(current.origin + current.pathname)

  for (const parameter of allowedCampaignParameters) {
    const value = current.searchParams.get(parameter)
    if (value) filtered.searchParams.set(parameter, value)
  }

  return filtered.toString()
}

function ensureGtag() {
  window.dataLayer = window.dataLayer ?? []
  // Match Google's bootstrap so gtag.js can process every queued command.
  window.gtag = window.gtag ?? function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments)
  }
}

export function getAnalyticsConsent(): AnalyticsConsent {
  const value = window.localStorage.getItem(CONSENT_KEY)
  return value === 'granted' || value === 'denied' ? value : null
}

export function enableAnalytics() {
  if (!measurementId) return false

  ensureGtag()
  window[`ga-disable-${measurementId}`] = false
  window.gtag?.('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })

  if (!document.getElementById(SCRIPT_ID)) {
    window.gtag?.('js', new Date())
    window.gtag?.('config', measurementId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    })

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
    document.head.appendChild(script)
  }

  return true
}

function deleteAnalyticsCookies() {
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0]?.trim()
    if (!name?.startsWith('_ga')) continue

    document.cookie = `${name}=; Max-Age=0; path=/`
    document.cookie = `${name}=; Max-Age=0; path=/; domain=${window.location.hostname}`
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.${window.location.hostname}`
  }
}

export function saveAnalyticsConsent(consent: Exclude<AnalyticsConsent, null>) {
  window.localStorage.setItem(CONSENT_KEY, consent)

  if (consent === 'granted') {
    enableAnalytics()
    return
  }

  if (measurementId) window[`ga-disable-${measurementId}`] = true
  window.gtag?.('consent', 'update', { analytics_storage: 'denied' })
  deleteAnalyticsCookies()
}

export function trackPageView() {
  if (getAnalyticsConsent() !== 'granted' || !enableAnalytics()) return

  const pageLocation = analyticsLocation()
  const pageUrl = new URL(pageLocation)
  window.gtag?.('event', 'page_view', {
    page_title: document.title,
    page_location: pageLocation,
    page_path: pageUrl.pathname + pageUrl.search,
  })
}

export function trackBookingLinkClick(placement: string) {
  if (getAnalyticsConsent() !== 'granted' || !enableAnalytics()) return

  window.gtag?.('event', 'booking_link_click', {
    link_domain: 'secure.gethealthie.com',
    link_url: 'https://secure.gethealthie.com/appointments/embed_appt',
    placement,
  })
}
