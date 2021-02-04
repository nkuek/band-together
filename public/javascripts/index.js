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
});
