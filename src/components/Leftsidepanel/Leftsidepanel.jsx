function Leftsidepanel({
  userIndex,
  userSurveyResult,
  userAnswer,
  taxPaid,
  listofUsers,
  setIsStateUpdated,
  setStage,
  setCount,
  botQuestion,
  addChatBotQuestion,
}) {
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
      <p>Index: {userIndex}</p>
      <p
        className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
        onClick={() => {
          setStage(0);
          setCount(0);
          addChatBotQuestion(botQuestion[0][0].question);
        }}
      >
        Username: {listofUsers[userIndex].name}
      </p>
      {userSurveyResult[0].status === "answered" ? (
        <>
          <p
            className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
            onClick={() => {
              setStage(1);
              setCount(0);
              addChatBotQuestion(botQuestion[1][0].question);
              // Reset question 2, 3 and result in the surveyResult botQuestion
              listofUsers[userIndex].setSurveyResultBackToInitial(1);
              listofUsers[userIndex].setSurveyResultBackToInitial(2);
              listofUsers[userIndex].setSurveyResultBackToInitial(3);
            }}
          >
            Arrive Date: {userSurveyResult[0].answer}
          </p>
          <p>
            Number of Days From Arrival:{" "}
            {listofUsers[userIndex].numOfDaysFromArrival}
          </p>
        </>
      ) : null}
      {userSurveyResult[3].status === "answered" ? (
        <p>Resident State: {userSurveyResult[3].answer}</p>
      ) : null}
      {userAnswer[0].status === "answered" ? (
        <p
          className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
          onClick={() => {
            setStage(2);
            setCount(0);
            addChatBotQuestion(botQuestion[2][0].question);
          }}
        >
          First Answer: {userAnswer[0].answer}
        </p>
      ) : null}
      {userAnswer[1].status === "answered" ? (
        <p
          className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
          onClick={() => {
            setStage(2);
            setCount(1);
            addChatBotQuestion(botQuestion[2][1].question);
          }}
        >
          Second Answer: {userAnswer[1].answer}
        </p>
      ) : null}
      {userAnswer[2].status === "answered" ? (
        <p
          className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
          onClick={() => {
            setStage(2);
            setCount(2);
            addChatBotQuestion(botQuestion[2][2].question);
          }}
        >
          Third Answer: {userAnswer[2].answer}
        </p>
      ) : null}
      {userAnswer[3].status === "answered" ? (
        <p
          className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
          onClick={() => {
            setStage(2);
            setCount(3);
            addChatBotQuestion(botQuestion[2][3].question);
          }}
        >
          Last Answer: {userAnswer[3].answer}
        </p>
      ) : null}
      <p>Total value of answers: {sum}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
        onClick={() => {
          listofUsers[userIndex].calculateTaxPaid();
          setIsStateUpdated(true);
        }}
      >
        Calculate TaxPaid
      </button>
      <p>TaxPaid: {taxPaid}</p>
    </div>
  );
}

export default Leftsidepanel;
