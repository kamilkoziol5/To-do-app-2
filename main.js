document.addEventListener('DOMContentLoaded', () => {
	const inputTask = document.getElementById('task-input');
	const addButton = document.getElementById('add-task-btn');
	const taskList = document.getElementById('task-list');
	const emptyImage = document.querySelector('.empty-image');
	const todosContainer = document.querySelector('.todos-containe');

	const addTask = (text, completed = false) => {
		event.preventDefault();
		const taskText = text || inputTask.value.trim();
		if (!taskText) {
			return;
		}
		const li = document.createElement('li');

		li.innerHTML = `
        <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}>
        <span>${taskText}</span>
        <div class="task-buttons">
        <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
        <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;

		const checkbox = li.querySelector('.checkbox');
		const editBtn = li.querySelector('.edit-btn');

		if (completed) {
			li.classList.add('completed');
			editBtn.disabled = true;
			editBtn.style.opacity = '0.5';
			editBtn.style.pointerEvents = 'none';
		}

		checkbox.addEventListener('change', () => {
			const isChecked = checkbox.checked;
			li.classList.toggle('completed', isChecked);
			editBtn.disabled = isChecked;
			editBtn.style.opacity = isChecked ? '0.5' : '1';
			editBtn.style.pointerEvents = isChecked ? ' none' : 'auto';
		});

		editBtn.addEventListener('click', () => {
			if (!checkbox.checked) {
				inputTask.value = li.querySelector('span').textContent;
				li.remove();
				toggleEmptyState();
			}
		});

		li.querySelector('.delete-btn').addEventListener('click', () => {
			li.remove();
			toggleEmptyState();
		});

		taskList.appendChild(li);
		inputTask.value = '';
		toggleEmptyState();
	};

	addButton.addEventListener('click', () => addTask());
	inputTask.addEventListener('keydown', e => {
		if (e.key === 'Enter') {
			addTask();
		}
	});

	const toggleEmptyState = () => {
		emptyImage.style.display =
			taskList.children.length === 0 ? 'block' : 'none';
		todosContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
	};
});
