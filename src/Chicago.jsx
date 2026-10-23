import marioAndAdrianImg from './assets/mario-and-adrian.jpg'

function Chicago() {
  return (
    <section id="about" className="about-section" aria-labelledby="about-heading">
      <div className="section-container about-container">
        <div className="about-content">
          <h2 id="about-heading">Little Lemon</h2>
          <h3>Chicago</h3>
          <p>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
            Velit officia consequat duis enim velit mollit. Exercitation veniam
            consequat sunt nostrud amet.
          </p>
          <p>
            Founded by brothers Mario and Adrian, Little Lemon brings authentic
            Mediterranean recipes passed down through generations, combining fresh local
            ingredients with traditional family cooking techniques.
          </p>
        </div>
        <figure className="about-images">
          <img
            src={marioAndAdrianImg}
            alt="Mario and Adrian, founders of Little Lemon"
            className="about-image"
          />
        </figure>
      </div>
    </section>
  )
}

export default Chicago
