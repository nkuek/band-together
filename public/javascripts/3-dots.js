document.addEventListener('DOMContentLoaded', () => {
    var el = document.querySelector('.more');
    var btn = el.querySelector('.more-btn');
    var menu = el.querySelector('.more-menu');
    var visible = false;

    function showMenu(e) {
        e.preventDefault();
        if (!visible) {
            visible = true;
            el.classList.add('show-more-menu');
            menu.setAttribute('aria-hidden', false);
        }
    }
    const editBtn = document.querySelector('.edit-btn');
    const deleteBtn = document.querySelector('.delete-btn');

    function hideMenu(e) {
        if (btn.contains(e.target)) {
            return;
        }
        if (visible) {
            visible = false;
            el.classList.remove('show-more-menu');
            menu.setAttribute('aria-hidden', true);
            // document.removeEventListener('mousedown', hideMenu);
        }
    }
    document.addEventListener('click', (e) => {
        hideMenu(e);
    });

    editBtn.addEventListener('click', async (e) => {
        try {
            const data = await fetch(e.target.id);
            const { songPostNote } = await data.json();
            const textArea = document.createElement('textarea');
            textArea.value = songPostNote.body;
        } catch (e) {
            console.error(e);
        }
        hideMenu(e);
    });

    btn.addEventListener('click', showMenu, false);
});
