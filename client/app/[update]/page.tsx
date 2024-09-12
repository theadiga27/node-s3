import UpdateBook from "@/components/UpdateBook";
import axios from "axios";

export const dynamic = 'force-dynamic'

type Book = {
  _id:string,
  name:string,
  author:string,
  imageUrl:string,
  key:string,
}

async function Update({
    params
  }: {
    params: { update: string }
  }) {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_NODE_SERVER}/book/${params.update}`);
    if(data.status!= "success"){
      console.error(data);
      return await Promise.reject(data);
    }
    const book:Book = data.data;
    return (
        <div className="p-4">
          <UpdateBook 
            id={book._id} 
            bookName={book.name} 
            bookAuthor={book.author}
          />
          
        </div>
    );
}

export default Update;