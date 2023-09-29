function Leftsidepanel({ userAnswer }) {
  const sum = sumOfUserAnswer();
  // console.log(sum);
  function sumOfUserAnswer() {
    // var sum = 0;
    // for (property in userAnswer) {
    //   sum += userAnswer[property].answer;
    // }
    // return sum;
    return Object.values(userAnswer).reduce((a, b) => a + b.answer, 0);
  }
  return (
    // <header className="mr-5 w-full h-1/3 bg-light-blue border-2 lg:h-screen lg:w-2/5"></header>
    <div className="w-1/2 py-56 bg-light-blue border-2">
      <p>This is Left Side Panel. Total: {sum}</p>
      <p>First Answer: {userAnswer[0].answer}</p>
      <p>Second Answer: {userAnswer[1].answer}</p>
      <p>Third Answer: {userAnswer[2].answer}</p>
      <p>Last Answer: {userAnswer[3].answer}</p>
    </div>
  );
}

export default Leftsidepanel;
