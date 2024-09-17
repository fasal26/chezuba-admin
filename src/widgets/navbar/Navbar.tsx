import styles from "./navbar.module.css"
import { router } from '@routes/index';

type urls = '/' | '/menu' | '/order'
type names = 'Dashboard' | 'Menu' | 'Order'

type MenuItem = {
  url: urls,
  name: names
}

export const Navbar = () => {

  const menuItems: MenuItem[] = [
    { url: '/', name: 'Dashboard' },
    { url: '/menu', name: 'Menu' },
    { url: '/order', name: 'Order' },
  ]

  const handleNavigation = (path: urls) => {
    router.navigate(path)
  }

  return (
    <div className={styles['cz-navbar']}>
      <div className={styles['cz-logo']}>
        <h1>Chezuba</h1>
      </div>
      <div className={styles['cz-tabs']}>
        <ul>
          { menuItems.map((menu: MenuItem) => (
            <li key={menu.url} onClick={() => handleNavigation(menu.url)} className="pointer">{menu.name}</li>
          )) }
        </ul>
      </div>
    </div>
  )
}
