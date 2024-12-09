const addButton = document.getElementById("addNote");
const body = document.querySelector("body");
let noteCounter = 0;

document.addEventListener("DOMContentLoaded", ()=>{
    const loadedNotes = JSON.parse(localStorage.getItem("messages"));
    if(loadedNotes){
        loadedNotes.forEach(noteMessage => {
            createNote(noteMessage);
        });
    }
});

addButton.addEventListener("click", ()=>{
    createNote();
});

function createNote(content=""){
    
    const note = document.createElement("div");
    note.id = `note-${noteCounter}`;
    note.classList.add("note");
    note.innerHTML=`
        <div class="options">
            <span class="edit" id="edit-${noteCounter}">Edit</span>
            <span class="delete" id="delete-${noteCounter}">X</span>
        </div>
        <div class="message hidden">${content && content}</div>
        <textarea id="textarea-${noteCounter}">${content && content}</textarea>
    `;
    body.appendChild(note);
 
    const editButton = document.getElementById(`edit-${noteCounter}`);
    const deleteButton = document.getElementById(`delete-${noteCounter}`);
    const messageContainer = note.querySelector(".message");
    const textareaContainer = note.querySelector("textarea");

    editButton.addEventListener("click", ()=>{
        messageContainer.classList.toggle("hidden");
        textareaContainer.classList.toggle("hidden");
    });

    deleteButton.addEventListener("click", ()=>{
        note.remove();
        let messages = document.querySelectorAll(".message");
        messages = Array.from(messages).map(node => {
            return node.innerText;  
        });
        localStorage.setItem("messages", JSON.stringify(messages));
    });

    textareaContainer.addEventListener("keyup", (e)=>{
        messageContainer.textContent = e.target.value;
        let messages = document.querySelectorAll(".message");
        messages = Array.from(messages).map(node => {
            return node.innerText;  
        });
        localStorage.setItem("messages", JSON.stringify(messages));
    });

    noteCounter++;
}

