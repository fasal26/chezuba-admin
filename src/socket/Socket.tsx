import { useOrderStore } from "@pages/order/store/orderStore";
import { useEffect, useRef } from "react"
import io from "socket.io-client";

export const Socket = () => {
  const socket = useRef<any>(null)
  const updateOrderItems = useOrderStore(state => state.updateOrderItems)

  useEffect(() => {
    if(!socket.current){
      console.log('init')
      socket.current = io("http://localhost:5005", {
        transports: ["websocket"],
      });
      socket.current.on("connect", socketConnect);
    }
  }, [])
  
  const socketConnect = () => {
    console.log('connected')
    if(socket.current && socket.current.id) {
      socket.current.on("ORDER_PLACED", onOrderPlace)
    }
  }

  const onOrderPlace = (payload: any) => {
    updateOrderItems(payload)
  }

  return (
    <></>
  )
}
