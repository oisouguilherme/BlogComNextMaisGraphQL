import Head from "next/head";
import Header from "../components/Header";
import Image from "next/image";
import CardPost from "@/components/CardPost";
import Link from "next/link";

import { gql, useQuery } from "@apollo/client";
import Loading from "@/components/Loading";

import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { GetServerSideProps } from "next";
import { client } from "@/lib/apollo";

const GET_ALL_POST = gql`
  query GetAllPosts {
    posts(orderBy: createdAt_DESC) {
      id
      slug
      subtitle
      title
      createdAt
      coverImage {
        url
      }
      author {
        name
      }
    }
  }
`;
interface AllPosts {
  posts: {
    id: string;
    slug: string;
    subtitle: string;
    title: string;
    createdAt: string;
    coverImage: {
      url: string;
    };
    author: {
      name: string;
    };
  }[];
}
export default function Home({ posts }: AllPosts) {
  //const { loading, data, error } = useQuery<AllPosts>(GET_ALL_POST);

  //if (loading) return <Loading />;

  return (
    <>
      <Head>
        <title>BlogTech</title>
      </Head>

      <div className="w-full max-w-[1120px] flex flex-col mx-auto pb-12 px-4">
        <Header />
        {posts ? (
          <>
            <Link
              href={`/post/${posts[0].slug}`}
              className="w-full h-full flex gap-4 lg:gap-8 flex-col sm:flex-row items-center justify-center mt-12 hover:brightness-75 transition-all"
            >
              <div className="flex h-full flex-1 w-full min-h-[240px] md:min-h-[334px] relative rounded-2xl overflow-hidden">
                <Image
                  src={posts[0].coverImage.url}
                  fill={true}
                  alt="imagemd e teste"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="flex flex-1 h-full flex-col gap-3 lg:gap-6">
                <h1 className="font-bold text-3xl md:text-[40px] text-blue-600">
                  {posts[0].title}
                </h1>
                <p className="text-zinc-600 text-sm md:text-base text-justify lg:text-left">
                  {posts[0].subtitle}
                </p>

                <div>
                  <p className="font-bold text-zinc-900 text-sm md:text-base">
                    {posts[0].author.name}
                  </p>
                  <p className="text-zinc-600 text-xs md:text-sm">
                    {format(
                      new Date(posts[0].createdAt),
                      "dd 'de' MMM 'de' yyyy",
                      { locale: ptBR }
                    )}
                  </p>
                </div>
              </div>
            </Link>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12 ">
              {posts.map((post, index) => {
                if (index !== 0) {
                  return (
                    <CardPost
                      key={post.id}
                      title={post.title}
                      author={post.author.name}
                      createdAt={post.createdAt}
                      subtitle={post.subtitle}
                      urlImage={post.coverImage.url}
                      slug={post.slug}
                    />
                  );
                }
              })}
            </div>
          </>
        ) : (
          "Sem dados cadastrados"
        )}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await client.query({ query: GET_ALL_POST });

  return {
    props: {
      posts: data.posts,
    },
  };
};
