import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  enableAnalytics,
  getAnalyticsConsent,
  saveAnalyticsConsent,
  trackPageView,
  type AnalyticsConsent as ConsentChoice,
} from '../../lib/analytics'

export const SHOW_ANALYTICS_CHOICES_EVENT = 'fsd:show-analytics-choices'

export default function AnalyticsConsent() {
  const location = useLocation()
  const [choice, setChoice] = useState<ConsentChoice>(() => getAnalyticsConsent())
  const [isOpen, setIsOpen] = useState(() => choice === null)

  useEffect(() => {
    const showChoices = () => setIsOpen(true)
    window.addEventListener(SHOW_ANALYTICS_CHOICES_EVENT, showChoices)
    return () => window.removeEventListener(SHOW_ANALYTICS_CHOICES_EVENT, showChoices)
  }, [])

  useEffect(() => {
    if (choice !== 'granted') return
    enableAnalytics()

    const timer = window.setTimeout(trackPageView, 0)
    return () => window.clearTimeout(timer)
  }, [choice, location.pathname, location.search])

  function choose(nextChoice: Exclude<ConsentChoice, null>) {
    saveAnalyticsConsent(nextChoice)
    setChoice(nextChoice)
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <section className="analytics-consent" role="dialog" aria-labelledby="analytics-consent-title">
      <div className="analytics-consent-copy">
        <h2 id="analytics-consent-title">Help improve Fewer Sweaty Days</h2>
        <p>
          We use Google Analytics to understand which pages and links are useful.
          It sets analytics cookies. We do not send names, email addresses, health
          details, or booking information. <Link to="/privacy">Privacy details</Link>
        </p>
      </div>
      <div className="analytics-consent-actions">
        <button type="button" className="analytics-consent-decline" onClick={() => choose('denied')}>
          No thanks
        </button>
        <button type="button" className="analytics-consent-allow" onClick={() => choose('granted')}>
          Allow analytics
        </button>
      </div>
    </section>
  )
}
