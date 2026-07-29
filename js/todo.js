const todoInput = document.getElementById("todoInput");

const addTodo = document.getElementById("addTodo");

const todoList = document.getElementById("todoList");



let todos =
    JSON.parse(
        localStorage.getItem("todos")
    ) || [];





// ================= LƯU TODO =================

function saveTodo() {

    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );

}





// ================= HIỂN THỊ TODO =================

function renderTodo() {

    todoList.innerHTML = "";


    todos.forEach(function (todo, index) {


        const li =
            document.createElement("li");


        // ================= TẠO CẤU TRÚC TODO =================

        const label =
            document.createElement("label");


        const checkbox =
            document.createElement("input");


        const todoText =
            document.createElement("span");


        const deleteButton =
            document.createElement("button");





        // ================= CHECKBOX =================

        checkbox.type =
            "checkbox";


        checkbox.checked =
            todo.done;





        // ================= NỘI DUNG TODO =================

        // Dùng textContent để giữ nguyên chính xác
        // nội dung người dùng nhập vào.

        todoText.className =
            "todo-text";


        todoText.textContent =
            todo.text;





        // ================= NÚT XÓA =================

        deleteButton.textContent =
            "X";





        // ================= GHÉP CÁC PHẦN =================

        label.appendChild(
            checkbox
        );


        label.appendChild(
            todoText
        );


        li.appendChild(
            label
        );


        li.appendChild(
            deleteButton
        );


        todoList.appendChild(
            li
        );





        // ================= ĐÁNH DẤU HOÀN THÀNH =================

        checkbox.onchange =
            function () {

                todos[index].done =
                    this.checked;


                saveTodo();

                checkTodoGoal();

            };





        // ================= XÓA TODO =================

        deleteButton.onclick =
            function () {

                deleteTodo(index);

            };


    });

}





// ================= XÓA TODO =================

function deleteTodo(index) {

    todos.splice(
        index,
        1
    );


    saveTodo();

    renderTodo();

    checkTodoGoal();

}





// ================= THÊM TODO =================

function addTask() {

    let text =
        todoInput.value.trim();


    // Không thêm Todo nếu ô nhập rỗng

    if (text === "") {

        return;

    }


    // Thêm công việc mới

    todos.push({

        text: text,

        done: false

    });


    // Xóa nội dung ô nhập

    todoInput.value = "";


    // Lưu dữ liệu

    saveTodo();


    // Hiển thị lại danh sách

    renderTodo();

}





// ================= NÚT THÊM =================

if (addTodo) {

    addTodo.onclick =
        function () {

            addTask();

        };

}





// ================= NHẤN ENTER ĐỂ THÊM TODO =================

if (todoInput) {

    todoInput.addEventListener(
        "keydown",
        function (event) {


            // Khi nhấn Enter

            if (event.key === "Enter") {


                // Không cho Enter tạo hành động mặc định

                event.preventDefault();


                // Thêm Todo giống nút Thêm

                addTask();


            }

        }
    );

}





// ================= KIỂM TRA MỤC TIÊU TODO =================

function checkTodoGoal() {


    // Đếm số Todo đã hoàn thành

    let count =
        todos.filter(
            function (todo) {

                return todo.done;

            }
        ).length;


    // Hoàn thành từ 3 Todo trở lên

    if (count >= 3) {


        localStorage.setItem(
            "goalTodo",
            "true"
        );


    }

    else {


        localStorage.removeItem(
            "goalTodo"
        );


    }

}





// ================= KHỞI TẠO TODO =================

renderTodo();