// Paso 4: Obtener elementos del DOM
const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');
const newTaskInput = document.getElementById('new-task');
const clearCompletedButton = document.getElementById('clear-completed');

// Paso 5: Inicializar un arreglo para almacenar las tareas
let tasks = [];

// Paso 6: Función para agregar una nueva tarea
function addTask(taskText) {
    // Crea un objeto de tarea
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    // Agrega la tarea al arreglo
    tasks.push(task);

    // Llama a la función para mostrar la tarea en la lista
    renderTask(task);

    // Limpia el campo de entrada
    newTaskInput.value = '';

    // Guarda las tareas en el almacenamiento local (opcional)
    saveTasks();
}

// Paso 7: Función para renderizar una tarea en la lista
function renderTask(task) {
    // Crea un elemento de lista
    const listItem = document.createElement('li');

    // Agrega clases y atributos según el estado de la tarea
    if (task.completed) {
        listItem.classList.add('completed');
    }

    listItem.dataset.id = task.id;

    // Crea elementos HTML para la tarea
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', toggleTask);

    const text = document.createElement('span');
    text.textContent = task.text;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', deleteTask);

    // Agrega elementos a la lista
    listItem.appendChild(checkbox);
    listItem.appendChild(text);
    listItem.appendChild(deleteButton);

    // Agrega la lista de tareas
    taskList.appendChild(listItem);
}

// Paso 8: Función para cambiar el estado de una tarea (completada/incompleta)
function toggleTask(event) {
    const taskId = parseInt(event.target.parentNode.dataset.id);
    const task = tasks.find(task => task.id === taskId);
    task.completed = !task.completed;

    // Actualiza la clase CSS para reflejar el estado de la tarea
    event.target.parentNode.classList.toggle('completed');

    // Guarda las tareas en el almacenamiento local (opcional)
    saveTasks();
}

// Paso 9: Función para eliminar una tarea
function deleteTask(event) {
    const taskId = parseInt(event.target.parentNode.dataset.id);
    tasks = tasks.filter(task => task.id !== taskId);

    // Elimina la tarea del DOM
    event.target.parentNode.remove();

    // Guarda las tareas en el almacenamiento local (opcional)
    saveTasks();
}

// Paso 10: Función para borrar todas las tareas completadas
function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);

    // Elimina las tareas completadas del DOM
    const completedTasks = document.querySelectorAll('.completed');
    completedTasks.forEach(task => task.remove());

    // Guarda las tareas en el almacenamiento local (opcional)
    saveTasks();
}

// Paso 11: Escuchar el envío del formulario y agregar una tarea
taskForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const taskText = newTaskInput.value.trim();

    if (taskText !== '') {
        addTask(taskText);
    }
});

// Paso 12: Escuchar el clic en el botón para borrar tareas completadas
clearCompletedButton.addEventListener('click', clearCompletedTasks);

// Paso 13: Cargar tareas desde el almacenamiento local (opcional)
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        tasks.forEach(renderTask);
    }
}

// Paso 14: Guardar tareas en el almacenamiento local (opcional)
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Paso 15: Cargar tareas al cargar la página
loadTasks();
