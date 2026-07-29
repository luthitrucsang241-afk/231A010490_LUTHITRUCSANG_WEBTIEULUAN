const todoInput = document.getElementById("todoInput");
const addTodo = document.getElementById("addTodo");
const todoList = document.getElementById("todoList");


let todos = JSON.parse(localStorage.getItem("todos")) || [];



function saveTodo(){

    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );

}




function renderTodo(){

    todoList.innerHTML = "";


    todos.forEach(function(todo,index){


        const li = document.createElement("li");


        li.innerHTML = `

        <label>

            <input 
            type="checkbox"
            ${todo.done ? "checked":""}
            >

            <span class="todo-text">
                ${todo.text}
            </span>

        </label>


        <button>
            X
        </button>

        `;



        li.querySelector("input").onchange=function(){


            todos[index].done=this.checked;

            saveTodo();

            checkTodoGoal();


        };



        li.querySelector("button").onclick=function(){

            deleteTodo(index);

        };



        todoList.appendChild(li);



    });



}





function deleteTodo(index){


    todos.splice(
        index,
        1
    );


    saveTodo();

    renderTodo();

    checkTodoGoal();


}







function addTask(){


    let text =
    todoInput.value.trim();



    if(text==="")
        return;



    todos.push({

        text:text,

        done:false

    });



    todoInput.value="";


    saveTodo();


    renderTodo();



}






addTodo.onclick=function(){

    addTask();

};





todoInput.addEventListener(
    "keydown",
    function(event){


        if(event.key==="Enter"){


            event.preventDefault();


            addTask();


        }


    }
);







function checkTodoGoal(){


    let count =
    todos.filter(
        t=>t.done
    ).length;



    if(count>=3){


        localStorage.setItem(
            "goalTodo",
            "true"
        );


    }
    else{


        localStorage.removeItem(
            "goalTodo"
        );


    }


}





renderTodo();
