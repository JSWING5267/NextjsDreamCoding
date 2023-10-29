import Link from "next/link";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export default function PostPage({ params }: Props) {
  return (
    <>
      <h1>{params.slug} 제품 설명 페이지</h1>
    </>
  );
}

export function generateStaticParams() {
  const products = ["pants", "skirt", "shirt", "shoes"];
  return products.map((product) => ({
    slug: product,
  }));
}
