import React, { Component } from "react";
import CircularLoader from "./CircularLoader";
import ProductCard from "./ProductCard"; // Import the ProductCard component

// Define types for the props
interface RelatedProductsProps {
  category: string;
}

// Define types for the product object
interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

interface RelatedProductsState {
  relatedProducts: Product[];
  loading: boolean;
  error: string | null;
  currentIndex: number;
}

class RelatedProducts extends Component<
  RelatedProductsProps,
  RelatedProductsState
> {
  constructor(props: RelatedProductsProps) {
    super(props);
    this.state = {
      relatedProducts: [],
      loading: true,
      error: null,
      currentIndex: 0,
    };
  }

  fetchProducts = () => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch related products");
        }
        return response.json();
      })
      .then((products: Product[]) => {
        const filteredProducts = products.filter(
          (product) => product.category === this.props.category
        );
        this.setState({ relatedProducts: filteredProducts, loading: false });
      })
      .catch((err: any) => {
        this.setState({ error: err.message, loading: false });
      });
  };

  handlePrev = () => {
    this.setState((prevState) => ({
      currentIndex: Math.max(prevState.currentIndex - 1, 0),
    }));
  };

  handleNext = () => {
    this.setState((prevState) => ({
      currentIndex: Math.min(
        prevState.currentIndex + 1,
        this.state.relatedProducts.length - 3
      ),
    }));
  };

  componentDidMount() {
    this.fetchProducts();
  }

  render() {
    const { relatedProducts, loading, error, currentIndex } = this.state;
    const itemsPerView = 3;

    if (loading) return <CircularLoader />;
    if (error) return <p>Error: {error}</p>;

    return (
      <div className="relative w-full py-8">
        <h2 className="text-xl font-semibold mb-4">You Might Also Like</h2>
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${(currentIndex / itemsPerView) * 100}%)`,
            }}
          >
            {relatedProducts.map((product) => (
              <div
                key={product.id}
                className={`w-full px-2 flex-shrink-0`}
                style={{ flex: `0 0 ${100 / itemsPerView}%` }}
              >
                <ProductCard product={product} />{" "}
                {/* Use the ProductCard component */}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        {currentIndex > 0 && (
          <button
            onClick={this.handlePrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
          >
            &#8249;
          </button>
        )}
        {currentIndex < relatedProducts.length - itemsPerView && (
          <button
            onClick={this.handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
          >
            &#8250;
          </button>
        )}
      </div>
    );
  }
}

export default RelatedProducts;
