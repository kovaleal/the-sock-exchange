async function postData() {
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;

    console.log('Name: ' + name);
    console.log('Email: ' + email);

    const res = await fetch('http://localhost:9000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'name': name, 'email': email}),
    })
    .then(response => response.json())
    .then(data => console.log('POST: ', data))
    .catch((error) => console.error('Error:', error));
}