const questions=[
    {
        quistion:"1. Which of the following statements about Java inheritance is true?",
        option:["Java supports multiple inheritance through classes.", "In Java, a class can inherit from multiple classes.", "In Java, a subclass can override methods of its superclass.", "Java does not allow a class to inherit from an interface."],
        answer: "In Java, a subclass can override methods of its superclass."
    },
    {
        quistion:"2. What is the default value of a local variable in Java?",
        option:["0", "Null", "false", "None; local variables must be initialized before use"],
        answer: "None; local variables must be initialized before use"
    },
    {
        quistion:"3. What is the default value of a boolean variable in Java?",
        option:["true", "false", "null", "0"],
        answer: "false"
    },
    {
        quistion:"4. Which of the following is not a Java keyword?",
        option:["final", "constant", "extends", "implements"],
        answer: "constant"
    },
    {
        quistion:"5. What is the size of an int variable in Java?",
        option:["8 bits", "16 bits", "32 bits", "64 bits"],
        answer: "32 bits"
    },
    {
        quistion:"6. Which method is used to start a thread in Java?",
        option:["init()", "start()", "run()", "begin()"],
        answer: "start()"
    },
    {
        quistion:"7. Which of the following is not a valid access modifier in Java?",
        option:["public", "private", "default", "package"],
        answer: "package"
    },
    {
        quistion:"8. Which of these classes is the parent class of all Java classes?",
        option:["String", "Object", "System", "Class"],
        answer: "Object"
    },
    {
        quistion:"9. Which exception is thrown when a division by zero occurs in Java?",
        option:["ArithmeticException", "ArrayIndexOutOfBoundsException", "NullPointerException", "IOException"],
        answer: "ArithmeticException"
    },
    {
        quistion:"10. What is the purpose of the final keyword in Java?",
        option:["To declare a constant value", "To create an abstract class", "To override a method", "To define a package"],
        answer: "To declare a constant value"
    },
];


let count=0;
let mark=0;

function next(){

    if(count==8){
        let button=document.getElementById("button");
        button.style.marginLeft="590px";
        button.style.width="180px";
        button.innerText+=" Test";
    }
    
    if(count==9){
        document.getElementById("result").innerText="Total Mark = "+mark;
    }

    count++;
    
    document.getElementById("ques").innerText=questions[count].quistion;
    document.getElementById('op1').innerText=questions[count].option[0];
    document.getElementById('op2').innerText=questions[count].option[1];
    document.getElementById('op3').innerText=questions[count].option[2];
    document.getElementById('op4').innerText=questions[count].option[3];
    
    const option=document.getElementsByName("q");
    for(let i=0; i<4; i++){
        if(option[i].checked == true && questions[count-1].answer==questions[count-1].option[i]){
            mark+=1;
        }
        option[i].checked=false;
    }

}

