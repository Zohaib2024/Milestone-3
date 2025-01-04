import Link from "next/link";
import Wrapper from "../components/Wrapper";

export default async function page() {
  const url = await fetch("https://fakestoreapi.com/products");
  const response = await url.json();
  return (
    <Wrapper>
      <main>
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <h1 className="text-[28px] md:text-[34px] font-semibold">
            All Products
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {response.map((product: any) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <div className="border p-4 rounded-lg shadow-md">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-contain mb-4"
                />
                <h2 className="font-semibold text-lg">{product.title}</h2>
                <p className="text-gray-600 text-sm mb-2">{product.category}</p>

                <p className="text-green-600 font-bold mb-2">
                  ${product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </Wrapper>
  );
}
