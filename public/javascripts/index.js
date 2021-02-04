window.addEventListener('DOMContentLoaded', (event) => {
    const songpostPost = document.querySelector('.songpost-post');
    document
        .querySelector('.notes-form')
        .addEventListener('submit', async (e) => {
            e.preventDefault();
            const notesForm = document.querySelector('.notes-form');
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
                const { note, username } = await res.json();
                const notesContainer = document.querySelector(
                    '.notes-container'
                );

                const newNote = document.createElement('div');

                newNote.innerHTML = `${username}: ${note.body}`;
                notesContainer.appendChild(newNote);
                document.querySelector('.noteText').value = '';
                document.getElementById('no-comment').innerHTML = '';
            } catch (e) {
                console.error(e);
            }
        });

    document
        .querySelector('.note-delete')
        .addEventListener('click', async (e) => {
            e.preventDefault();
            const deleteButton = document.querySelector('.note-delete');

            try {
                const res = await fetch(deleteButton.href, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                });
                deleteButton.parentElement.innerHTML = '';
            } catch (e) {
                console.error(e);
            }
        });

    document
        .querySelector('.songpost-note')
        .addEventListener('click', async (e) => {
            e.preventDefault();
            const editButton = e.target;
            const body = editButton.parentElement.value;
            if (e.target.className === 'note-edit') {
                try {
                    const data = await fetch(editButton.href, {
                        method: 'GET',
                    });

                    const { songPostNote } = await data.json();
                    const parent = editButton.parentElement;
                    editButton.parentElement.innerHTML = '';
                    const textArea = document.createElement('textarea');
                    textArea.value = songPostNote.body;
                    const update = document.createElement('a');
                    update.innerHTML = 'update';
                    const cancel = document.createElement('a');
                    cancel.innerHTML = 'cancel';
                    parent.appendChild(textArea);
                    parent.appendChild(update);
                    parent.appendChild(cancel);

                    const res = await fetch(editButton.href, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                    });
                } catch (e) {
                    console.error(e);
                }
            }
        });
});
