const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector("#commentField").value.trim();
    const post_id = parseInt(window.location.href.split('/').pop());

    console.log(comment_text);
    console.log(post_id);

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
const testfunc = async (event) => {
    event.preventDefault();

    console.log("clicked");
}

document
    .querySelector('.commentForm')
    .addEventListener('submit', commentFormHandler);