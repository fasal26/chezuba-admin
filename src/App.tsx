import { Navbar } from "@widgets/navbar"
import { AppRoutes } from "./routes"

function App() {

  return (
    <>
      <div className="cz-wrapper">
        <Navbar />
        <div className="cz-content">
          <AppRoutes/>
        </div>
      </div>
    </>
  )
}

export default App
