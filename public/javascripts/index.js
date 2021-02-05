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
                    `/api/songposts/${songpostPost.id}/notes`,
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
            } catch (e) {
                console.error(e);
            }
        });

    document
        .querySelector('.songpost-note')
        .addEventListener('click', async (e) => {
            e.preventDefault();
            const editButton = e.target;
            if (e.target.className === 'note-delete') {
                const deleteButton = e.target;
                try {
                    const res = await fetch(deleteButton.href, {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                    });
                    deleteButton.parentElement.innerHTML = '';
                } catch (e) {
                    console.error(e);
                }
            }
            if (e.target.className === 'note-edit') {
                try {
                    const data = await fetch(editButton.href, {
                        method: 'GET',
                    });

                    const { songPostNote } = await data.json();
                    const parent = editButton.parentElement;
                    const oldText = JSON.parse(
                        JSON.stringify(parent.innerHTML)
                    );
                    editButton.parentElement.innerHTML = '';
                    console.log(oldText);
                    const textArea = document.createElement('textarea');
                    textArea.value = songPostNote.body;
                    const update = document.createElement('a');
                    update.className = 'note-update-button';
                    update.href = '/';
                    update.innerHTML = 'update';
                    const cancel = document.createElement('a');
                    cancel.className = 'note-cancel-button';
                    cancel.href = '/';
                    cancel.innerHTML = 'cancel';
                    parent.appendChild(textArea);
                    parent.appendChild(update);
                    parent.appendChild(cancel);

                    parent.addEventListener('click', async (e) => {
                        e.preventDefault();
                        if (e.target.className === 'note-cancel-button') {
                            parent.innerHTML = oldText;
                        }
                        if (e.target.className === 'note-update-button') {
                            const res = await fetch(editButton.href, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ body: textArea.value }),
                            });
                            parent.innerHTML = oldText;
                            console.log(parent.textContent, parent.value);
                            parent.value = '';
                            parent.innerHTML = `${songPostNote.User.username}: ${textArea.value}`;
                        }
                    });
                } catch (e) {
                    console.error(e);
                }
            }
        });
});
