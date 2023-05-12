import { useState } from "react";
import QRCode from "qrcode.react";

const QRarea = () => {
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [prefix, setPrefix] = useState("GP");
  const [keys, setKeys] = useState([]);
  console.log(rangeStart, rangeEnd, prefix, keys, "test");

  const generateKeys = () => {
    const start = parseInt(rangeStart);
    const end = parseInt(rangeEnd);
    const generatedKeys = [];

    for (let i = start; i <= end; i++) {
      const code = `${prefix}${i.toString().padStart(6, "0")}`;
      const key = `${code}${getRandomAlphabet()}${getRandomAlphabet()}`;
      generatedKeys.push(key);
    }

    setKeys(generatedKeys);
  };

  const getRandomAlphabet = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const index = Math.floor(Math.random() * alphabet.length);
    return alphabet[index];
  };

  const saveKeys = () => {
    // Here you can make a fetch call to your backend to save the generated keys to the database
    console.log("Saving keys to database:", keys);
  };
  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "25px",
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <h2 className="text-center fs-1 my-4 mb-5">Key Generator</h2>
          <div className="col-12" style={styles}>
            <form onSubmit={(e) => e.preventDefault()}>
              <div class="row">
                <div class="col">
                  <div class="form-outline">
                    <label class="form-label" for="form6Example1">
                      Range Start:
                    </label>
                    <input
                      type="number"
                      value={rangeStart}
                      onChange={(e) => setRangeStart(e.target.value)}
                      id="form6Example1"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="form-outline">
                    <label class="form-label" for="form6Example2">
                      Range End:
                    </label>
                    <input
                      type="number"
                      value={rangeEnd}
                      onChange={(e) => setRangeEnd(e.target.value)}
                      id="form6Example2"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="form-outline mb-4">
                  <label class="form-label" for="form6Example7">
                    Prefix:
                  </label>
                  <input
                    type="text"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                    class="form-control"
                    id="form6Example7"
                    rows="4"
                  />
                </div>
              </div>
              <div className="justify-content-center d-flex">
                <button
                  onClick={() => generateKeys()}
                  class="verifyButton btn-block fs-3 mb-4 rounded-pill px-4"
                >
                  Generate Keys
                </button>
              </div>
              <div className="border border-2 border-dark keysArea">
                <div className=" w-100">
                  {keys?.map((key, index) => (
                    <ul className="list-group list-group-flush border">
                      <li key={key} className="list-group-item bg-light">
                        {index + 1} - {key}
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
              <div className="justify-content-center d-flex">
                {keys.length > 0 && (
                  <button
                    className="verifyButton fs-5 rounded-pill px-4"
                    type="button"
                    onClick={saveKeys}
                  >
                    Save Keys
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default QRarea;
