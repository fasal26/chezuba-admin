import { useState } from 'react';
import styles from './menu.module.css';
import { useMenuStore } from './store/menuStore';
import { useNavigate } from 'react-router-dom';

export const CreateMenu = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    size: '',
    type: '',
  });
  const createMenuAction = useMenuStore(state => state.createMenuAction)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      console.log('Form data submitted:', formData);
      const { name: MENU_NAME,description: DESCRIPTION,price: PRICE,size: SIZE,type: TYPE } = formData
      let payload = {
          MENU_NAME,
          DESCRIPTION,
          PRICE,
          SIZE,
          STATUS: true,
          TYPE
      }
      const response = await createMenuAction(payload)
      if(response?.status === 1000){
        navigate(-1)
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className={styles['form-container']}>
      <button className={styles['back-button']}>&larr; Back</button>
      <h6 className={styles['main-heading']}>Product Details</h6>
      <form onSubmit={handleSubmit} className={styles['details-form']}>
        <div className={styles['form-group']}>
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange} 
            required 
            className={styles['form-input']}
          />
        </div>
        
        <div className={styles['form-group']}>
          <label htmlFor="description">Description</label>
          <input 
            type="text" 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleInputChange} 
            required 
            className={styles['form-input']}
          />
        </div>
        
        <div className={styles['form-group']}>
          <label htmlFor="price">Price</label>
          <input 
            type="number" 
            id="price" 
            name="price" 
            value={formData.price} 
            onChange={handleInputChange} 
            required 
            className={styles['form-input']}
          />
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="size">Size</label>
          <select 
            id="size" 
            name="size" 
            value={formData.size} 
            onChange={handleInputChange} 
            required 
            className={styles['form-input']}
          >
            <option value="">Select Size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        
        <div className={styles['form-group']}>
          <label htmlFor="type">Type</label>
          <select 
            id="type" 
            name="type" 
            value={formData.type} 
            onChange={handleInputChange} 
            required 
            className={styles['form-input']}
          >
            <option value="">Select Type</option>
            <option value="physical">Food</option>
            <option value="digital">Drink</option>
          </select>
        </div>

        <div className={styles['form-submit-btn']}>
          <button type="submit" className={styles['submit-button']}>Submit</button>
        </div>
      </form>
    </div>
  );
};