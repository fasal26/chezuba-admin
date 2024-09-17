import { Navbar } from "@widgets/navbar"
import { AppRoutes } from "./routes"
import { Socket } from "@socket/Socket"

function App() {

  return (
    <>
      <div className="cz-wrapper">
        <Navbar />
        <div className="cz-content">
          <AppRoutes/>
        </div>
        <Socket/>
      </div>
    </>
  )
}

export default App
