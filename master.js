

let count = document.querySelector(".quiz-info .count span")
let bullets = document.querySelector(".bullets .spans") 
let question = document.querySelector(".question")
let AnswersArea = document.querySelector(".answers-area");
let submit = document.querySelector(".submit");
let result = document.querySelector(".result")
let countDown = document.querySelector(".count-down")
let category = document.querySelector(".category span")
let current = 0;
let RightAnswer = 0;
let counter;

function getQuestions(){
    let myRequest = new XMLHttpRequest()


myRequest.onload = function(){
   if(this.readyState === 4 && this.status === 200){
let data = JSON.parse(this.responseText)
if(data){
    category.innerHTML = "HTML"
}
let qcount = data.length
createBullets(qcount)
addData(data[current], qcount)
conter(90,qcount)

    submit.onclick = function(){
        let theRightAnswer = data[current].right_answer
        current++
           checkAnswer(theRightAnswer, qcount);
           question.innerHTML = ""
           AnswersArea.innerHTML = ""
           addData(data[current], qcount)
           handleBullets();
           if(current === qcount){
            submit.style.pointerEvents= "none";
            if(RightAnswer > (qcount / 2) && RightAnswer < qcount){
                result.classList.add("finish")
                 result.innerHTML = `Good, TheResult Is ${RightAnswer} of ${qcount}`
            }else if(RightAnswer === 9){
                result.classList.add("finish")
                result.innerHTML = `Perfict, TheResult Is ${RightAnswer} of ${qcount}`
            }else{
                result.classList.add("finish")
                result.innerHTML = `Not Good, TheResult Is ${RightAnswer} of ${qcount}`
            }
        }
        clearInterval(counter)
        conter(90,qcount)
       }
}
}
    myRequest.open("GET","questions.json")
    myRequest.send()
}

getQuestions();

function createBullets(num){
count.innerHTML = num
for(let i = 0; i < num; i++){
let bullet = document.createElement("span");
if(i === 0){
    bullet.className = "on"
}
bullets.appendChild(bullet)
}
}

function addData(obj,count){
if(current < count){
    let questiontitle = document.createElement("h2");
questiontitle.innerHTML = `${obj.title} ?`
question.appendChild(questiontitle)
for(let i = 1; i <= 4; i++){
let line = document.createElement("div")
let input = document.createElement("input")
input.type = "radio";
input.id = `answer_${i}`
input.name = "question"
input.dataset.answer = obj[`answer_${i}`]
let label = document.createElement("label")
label.htmlFor = `answer_${i}`
label.innerHTML = `${obj[`answer_${i}`]} .` 
line.append(input,label)
AnswersArea.appendChild(line)
console.log(input.dataset.answer)
}
}
}

function checkAnswer(rAnswer,count){
let answers = document.getElementsByName("question")
let chose;
Array.from(answers).forEach((answer)=>{
    if(answer.checked){
        chose = answer.dataset.answer
    }
})
if(rAnswer === chose){
    RightAnswer++
}
console.log(RightAnswer)
}

function handleBullets(){
    let bulletSpans = document.querySelectorAll(".spans span")
    Array.from(bulletSpans).forEach((bullet, index)=>{
if(current === index){
    bullet.classList.add("on")
}
    })
}

function conter(duration, count){
if(current < count){
let minute,second;
 counter = setInterval(()=>{
    minute = parseInt(duration / 60);
second = parseInt(duration % 60);
minute = minute < 10 ? `0${minute}` : minute;
second = second < 10 ? `0${second}` : second;
countDown.innerHTML = `<span>${minute}</span> : <span>${second}</span>`
    if(--duration < 0){
        clearInterval(counter)
        submit.click();
    }
},1000)
}
}









