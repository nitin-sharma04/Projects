import { GoogleGenerativeAI } from "@google/generative-ai";

let answer =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt expedita quasi repellat debitis ea! Velit cum explicabo fugiat totam eius id deserunt. Inventore tempore fuga minima similique! Impedit, assumenda sapiente?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt expedita quasi repellat debitis ea! Velit cum explicabo fugiat totam eius id deserunt. Inventore tempore fuga minima similique! Impedit, assumenda sapiente? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt expedita quasi repellat debitis ea! Velit cum explicabo fugiat totam eius id deserunt. Inventore tempore fuga minima similique! Impedit, assumenda sapiente?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt expedita quasi repellat debitis ea! Velit cum explicabo fugiat totam eius id deserunt. Inventore tempore fuga minima similique! Impedit, assumenda sapiente?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt expedita quasi repellat debitis ea! Velit cum explicabo fugiat totam eius id deserunt. Inventore tempore fuga minima similique! Impedit, assumenda sapiente?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt expedita quasi repellat debitis ea! Velit cum explicabo fugiat totam eius id deserunt.";

let recent = ["Hello, Assistant"];
// Updated API key
const genAI = new GoogleGenerativeAI("AIzaSyC45cn73gOFMKP5hKBTdtBRbu-APsAAPZk");

async function run() {
  document.querySelector(".answer2").innerHTML = `<img
            src="https://www.gstatic.com/lamda/images/gemini_sparkle_processing_v002_6e79d4140a48275553581.gif"
            alt=""
          /> Loading...`;
  // Updated model to gemini-2.0-flash
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = document.querySelector(".textarea").innerHTML;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  answer = text;
  console.log(text);
}

document.querySelector(".textarea").addEventListener("click", (e) => {
  e.target.innerHTML = "";
});
document.querySelector(".textarea").addEventListener("keydown", (e) => {
  if (e.target.innerHTML.length >= 0) {
    document.querySelector(".submit").style.display = "block";
    document.querySelector(".mic").style.right = "300px";
    document.querySelector(".add_img").style.right = "350px";
  } else {
    document.querySelector(".submit").style.display = "none";
    document.querySelector(".mic").style.right = "250px";
    document.querySelector(".add_img").style.right = "300px";
  }
});
document.querySelector(".submit").addEventListener("click", async () => {
  document.querySelector(".heading").style.display = "none";
  document.querySelector(".submit").style.display = "none";
  document.querySelector(".stop").style.display = "block";
  document.querySelector(".textarea").contenteditable = "false";
  document.querySelector(".textarea").style.pointerEvents = "none";

  console.log(document.querySelector(".textarea").contenteditable);
  document.querySelector(".answer2").style.display = "block";
  document.querySelector(".suggestions").style.display = "none";
  document.querySelector(".answer1").innerHTML = ` <div class=
   "question"><img
            src="https://lh3.googleusercontent.com/ogw/AF2bZyiYs974rr3rsci12HnaS6I3xuk5IlWABRWYMnRYkcNp7w=s32-c-mo"
            alt=""
          /> ${document.querySelector(".textarea").innerHTML}</div>
          `;

  await run();
  let i = 0;
  let flag = false;
  document.querySelector(".answer2").innerHTML = `<img
            src="https://www.gstatic.com/lamda/images/gemini_sparkle_processing_v002_6e79d4140a48275553581.gif"
            alt=""
          /> `;
  function typeWriter() {
    if (i < answer.length) {
      document.querySelector(".answer2").innerHTML += answer.charAt(i);
      i++;
      if (flag) return;

      setTimeout(typeWriter, 20);
      if (i == answer.length) {
        changeimg();
      }
    }
  }
  typeWriter();
  recent.push(answer.substring(0, 17) + "...");
  if (recent.length > 4) recent.shift();
  console.log(recent);
  updateRecent();
  document.querySelector(".stop").addEventListener("click", () => {
    flag = true;
    changeimg();
  });
});

function changeimg() {
  document.querySelector(".answer2 img").src =
    "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg";
  document.querySelector(".stop").style.display = "none";
  document.querySelector(".mic").style.right = "250px";
  document.querySelector(".add_img").style.right = "300px";
  document.querySelector(".textarea").innerHTML = "Enter a prompt";
  document.querySelector(".textarea").style.pointerEvents = "auto";
}

function updateRecent() {
  let temp = "";
  recent.map((e) => {
    temp += `<p>
      <span class="material-symbols-outlined history-tab">chat_bubble </span>
      ${e}
    </p>`;
  });

  document.querySelector(".recent-history").innerHTML = temp;
}
updateRecent();
let toggle = true;
document.querySelector(".menu").addEventListener("click", () => {
  if (toggle) {
    console.log("hello");
    document.querySelector(".sidebar").style.width = "70px";
    document.querySelector(".recent").style.display = "none";
    document.querySelector(".address").style.display = "none";
    document.querySelectorAll(".text").forEach((e) => {
      e.style.display = "none";
    });
    document.querySelector(".textarea").style.width = "70%";
    toggle = false;
    document.querySelectorAll(".settings p").forEach((e) => {
      e.style.justifyContent = "center";
      e.style.width = "100%";
    });
  } else {
    document.querySelector(".sidebar").style.width = "20%";
    setTimeout(() => {
      document.querySelector(".recent").style.display = "block";
      document.querySelector(".address").style.display = "grid";
      document.querySelectorAll(".text").forEach((e) => {
        e.style.display = "block";
      });
      document.querySelector(".textarea").style.width = "65%";
      document.querySelectorAll(".settings p").forEach((e) => {
        e.style.justifyContent = "left";
        e.style.width = "100%";
      });
    }, 1000);

    toggle = true;
  }
});
