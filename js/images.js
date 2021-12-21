// const images = getJson();
async function getJson() {
  url = "./js/images.json";
  return await fetch(url)
    .then((data) => data.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}
