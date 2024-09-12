import ListBooks from "@/components/ListBooks";
import NewBook from "@/components/NewBook";
import axios from "axios";
import Link from "next/link";

export const dynamic = 'force-dynamic'

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default async function Home({ searchParams }: SearchParamProps) {
  const add = searchParams?.add;
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_NODE_SERVER}/books`);
  const model = add == "true" ? true : false
  if(data.status != "success"){
    console.error("Error Fetching apps");
    return Promise.reject(data);
  }

  return (
    <main className="flex justify-center items-center flex-col gap-10 p-5 text-xl">
      <div className="w-full">
        <h2 className="text-5xl text-center">Book Store</h2>
        <div className="flex justify-end pr-16">
          <Link 
            href="/?add=true" 
            className="px-4 py-2 place-items-end bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
            Add New Book
          </Link>
        </div>
      </div>
      {model && <NewBook/>}
      <ListBooks Books={data.data}/>
    </main>
  );
}
