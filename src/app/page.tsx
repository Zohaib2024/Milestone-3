import HeroBanner from "./components/HeroBanner";
import Wrapper from "./components/Wrapper";
import ProductCard from "./components/ProductCard";
import Category from "./components/Category/[Slug]/page";

export default function Home() {
  // Dummy product data
  const products = [
    {
      id: 1,
      name: "Nike Air Max",
      price: 3000,
      originalPrice: 5000,
      discount: 40,
      image: "/p1.png",
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      price: 2500,
      originalPrice: 4500,
      discount: 45,
      image: "/p2.png",
    },
    {
      id: 3,
      name: "Puma Running Shoes",
      price: 2000,
      originalPrice: 4000,
      discount: 50,
      image: "/p3.png",
    },
    {
      id: 4,
      name: "Asics Gel Nimbus",
      price: 3500,
      originalPrice: 6000,
      discount: 42,
      image: "/p4.png",
    },
    {
      id: 5,
      name: "Reebok Classic",
      price: 1800,
      originalPrice: 3000,
      discount: 40,
      image: "/p5.png",
    },
    {
      id: 6,
      name: "New Balance 574",
      price: 3200,
      originalPrice: 5500,
      discount: 42,
      image: "/p6.png",
    },
  ];

  return (
    <div className="">
      <HeroBanner />
      <Wrapper className="">
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Cushioning for Your Miles
          </div>
          <div className="text-md md:text-xl">
            A lightweight Nike ZoomX midsole is combined with increased stack
            heights to help provide cushioning during extended stretches of
            running.
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Wrapper>
    </div>
  );
}
