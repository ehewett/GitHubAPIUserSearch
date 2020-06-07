"use strict";

function watchForm() {
  $("form").submit((event) => {
    event.preventDefault();
    let userInput = $("#user-handle").val();
    getRepoList(userInput);
  });
}

$(function () {
  console.log("App loaded! Waiting for submit!");
  watchForm();
});

function getRepoList(userHandle) {
  {
    fetch(
      `https://api.github.com/users/${userHandle}/repos?page=1&per_page=1000`
    )
      .then((response) => response.json())
      .then((responseJson) => displayRepoList(responseJson))
      .catch((error) =>
        alert("Something went wrong. Try again in a few minutes.")
      );
  }
}

function displayRepoList(responseJson) {
  console.log(responseJson);
  //   if (responseJson.status !== "success") {
  //     alert("Can't find that user handle. Please try again.");
  //   } else if (responseJson.status === "success") {
  $(".repos").html("");
  let repoHtml = "";
  responseJson.forEach((userRepo) => {
    repoHtml += `<div class="repo-name">${userRepo.name}</div>
      <div class="repo-link">
      <a href="${userRepo.html_url}">Repo Link</a>
      </div>`;
  });
  $(".repos").html(repoHtml);

  $(".repo-results").removeClass("hidden");
}
