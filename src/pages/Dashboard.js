import Sidebar from "../components/Sidebar";
import Home from "../components/Home";


function Dashboard() {

  return (

    <div style={{ display: "flex" }}>

      <Sidebar />

      <div style={{ flex: 1 }}>

        <Home />

      </div>

    </div>

  );

}

export default Dashboard;