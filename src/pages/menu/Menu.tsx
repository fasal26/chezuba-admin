import { useEffect, useState } from 'react';
import styles from './menu.module.css';
import { useNavigate } from 'react-router-dom';
import { useMenuStore } from './store/menuStore';

export const Menu = () => {
  const navigate = useNavigate()
  const menuListAction = useMenuStore(state => state.MenuListAction)

  const [selectAll] = useState(false);

  useEffect(() => {
    const getMenuList = async () => {
      try {
        const response = await menuListAction()
        console.log(response)
      } catch (error) {
        
      }
    }

    getMenuList()
  }, [])
  

  // const handleNavigation = () => {
  //   navigate('/menu-details')
  // }
  
  return (
    <div className={styles['table-container']}>
      <div className={styles['table-header']}>
        <h1 className={styles['main-heading']}>Menu items</h1>
        <button className={`${styles['add-item-button']} pointer`} onClick={() => navigate('/menu-details')}>Add Menu</button>
      </div>
      <table className={styles['cz-table']}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Name</th>
            <th>Size</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Image</td>
            <td>File A</td>
            <td>2 MB</td>
            <td><input type="checkbox" checked={selectAll} /></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Document</td>
            <td>File B</td>
            <td>1 MB</td>
            <td><input type="checkbox" checked={selectAll} /></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Document</td>
            <td>File B</td>
            <td>1 MB</td>
            <td><input type="checkbox" checked={selectAll} /></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Document</td>
            <td>File B</td>
            <td>1 MB</td>
            <td><input type="checkbox" checked={selectAll} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
