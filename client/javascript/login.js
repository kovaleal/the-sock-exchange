document.getElementById('loginButton').addEventListener('click', function() {
    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('Username: ' + username);
    console.log('Password: ' + password);

    let stat = document.getElementById("status");
    if (username === "wasadmin@test.com" && password === "red") {
        stat.innerHTML = "Logged in";
        stat.style.backgroundColor = 'lightgreen';
    }
    else {
        stat.innerHTML = "Not authorized";
        stat.style.backgroundColor = 'lightcoral';
    }

    stat.removeAttribute("hidden");

});