window.onload = () => {
    const userNameInput = document.getElementById("username");
    const b = document.getElementById("btn");
    b.addEventListener("click", () => {
        alert(`${userNameInput.value} さんこんにちは`);
    })
}
