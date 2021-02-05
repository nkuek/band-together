window.addEventListener('DOMContentLoaded', () => {
    var el = document.querySelector('.more');
    const btns = document.querySelectorAll('#more-btn');
    var menus = document.querySelectorAll('.more-menu');
    var visible = false;
    function showMenu(e) {
        e.preventDefault();
        console.log(e);
        if (e.target.parentElement.className === 'more') {
            if (!visible) {
                visible = true;
                e.target.parentElement.classList.add('show-more-menu');
                menus.forEach((menu) =>
                    menu.setAttribute('aria-hidden', false)
                );
            }
        }
    }
    const editBtn = document.querySelector('.edit-btn');
    const deleteBtn = document.querySelector('.delete-btn');

    function hideMenu(e) {
        for (btn of btns) {
            if (btn.contains(e.target)) {
                return;
            }
        }
        if (visible) {
            visible = false;
            document
                .querySelector('.show-more-menu')
                .classList.remove('show-more-menu');
            menus.forEach((menu) => menu.setAttribute('aria-hidden', true));
            // document.removeEventListener('mousedown', hideMenu);
        }
    }
    document.addEventListener('click', (e) => {
        hideMenu(e);
    });

    // editBtn.addEventListener('click', async (e) => {
    //     try {
    //         const data = await fetch(editBtn.href);
    //         const { songPostNote } = await data.json();
    //         const textArea = document.createElement('textarea');
    //         textArea.value = songPostNote.body;
    //     } catch (e) {
    //         console.error(e);
    //     }
    //     hideMenu(e);
    // });

    btns.forEach((btn) => {
        btn.addEventListener('click', showMenu, false);
    });
});
