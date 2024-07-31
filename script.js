console.log("Hello world!");
// 'https://dummyjson.com/products'
// ''https://dummyjson.com/products/category/smartphones''

const listOfProducts = document.querySelector(".list-of-products");
const btnSearchCategory = document.querySelector("#btn-search-category");
const inputCategory = document.querySelector("#input-category");

function renderProduct(products) {
  listOfProducts.innerHTML = products
    .map((product) => {
      return `<div class="border-2 border-gray-700 p-4 m-2 w-1/5">
      <img src="${product.images[0]}" class="w-28 h-fit" />
      <h2 class="font-semibold text-lg">${product.title}</h2>
      <div class="font-normal text-base "> ${product.category}</div>
      </div>`;
    })
    .join(" ");
}

async function getApi(url, method) {
  try {
    const apiResponse = await fetch(url, {
      method: method,
    });

    const results = await apiResponse.json();

    return results;
  } catch (error) {
    console.error(error);
  }
}

async function getProductFromApi() {
  const results = await getApi("https://dummyjson.com/products", "GET");

  if (results?.products?.length > 0) renderProduct(results.products);
}

async function getCategoryProductFromApi(category) {
  console.log(category);
  const results = await getApi(
    `https://dummyjson.com/products/category/${category}`,
    "GET"
  );

  if (results?.products?.length > 0) renderProduct(results.products);
}

getProductFromApi();

btnSearchCategory.addEventListener("click", () => {
  inputCategory.value === ""
    ? getProductFromApi()
    : getCategoryProductFromApi(inputCategory.value);
});
