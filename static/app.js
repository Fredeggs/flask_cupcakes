$(".show-cupcakes").click(showCupcakes);

async function showCupcakes() {
  resp = await axios.get("/api/cupcakes");
  $(".cupcake-list").append("<ul></ul>");
  const CUPCAKES = resp.data.cupcakes;
  for (const CUPCAKE of CUPCAKES) {
    $("ul").append(
      `<li><button class="show-details" data-id=${CUPCAKE.id}>${CUPCAKE.flavor}</button></li>`
    );
  }
  $(this).remove();
}

$(".cupcake-list").on("click", "button", showCupcakeDetails);

async function showCupcakeDetails() {
  resp = await axios.get(`/api/cupcakes/${$(this).data("id")}`);
  $(".container").css("display", "block");
  $("tbody").children().remove();
  $("tbody").append(
    `<tr>
      <td>${resp.data.cupcake.id}</td>
      <td>${resp.data.cupcake.flavor}</td>
      <td>${resp.data.cupcake.size}</td>
      <td>${resp.data.cupcake.rating}</td>
      <td><img style="height: 100px; width: 100px" src=${resp.data.cupcake.image}></td>
    </tr>`
  );
}

$("form").on("click", ".create-cupcake", createCupcake);

async function createCupcake(e) {
  e.preventDefault();
  new_cupcake = {
    flavor: $(".flavor").val(),
    size: $(".size").val(),
    rating: $(".rating").val(),
    image: $(".image").val(),
  };
  resp = await axios.post("/api/cupcakes", (json = new_cupcake));
  $(".cupcake-list").children().remove();
  resp2 = await axios.get("/api/cupcakes");
  $(".cupcake-list").append("<ul></ul>");
  const CUPCAKES = resp2.data.cupcakes;
  for (const CUPCAKE of CUPCAKES) {
    $("ul").append(
      `<li><button class="show-details" data-id=${CUPCAKE.id}>${CUPCAKE.flavor}</button></li>`
    );
  }
}
