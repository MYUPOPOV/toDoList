const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

todoList.innerHTML = "";
todoCompleted.innerHTML = "";

let toDoData = [];

/* Отрисовываем содержимое toDoData[]  */
const render = function () {
	todoList.innerHTML = "";
	todoCompleted.innerHTML = "";
	localStorage.setItem("toDoList", JSON.stringify(toDoData));

	toDoData.forEach((item, index) => {
		const newLi = document.createElement("li");
		newLi.classList.add("todo-item");
		newLi.innerHTML = `
      <span class="text-todo">${item.text}</span>
    <div class="todo-buttons">
      <button class="todo-remove"></button>
      <button class="todo-complete"></button>
    </div>
    `;

		if (!item.completed) {
			todoList.append(newLi);
		} else {
			todoCompleted.append(newLi);
		}

		newLi.querySelector(".todo-complete").addEventListener("click", () => {
			item.completed = !item.completed;
			render();
		});

		newLi.querySelector(".todo-remove").addEventListener("click", () => {
			toDoData.splice(index, 1);
			render();
		});
	});
};

/* Нажимаем на кнопку (+) Добавить дело */
todoControl.addEventListener("submit", function (event) {
	if (headerInput.value.trim() !== "") {
		event.preventDefault();
		const newToDo = {
			text: headerInput.value,
			completed: false,
		};
		toDoData.push(newToDo);
		render();
		headerInput.value = "";
	} else {
		event.preventDefault();
	}
});

/* Проверяем localStorage */
if (JSON.parse(localStorage.getItem("toDoList"))) {
	toDoData = JSON.parse(localStorage.getItem("toDoList"));
	render();
}
