const about = document.querySelector(".nav__item-about");
const users = document.querySelector(".nav__item-users");
const winners = document.querySelector(".nav__item-winners");

const title = document.querySelector(".content__title");
const content = document.querySelector(".content__description");

const fetchData = async (param) => {
  try {
    content.innerHTML = "Loading...";
    const response = await fetch(`https://fakestoreapi.com/users${param}`);

    if (!response.ok) {
      throw new Error("Something went wrong!");
      return;
    }

    const data = await response.json();
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

  const users = await fetchData("?limit=5");

  title.innerHTML = "All competitors";
  content.innerHTML = users.map((user) => user.name.firstname);
});

winners.addEventListener("click", async (event) => {
  event.preventDefault();

  const users = await fetchData("?limit=3");

  title.innerHTML = "Competition winners";
  content.innerHTML = users.map((user) => user.name.firstname);
});
