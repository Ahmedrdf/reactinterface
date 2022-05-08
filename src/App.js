import "./App.css";
import { BiCalendar, BiTrash } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointement from "./components/AddAppointement";
// import AppointementList from "./data.json";
import { useCallback, useState, useEffect } from "react";
import AppointementInfo from "./components/AppointementInfo";

function App() {
  let [AppointementList, setAppointementList] = useState([]);
  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("petName");
  let [orderBy, setOrderBy] = useState("asc");
  const filtredAppointementList = AppointementList.filter((item) => {
    return (
      item.petName.toLowerCase().includes(query.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
      item.aptNotes.toLowerCase().includes(query.toLowerCase())
    );
  }).sort((a, b) => {
    let order = orderBy === "asc" ? 1 : -1;
    return a[sortBy] < b[sortBy] ? -1 * order : 1 * order;
  });
  console.log("***************" + filtredAppointementList.map((x) => x.id));
  const fetched = useCallback(() => {
    fetch("./data.json")
      .then((Response) => Response.json())
      .then((data) => {
        setAppointementList(data);
      });
  }, []);
  useEffect(() => {
    fetched();
  }, []);
  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <BiCalendar className="inline-block text-red-300" /> Your Appointement
      </h1>
      <AddAppointement />
      <Search
        query={query}
        onChangeQuery={(myQuery) => setQuery(myQuery)}
        orderBy={orderBy}
        onOrderByChange={(myOrder) => setOrderBy(myOrder)}
        sortBy={sortBy}
        onSortByChange={(mySort) => setSortBy(mySort)}
      />

      <ul className="divide-y divide-gray-200">
        {filtredAppointementList.map((appointment) => (
          <AppointementInfo
            key={appointment.id}
            appointement={appointment}
            onDeleteAppointement={(appointmentId) =>
              setAppointementList(
                AppointementList.filter(
                  (appointment) => appointment.id != appointmentId
                )
              )
            }
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
