import { useSearchParams } from 'react-router-dom'
import services from '../data/services'
import PageHeader from '../components/PageHeader'
import EnquiryForm from '../components/EnquiryForm'

export default function Quote() {
  const [params] = useSearchParams()
  const wanted = params.get('service') || ''
  const valid = services.some((s) => s.slug === wanted) ? wanted : ''

  return (
    <>
      <PageHeader title="Get a Quote" subtitle="Tell us about your project and we'll get back to you." />
      <section className="page-section narrow">
        <EnquiryForm
          key={valid}
          kind="quote"
          showService
          defaultService={valid}
          submitLabel="Request my quote"
          successTitle="Quote request received"
          successText="Thank you! Our team will contact you shortly to discuss your project."
        />
      </section>
    </>
  )
}