$(".show-cupcakes").click(showCupcakes);

async function showCupcakes() {
  resp = await axios.get("/api/cupcakes");
  $("body").append("<ul></ul>");
  const CUPCAKES = resp.data.cupcakes;
  for (const CUPCAKE of CUPCAKES) {
    $("ul").append(`<li><a href="">${CUPCAKE.flavor}</a></li>`);
  }
  $(this).remove();
}
