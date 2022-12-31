
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useRef, useEffect, useCallback, useState } from "react";
import moment from 'moment';

import CreateEventModal from "./CreateEventModal";

const events=[
    {
      allDay: true,
      end: new Date('2022-11-31T18:30:00.000Z'),
      id: 0,
      start: new Date('2022-11-30T18:30:00.000Z'),
      title: 'All Day Event very long title'
    },
    {
      end: new Date('2022-11-09T18:30:00.000Z'),
      id: 1,
      start: new Date('2022-11-06T18:30:00.000Z'),
      title: 'Long Event'
    },
    {
      end: new Date('2022-11-19T18:30:00.000Z'),
      id: 2,
      start: new Date('2022-11-12T18:30:00.000Z'),
      title: 'DTS STARTS'
    },
    {
      end: new Date('2022-11-12T18:30:00.000Z'),
      id: 3,
      start: new Date('2022-11-05T18:30:00.000Z'),
      title: 'DTS ENDS'
    },
    {
      end: new Date('2022-04-09T18:30:00.000Z'),
      id: 4,
      start: new Date('2022-04-08T18:30:00.000Z'),
      title: 'Some Event'
    },
    {
      desc: 'Big conference for important people',
      end: new Date('2022-04-12T18:30:00.000Z'),
      id: 5,
      start: new Date('2022-04-10T18:30:00.000Z'),
      title: 'Conference'
    },
    {
      desc: 'Pre-meeting meeting, to prepare for the meeting',
      end: new Date('2022-04-12T07:00:00.000Z'),
      id: 6,
      start: new Date('2022-04-12T05:00:00.000Z'),
      title: 'Meeting'
    },
    {
      desc: 'Power lunch',
      end: new Date('2022-04-12T07:30:00.000Z'),
      id: 7,
      start: new Date('2022-04-12T06:30:00.000Z'),
      title: 'Lunch'
    },
    {
      end: new Date('2022-04-12T09:30:00.000Z'),
      id: 8,
      start: new Date('2022-04-12T08:30:00.000Z'),
      title: 'Meeting'
    },
    {
      desc: 'Most important meal of the day',
      end: new Date('2022-04-12T12:00:00.000Z'),
      id: 9,
      start: new Date('2022-04-12T11:30:00.000Z'),
      title: 'Happy Hour'
    },
    {
      end: new Date('2022-04-12T15:30:00.000Z'),
      id: 10,
      start: new Date('2022-04-12T14:30:00.000Z'),
      title: 'Dinner'
    },
    {
      end: new Date('2022-04-13T05:00:00.000Z'),
      id: 11,
      start: new Date('2022-04-13T02:30:00.000Z'),
      title: 'Planning Meeting with Paige'
    },
    {
      end: new Date('2022-04-13T06:30:00.000Z'),
      id: 11.1,
      start: new Date('2022-04-13T04:00:00.000Z'),
      title: 'Inconvenient Conference Call'
    },
    {
      end: new Date('2022-04-13T08:30:00.000Z'),
      id: 11.2,
      start: new Date('2022-04-13T06:00:00.000Z'),
      title: 'Project Kickoff - Lou\'s Shoes'
    },
    {
      end: new Date('2022-04-13T10:30:00.000Z'),
      id: 11.3,
      start: new Date('2022-04-13T10:00:00.000Z'),
      title: 'Quote Follow-up - Tea by Tina'
    },
    {
      end: new Date('2022-04-17T20:30:00.000Z'),
      id: 12,
      start: new Date('2022-04-17T14:00:00.000Z'),
      title: 'Late Night Event'
    },
    {
      end: new Date('2022-04-17T18:00:00.000Z'),
      id: 12.5,
      start: new Date('2022-04-17T14:00:00.000Z'),
      title: 'Late Same Night Event'
    },
    {
      end: new Date('2022-04-21T20:30:00.000Z'),
      id: 13,
      start: new Date('2022-04-20T14:00:00.000Z'),
      title: 'Multi-day Event'
    },
    {
      end: new Date('2022-11-30T02:28:30.895Z'),
      id: 14,
      start: new Date('2022-11-29T20:28:30.895Z'),
      title: 'Today'
    },
    {
      end: new Date('2022-11-29T23:28:30.894Z'),
      id: 15,
      start: new Date('2022-11-29T23:28:30.894Z'),
      title: 'Point in Time Event'
    },
    {
      end: new Date('2022-04-14T13:30:00.000Z'),
      id: 16,
      start: new Date('2022-04-14T10:00:00.000Z'),
      title: 'Video Record'
    },
    {
      end: new Date('2022-04-14T14:30:00.000Z'),
      id: 17,
      start: new Date('2022-04-14T11:00:00.000Z'),
      title: 'Dutch Song Producing'
    },
    {
      end: new Date('2022-04-14T12:00:00.000Z'),
      id: 18,
      start: new Date('2022-04-14T11:00:00.000Z'),
      title: 'Itaewon Halloween Meeting'
    },
    {
      end: new Date('2022-04-14T15:00:00.000Z'),
      id: 19,
      start: new Date('2022-04-14T12:00:00.000Z'),
      title: 'Online Coding Test'
    },
    {
      end: new Date('2022-04-14T13:00:00.000Z'),
      id: 20,
      start: new Date('2022-04-14T11:30:00.000Z'),
      title: 'An overlapped Event'
    },
    {
      end: new Date('2022-04-14T13:00:00.000Z'),
      id: 21,
      start: new Date('2022-04-14T11:30:00.000Z'),
      title: 'Phone Interview'
    },
    {
      end: new Date('2022-04-14T13:30:00.000Z'),
      id: 22,
      start: new Date('2022-04-14T12:00:00.000Z'),
      title: 'Cooking Class'
    },
    {
      end: new Date('2022-04-14T14:30:00.000Z'),
      id: 23,
      start: new Date('2022-04-14T13:00:00.000Z'),
      title: 'Go to the gym'
    }
]


const localizer = momentLocalizer(moment)

const MyCalendar = function(props){
  const clickRef = useRef(null)

  const [createEventModal, setCreateEventModal]=useState(false);

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
    /**
     * What Is This?
     * This is to prevent a memory leak, in the off chance that you
     * teardown your interface prior to the timed method being called.
     */
    return () => {
      window.clearTimeout(clickRef?.current)
    }
  }, [])

  const onSelectSlot = useCallback((slotInfo) => {
    /**
     * Here we are waiting 250 milliseconds prior to firing
     * our method. Why? Because both 'click' and 'doubleClick'
     * would fire, in the event of a 'doubleClick'. By doing
     * this, the 'click' handler is overridden by the 'doubleClick'
     * action.
     */
    window.clearTimeout(clickRef?.current)
    clickRef.current = window.setTimeout(() => {
      console.log(slotInfo);
      //window.alert(JSON.stringify(slotInfo));
      setCreateEventModal(true);
    }, 250)
  }, [])

    return(
        <div>
            <div className="m-5 px-2 h-10 text-center md:text-start font-nunito text-4xl text-white">
              Calendar
            </div>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              showMultiDayTimes={true}
              showAllEvents={true}
              selectable
              onSelectSlot={onSelectSlot}
              className="px-8 text-slate-400"
              dayPropGetter={calendarStyle}
              
            />
            {createEventModal && <CreateEventModal closeModal={setCreateEventModal}/>}
        </div>
    )
}

export default MyCalendar;