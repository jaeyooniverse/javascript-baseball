const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // 정답에 넣어줄 숫자
const answer = []; // 정답

// 정답 생성 함수
for (let i = 0; i < 4; i++) {
  const index = Math.floor(Math.random() * (9 - i)); // 1부터 9까지의 숫자 중 꺼낼 숫자 순서를 랜덤으로 결정한다.
  answer.push(numbers[index]); // 숫자를 정답에 넣어준다.
  numbers.splice(index, 1); // 정답에 넣은 숫자를 다시 넣지 않기 위해 제거해준다.
}

const userInput = document.querySelector('#user-input');
let input = '';

const handleInput = (event) => {
  input = event.target.value;
};
userInput.addEventListener('input', handleInput);

let strikeCnt = 0; // 스트라이크
let ballCnt = 0;

const result = document.querySelector('#result');

// 재시작 버튼 생성 함수
const restart = () => {
  let restartBtn = document.createElement('button');
  restartBtn.id = 'game-restart-button';
  restartBtn.innerText = '재시작';
  restartBtn.onclick = function () {
    location.reload(); // 새로고침을 통해 게임이 재시작 된다.
  };
  return result.append(restartBtn);
};

// 입력에 0 있는지 확인하는 함수
const checkZero = (input) => {
  for (let i = 0; i < input.length; i++) {
    if (input[i] === '0') {
      return false;
    }
  }

  return true;
};

// 입력에 숫자가 아닌 것이 있는지 확인하는 함수
const checkInteger = (input) => {
  for (let i = 0; i < input.length; i++) {
    if (isNaN(input[i]) === true) {
      return false;
    }
  }

  return true;
};

const checkInput = (input) => {
  let newInput = new Set(input); // 집합으로 중복 제거
  newInput = [...newInput]; // 집합을 다시 배열로
  const checkZeroResult = checkZero(newInput);
  const checkIntegerResult = checkInteger(newInput);

  if (
    input.length === 4 &&
    input.length === newInput.length &&
    checkZeroResult &&
    checkIntegerResult
  ) {
    // 길이가 4이고 중복이 없으면 true, 아니면 false
    return true;
  } else {
    return false;
  }
};

const checkAttempt = (attempt) => {
  for (let i = 0; i < attempt.length; i++) {
    // 같은 숫자가 있고 같은 자리에 있으면 스트라이크
    if (answer.indexOf(attempt[i]) !== -1 && answer[i] === attempt[i]) {
      strikeCnt += 1;
    }
    // 같은 숫자가 있고 같은 자리에 있지 않으면 볼
    if (answer.indexOf(attempt[i]) !== -1 && answer[i] !== attempt[i]) {
      ballCnt += 1;
    }
  }
};

const logs = document.querySelector('#logs');

// 결과와 경기 기록을 출력하는 함수
const printResultAndLogs = (attempt, strikeCnt, ballCnt) => {
  if (strikeCnt === 4) {
    result.innerHTML =
      '<h3>🎉 정답입니다! 🎉</h3> 게임을 재시작할까요?<br/><br/>';
    logs.innerHTML += `${attempt} -> 정답`;
    restart();
  }
  if (!strikeCnt && !ballCnt) {
    result.textContent = '아웃!';
    logs.innerHTML += `${attempt} -> 아웃<br/>`;
  }
  if (strikeCnt !== 0 && strikeCnt !== 4 && ballCnt === 0) {
    result.textContent = `${strikeCnt}스트라이크!`;
    logs.innerHTML += `${attempt} -> ${strikeCnt}스트라이크<br/>`;
  }
  if (strikeCnt === 0 && ballCnt !== 0) {
    result.textContent = `${ballCnt}볼!`;
    logs.innerHTML += `${attempt} -> ${ballCnt}볼<br/>`;
  }
  if (strikeCnt !== 0 && ballCnt !== 0) {
    result.textContent = `${ballCnt}볼 ${strikeCnt}스트라이크`;
    logs.innerHTML += `${attempt} -> ${ballCnt}볼 ${strikeCnt}스트라이크<br/>`;
  }
};

// 배열 속 문자열들을 정수로 변환하는 함수
const stringToInt = (attempt) => {
  for (let i = 0; i < attempt.length; i++) {
    attempt[i] = Number(attempt[i]);
  }
};

const handleClick = (event) => {
  event.preventDefault();

  if (checkInput(input)) {
    const attempt = [...input];

    stringToInt(attempt);
    checkAttempt(attempt);

    printResultAndLogs(attempt, strikeCnt, ballCnt);
    strikeCnt = 0;
    ballCnt = 0;
    userInput.value = '';
    userInput.focus();
  } else {
    alert('입력창을 확인해주세요!');
  }
};
document.querySelector('#submit').addEventListener('click', handleClick);
