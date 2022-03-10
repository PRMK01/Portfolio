var form = document.getElementById("contact-form");
    
async function handleSubmit(event) {
    event.preventDefault();
    var data = new FormData(event.target);
    fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
    }).then(response => {
    if (response.ok) {
        alert('Thank you! Your message was sent and will be replied shortly.')
        form.reset()
    } else {
        response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
            alert(data["errors"].map(error => error["message"]).join(", "))
        } else {
            alert('Oops! Error occurred. Please contact me directly at the address below.')
        }
        })
    }
    }).catch(error => {
        alert('Oops! Error occurred. Please contact me directly at the address below.')
    });
}
form.addEventListener("submit", handleSubmit)