
//LINE CHART ---> for Todos created
export const loadCreatedTodosData=(array)=>{
    let result=[];
    const monthData={};
    array.length && array.map((todo)=>{
        //console.log(new Date(todo.createdDate).getMonth());
        if(monthData[`${new Date(todo.createDate).getMonth()+1}-01-${new Date(todo.createDate).getFullYear()}`]){
            monthData[`${new Date(todo.createDate).getMonth()+1}-01-${new Date(todo.createDate).getFullYear()}`]=monthData[`${new Date(todo.createDate).getMonth()+1}-01-${new Date(todo.createDate).getFullYear()}`]+1
        }else{
            monthData[`${new Date(todo.createDate).getMonth()+1}-01-${new Date(todo.createDate).getFullYear()}`]=1
        }
    })
    for(const month in monthData){
        result.push({
            x:`${month}`,
            y:monthData[month]
        })
        
    }
    return result;
}
//AREA CHART ---> for High and Low todos
export const loadHighTodosData=(array)=>{
    let result=[];
    const monthData={};
    array.length && array.map((todo)=>{
        if(todo.priority==="High"){
            if(monthData[`${new Date(todo.createDate).getMonth()+1}-01-${new Date(todo.createDate).getFullYear()}`]){
                monthData[`${new Date(todo.createDate).getMonth()+1}-01-${new Date(todo.createDate).getFullYear()}`]=monthData[`${new Date(todo.createDate).getMonth()+1}-01-${new Date(todo.createDate).getFullYear()}`]+1
            }else{
                monthData[`${new Date(todo.createDate).getMonth()+1}-01-${new Date(todo.createDate).getFullYear()}`]=1
            }
        }
        //console.log(new Date(todo.createdDate).getMonth());
        
    })
    for(const month in monthData){
        result.push({
            x:`${month}`,
            y:monthData[month]
        })
        
    }
    return result;
}

export const loadLowTodosData=(array)=>{
    let result=[];
    const monthData={};
    array.length && array.map((todo)=>{
        if(todo.priority==="Low"){
            if(monthData[`${new Date(todo.createDate).getMonth()+1}-01-${new Date(todo.createDate).getFullYear()}`]){
                monthData[`${new Date(todo.createDate).getMonth()+1}-01-${new Date(todo.createDate).getFullYear()}`]=monthData[`${new Date(todo.createDate).getMonth()+1}-01-${new Date(todo.createDate).getFullYear()}`]+1
            }else{
                monthData[`${new Date(todo.createDate).getMonth()+1}-01-${new Date(todo.createDate).getFullYear()}`]=1
            }
        }
        //console.log(new Date(todo.createdDate).getMonth());
        
    })
    for(const month in monthData){
        result.push({
            x:`${month}`,
            y:monthData[month]
        })
        
    }
    return result;
}

export const loadEventsData=(array)=>{
    let result=[];
    const monthData={};
    array.length && array.map((event)=>{
        if(monthData[`${new Date(event.start).getMonth()+1}-01-${new Date(event.start).getFullYear()}`]){
            monthData[`${new Date(event.start).getMonth()+1}-01-${new Date(event.start).getFullYear()}`]=monthData[`${new Date(event.start).getMonth()+1}-01-${new Date(event.start).getFullYear()}`]+1
        }else{
            monthData[`${new Date(event.start).getMonth()+1}-01-${new Date(event.start).getFullYear()}`]=1
        } 
    })
    for(const month in monthData){
        result.push({
            x:`${month}`,
            y:monthData[month]
        })
        
    }
    return result;

}

export const loadNotesData=(array)=>{
    let result=[];
    const monthData={};
    array.length && array.map((note)=>{
        if(monthData[`${new Date(note.createdDate).getMonth()+1}-01-${new Date(note.createdDate).getFullYear()}`]){
            monthData[`${new Date(note.createdDate).getMonth()+1}-01-${new Date(note.createdDate).getFullYear()}`]=monthData[`${new Date(note.createdDate).getMonth()+1}-01-${new Date(note.createdDate).getFullYear()}`]+1
        }else{
            monthData[`${new Date(note.createdDate).getMonth()+1}-01-${new Date(note.createdDate).getFullYear()}`]=1
        } 
    })
    for(const month in monthData){
        result.push({
            x:`${month}`,
            y:monthData[month]
        })
        
    }
    return result;
}

export const loadLowPrTodosPercent=(array)=>{
    let result=0
    array.length && array.map((todo)=>{
        if(todo.priority==="Low"){
            result=result+1
        }
    });
    return Math.round((result/array.length)*100)
}

export const loadHighPrTodosPercent=(array)=>{
    let result=0
    array.length && array.map((todo)=>{
        if(todo.priority==="High"){
            result=result+1
        }
    });
    return Math.round((result/array.length)*100)
}

function inProgressTodos(todos){
    const updatedTodos=[];
    for(let i=0;i<todos.length;i++){
        if(todos[i].tasks.length!==0){
            for(let j=0;j<todos[i].tasks.length;j++){
                if(todos[i].tasks[j].inProgress===true){
                    updatedTodos.push(todos[i]);
                    break;
                }
            }
        }
        else
            updatedTodos.push(todos[i]);
    }
    return updatedTodos;
}

export const loadInprogressTodosPercent=(array)=>{
    let result=[];
    if(array.length){
        result=inProgressTodos(array);
    }
    //console.log(result);
    //console.log(Math.round((result.length/array.length)*100))
    return [Math.round((result.length/array.length)*100)]

    
}

function completedTodos(todos){
    const updatedTodos=[];
    for(let i=0;i<todos.length;i++){
        let flag=true;
        if(todos[i].tasks.length!==0){
            for(let j=0;j<todos[i].tasks.length;j++){
                if(todos[i].tasks[j].inProgress===false){
                    flag=true;
                    continue;
                }
                else{
                    flag=false
                    break;
                }
                    
            }
            if(flag)
                updatedTodos.push(todos[i]);
        }

    }
    return updatedTodos;
}

export const loadCompletedTodosPercent=(array)=>{
    let result=[];
    if(array.length){
        result=completedTodos(array);
    }
    //console.log(result);
    //console.log(Math.round((result.length/array.length)*100))
    return [Math.round((result.length/array.length)*100)] 
}
