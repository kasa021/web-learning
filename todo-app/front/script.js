window.onload = () => {
  //const userNameInput = document.getElementById("username");
  // const b = document.getElementById("btn");
  // b.addEventListener("click", async () => {
  //   getAllToDo();
  // });
  getAllToDo();
};

const addpost = (title) => {
  const postList = document.getElementById("posts");
  const wrapperDOM = document.createElement("div");
  const titleDOM = document.createElement("p");
  titleDOM.innerText = title;
  wrapperDOM.appendChild(titleDOM);

  const actionsDOM = document.createElement("span");
  actionsDOM.className = "options";
  const editiconDOM = document.createElement("i");
  const trashiconDOM = document.createElement("i");
  editiconDOM.className = "fas fa-edit";
  trashiconDOM.className = "fas fa-trash-alt";
  actionsDOM.appendChild(editiconDOM);
  actionsDOM.appendChild(trashiconDOM);
  wrapperDOM.appendChild(actionsDOM);

  postList.appendChild(wrapperDOM);
};

const getAllToDo = async () => {
  const res = await fetch("http://localhost:3000/todo", {
    method: "GET",
  });
  const data = await res.json();
  data.forEach((e) => {
    addpost(e.title);
  });
};
