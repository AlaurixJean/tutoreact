import { useState } from "react"
import { Input } from "./components/form/input"
import { Checkbox } from "./components/form/checkbox"
import { ProductCategoryRow } from "./components/products/productCategoryRow"
import { ProductRow } from "./components/products/productRow"

const PRODUCTS = [
  {category: "fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "fruits", price: "$1", stocked: false, name: "orange"},
  {category: "fruits", price: "$1", stocked: true, name: "banana"},
  {category: "fruits", price: "$5", stocked: true, name: "Apple"},
  {category: "légumes", price: "$1", stocked: false, name: "patate"},
  {category: "légumes", price: "$3", stocked: true, name: "patate"},
  {category: "légumes", price: "$3", stocked: false, name: "igname"},
  {category: "légumes", price: "$2", stocked: true, name: "manioc"}

]




function App() {
  const [showstockedOnly, setShowstockedOnly] = useState(false)
  const [search, setSearch] = useState('')
  const visibleProducts = PRODUCTS.filter(product => {
    if(showstockedOnly && !product.stocked){
      return false
    }
    if (search && !product.name.includes(search)){
      return false
    }

    return true

  })
  return <div className="container my-3">
    <SearchBar search={search} onSearchChange={setSearch} showstockedOnly={showstockedOnly} onStokedOnlyChange={setShowstockedOnly}/>
    <ProductTable products={visibleProducts}/>
  </div>

}
function SearchBar ({showstockedOnly, onStokedOnlyChange, search, onSearchChange}){
  return <div >
    <div className="mb-3">
      <Input value={search} onChange={onSearchChange} placeholder="Rechercher..."/>
      <Checkbox id="stocked" checked={showstockedOnly} onChange={onStokedOnlyChange} label="N'afficher que les produits en stock"/>
    </div>
  </div>
}

function ProductTable ({products}){
  const rows = []
  let lastCategory = null

  for (let product of products){
    if(product.category !== lastCategory){
      rows.push(<ProductCategoryRow name={product.category}/>)
    }
    lastCategory = product.category
    rows.push(<ProductRow product={product} key={product.name}/>)
  }
  return <table className="table">
    <thead>
      <tr>
        <td>Nom</td>
        <td>Prix</td>
      </tr>
    </thead>
    <tbody>
      {rows}
    </tbody>
  </table>
}

export default App
