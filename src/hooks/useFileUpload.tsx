import { useRef, useState } from "react";
import styles from "./fileUpload.module.css"

export const useFileUpload = () => {
  const [file, setFile] = useState('');
  const inpRef = useRef<HTMLInputElement>(null);
  
  const fetchFiles = () => {
    if (inpRef.current) inpRef.current.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files?.length){
      let file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFile(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const ImageView = ({ file }: { file?: string }) => {
    if(file) setFile(file)

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
