function Leftsidepanel({ userAnswer, taxPaid, calculateTaxPaid }) {
  const sum = sumOfUserAnswer();

  function sumOfUserAnswer() {
    // var sum = 0;
    // for (property in userAnswer) {
    //   sum += userAnswer[property].answer;
    // }
    // return sum;
    return Object.values(userAnswer).reduce((a, b) => a + b.answer, 0);
  }
  return (
    <div className="h-136 w-1/2 bg-light-blue border-2 overflow-y-auto">
      <p>This is Left Side Panel. Total: {sum}</p>
      <p>First Answer: {userAnswer[0].answer}</p>
      <p>Second Answer: {userAnswer[1].answer}</p>
      <p>Third Answer: {userAnswer[2].answer}</p>
      <p>Last Answer: {userAnswer[3].answer}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
        onClick={() => calculateTaxPaid()}
      >
        Calculate TaxPaid
      </button>
      <p>TaxPaid: {taxPaid}</p>
      {/* <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>2</p> */}
    </div>
  );
}

export default Leftsidepanel;
