"use client"
import axios from "axios";
import { Loader, Pen, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const dynamic = 'force-dynamic'

type Book = {
    _id:string,
    name:string,
    author:string,
    imageUrl:string,
}

type BookStore = {
    Books:Book[]
}


function ListBooks({Books}:BookStore) {
    const router = useRouter();
    const [deleteKey,setDeleteKey] = useState("");
    const onDelete = async (e:any,id:string) => {
        try{
            setDeleteKey(id);
            e.preventDefault();
            const data = await axios.delete(`${process.env.NEXT_PUBLIC_NODE_SERVER}/book/${id}`);
            if(data.status != 204){
                console.log('error');
                return await Promise.reject(data);
            }
            setDeleteKey("");
            router.refresh();
        }catch(err){
            console.log('error');
            return Promise.reject(err);
        }finally{
            setDeleteKey("");
        }
    }
    
    return (
        <div className="grid grid-cols-3 gap-x-20 gap-y-8 px-24">
            {Books?.map(book => 
                <div key={book._id} className="border-2 border-slate-500 p-2 ">
                    <div className="overflow-hidden w-[300px] h-[430px] ">
                        <Image 
                            src={book.imageUrl} 
                            alt={book.name} 
                            width={300} 
                            height={600}
                            className=""
                        />
                    </div>
                    <h2 className="text-2xl pl-2 pt-4 text-slate-200">{book.name}</h2>
                    <h5 className="text-base pl-2 text-slate-300">{book.author}</h5>
                    <div className="flex justify-end mt-4 text-zinc-200 gap-x-4">
                        <Link 
                            href={`/${book._id}`} 
                            className="cursor-pointer border-2 border-violet-800  py-2 px-2 hover:bg-violet-800 rounded-md text-base"
                            >
                            <Pen className="stroke-violet-300"/>
                        </Link>
                        <button 
                            className="cursor-pointer border-red-800 bg-red-700 py-2 px-2 hover:bg-red-800 rounded-md text-base"
                            disabled={book._id === deleteKey}
                            onClick={(e:any) => onDelete(e,book._id)}
                        >{book._id !== deleteKey ? <Trash2 className="stroke-red-200"/> : <Loader className="h-6 w-6 animate-spin stroke-red-100"/>}</button>
                    </div>
                </div>    
            )}
        </div>
    );
}

export default ListBooks;