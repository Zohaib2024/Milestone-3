// import HeroBanner from "./components/HeroBanner";
// import ProductCard from "./components/ProductCard"; // Import the ProductCard component
// import Wrapper from "./components/Wrapper";

// interface Product {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   image: string;
//   category: string;
//   rating: { rate: number; count: number };
// }

// export default async function Home() {
//   let products: Product[] = [];
//   let error: string | null = null;

//   // Fetching data from API
//   try {
//     const response = await fetch("https://fakestoreapi.com/products");
//     if (!response.ok) {
//       throw new Error("Failed to fetch products");
//     }
//     products = await response.json();
//   } catch (err: any) {
//     error = err.message;
//   }

//   // If there was an error during fetch
//   if (error) {
//     return <div className="text-red-500 text-center my-10">{error}</div>;
//   }

//   // Creating the slides for the HeroBanner component
//   const slides = products
//     .filter((product) => product.rating && product.rating.rate >= 4.0) // Filter top-rated products
//     .slice(0, 3) // Get only the top 3
//     .map((product) => ({
//       id: product.id,
//       src: product.image,
//       caption: product.title,
//     }));

//   return (
//     <Wrapper>
//       <HeroBanner slides={slides} />

//       <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
//         <h1 className="text-[28px] md:text-[34px] font-semibold">
//           Top Products
//         </h1>
//         <p className="text-md md:text-xl">
//           Discover the best products with unbeatable prices and amazing quality.
//         </p>
//       </div>

//       {/* Displaying the top-rated products in grid format */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
//         {products
//           .filter((product) => product.rating.rate >= 4.0) // Filter products again to ensure top-rated products
//           .map((product) => (
//             <ProductCard key={product.id} product={product} /> // Use ProductCard to display individual products
//           ))}
//       </div>
//     </Wrapper>
//   );
// }
import Link from "next/link";
import HeroBanner from "./components/HeroBanner";
import Wrapper from "./components/Wrapper";

export default async function Home() {
  const url = await fetch("https://fakestoreapi.com/products");
  const response = await url.json();

  const slides = response
    .filter((product: any) => product.rating && product.rating.rate >= 4.0) // Filter top-rated products
    .slice(0, 3) // Select the top 3 products
    .map((product: any) => ({
      id: product.id,
      src: product.image,
      caption: product.title,
    }));
  return (
    <main>
      <Wrapper>
        <HeroBanner slides={slides} />

        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <h1 className="text-[28px] md:text-[34px] font-semibold">
            Top Products
          </h1>
          <p className="text-md md:text-xl">
            Discover the best products with unbeatable prices and amazing
            quality.
          </p>
        </div>

        {/* Displaying the top-rated products in grid format */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {response
            .filter((product: any) => product.rating.rate >= 4.0) // Filter products with rating >= 4.0
            .map((product: any) => (
              <Link href={`/product/${product.id}`} key={product.id}>
                <div className="border p-4 rounded-lg shadow-md">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-contain mb-4"
                  />
                  <h2 className="font-semibold text-lg">{product.title}</h2>
                  <p className="text-gray-600 text-sm mb-2">
                    {product.category}
                  </p>
                  <p className="text-green-600 font-bold mb-2">
                    ${product.price}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </Wrapper>
    </main>
  );
}
