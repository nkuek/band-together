window.addEventListener("DOMContentLoaded", () => {
    const upvote = document.querySelector('upvote-link');
    const upvoteArea = document.querySelector('upvote')

    upvote.addEventListener('click', () => {
        const upvoteValue = upvoteArea.nodeValue;
        upvoteValue.InnerHtml = i++
    })
})
