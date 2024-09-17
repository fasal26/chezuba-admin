import { useEffect, useState } from "react";
import styles from "./menu.module.css";
import { useMenuStore } from "./store/menuStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFileUpload } from "@hooks/useFileUpload";
import { IMenuItem, IMenuPayload } from "./store/IMenuStore";

export const CreateMenu = () => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const id = searchParams.get("id") as string;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    size: "",
    type: "",
    id: "",
    prepTime: 0,
    image: "",
  });
  const createMenuAction = useMenuStore((state) => state.createMenuAction);
  const menuDetailsAction = useMenuStore((state) => state.menuDetailsAction);
  const updateMenuAction = useMenuStore((state) => state.updateMenuAction);

  const { ImageView, fetchFiles, file } = useFileUpload();

  useEffect(() => {
    const getItemDetails = async () => {
      try {
        const response = await menuDetailsAction({ MENU_ID: id });
        if (response?.data) {
          const {
            DESCRIPTION,
            MENU_NAME,
            PRICE,
            SIZE,
            TYPE,
            MENU_ID,
            PREP_TIME,
            IMAGE,
          } = response?.data;
          setFormData(() => {
            return {
              name: MENU_NAME,
              description: DESCRIPTION,
              price: PRICE,
              size: SIZE,
              type: TYPE,
              id: MENU_ID,
              prepTime: PREP_TIME,
              image: IMAGE || "",
            };
          });
        }
      } catch (error) {}
    };

    if (id) getItemDetails();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    id ? updateMenu() : createMenu();
  };

  const createMenu = async () => {
    try {
      console.log("Form data submitted:", formData);
      const {
        name: MENU_NAME,
        description: DESCRIPTION,
        price: PRICE,
        size: SIZE,
        type: TYPE,
        prepTime: PREP_TIME,
        image: IMAGE,
      } = formData;
      let payload: IMenuPayload = {
        MENU_NAME,
        DESCRIPTION,
        PRICE: +PRICE,
        SIZE,
        TYPE,
        IMAGE,
        PREP_TIME: +PREP_TIME,
      };
      if (file) payload.IMAGE = file;
      const response = await createMenuAction(payload);
      if (response?.status === 201) {
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateMenu = async () => {
    try {
      console.log("Form data submitted:", formData);
      const {
        name: MENU_NAME,
        id: MENU_ID,
        description: DESCRIPTION,
        price: PRICE,
        size: SIZE,
        type: TYPE,
        prepTime: PREP_TIME,
        image: IMAGE,
      } = formData;
      let payload: IMenuItem = {
        MENU_ID,
        MENU_NAME,
        DESCRIPTION,
        PRICE: +PRICE,
        SIZE,
        TYPE,
        IMAGE,
        PREP_TIME: +PREP_TIME,
      };
      if (file) payload.IMAGE = file;
      if (formData?.id) payload.MENU_ID = formData?.id;
      const response = await updateMenuAction(payload);
      if (response?.status === 200) {
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles["form-container"]}>
      <button className={styles["back-button"]} onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <h6 className={styles["main-heading"]}>Product Details</h6>
      <form onSubmit={handleSubmit} className={styles["details-form"]}>
        <div className={styles["form-group"]}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className={styles["form-input"]}
          />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className={styles["form-input"]}
          />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            className={styles["form-input"]}
          />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="price">Preparation time (mins)</label>
          <input
            type="number"
            id="price"
            name="prepTime"
            value={formData.prepTime}
            onChange={handleInputChange}
            required
            className={styles["form-input"]}
          />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="size">Size</label>
          <select
            id="size"
            name="size"
            value={formData.size}
            onChange={handleInputChange}
            required
            className={styles["form-input"]}
          >
            <option value="">Select Size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
            className={styles["form-input"]}
          >
            <option value="">Select Type</option>
            <option value="Food">Food</option>
            <option value="Drink">Drink</option>
          </select>
        </div>

        <div className={`${styles["form-group"]} ${styles["img"]}`}>
          <p onClick={() => fetchFiles()}>Add Attachment</p>
          <ImageView file={formData?.image} />
        </div>

        <div className={styles["form-submit-btn"]}>
          <button type="submit" className={styles["submit-button"]}>
            {id ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};
