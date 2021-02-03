window.addEventListener('DOMContentLoaded', (event) => {
    const songpostPost = document.querySelector('.songpost-post');
    document
        .querySelector('.notes-form')
        .addEventListener('submit', async (e) => {
            e.preventDefault();
            const notesForm = document.querySelector('.notes-form')
            const formData = new FormData(notesForm);
            const noteText = formData.get('postComment');
            try {
                const res = await fetch(
                    `http://localhost:8080/api/songposts/${songpostPost.id}/notes`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ body: noteText }),
                    }
                );
                const { note } = await res.json();
                const notesContainer = document.querySelector(
                    '.notes-container'
                );

                const newNote = document.createElement('div');
                newNote.innerHTML = note.body;
                notesContainer.appendChild(newNote);
                document.querySelector('.noteText').value = '';
            } catch (e) {
                console.error(e);
            }
        });

    document
    .querySelector('.delete-post')
    .addEventListener('click', async (e) => {
        console.log('Hello from line 35')
         
        try{
            const res = await fetch(`http://localhost:8080/api/songposts/${songpostPost.id}`)
        } catch (e){
            console.error(e)
        }

    })
});
