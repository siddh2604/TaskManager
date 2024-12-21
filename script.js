document.addEventListener('DOMContentLoaded', function () {
    // Add Task functionality
    document.getElementById('addTaskBtn').addEventListener('click', function () {
        let taskInput = document.getElementById('taskInput').value;

        if (taskInput.trim() !== "") {
            let taskList = document.getElementById('taskList');

            let newTask = document.createElement('li');
            newTask.classList.add('task');

            newTask.innerHTML = `
                <span class="task-text">${taskInput}</span>
                <div>
                    <button class="markComplete"><i class="fas fa-check"></i></button>
                    <button class="edit"><i class="fas fa-edit"></i></button>
                    <button class="delete"><i class="fas fa-trash"></i></button>
                </div>
            `;

            taskList.appendChild(newTask);
            document.getElementById('taskInput').value = "";
        } else {
            alert("Please enter a task.");
        }
    });

    // Mark Task as Complete
    document.getElementById('taskList').addEventListener('click', function (event) {
        if (event.target && event.target.matches('.markComplete, .markComplete *')) {
            let taskItem = event.target.closest('li');
            taskItem.classList.toggle('completed');
        }
    });

    // Delete Task
    document.getElementById('taskList').addEventListener('click', function (event) {
        if (event.target && event.target.matches('.delete, .delete *')) {
            let taskItem = event.target.closest('li');
            taskItem.style.transition = 'opacity 0.3s';
            taskItem.style.opacity = '0';
            setTimeout(function () {
                taskItem.remove();
            }, 300);
        }
    });

    // Edit Task
    document.getElementById('taskList').addEventListener('click', function (event) {
        if (event.target && event.target.matches('.edit, .edit *')) {
            let taskItem = event.target.closest('li');
            let currentText = taskItem.querySelector('.task-text').textContent;
            let newTaskName = prompt("Edit task:", currentText);

            if (newTaskName && newTaskName.trim() !== "") {
                taskItem.querySelector('.task-text').textContent = newTaskName;
            }
        }
    });

    // Filter Tasks
    $('#taskFilter').change(function () {
        let filterValue = $(this).val();

        $('#taskList li').each(function () {
            if (filterValue === "all") {
                $(this).show();
            } else if (filterValue === "completed" && $(this).hasClass('completed')) {
                $(this).show();
            } else if (filterValue === "pending" && !$(this).hasClass('completed')) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});
