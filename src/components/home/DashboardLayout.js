import { useSelector, useDispatch } from "react-redux"
import Chart from "react-apexcharts";
import { useEffect } from "react";
import { fetchTodos } from "../../redux/features/todos/todoSlice";
import { loadEvents } from "../../redux/features/calendar/eventSlice";
import { loadNotes } from "../../redux/features/note/noteSlice";
import { loadCreatedTodosData, loadHighTodosData, loadLowTodosData, loadEventsData, loadNotesData, loadLowPrTodosPercent, loadHighPrTodosPercent, loadInprogressTodosPercent, loadCompletedTodosPercent } from "../helperFunctionsCharts";

const months={
  0:"Jan",
  1:"Feb",
  2:"March",
  3:"April",
  4:"May",
  5:"June",
  6:"July",
  7:"Aug",
  8:"Sept",
  9:"Oct",
  10:"Nov",
  11:"Dec"

}

function DashboardLayout() {

  const dispatch=useDispatch();

  const theme=useSelector((state)=>state.settings.darkMode);
  const profileID=useSelector((state)=>state.profile.id);

  const todos=useSelector((state)=>state.todo.todos);
  const events=useSelector((state)=>state.event.events); 
  const notes=useSelector((state)=>state.note.notes);



  // const state = {
  //   options: {
  //     xaxis: {
  //       categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
  //     },
  //     chart:{
  //       toolbar:{
  //         show:false
  //       }
  //     }
  //   },
  //   series: [
  //     {
  //       name: "series-1",
  //       data: [30, 40, 45, 50, 49, 60, 70, 91]
  //     }
  //   ]
  // };
  

  const todosCreatedState = {
    chart: {
      type: "line",
      toolbar:{
        show:false
      },
      height: 50,
      width: "50%",
    },
    series: [
      {
        name: "Todos",
        data: loadCreatedTodosData(todos)
      }
    ],
    xaxis: {
      type: "datetime",
      labels: {
        format: 'MMM, yyyy'
      },
      tooltip: {
        enabled: false
      }
    },
    stroke: {
      curve: 'smooth',
    },
    markers: {
      size: 5,
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ['Todos'],
      markers: {
        fillColors: ['#1B98F5']
      }
    },
    tooltip:{
      x:{
        show:false
      },
    }
    
  };

  const highLowTodosState = {
    series: [{
      name: 'Low',
      data: loadLowTodosData(todos)
    }, 
    {
      name: 'High',
      data: loadHighTodosData(todos)
    }],
    chart: {
      type: 'area',
      toolbar:{
        show:false
      }
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: "datetime",
      labels: {
        format: 'MMM, yyyy'
      },tooltip: {
        enabled: false
      }
    },
    tooltip:{
      x:{
        show:false
      },
    }
    
  };

  const radialState={
    options:{
      chart:{
        width:"100px",
        toolbar:{
          show:false
        }
      },
      colors: ["#BF3325","#22CB5C"],
      stroke: {
        lineCap: "round",
      },
      labels: ["High", "Low"],
      plotOptions: {
        radialBar: {
          track: {
            background: `${!theme?"#fff":"#242B2E"}`
          },
          hollow: {
            margin: 5,
            size: "50%"
          },
         
          dataLabels: {
            showOn: "always",
            name: {
              offsetY: -10,
              show: true,
              color: `${theme?"black":"white"}`,
              fontSize: "13px"
            },
            value: {
              color: `${theme?"gray":"white"}`,
              fontSize: "20px",
              show: true,
            },
            total: {
              show: true,
              label: 'Total',
              color: `${theme?"black":"white"}`,
              formatter: function (w) {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return todos.length
              }
            }
          }
        }
      },
      responsive: [
        {
          breakpoint: 355,
          options: {
            plotOptions: {
              radialBar: {
                hollow: {
                  margin: 0,
                  size: "50%"
                },
                dataLabels: {
                  showOn: "always",
                  name: {
                    show: true,
                    fontSize: "1px",
                    offsetY:2
                  },
                  value: {
                    fontSize: "4vw",
                    show: true,
                    offsetY:-2

                  },
                  total: {
                    show: true,
                    label: 'Total',
                    fontSize:"3vw",
                    formatter: function (w) {
                      // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                      return todos.length
                    }
                  }
                }
              }
            },
          }
        }
      ]
    },
    series: [loadHighPrTodosPercent(todos),loadLowPrTodosPercent(todos)],

  }

  const todoCompletedState = {
    chart: {
      type: "radialBar",
      toolbar:{
        show:false
      }
    },
    series: [loadCompletedTodosPercent(todos)],
    colors: ["#2827CC"],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        track: {
          background: `${!theme?"#fff":"#242B2E"}`,
          startAngle: -135,
          endAngle: 135,
        },
        hollow: {
          margin: 5,
          size: "50%"
        },
        dataLabels: {
          name: {
            color: `${theme?"black":"white"}`,
            show: true,
            fontsize:"13px"
          },
          value: {
            fontSize: "20px",
            show: true,
            color: `${theme?"gray":"white"}`
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 355,
        options: {
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 0,
                size: "50%"
              },
             
              dataLabels: {
                showOn: "always",
                name: {
                  show: true,
                  fontSize: "2vw"
                },
                value: {
                  fontSize: "5vw",
                  show: true,
                  offsetY: -2

                }
              }
            }
          },
        }
      }
    ],
    stroke: {
      lineCap: "round"
    },
    labels: ["Completed"]
  };


  const todoInprogressState = {
    chart: {
      type: "radialBar",
      toolbar:{
        show:false
      },
    },
    colors: ["#F4BE2C"],
    series:[loadInprogressTodosPercent(todos)],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        track: {
          background: `${!theme?"#fff":"#242B2E"}`,
          startAngle: -135,
          endAngle: 135,
        },
        hollow: {
          margin: 5,
          size: "50%"
        },
        dataLabels: {
          name: {
            color: `${theme?"black":"white"}`,
            show: true,
            fontsize:"13px"
          },
          value: {
            fontSize: "20px",
            show: true,
            color: `${theme?"gray":"white"}`
          }
        },
      }
    },
    responsive: [
      {
        breakpoint: 355,
        options: {
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 0,
                size: "50%"
              },
             
              dataLabels: {
                showOn: "always",
                name: {
                  show: true,
                  color: "black",
                  fontSize: "2vw"
                },
                value: {
                  fontSize: "5vw",
                  show: true,
                  offsetY: -2
                  

                }
              }
            }
          },
        }
      }
    ],
    stroke: {
      lineCap: "round"
    },
    labels: ["Progress"]
  };

  const eventsState = {
    series: [
      {
        name: 'Events:',
        data: loadEventsData(events)
      }
    ],
    chart: {
      type: 'bar',
      toolbar:{
        show:false
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
            enabled: true,
            delay: 150
        },
        dynamicAnimation: {
            enabled: true,
            speed: 350
        }
      }
    },
  plotOptions: {
    bar: {
      horizontal: true,
    }
  },
  // tooltip: {
  //   custom: function({ series, seriesIndex, dataPointIndex, w }) {
  //     return (
  //       '<div class="event-chart">' +
  //       "<span>" +"Events : "+
  //       series[seriesIndex][dataPointIndex] +
  //       "</span>" +
  //       "</div>"
  //     );
  //   }
  // },
  tooltip:{
    y: {
      formatter: function(val, opt) {
        const goals =
          opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]
            .goals
    
        if (goals && goals.length) {
          return `${val} / ${goals[0].value}`
        }
        return val
      },
      title: {
          formatter: (seriesName) => seriesName,
      },
  }
  },
  yaxis: {
    labels: {
      formatter: (value) => { 
        
        return `${months[new Date(value).getMonth()]}, ${new Date(value).getFullYear()}`
      },
    },
  },
  xaxis:{
    labels: {
      formatter: function (value) {
        return value;
      }
    }
  },

  colors: ['#00E396'],
  dataLabels: {
    formatter: function(val, opt) {
      const goals =
        opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]
          .goals
  
      if (goals && goals.length) {
        return `${val} / ${goals[0].value}`
      }
      return val
    }
  },
  legend: {
    show: true,
    showForSingleSeries: true,
    customLegendItems: ['Events'],
    markers: {
      fillColors: ['#00E396']
    }
  }
  };


  const notesState = {
    series: [
    {
      name: 'Notes',
      data: loadNotesData(notes),
    }],
    chart: {
    type: 'bar',
    toolbar:{
      show:false
    }

  },
  plotOptions: {
    bar: {
      columnWidth: '60%'
    }
  },
  xaxis:{
    labels: {
      formatter: (value) => { 
        
        return `${months[new Date(value).getMonth()]}, ${new Date(value).getFullYear()}`
      },
    }
  },
  yaxis: {
    labels: {
      formatter: function (value) {
        return value;
      }
    }
  },
  colors: ['#1B98F5'],
  dataLabels: {
    enabled: true
  },
  legend: {
    show: true,
    showForSingleSeries: true,
    customLegendItems: ["Notes"],
    markers: {
      fillColors: ['#1B98F5']
    }
  }
  };

  useEffect(()=>{
    if(profileID){
      //console.log("Hello")
      dispatch(fetchTodos(profileID));
      dispatch(loadEvents(profileID));
      dispatch(loadNotes(profileID));
    }
  },[profileID])

  
  return (
    <div className="h-full px-4 z-4">
      <div className="flex justify-between items-center mt-3">
        <h2 className={`self-start font-nunito ${!theme?"text-white":"text-zinc-800"} text-title xxxsm:text-4xl`}>Dashboard</h2>
      </div>
      <div className="flex w-full flex-wrap mt-5 gap-4">
        <div className={`flex ${!theme?"bg-zinc-600":"bg-neutral-300"} grow justify-center rounded-md`}>
          <div className={`flex ${!theme?"text-white":"text-zinc-800"} flex-col items-start justify-around p-4`}>
            <p className=" text-base xsm:text-xl">Todos</p>
            <p className="text-4xl">{todos.length}</p>
          </div>
          <div className="hidden apex-xsm:block">
            <Chart series={radialState.series} type="radialBar" options={radialState.options}/>
          </div>
        </div>
        <div className={`flex flex-col grow ${!theme?"bg-zinc-600":"bg-neutral-300"} justify-center items-center gap-2 rounded-md`}>
          <Chart series={todoInprogressState.series} type="radialBar" options={todoInprogressState}/>
          <p className={`${!theme?"text-white":"text-zinc-800"}`}>In-Progress Todos</p>
        </div>
        <div className={`flex flex-col grow ${!theme?"bg-zinc-600":"bg-neutral-300"} justify-center items-center gap-2 rounded-md`}>
          <Chart series={todoCompletedState.series} type="radialBar" options={todoCompletedState}/>
          <p className={`${!theme?"text-white":"text-zinc-800"}`}>Completed Todos</p>
        </div>
      </div>
      <div className="flex w-full flex-wrap mt-5 gap-4">
        <div className={`flex p-4 flex-col ${!theme?"text-white":"text-zinc-800"} ${!theme?"bg-zinc-600":"bg-neutral-300"} grow justify-center rounded-md`}>
          <p className=" text-base xsm:text-xl">Events</p>
          <p className="text-4xl">{events.length}</p>
        </div>
        <div className={`flex p-4 flex-col ${!theme?"text-white":"text-zinc-800"} ${!theme?"bg-zinc-600":"bg-neutral-300"} grow justify-center rounded-md`}>
          <p className=" text-base xsm:text-xl">Notes</p>
          <p className="text-4xl">{notes.length}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-col msm:flex-row ">
        <div className="msm:w-1/2">
          <Chart series={highLowTodosState.series} className="grow" type="area" options={highLowTodosState}/>
        </div>
        <div className="msm:w-1/2">
          <Chart series={todosCreatedState.series} className="grow"  type="line" options={todosCreatedState}/>
        </div> 
      </div>
      <div className="mt-3 flex flex-col msm:flex-row">
        <div className="msm:w-1/2">
          <Chart series={eventsState.series} className="grow" type="bar" options={eventsState}/>
        </div>
        <div className="msm:w-1/2">
          <Chart series={notesState.series} className="grow"  type="bar" options={notesState}/>
        </div> 
      </div>
    </div>
  )
}

export default DashboardLayout