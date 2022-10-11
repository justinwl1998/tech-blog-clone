const redirect = async (event) => {
    event.preventDefault();

    window.location.href = '/editcomment/' + event.target.dataset.id;
}

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

const editCommentHandler = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector('#commentField').value.trim();
    const post_id = parseInt(window.location.href.split('/').pop());
    const newDate = new Date();

    if (comment_text) {
        const res = await fetch('/api/comment', {
            method: 'PUT',
            body: JSON.stringify({
                comment_text,
                newDate,
                post_id,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            window.location = document.referrer;
        }
        else {
            alert(res.statusText);
        }
    }
}

const deleteComment = async (event) => {
    event.preventDefault();

    const comment_id = event.target.dataset.id;

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

if (document.querySelector('.commentForm')) {
    document
        .querySelector('.commentForm')
        .addEventListener('submit', commentFormHandler);
}

if (document.querySelector('.delete')) {
    document
        .querySelector('.delete')
        .addEventListener('click', deleteComment);
}

if (document.querySelector('.edit')) {
    document
        .querySelector('.edit')
        .addEventListener('click', redirect);
}

if (document.querySelector('.editPost')) {
    document
        .querySelector('.editPost')
        .addEventListener('submit', editCommentHandler);
}