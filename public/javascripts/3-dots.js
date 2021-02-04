document.addEventListener('DOMContentLoaded', () => {
    // const el = document.querySelector('.dot-more');
    // const btn = el.querySelector('.more-btn');
    // const menu = el.querySelector('.more-menu');
    let visible = false;

    function showMenu(e) {
        e.preventDefault();
        if (!visible) {
            visible = true;
            document.querySelector('.dot-more').classList.add('show-more-menu');
            document
                .querySelector('.more-menu')
                .setAttribute('aria-hidden', false);
            document.addEventListener('mousedown', hideMenu, false);
        }
    }

    function hideMenu(e) {
        if (btn.contains(e.target)) {
            return;
        }
        if (visible) {
            console.log('hello');
            visible = false;
            el.classList.remove('show-more-menu');
            menu.setAttribute('aria-hidden', true);
            document.removeEventListener('mousedown', hideMenu);
        }
    }

    document
        .querySelector('.more-btn')
        .addEventListener('click', showMenu, false);
});
