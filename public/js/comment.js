const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector("#commentField").value.trim();
    const post_id = parseInt(window.location.href.split('/').pop());

    if (comment_text) {
        const res = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                comment_text,
                post_id
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            document.location.reload();
        }
        else {
            alert(res.statusText);
        }
    }
}

const deleteComment = async (event) => {
    console.log('clicked')
    event.preventDefault();

    const comment_id = event.target.dataset.id;
    console.log(comment_id);

    if (comment_id) {
        const res = await fetch('/api/comment', {
            method: 'DELETE',
            body: JSON.stringify({
                comment_id,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            document.location.reload();
        }
        else {
            alert(res.statusText);
        }
    }
}

document
    .querySelector('.commentForm')
    .addEventListener('submit', commentFormHandler);

if (document.querySelector('.delete')) {
    document
        .querySelector('.delete')
        .addEventListener('click', deleteComment);
}