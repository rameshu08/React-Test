import React, { useEffect, useState } from 'react'

function Resume({file}) {

    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader?.result);
          };
          reader?.readAsDataURL(file);
        } else {
          setPreview(null);
        }
      }, [file]);

      console.log(preview)

  return (
    <div>Resume</div>
  )
}

export default Resume