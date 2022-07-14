displayNotes();
let d =new Date();
let addNote=document.getElementById("addnote");
addNote.addEventListener("click", (event) => {
 
    let noteTitle=document.getElementById('title1');
    let noteContent=document.getElementById('content');
                                                    // verify if title is added
    if(!noteTitle.value)
        alert('Note cannot be added: Missing Title');
    else
    {                                                       // setting the values to the keys and converting to obj
       var notes= JSON.stringify({
            title: noteTitle.value,
            content: noteContent.value,
            date: d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear()+" at "+d.getHours()+':'+d.getMinutes()
        });
        notesObj=localStorage.getItem('notes');     //storing in local storage

        notesObj = notesObj? JSON.parse(notesObj): [];      //validate if entry has data or is empty

        notesObj.push(notes);
        localStorage.setItem('notes',JSON.stringify(notesObj));

        displayNotes();         //calling display function to view the data entered
    }
});

function displayNotes(){
    
    let store= JSON.parse(localStorage.getItem('notes'));
    let stickyNote="";
                                    //to display all the entries in localStorage
    for(let i in store)
    {
        let notes=JSON.parse(store[i], (key, value)=> { return key=== "tilte"?`${value}`:value});
        stickyNote+=`<div class="card-body">
                    <h4 class="card-title"><span>Title : ${notes.title}</span></h4>
                    <p class="card-text"><span>Content : ${notes.content}</span></p>
                    <button id="${i}" onclick="deleteNotes(this.id)" class="btn primary">Delete Note</button>
                    <button id="${i}" onclick="editNote(this.id)" class="btn secondary">Edit Note</button>
                    <div class="date">${notes.date}</div></div>`;
    }

    let noteE=document.getElementById("history");   //to display in history section
    if(store != null && store.length != 0) 
        noteE.innerHTML= stickyNote;
    else
        noteE.innerHTML = `Nothing to show! Use "Add Note" Section for creating your notes.`;
    
}
                        //function to delete a note using specific index
function deleteNotes(index){
    let check=confirm("Are you sure to proceed with deletion of note?");

    if(check == true){
        let notes=localStorage.getItem("notes");
        if(notes==null){
            storeObj=[];
        }
        else{
            storeObj=JSON.parse(notes);
        }
        storeObj.splice(index,1);
        localStorage.setItem("notes", JSON.stringify(storeObj));
        displayNotes();
    }
}
                        //editing a note, here the previous note content will get displayed on input box
function editNote(index){
    let title = document.getElementById('title1');
    let content = document.getElementById('content');
    let notes = JSON.parse(localStorage.getItem('notes'));
    
    if(notes==null){
        storeObj=[];
    }
    else{
        storeObj = JSON.parse(notes[index], (key, value) => { return key === title?`${value}`:value;}); //this will give a key value pair so that retriving data will be easier
    }
                                
    title.value=storeObj.title;
    content.value=storeObj.content;
    title.setAttribute("readonly", true);   // used because title should not be modified
    
    notes.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
    
}