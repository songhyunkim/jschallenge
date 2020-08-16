const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    finishList = document.querySelector(".js-finishList");


const TODOS_LS = 'toDos';
const FINISH_LS = "finishList";

let toDos = [];
let finishLists = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos()
}

function deleteFinish(event) {
    const btn = event.target;
    const li = btn.parentNode;
    finishList.removeChild(li);
    const cleanFinishs = finishLists.filter(function (finish) {
      return finish.id !== parseInt(li.id);
    });
    finishLists = cleanFinishs;
    saveFinishs();
  }
function moveFinish(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const id = li.id;
    const text = finishLists.filter(function (finish) {
        if (finish.id === parseInt(li.id)) {
        paintToDo(finish.text);
        }
    });
    finishList.removeChild(li);
    const cleanFinishs = finishLists.filter(function (finish) {
        return finish.id !== parseInt(li.id);
    });
    finishLists = cleanFinishs;
    saveFinishs();
}

function moveToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const id = li.id;
    const text = toDos.filter(function (toDo) {
        if (toDo.id === parseInt(li.id)) {
        paintFinish(toDo.text);
        return toDo.text;
        }
    });
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
} 
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  }

function saveFinishs() {
    localStorage.setItem(FINISH_LS, JSON.stringify(finishLists));
}
  
function paintToDo(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const movBtn = document.createElement("button");
    
    const newId = toDos.length + 1;
    
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    movBtn.innerText = "⏩";
    movBtn.addEventListener("click", moveToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(movBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}


function paintFinish(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const movBtn = document.createElement("button");
    
    const newId = finishLists.length + 1;
    
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteFinish);
    movBtn.innerText = "⏩";
    movBtn.addEventListener("click", moveFinish);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(movBtn);
    li.appendChild(span);
    li.id = newId;
    finishList.appendChild(li);
    const finishObj = {
      text: text,
      id: newId
    };
    finishLists.push(finishObj);
    saveFinishs();
  }

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    toDoInput.innerHTML=""
    paintToDo(currentValue)
}

function loadTodos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text)
        });
    }
}


function loadFinishs() {
    const loadedFinishs = localStorage.getItem(FINISH_LS);
    if (loadedFinishs !== null) {
      const parsedFinishs = JSON.parse(loadedFinishs);
      parsedFinishs.forEach(function (finish) {
        paintFinish(finish.text);
      });
    }
  }

function init(){
    loadTodos();
    loadFinishs();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();