import { useEffect } from "react";
import styles from "./order.module.css";
import { useOrderStore } from "./store/orderStore";
import { IOrder } from "./store/IOrderStore";

export const OrderList = () => {
  const orderListAction = useOrderStore((state) => state.orderListAction);
  const orderList = useOrderStore((state) => state.orderList);
  const startOrderAction = useOrderStore((state) => state.startOrderAction);
  const completeOrderAction = useOrderStore(
    (state) => state.completeOrderAction
  );

  useEffect(() => {
    getOrderList();
  }, []);

  const getOrderList = async () => {
    try {
      await orderListAction();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAction = async (order: IOrder) => {
    try {
      const response =
        order.STATUS == "Pending"
          ? await startOrderAction({ ORDER_ID: order.ORDER_ID })
          : await completeOrderAction({ ORDER_ID: order.ORDER_ID });
      if (response?.status == 200) {
        alert(response.message);
        getOrderList();
      }
    } catch (error) {}
  };

  return (
    <div className={styles["table-container"]}>
      <div className={styles["table-header"]}>
        <h1 className={styles["main-heading"]}>Pending Orders</h1>
      </div>
      <table className={styles["cz-table"]}>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Date</th>
            <th>Total Amount</th>
            <th>Total items</th>
            <th>Preparation time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((ordr,i) => {
            return (
              <tr
                key={ordr?.ORDER_ID}
              >
                <td>{ordr?.ORDER_ID}</td>
                <td>{ordr?.DATE}</td>
                <td>₹ {ordr.AMOUNT}</td>
                <td>{ordr?.ITEMS?.length}</td>
                <td>{ordr?.PREP_TIME} mins</td>
                <td>{ordr?.STATUS}</td>
                {i == 0 && (
                  <td>
                    <button
                      type="button"
                      className={styles["cz-table-action-btn"]}
                      onClick={() => handleAction(ordr)}
                    >
                      {ordr?.STATUS == "Pending" ? "Start" : "Complete"}
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
