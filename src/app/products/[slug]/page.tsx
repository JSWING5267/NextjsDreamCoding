import { getProduct, getProducts } from "@/service/products";
import { notFound, redirect } from "next/navigation";
import jeansImage from "../../../../public/images/jeans.jpg";
import shoesImage from "../../../../public/images/shoes.jpg";
import tshirtImage from "../../../../public/images/tshirt.jpg";
import Image from "next/image";
import GoProductsButton from "@/components/GoProductsButton";

export const revalidate = 3;

type Props = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: Props) {
  return {
    title: `제품의 이름: ${params.slug}`,
  };
}

export default async function ProductPage({ params: { slug } }: Props) {
  const product = await getProduct(slug);

  if (!product) {
    redirect("/products");
  }

  return (
    <>
      <h1>{product?.name} 제품 설명 페이지</h1>
      <Image
        src={`/images/${product?.image}`}
        alt={product?.name}
        width="300"
        height="300"
      />
      <GoProductsButton />
    </>
  );
}

export async function generateStaticParams() {
  // 모든 제품의 페이지들을 미리 만들어 둘 수 있게 해줄거임 (SSG)
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.id,
  }));
}
