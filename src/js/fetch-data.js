const about = document.querySelector(".nav__item-about");
const users = document.querySelector(".nav__item-users");
const winners = document.querySelector(".nav__item-winners");

const title = document.querySelector(".content__title");
const content = document.querySelector(".content__description");
const userDetails = document.querySelector(".user__details");
const userList = document.querySelector(".user__list");

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const makeUsers = (users) => {
  for (let user of users) {
    const li = document.createElement("LI");
    li.innerHTML = user.name.firstname.capitalize();
    userList.append(li);

    li.addEventListener("click", () => {
      userDetails.innerHTML = user.email;
    });
  }
};

const fetchData = async (param) => {
  try {
    content.innerHTML = "Loading...";
    const response = await fetch(`https://fakestoreapi.com/users${param}`);

    if (!response.ok) {
      throw new Error("Something went wrong!");
      return;
    }

    const data = await response.json();
    content.innerHTML = "";
    return data;
  } catch (error) {
    console.log(error);
  }
};

about.addEventListener("click", (event) => {
  event.preventDefault();

  title.innerHTML = "About the competition";
  content.innerHTML =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit alias pariatur, sint recusandae earum minus doloribus voluptatibus et officiis nihil!";
});

users.addEventListener("click", async (event) => {
  event.preventDefault();
  userList.innerHTML = "";

  const users = await fetchData("?limit=5");

  title.innerHTML = "All competitors";
  makeUsers(users);
});

winners.addEventListener("click", async (event) => {
  event.preventDefault();
  userList.innerHTML = "";

  const users = await fetchData("?limit=3");

  title.innerHTML = "Competition winners";
  makeUsers(users);
});
