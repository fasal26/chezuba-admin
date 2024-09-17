import { ISocketPayload } from "@pages/order/store/IOrderStore";
import { useOrderStore } from "@pages/order/store/orderStore";
import { useEffect, useRef } from "react"
import io from 'socket.io-client';

export const Socket = () => {
  const socket = useRef<typeof io | null>(null)
  const updateOrderItems = useOrderStore(state => state.updateOrderItems)

  useEffect(() => {
    if(!socket.current){
      socket.current = io(import.meta.env.VITE_SOCKET, {
        transports: ["websocket"],
      });
      socket.current.on("connect", socketConnect);
      socket.current.on("disconnect", socketDisconnect);
    }
  }, [])
  
  const socketConnect = () => {
    console.log('socket connected...')
    if(socket.current && socket.current.id) {
      socket.current.on("ORDER_PLACED", onOrderPlace)
    }
  }

  const socketDisconnect = () => {
    console.log('socket disconnected...')
  }

  const onOrderPlace = (payload: ISocketPayload) => {
    updateOrderItems(payload)
  }

  return (
    <></>
  )
}
