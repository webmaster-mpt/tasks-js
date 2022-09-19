let myInput = document.getElementById('text');
let form = document.querySelector('form');
let list = document.querySelector(".list");

form.addEventListener("submit",addItems);
window.addEventListener("DOMContentLoaded", setupItems);

function addItems(e){
    let textV = myInput.value;
    let id = Math.floor(Math.random() * 1000);
    e.preventDefault();
    if(textV !== ""){
        const info = { id: id, text:textV, status: "new" };
        let items = getItems();
        items.push(info);
        localStorage.setItem('task',JSON.stringify(items));
        createListItem(id,textV,info.status);
    }
}
function getItems(){
    return localStorage.getItem('task') ? JSON.parse(localStorage.getItem('task')) : [];
}
function setupItems(){
    let items = getItems();
    if(items.length > 0){
        items.forEach(function (item){
            createListItem(item.id,item.text,item.status);
        });
    }
}

function deleteItem(e) {
    const element = e.currentTarget.parentElement;
    const id = element.dataset.id;
    let items = getItems();
    items.forEach(function (e,index,item){
        if(e.id == id){
            item.splice(index,1);
        }
    });
    localStorage.setItem("task", JSON.stringify(items));
    location.reload();
}
function createListItem(id,text,status) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.classList.add("item");
    element.setAttributeNode(attr);
    let defaultHtml = `<span class="title" style="text-decoration: none">${text}</span>
                        <input type="checkbox" class="check"><button type="button" class="delete-btn">Удалить</button>`;
        changeHtml = `<span class="title" style="text-decoration: line-through">${text}</span>
                        <input type="checkbox" class="check" checked><button type="button" class="delete-btn">Удалить</button>`;
    if(status !== "new"){
        element.innerHTML = changeHtml;
    } else {
        element.innerHTML = defaultHtml;
    }
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    element.addEventListener("change",checkChange);
    list.appendChild(element);
}
function checkChange(e){
    element = e.currentTarget;
    const id = element.dataset.id;
    const check = element.querySelector(".check");
    const span = element.querySelector(".title");
    const items = getItems();
    if(check.checked){
        span.style.textDecoration = "line-through";
        items.forEach(function (e){
            if(e.id == id){
                e.status = "perfomed";
                localStorage.setItem('task',JSON.stringify(items));
            }
        });
    } else {
        span.style.textDecoration = "none";
        items.forEach(function (e){
            if(e.id == id){
                e.status = "new";
                localStorage.setItem('task',JSON.stringify(items));
            }
        });
    }
}