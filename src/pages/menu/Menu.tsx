import { useEffect, useState } from "react";
import styles from "./menu.module.css";
import { useNavigate } from "react-router-dom";
import { useMenuStore } from "./store/menuStore";

export const Menu = () => {
  const navigate = useNavigate();
  const menuListAction = useMenuStore((state) => state.menuListAction);
  const updateMenuStatusAction = useMenuStore(
    (state) => state.updateMenuStatusAction
  );

  const [menuList, setMenuList] = useState<any>([]);

  useEffect(() => {
    getMenuList();
  }, []);

  const getMenuList = async () => {
    try {
      const response = await menuListAction();
      console.log(response);
      if (response?.status == 200) {
        setMenuList(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const nvgtToDtlsPage = (id: string) => {
    navigate(`/menu-details?id=${id}`);
  };

  const updateStatus = async (e: React.ChangeEvent<HTMLInputElement>,id: string) => {
    try {
      const payload = {
        MENU_ID: id,
        STATUS: e.target.checked
      }
      const response = await updateMenuStatusAction(payload)
      if(response?.status == 200) {
        getMenuList();
        alert(response?.message)
      }
    } catch (error) {}
  };

  return (
    <div className={styles["table-container"]}>
      <div className={styles["table-header"]}>
        <h1 className={styles["main-heading"]}>Menu items</h1>
        <button
          className={`${styles["add-item-button"]} pointer`}
          onClick={() => navigate("/menu-details")}
        >
          Add Menu
        </button>
      </div>
      <table className={styles["cz-table"]}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Name</th>
            <th>Size</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {menuList.map((menu: any, i: number) => {
            return (
              <tr
                onClick={() => nvgtToDtlsPage(menu.MENU_ID)}
                key={menu?.MENU_ID}
              >
                <td>{menu?.MENU_ID}</td>
                <td>{menu.TYPE}</td>
                <td>{menu.MENU_NAME}</td>
                <td>{menu.SIZE}</td>
                <td>₹ {menu.PRICE}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={menu.STATUS}
                    onChange={(e) => updateStatus(e,menu?.MENU_ID)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
