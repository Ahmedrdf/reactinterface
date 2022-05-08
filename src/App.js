import "./App.css";
import { BiCalendar, BiTrash } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointement from "./components/AddAppointement";
import AppointementList from "./data.json";
import AppointementInfo from "./components/AppointementInfo";

function App() {
  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <BiCalendar className="inline-block text-red-300" /> Your Appointement
      </h1>
      <AddAppointement />
      <Search />
      <ul className="divide-y divide-gray-200">
        {AppointementList.map((appointment) => (
          <AppointementInfo key={appointment.id} appointement={appointment} />
        ))}
      </ul>
    </div>
  );
}

export default App;
