import { useState } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

function Reportsection({ userIndex, listofUsers, taxPaid }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState("");

  async function generateReport() {
    setIsGenerating(true);

    var contentMessage =
      "I want to know what I should do with my tax in the UK. My tax band is " +
      listofUsers[userIndex].band.answer +
      ". My tax on non-savings income is " +
      listofUsers[userIndex].taxOnNonSavingsIncome.answer +
      ". My tax on interest is " +
      listofUsers[userIndex].taxOnInterest.answer +
      ". My tax on dividend is " +
      listofUsers[userIndex].taxOnDividend.answer +
      ". My total tax is " +
      taxPaid.answer +
      ". Also, please instruct me on how to do it. Please answer within 250 words.";

    await openai.chat.completions
      .create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: contentMessage,
          },
        ],
      })
      .then((res) => {
        // Display the ChatGPT reply on the Chat
        setReport(res.choices[0].message.content);

        // Remove the ChatGPT is typing message
        setIsGenerating(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function textFileDownload() {
    const fileName = "newfilename.txt";
    const data = new Blob([report], { type: "text/plain" });
    const plainURL = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = plainURL;
    link.setAttribute("download", fileName);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      {taxPaid.status === "calculated" ? (
        <div className="w-full pb-16 bg-light-blue border-2">
          <div className="flex flex-row justify-center items-center">
            <button onClick={() => generateReport()}>Generate Report</button>
            {isGenerating === true ? (
              <div className="italic">Loading...</div>
            ) : null}
          </div>
          <div className="px-24">
            <p className="whitespace-pre-line text-left">{report}</p>
          </div>
          {report === "" ? null : (
            <button onClick={() => textFileDownload()}>
              Download Report to Text File
            </button>
          )}
        </div>
      ) : (
        <div className="w-full pb-16 bg-light-blue border-2">
          <p>This section will unlock after you calculate your tax.</p>
        </div>
      )}
    </>
  );
}

export default Reportsection;
