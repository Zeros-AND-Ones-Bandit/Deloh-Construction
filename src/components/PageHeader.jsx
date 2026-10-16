export default function PageHeader({ title, subtitle }) {
  return (
    <section className="page-hero plain">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </section>
  )
}