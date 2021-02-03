window.addEventListener('DOMContentLoaded', (event) => {
    document
        .querySelector('.notes-form')
        .addEventListener('submit', async (e) => {
            console.log('hello from the event listener');
            e.preventDefault();
            const notesForm = document.querySelector('.notes-form');
            const formData = new FormData(notesForm);
            const noteText = formData.get('postComment');
            try {
                const res = await fetch(
                    `http://localhost:8080/api/songposts/${notesForm.id}/notes`,
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
});
