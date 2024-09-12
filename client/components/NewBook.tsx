"use client"

import axios from "axios";
import { Loader, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

function NewBook() {
  const [file,setFile] = useState<Blob | null>();
  const [name,setName] = useState<string>();
  const [author,setAuthor] = useState<string>();
  const [isLoading,setLoading] = useState(false);
 
  const router = useRouter();

  const handleChange = (file:Blob) => {
    setFile(file);
  }

  const onSubmit = async (e:any) => {
    try{
      e.preventDefault();
      setLoading(true);

      const {data} = await axios.post(`${process.env.NEXT_PUBLIC_NODE_SERVER}/book`,{
        name,
        author,
        file
      },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
        }
      }
    ) 

      if(data.status !== "success"){
        console.error("Error Creating App");
        return Promise.reject(data);
      }
     
      setName("");
      setAuthor("");
      setFile(null);

      setLoading(false);
      router.refresh();
    }catch(err){
      console.error(err);
      return Promise.reject(err);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border  shadow-lg rounded-md bg-black">
        <div>
          <div className="flex justify-between mt-4 px-6">
            <h3 className="text-4xl font-bold text-slate-300">Add New Book</h3>
            <button
              onClick={router.back}
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <X/>
            </button>
          </div>
          <div className="mt-2 px-7 py-3">
              <form  className="grid grid-cols-2  gap-x-16 gap-y-8 " onSubmit={onSubmit}>
                <div className="flex flex-col gap-1">
                  <label htmlFor="name">Enter Book Name</label>
                  <input 
                    name="name" 
                    type="text" 
                    placeholder="Atomic Habits" 
                    value={name}
                    required 
                    onChange={(e) => setName(e.target.value)}
                    className="p-3 text-base rounded-md bg-slate-700 placeholder:text-sm placeholder-slate-400 outline-none focus:text-slate-300"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="author">Enter Author Name</label>
                  <input 
                    name="author" 
                    type="text" 
                    placeholder="James Clear" 
                    value={author}
                    required
                    onChange={(e) => setAuthor(e.target.value)}
                    className="p-3 text-base rounded-md bg-slate-700 placeholder:text-sm placeholder-slate-400 outline-none focus:text-slate-300"
                  />
                </div>

                <div className="flex flex-col gap-1 overflow-hidden whitespace-pre">
                  <label htmlFor="file">Upload Image </label>
                  <FileUploader 
                    handleChange={handleChange} 
                    name="file" 
                    types={["jpg","jpeg","png","webp"]} 
                    label={"Upload or drop a image right here"}
                    required
                    fileOrFiles={file}
                    />
                </div>
                
                <div className="flex gap-6 items-end">
                  <button
                    type="submit" 
                    value="Submit" 
                    className="border-2 border-slate-200 rounded-md py-2 px-4 hover:bg-slate-800 hover:text-slate-100 cursor-pointer"
                  >{
                    !isLoading ? "Submit" :(
                      <Loader className="h-6 w-6 animate-spin"/>
                    )
                  }</button>
                </div>
              </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default NewBook;