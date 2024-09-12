"use client"
import axios from "axios";
import { Loader} from "lucide-react";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import { FileUploader } from "react-drag-drop-files";

type UpdateProps = {
  id:string,
  bookName:string,
  bookAuthor:string,
}

function UpdateBook({id,bookName,bookAuthor}:UpdateProps) {
  const router = useRouter();
  const [file,setFile] = useState<Blob | null>();
  const [name,setName] = useState<string>(bookName);
  const [author,setAuthor] = useState<string>(bookAuthor);
  const [isLoading,setLoading] = useState(false);

  
  const handleChange = (file:Blob) => {
    setFile(file);
  }

  const onUpdate = async (e:any) => {
    try{
      e.preventDefault();
      setLoading(true);
      console.log(name,author,file);
      const {data} = await axios.patch(`${process.env.NEXT_PUBLIC_NODE_SERVER}/book/${id}`,{
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
      router.push("/");
    }catch(err){
      console.error(err);
      return Promise.reject(err);
    }finally{
      setLoading(false);
      // router.push("/")
    }
  }

    return (
      <div className="mt-2 px-7 py-3">
        <form  className="grid grid-cols-2  gap-x-16 gap-y-8 " onSubmit={onUpdate}>
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
              className="border-2 border-slate-200 rounded-md py-2 px-4 hover:bg-slate-800 hover:text-slate-100 cursor-pointer"
            >{
              !isLoading ? "Submit" :(
                <Loader className="h-6 w-6 animate-spin"/>
              )
            }</button>
          </div>
        </form>
      </div>
    );
}

export default UpdateBook;