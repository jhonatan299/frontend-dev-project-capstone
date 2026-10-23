import customer1 from './assets/customer1.jpg'
import customer2 from './assets/customer2.jpg'
import customer3 from './assets/customer3.jpg'
import customer4 from './assets/customer4.jpg'

const testimonialsData = [
  {
    id: 1,
    name: 'Sara M.',
    rating: '⭐⭐⭐⭐⭐',
    review: 'The Greek Salad was delicious and the ambiance was unforgettable!',
    image: customer1,
  },
  {
    id: 2,
    name: 'David K.',
    rating: '⭐⭐⭐⭐⭐',
    review: 'Best Mediterranean food in Chicago. Loved the reservation process!',
    image: customer2,
  },
  {
    id: 3,
    name: 'Emily R.',
    rating: '⭐⭐⭐⭐⭐',
    review: 'Authentic flavors, warm staff, and the lemon dessert is to die for.',
    image: customer3,
  },
  {
    id: 4,
    name: 'Michael B.',
    rating: '⭐⭐⭐⭐⭐',
    review: 'Mario and Adrian really know how to make you feel right at home.',
    image: customer4,
  },
]

function CustomersSay() {
  return (
    <section className="testimonials-section" aria-labelledby="testimonials-heading">
      <div className="section-container">
        <h2 id="testimonials-heading" className="testimonials-title">
          What Our Customers Say
        </h2>
        <div className="testimonials-grid">
          {testimonialsData.map((item) => (
            <article key={item.id} className="testimonial-card" aria-label={`Review by ${item.name}`}>
              <div
                className="testimonial-rating"
                role="img"
                aria-label="5 out of 5 stars"
              >
                {item.rating}
              </div>
              <div className="testimonial-author">
                <img src={item.image} alt={`Portrait of ${item.name}`} className="author-image" />
                <span className="author-name">{item.name}</span>
              </div>
              <blockquote className="testimonial-quote">
                <p>"{item.review}"</p>
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CustomersSay
