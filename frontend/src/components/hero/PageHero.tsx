import './page-hero.css'

type PageHeroProps = {
  eyebrow?: string
  title: string
  description?: string
  quote?: string
  items?: string[]
}

export function PageHero({
  eyebrow,
  title,
  description,
  quote,
  items,
}: PageHeroProps) {
  return (
    <div className="page-hero">
      {eyebrow ? <p className="page-hero__eyebrow">{eyebrow}</p> : null}
      <h2 className="page-hero__title">{title}</h2>
      {description ? <p className="page-hero__text">{description}</p> : null}
      {quote ? <blockquote className="page-hero__quote">{quote}</blockquote> : null}
      {items && items.length > 0 ? (
        <ul className="page-hero__list">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
