
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useRef, useEffect, useCallback, useState, useLayoutEffect } from "react";
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";

import { loadEvents } from "../../redux/features/calendar/eventSlice";
import { loadEventData } from "../../redux/features/calendar/eventSlice";

import CreateEventModal from "./CreateEventModal";
import UpdateEventModal from "./UpdateEventModal";


const localizer = momentLocalizer(moment)

const MyCalendar = function(props){
  const clickRef = useRef(null);
  const dispatch=useDispatch();

  const events=useSelector((state)=>state.event.events);
  const profileID=useSelector((state)=>state.profile.id);

  const theme=useSelector((state)=>state.settings.darkMode);

  const [createEventModal, setCreateEventModal]=useState(false);
  const [updateEventModal, setUpdateEventModal]=useState(false);

  const calendarStyle = (date) => {
    let currentDate = `${new Date().getDate()} ${new Date().getMonth()+1} ${new Date().getFullYear()}`
    let allDate = `${date.getDate()} ${date.getMonth()+1} ${date.getFullYear()}`

    if ( allDate === currentDate)
    return {
      style: {
        backgroundColor: 'rgb(51 65 85)', 
        border: '1px solid yellow',
      }
    }
  }
  
    
  useEffect(() => {
    if(profileID){
      dispatch(loadEvents(profileID))
    }
    else{
      console.log("Unable to fetch events; no Profile ID found");
     
    }
    /**
     * What Is This?
     * This is to prevent a memory leak, in the off chance that you
     * teardown your interface prior to the timed method being called.
     */
  }, [profileID])

  const onSelectSlot = useCallback((slotInfo) => {
    /**
     * Here we are waiting 250 milliseconds prior to firing
     * our method. Why? Because both 'click' and 'doubleClick'
     * would fire, in the event of a 'doubleClick'. By doing
     * this, the 'click' handler is overridden by the 'doubleClick'
     * action.
     */
    // window.clearTimeout(clickRef?.current)
    // clickRef.current = window.setTimeout(() => {
      
    // }, 250)

    console.log(slotInfo);
    //window.alert(JSON.stringify(slotInfo));
    setCreateEventModal(true);
  }, [])

  const onSelectEvent = useCallback((calEvent) => {
    /**
     * Here we are waiting 250 milliseconds (use what you want) prior to firing
     * our method. Why? Because both 'click' and 'doubleClick'
     * would fire, in the event of a 'doubleClick'. By doing
     * this, the 'click' handler is overridden by the 'doubleClick'
     * action.
     */
    window.clearTimeout(clickRef?.current)
    clickRef.current = window.setTimeout(() => {
      dispatch(loadEventData(calEvent));
      setUpdateEventModal(true);
      console.log(calEvent);

    }, 250)
  }, [])

    return(
        <div className="overflow-x-hidden mb-8">
            <div className={`m-5 px-2 h-10 text-center md:text-start font-nunito text-title xxxsm:text-4xl ${theme?"text-zinc-800":"text-white"}`}>
              Calendar
            </div>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{height: 500}}
              showMultiDayTimes={true}
              showAllEvents={true}
              selectable={true}
              onSelectSlot={onSelectSlot}
              className="calendar px-8 text-slate-400 text-filter xsm:text-base "
              dayPropGetter={calendarStyle}
              longPressThreshold={20}
              onSelectEvent={onSelectEvent}
              views={['month', 'day', 'agenda']}
              
            />
            {createEventModal && <CreateEventModal closeModal={setCreateEventModal}/>}
            {updateEventModal && <UpdateEventModal closeModal={setUpdateEventModal}/>}
        </div>
    )
}

export default MyCalendar;