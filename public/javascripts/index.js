window.addEventListener('DOMContentLoaded', (event) => {
    const songlink = document.querySelector('.link-to-song')
    if(songlink.href.includes('embed')){
        console.log(songlink)
        const newiframe = document.createElement('iframe')
        newiframe.src=songlink
        const div = document.getElementById('song-link-div')
        div.appendChild(newiframe)
        songlink.remove();
    }
    const songpostPost = document.querySelector('.songpost-post');
    document
        .querySelector('.notes-form')
        .addEventListener('submit', async (e) => {
            e.preventDefault();
            if(document.getElementById('no-comment')){
                document.getElementById('no-comment').remove()
            }
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
                const notesContainer = document.querySelector('.songpost-note');
                const newNote = document.createElement('div');
                newNote.className = 'notes-posted';
                newNote.innerHTML = `${username}: ${note.body}`;
                const editBtn = document.createElement('a');
                const deleteBtn = document.createElement('a');
                editBtn.href = `/api/songposts/${note.songPostId}/notes/${note.id}/edit`;
                editBtn.className = 'note-edit';
                deleteBtn.className = 'note-delete';
                editBtn.innerText = ' Edit ';
                deleteBtn.innerText = 'Delete';
                deleteBtn.href = `/api/songposts/${note.songPostId}/notes/${note.id}/delete`;
                newNote.appendChild(editBtn);
                newNote.appendChild(deleteBtn);
                notesContainer.prepend(newNote);
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
                    deleteButton.parentElement.remove();
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

                    const htmlElements = e.target.parentElement.querySelectorAll(
                        'a'
                    );
                    let htmlString = '';
                    for (let i = 0; i < 2; i++) {
                        htmlString += htmlElements[i].outerHTML;
                    }
                    editButton.parentElement.innerHTML = `<textarea class="text-area">${songPostNote.body}</textarea> <a href="/" class='note-update-button'>Update <a href="/" class="note-cancel-button">Cancel`;

                    parent.addEventListener('click', async (e) => {
                        e.preventDefault();
                        const textArea = document.querySelector('.text-area');
                        if (e.target.className === 'note-cancel-button') {
                            parent.innerHTML = oldText;
                        }
                        if (e.target.className === 'note-update-button') {
                            if (!textArea.value) {
                                const res = await fetch(
                                    `/api/songposts/${songPostNote.songPostId}/notes/${songPostNote.id}/delete`,
                                    {
                                        method: 'DELETE',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                    }
                                );
                                document
                                    .getElementById(`${songPostNote.id}`)
                                    .remove();
                            } else {
                                const res = await fetch(editButton.href, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        body: textArea.value,
                                    }),
                                });
                            }
                            parent.innerHTML = oldText;
                            parent.value = '';
                            parent.innerHTML = `${songPostNote.User.username}: ${textArea.value}${htmlString}`;
                        }
                    });
                } catch (e) {
                    console.error(e);
                }
            }
        });
        
});
