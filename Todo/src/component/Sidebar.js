import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../scss/Sidebar.scss';

function Sidebar({ selectedDate, setSelectedDate }) {
  const onChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="sidebar">
      <div className="menu" />
      <Calendar onChange={onChange} value={selectedDate} />
    </div>
  );
}

export default Sidebar;