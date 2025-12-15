function inp(val) {
  if (!"0123456789+-/*().".includes(val)) {
    return;
  }
  let input = document.querySelector("#inp");
  let s = input.value;
  let lastChar = s.charAt(s.length - 1);
  if (val == '(' && "0123456789.)".includes(lastChar)) {
    return;
  }
  else if (val == ')' && ("+-*/.(".includes(lastChar) || !s.includes("("))) {
    return;
  }
  else if ("+-/*.".includes(val) && "+-/*.(".includes(lastChar)) {
    return;
  }
  else if ("0123456789".includes(val) && lastChar == ')') {
    return;
  }
  input.value += val;
}

function del(num) {
  let temp = document.querySelector("#inp");
  if (num == 1) {
    temp.value = temp.value.slice(0, -1);
  } else {
    temp.value = "";
  }
}

document.addEventListener("keydown", (event) => {
  let allowed = "1234567890+-/*().";
  let key = event.key;
  if (key == "Control" || key == "r") return;
  if (allowed.includes(key)) {
    event.preventDefault();
    inp(key);
  }
  else if (key === "Backspace") {
    event.preventDefault();
    del(1);
  }
  else if (key === "Enter") {
    calculate();
  }
  else {
    event.preventDefault();
  }
});


window.onload = () => {
  document.querySelector("#inp").focus();
};


// function cal(input) {
//   let arr = [];
//   for (let ch of input) {
//     if (ch != ')') {
//       arr.push(ch);
//     }
//     else { 
//       let s = "";
//       while (arr.length > 0 && arr[arr.length - 1] != '(') {
//         s += arr.pop();
//       } 
//       console.log(s);
//     }
//   }
// }



function calculate() {
  const inp = document.querySelector("#inp");
  let input = inp.value;

  while (input.includes("(")) {
    if (!input.includes(")")) {
      inp.value = "Error";
      return;
    }
    input = input.replace(/\([^()]*\)/g, (p) => {
      return calculateExpression(p.slice(1, -1));
    });
  }
  inp.value = calculateExpression(input);
}

function calculateExpression(s) {
  let nums = s.match(/(\d+(\.\d+)?|[+\-*/])/g);
  if (!nums) return 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === "*" || nums[i] === "/") {
      let a = parseFloat(nums[i - 1]);
      let b = parseFloat(nums[i + 1]);
      let res = nums[i] === "*" ? a * b : a / b;
      res = res.toFixed(3);
      nums.splice(i - 1, 3, res.toString());
      i--;
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === "+" || nums[i] === "-") {
      let a = parseFloat(nums[i - 1]);
      let b = parseFloat(nums[i + 1]);
      let res = nums[i] === "+" ? a + b : a - b;
      res = res.toFixed(3);
      nums.splice(i - 1, 3, res.toString());
      i--;
    }
  }
  if (nums.length > 1) return "Error";

  return parseFloat(nums[0]);
}
