import { error } from 'console';
import { writeFile } from 'fs/promises';
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid';

const page = ({}) => {
  async function upload (data: FormData) {
    "use server"

    try{

    const file : File | null = data.get("file") as unknown as File;

    if(!file || file.name==="undefined"){
      throw new Error ("NO file uploaded");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uniqueIdentifier = uuidv4();
    const fileName = file.name;
    const fileExtension = fileName.split('.').pop();

    const uniqueFileName = `${fileName}-${uniqueIdentifier}.${fileExtension}`;

    const path = `./public/${uniqueFileName}`;
    await writeFile(path,buffer);
    console.log(path);

    return {success:true}
  }
  catch(error){
    console.log(error);
  }
  }
  return <div className='flex items-center justify-center h-screen w-screen flex-col'>
    <div className="text-blue-600">
      <AiOutlineCloudUpload size={'10vmax'}/>
    </div>
    <form action={upload}>
      <input type="file" accept="image/*" name="file"/>
      <button type='submit' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Upload</button>
    </form>
  </div>
}

export default page