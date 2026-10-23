import heroFoodImg from './assets/hero-food.jpg'

const specialsData = [
  {
    id: 1,
    title: 'Greek Salad',
    price: '$12.99',
    description:
      'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
    image: heroFoodImg,
  },
  {
    id: 2,
    title: 'Bruschetta',
    price: '$5.99',
    description:
      'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil, topped with fresh diced tomatoes.',
    image: heroFoodImg,
  },
  {
    id: 3,
    title: 'Lemon Dessert',
    price: '$5.00',
    description:
      'This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.',
    image: heroFoodImg,
  },
]

function Specials() {
  return (
    <section id="menu" className="specials-section" aria-labelledby="specials-heading">
      <div className="section-container">
        <div className="specials-header">
          <h2 id="specials-heading">This weeks specials!</h2>
          <button type="button" className="menu-button" aria-label="On Click">
            Online Menu
          </button>
        </div>
        <div className="specials-grid">
          {specialsData.map((item) => (
            <article key={item.id} className="special-card" aria-label={item.title}>
              <img src={item.image} alt={item.title} className="special-image" />
              <div className="special-body">
                <div className="special-title-row">
                  <h3>{item.title}</h3>
                  <span className="special-price">{item.price}</span>
                </div>
                <p className="special-description">{item.description}</p>
                <a
                  href="#order-online"
                  className="special-delivery-link"
                  aria-label="On Click"
                >
                  Order a delivery &rarr;
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Specials
