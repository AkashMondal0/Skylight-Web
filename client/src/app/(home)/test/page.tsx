// 'use client'
// import { supabaseClient } from '@/lib/supa-base';
// import { useState } from 'react';


// export default function Upload() {
//   const [file, setFile] = useState(null);

//   const handleUpload = async () => {
//     const { data, error } = await supabaseClient.storage.from('skymedia').upload(file.name, file);

//     if (error) {
//       console.error(error);
//       return;
//     }

//     // The file has been uploaded successfully
//     console.log('File uploaded successfully!', data);
//   };

//   return (
//     <div>

//       <input type="file" id="file-input" onChange={(event) => setFile(event.target.files[0])} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// }

import React from 'react'

const page = () => {
  return (
    <div>
      
    </div>
  )
}

export default page
