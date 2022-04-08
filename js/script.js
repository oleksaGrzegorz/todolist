{
    let tasks = [];
    let hideDoneTasks = false;

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,

        }));
        render();
    }

    const bindButtonEvents = () => {
        const markAllDoneButton = document.querySelector(".js-markAllDone");
        if (markAllDoneButton) {
            markAllDoneButton.addEventListener("click", markAllTasksDone);
        }
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { 
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done, 
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    }

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });

        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });

        });
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="tasks__item js-task">
                    <button class="tasks__button tasks__button--done js-done">
                        ${task.done ? "✔" : " "}
                    </button>
                    <span class="tasks__content${task.done ? " tasks__content--done" : ""}">
                        ${task.content}
                    </span>
                    <button class="tasks__button tasks__button--remove js-remove">🗑</button>
                </li>
        `;

        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
        bindEvents();
        bindButtonEvents();
    };


    const onFormSumbit = (event) => {
        event.preventDefault();

        const newElement = document.querySelector(".js-newTask").value.trim();
        const newTaskContent = document.querySelector(".js-newTask");

        if (newElement !== "") {
            addNewTask(newElement);
            newTaskContent.value = "";
        };
        newTaskContent.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSumbit);
    };

    init();
}