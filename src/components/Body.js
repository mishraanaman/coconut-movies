import {products} from "../../constants"

const Body = () => {

return(
<>
<p className="py-8 px-6 text-lg">Shop our collection of eco-friendly clothing made with sustainable materials and ethical production practices.</p>

<div className="py-8 px-6 max-w-4xl mx-auto">
<h2 className="text-2xl font-bold mt-8 mb-4">Our Products</h2>

<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {products.map(product => (
    <li key={product.name} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-110">
      <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
      <div className="py-4 px-6">
        <h3 className="text-lg mb-2">{product.name}</h3>
        <button className="bg-stone-300 text-neutral-950 font-bold py-2 px-4 rounded mt-4 opacity-70">+</button>
      </div>
    </li>
  ))}
</ul>
</div>
</>
)
}

export default Body;
