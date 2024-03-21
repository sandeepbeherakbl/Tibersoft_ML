import logo from "./logo.svg";
import "./App.css";
import MapComponent from "./components/mappage";

function App() {
  return (
    <>
      {/* <MapComponent /> */}
      <a href="BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//hacksw/handcal//NONSGML v1.0//EN
BEGIN:VEVENT
UID:1234567890
DTSTAMP:20240101T120000
DTSTART:20240115T090000
DTEND:20240115T100000
SUMMARY:Test Event
LOCATION:Test Location
DESCRIPTION:This is a test event.
END:VEVENT
END:VCALENDAR" download="event.ics">Add to Calendar</a>
    </>
  );
}

export default App;
