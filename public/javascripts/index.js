window.addEventListener('DOMContentLoaded', (event) => {
    const songpostPost = document.querySelector('.songpost-post');
    const moreMenuItems = document.querySelector('.more-menu-items');
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

    if (moreMenuItems) {
        moreMenuItems.addEventListener('click', async (e) => {
            e.preventDefault();
            const editButton = e.target;
            const data = await fetch(editButton.href, {
                method: 'GET',
            });

            const { songPostNote } = await data.json();
            if (e.target.className === 'note-delete') {
                const deleteButton = e.target;
                try {
                    await fetch(deleteButton.href, {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                    });
                    document.getElementById(songPostNote.id).remove();
                    document.querySelector('.container').remove();
                } catch (e) {
                    console.error(e);
                }
            }
            if (e.target.className === 'note-edit') {
                try {
                    const songPostUpdate = document.querySelector(
                        '.songpost-note'
                    );

                    const oldText = songPostNote.body;
                    const songPost = document.getElementById(songPostNote.id);
                    songPost.innerHTML = `<textarea class="text-area">${songPostNote.body}</textarea> <a href="/" class='note-update-button'>Update <a href="/" class="note-cancel-button">Cancel`;
                    // const update = document.createElement('a');
                    // update.className = 'note-update-button';
                    // update.href = '/';
                    // update.innerHTML = 'update';
                    // const cancel = document.createElement('a');
                    // cancel.className = 'note-cancel-button';
                    // cancel.href = '/';
                    // cancel.innerHTML = 'cancel';
                    // const parent = editButton.parentElement;

                    // const htmlElements = e.target.parentElement.querySelectorAll(
                    //     'a'
                    // );
                    // let htmlString = '';
                    // for (let i = 0; i < 2; i++) {
                    //     htmlString += htmlElements[i].outerHTML;
                    // }
                    // editButton.parentElement.innerHTML = '';
                    // const textArea = document.createElement('textarea');
                    // textArea.value = songPostNote.body;
                    // songPost.appendChild(update);
                    // songPost.appendChild(cancel);

                    songPostUpdate.addEventListener('click', async (e) => {
                        e.preventDefault();
                        const textArea = document.querySelector('.text-area');
                        if (e.target.className === 'note-cancel-button') {
                            songPostUpdate.innerHTML = oldText;
                        }
                        if (e.target.className === 'note-update-button') {
                            const res = await fetch(editButton.href, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ body: textArea.value }),
                            });
                            songPost.innerHTML = oldText;
                            songPost.value = '';
                            songPost.innerHTML = `${songPostNote.User.username}: ${textArea.value}`;
                        }
                    });
                } catch (e) {
                    console.error(e);
                }
            }
        });
    }
});
