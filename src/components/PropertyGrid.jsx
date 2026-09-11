import PropertyCard from './PropertyCard'
import './Properties.css'

export default function PropertyGrid({ items }) {
  return (
    <div className="properties__grid">
      {items.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}