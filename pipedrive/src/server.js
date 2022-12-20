const express = require("express");
const app = express();
const pipedrive = require("pipedrive");
const bodyParser = require("body-parser");

const PORT = 1800;
const TOKEN = "0b89d278f9d3debfe30b08cb441f295f84832371";

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
  const defaultClient = new pipedrive.ApiClient();

  let apiToken = defaultClient.authentications.api_key;
  apiToken.apiKey = TOKEN;
  const api = new pipedrive.DealsApi(defaultClient);
  const deals = await api.getDeals();

  res.send(deals);
});

app.post("/", async (req, res) => {
  const { token, deal, file } = req.params;
  const defaultClient = new pipedrive.ApiClient();
  let apiToken = defaultClient.authentications.api_key;
  apiToken.apiKey = token;

  const api = new pipedrive.FilesApi(defaultClient);
  // vir do post
  let opts = {
    dealId: deal,
  };

  console.log(file, deal);
  const response = file; //await api.addFile(file, opts);

  //   api.addFile(file, opts).then(
  //     (data) => {
  //       console.log(data);
  //     },
  //     (error) => console.log(error)
  //   );
  return res.json(response);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
