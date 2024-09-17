import { useRef, useState } from "react";
import styles from "./fileUpload.module.css"

export const useFileUpload = () => {
  const [file, setFile] = useState('');
  const inpRef = useRef<HTMLInputElement>(null);
  
  const fetchFiles = () => {
    if (inpRef.current) inpRef.current.click();
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const ImageView = () => {
    return (
      <>
        <input
          type="file"
          id="pizz-img"
          name="pizz-img"
          accept=".jpg, .jpeg, .png, .gif, .pdf" 
          style={{ display: "none" }}
          onChange={handleImageChange}
          ref={inpRef}
        />
        {
          file && (
            <div className={styles['img-container']}>
              <img src={file}></img>
              <span className={styles['close-icon']} onClick={() => setFile('')}>
                &times;
              </span>
            </div>
          )
        }
      </>
    );
  };

  return {
    ImageView,
    file,
    fetchFiles,
  };
};
