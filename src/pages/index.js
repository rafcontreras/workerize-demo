import React, { useRef, useState, useEffect } from "react";
import ShaWorker from "../workers/sha.worker.js";

const hashedString = "Hashed string will appear here";

const IndexPage = () => {
  const [shaInput, setShaInput] = useState("");
  const [result, setResult] = useState(hashedString);
  const shaWorkerRef = useRef(null);

  const getShaWorker = () => {
    if (!shaWorkerRef.current) {
      shaWorkerRef.current = new ShaWorker();
    }
    return shaWorkerRef.current;
  };

  const handleChange = event => {
    setShaInput({ value: event.target.value || "" });
  };

  const handleWorker = () => {
    if (shaInput.value) {
      getShaWorker()
        .sha(shaInput)
        .then(shaResults => JSON.parse(shaResults))
        .then(parsed => {
          if (
            parsed.data &&
            parsed.data.value &&
            parsed.data.value === shaInput.value
          ) {
            setResult(parsed.data.result);
          }
        });
      return;
    }
    setResult(hashedString);
  };

  useEffect(handleWorker, [shaInput]);

  return (
    <div
      className="min-h-screen bg-gray-100 bg-cover bg-center py-6 flex flex-col justify-center sm:py-12"
      style={{ backgroundImage: "url(https://source.unsplash.com/random)" }}
    >
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full">
        <div className="absolute inset-0 backdrop-filter backdrop-blur bg-blue-600 bg-opacity-50 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 bg-opacity-80 backdrop-filter backdrop-blur">
          <div className="max-w-md mx-auto w-full">
            <div>
              <h1 className="text-2xl font-semibold">Hash String</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 divide-y-2 divide-yellow-400 divide-dashed">
                <div className="p-y-1">
                  <label htmlFor="shaInput" className="text-gray-600 text-sm">
                    String to Hash
                  </label>
                  <input
                    autoComplete="off"
                    id="shaInput"
                    name="shaInput"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-2 text-sm border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600 rounded p-2"
                    onChange={handleChange}
                    placeholder="Enter any string"
                  />
                </div>
                <div className="pt-3">
                  <div
                    className={`bg-gray-700 rounded py-2 px-4 ${
                      result !== hashedString ? "text-white" : "text-gray-400"
                    }`}
                  >
                    <div className="h-14 flex items-center justify-center">
                      <pre>
                        <code className="break-all font-mono whitespace-pre-wrap text-center">
                          {result}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
