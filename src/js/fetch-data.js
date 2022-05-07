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

const transformData = (users) => {
  for (let user of users) {
    const li = document.createElement("LI");
    li.innerHTML = user.name.firstname.capitalize();
    userList.append(li);

    li.addEventListener("click", () => {
      userDetails.innerHTML = "";

      const userEmail = document.createElement("LI");
      const userRanking = document.createElement("LI");

      userEmail.innerHTML = `Email: ${user.email}`;
      userRanking.innerHTML = `Ranking: ${user.id}`;

      userDetails.append(userEmail);
      userDetails.append(userRanking);
    });
  }
};

const resetContent = () => {
  title.innerHTML = "";
  content.innerHTML = "";
  userDetails.innerHTML = "";
  userList.innerHTML = "";
};

const fetchData = async (param) => {
  try {
    resetContent();

    title.innerHTML = "Retrieving data...";
    const response = await fetch(`https://fakestoreapi.com/users${param}`);

    if (!response.ok) {
      throw new Error("Something went wrong!");
      return;
    }

    const data = await response.json();
    title.innerHTML = "";
    return data;
  } catch (error) {
    console.log(error);
  }
};

about.addEventListener("click", (event) => {
  event.preventDefault();
  resetContent();

  title.innerHTML = "About the competition";
  content.innerHTML =
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";
});

users.addEventListener("click", async (event) => {
  event.preventDefault();
  userList.innerHTML = "";

  const users = await fetchData("?limit=10");

  title.innerHTML = "All competitors";
  transformData(users);
});

winners.addEventListener("click", async (event) => {
  event.preventDefault();
  userList.innerHTML = "";

  const users = await fetchData("?limit=3");

  title.innerHTML = "Competition winners";
  transformData(users);
});
