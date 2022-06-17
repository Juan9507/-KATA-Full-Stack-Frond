const $container = document.querySelector(".container");
const $templateTask = document.getElementById("task_template").content;
const $fragment = document.createDocumentFragment();

export const getTask = async (json) => {
  let jsonNew = await json;
  jsonNew.forEach((item) => {
    console.log(item.task);
  });
};
