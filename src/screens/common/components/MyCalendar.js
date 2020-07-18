import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

/**
 * 
 * @param { ? } calendarEvents  
 * @param { ? } handleEventClick  
 */
const MyCalendar = (props) => {
    const {
        calendarEvents,
        handleEventClick
    } = props;
    
    return (
        <FullCalendar
            defaultView="dayGridMonth"
            header={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            weekends={true}
            events={calendarEvents}
            eventClick={handleEventClick}
        />    
    );
};

export default MyCalendar;