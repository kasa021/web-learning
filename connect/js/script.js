window.onload = () => {
    const userNameInput = document.getElementById("username");
    const b = document.getElementById("btn");
    b.addEventListener("click", () => {
        fetch("http://localhost:3000", {
            method: "POST",
            body: `${userNameInput.value}さんがおしました`,
        });
    });
};
