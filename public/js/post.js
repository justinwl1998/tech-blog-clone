const editPost = () => {
    document.querySelector('.postContainer').style.display = 'none';
    document.querySelector('.editPost').style.display = 'initial';

    document.querySelector('#postTitle').value = document.querySelector('.postContainer').childNodes[1].textContent.trim();
    document.querySelector('#postField').value = document.querySelector('.postContainer').childNodes[5].textContent.trim()
}

const editPostHandler = async (event) => {
    event.preventDefault();
    console.log("this ain't finished yet");

    const title = document.querySelector('#postTitle').value;
    const desc = document.querySelector('#postField').value;
    const post_id = parseInt(window.location.href.split('/').pop());
    const newDate = new Date();

    if (title && desc) {
        const res = await fetch('/api/post', {
            method: 'PUT',
            body: JSON.stringify({
                title,
                desc,
                newDate,
                post_id,
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
    .querySelector('.edit')
    .addEventListener('click', editPost);

document
    .querySelector('.editForm')
    .addEventListener('submit', editPostHandler);