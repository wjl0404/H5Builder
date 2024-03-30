import Head from "next/head";
import ClientOnly from "src/components/ClientOnly";
import Canvas from "src/components/Canvas";

export default function Home({ data }: any) {
  return (
    <>
      <Head>
        <title>{data?.title || ""}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="lowcode low code" />
      </Head>
      <main>
        <ClientOnly>
          {data ? (
            <Canvas canvas={JSON.parse(data.content)} />
          ) : (
            <div className="err">
              id 信息有误，请检查之后重新输入
            </div>
          )}
        </ClientOnly>
      </main>
    </>
  );
}

// SSR，Server-Side Rendering
// 在页面请求时重新生成HTML发送给客户端。
// getServerSideProps 只在服务端调用，并不会运行在客户端。
export async function getServerSideProps({ query }: { query: { id: string } }) {
  const res = await fetch(
    "http://localhost:4000/api/web/content/get?id=" + (query.id || 2)
  );

  const data = await res.json();

  return {
    props: {
      data: data.result.publish && !data.result.isDelete && data.result,
    },
  };
}
