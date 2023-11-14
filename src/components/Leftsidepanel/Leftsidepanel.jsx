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

    // Remove the 5th element in the array
    var newArr = [
      ...Object.values(userAnswer).slice(0, 4),
      ...Object.values(userAnswer).slice(5),
    ];
    // return Object.values(userAnswer).reduce((a, b) => a + b.answer, 0);
    return newArr.reduce((a, b) => a + b.answer, 0);
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
          Earn From Employment (local): £{userAnswer[0].answer}
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
          Earn From Self-Employed (local): £{userAnswer[1].answer}
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
          Earn From Freelance Work: £{userAnswer[2].answer}
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
          Earn From Rental income (local): £{userAnswer[3].answer}
        </p>
      ) : null}
      {userAnswer[4].status === "answered" ? (
        userAnswer[4].answer === true ? (
          <p
            className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
            onClick={() => {
              setStage(2);
              setCount(4);
              addChatBotQuestion(botQuestion[2][4].question);
            }}
          >
            Any foregin income? Yes
          </p>
        ) : (
          <p
            className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
            onClick={() => {
              setStage(2);
              setCount(4);
              addChatBotQuestion(botQuestion[2][4].question);
            }}
          >
            Any foregin income? No
          </p>
        )
      ) : null}
      {userAnswer[5].status === "answered" ? (
        <p
          className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
          onClick={() => {
            setStage(2);
            setCount(5);
            addChatBotQuestion(botQuestion[2][5].question);
          }}
        >
          Earn from your oversea company: £{userAnswer[5].answer}
        </p>
      ) : null}
      {userAnswer[6].status === "answered" ? (
        <p
          className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
          onClick={() => {
            setStage(2);
            setCount(6);
            addChatBotQuestion(botQuestion[2][6].question);
          }}
        >
          Earn from your oversea job: £{userAnswer[6].answer}
        </p>
      ) : null}
      {userAnswer[7].status === "answered" ? (
        <p
          className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
          onClick={() => {
            setStage(2);
            setCount(7);
            addChatBotQuestion(botQuestion[2][7].question);
          }}
        >
          Earn from the oversea interest: £{userAnswer[7].answer}
        </p>
      ) : null}
      {userAnswer[8].status === "answered" ? (
        <p
          className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
          onClick={() => {
            setStage(2);
            setCount(8);
            addChatBotQuestion(botQuestion[2][8].question);
          }}
        >
          Earn from the oversea dividend: £{userAnswer[8].answer}
        </p>
      ) : null}
      {userAnswer[9].status === "answered" ? (
        <p
          className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
          onClick={() => {
            setStage(2);
            setCount(9);
            addChatBotQuestion(botQuestion[2][9].question);
          }}
        >
          Earn from the oversea rental income: £{userAnswer[9].answer}
        </p>
      ) : null}
      {userAnswer[10].status === "answered" ? (
        <p
          className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
          onClick={() => {
            setStage(2);
            setCount(10);
            addChatBotQuestion(botQuestion[2][10].question);
          }}
        >
          Earn from the interest in your savings (local): £
          {userAnswer[10].answer}
        </p>
      ) : null}
      {userAnswer[11].status === "answered" ? (
        <p
          className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
          onClick={() => {
            setStage(2);
            setCount(11);
            addChatBotQuestion(botQuestion[2][11].question);
          }}
        >
          Earn from the dividend (local): £{userAnswer[11].answer}
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
      <p>TaxPaid: {taxPaid.answer}</p>
    </div>
  );
}

export default Leftsidepanel;
