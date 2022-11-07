import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Component} from 'react'

import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const apiUrl = 'https://apis.ccbp.in/products'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const fetchedData = data.products
    const updatedData = fetchedData.map(E => ({
      id: E.id,
      title: E.title,
      rating: E.rating,
      price: E.price,
      imageUrl: E.image_url,
      brand: E.brand,
    }))
    console.log(updatedData)
    this.setState({productsList: updatedData, isLoading: false})
  }

  renderProductsList = () => {
    const {productsList, isLoading} = this.state
    return (
      <div>
        {isLoading ? (
          <div className="Load">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <>
            <h1 className="products-list-heading">All Products</h1>
            <ul className="products-list">
              {productsList.map(product => (
                <ProductCard productData={product} key={product.id} />
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }

  render() {
    return <>{this.renderProductsList()}</>
  }
}

export default AllProductsSection
