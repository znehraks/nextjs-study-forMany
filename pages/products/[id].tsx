import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Script from "next/script";
import React from "react";
type Props = {
  productId: number;
};
function ProductId({ productId }: Props) {
  const router = useRouter();
  const titleText = `Product-${productId}`;
  return (
    <>
      <Head>
        <title>{titleText}</title>
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
      <Image src="/images/profile.jpg" alt="profile" width={144} height={144} />
      {router.query.id} {productId}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  return {
    paths: [{ params: { id: "7" } }, { params: { id: "8" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  console.log(ctx.params);
  console.log(ctx.params?.id);
  return { props: { productId: ctx.params?.id } };
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   console.log(ctx.query);
//   return { props: { productId: ctx.query.id } };
// };

export default ProductId;
