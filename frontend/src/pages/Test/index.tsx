import { usePipe } from "../../hooks/pipedrive/pipeApi";

function Test() {
  const pipe = usePipe();

  const token = "0b89d278f9d3debfe30b08cb441f295f84832371";
  const deal_id = 75471;
  const user_id_ = 3183119;

  async function pipeLine() {
    const response = await pipe.changePipeline(token, deal_id, user_id_);
    console.log(response);
  }

  async function addProduct() {
    const response = await pipe.addProduct(token, deal_id, 215, 350);
    console.log(response);
  }

  async function file() {
    const response = await pipe.addFile(token, deal_id, "/pdf.pdf");
    console.log(response);
  }
  return (
    <div>
      <button onClick={pipeLine}>pipeline</button>
      <button onClick={addProduct}>product</button>
      <button onClick={file}>file</button>
    </div>
  );
}

export default Test;
