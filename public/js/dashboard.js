const dashboardFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#newpostTitle').value.trim();
    const desc = document.querySelector('#newPostField').value.trim();

    if (title && desc) {
        const res = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({
                title,
                desc
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
    .querySelector('.newPostForm')
    .addEventListener('submit', dashboardFormHandler);
