const redirect = (event) => {
    event.preventDefault();

    window.location.href = '/editpost/' + event.target.dataset.id;
}

const editPostHandler = async (event) => {
    event.preventDefault();

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
            window.location.href = '/dashboard';
        }
        else {
            alert(res.statusText);
        }
    }
}

const deletePost = async (event) => {
    event.preventDefault();

    const post_id = event.target.dataset.id;
    
    if (post_id) {
        const res = await fetch('/api/post', {
            method: 'DELETE',
            body: JSON.stringify({
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

if (document.querySelector('.edit') !== null) {
    document
        .querySelector('.edit')
        .addEventListener('click', redirect);
}

if (document.querySelector('.delete') !== null) { 
    document
        .querySelector('.delete')
        .addEventListener('click', deletePost);
}

if (document.querySelector('.editForm') !== null) {
    document
        .querySelector('.editForm')
        .addEventListener('submit', editPostHandler);
}