const currentDate = new Date();
const formattedDate =
    currentDate.toDateString().split(" ").slice(0, 3).join(" ") +
    " " +
    currentDate.toTimeString().split(" ")[0].split(":").slice(0, 3).join(":");
document.getElementById("dateTime").innerHTML = formattedDate;
const typingElement = document.querySelector(".typing");
let index = 0;
let currentText = "";
let isDeleting = false;
let currentMenu = "main";

const menus = {
    main: `Select a menu:<br><span onclick="handleMenuClick('1')">[1] Who is Jai Parmani?</span><br><span onclick="handleMenuClick('2')">[2] My Experiences</span><br><span onclick="handleMenuClick('3')">[3] My works</span><br><span onclick="handleMenuClick('4')">[4] Contact Me</span>`,
    1: `Who is Jai Parmani?<br><br>A passionate software engineer and problem solver. I love providing automated efficient solutions for real world problems. I hold a streak of being in top 5 teams in 6 consecutive hackathons. Solving over 800 questions on platforms like LeetCode and GFG, I developed efficient algorithms in my projects ranging from Web, Android, IOS, WatchOS, to accurate ML projects.<br><br><span onclick="handleMenuClick('B')">[B] Back</span>`,
    4: `Contact:<br>- Email: <a href="mailto:jaiparmani35@gmail.com">jaiparmani35@gmail.com</a><br>- LinkedIn: <a href="https://www.linkedin.com/in/jai-parmani">https://www.linkedin.com/in/jai-parmani</a><br><br><span onclick="handleMenuClick('B')">[B] Back</span>`,
    3: `Some of my Projects:<br><br>
- <strong>Automated Test Taker</strong>: Tool for MCQ generation from provided notes and conducting proctured tests using computer vision. <a href="https://github.com/glizzykingdreko/PerimeterX-Deobfuscator" target="_blank">[GitHub]</a><br>
- <strong>Academia+</strong>: Virtual classrooms providing live video lectures, automated notes scrapper, score predictor to aid students. <a href="https://github.com/glizzykingdreko/TMX-Deobfuscator" target="_blank">[GitHub]</a><br>
- <strong>Farm To Fork</strong>: E-commerce grocery application connecting farmers, local delivery system and customers directly, eliminating middlemen. <a href="https://github.com/jaiparmani/SIH" target="_blank">[GitHub]</a><br>
- <strong>WhatsAppMoneyManager</strong>: A chatbot on whatsapp to help monitor expenses. <a href="https://github.com/jaiparmani/whatsAppChatbot" target="_blank">[GitHub]</a><br>
- <strong>This Landing Page</strong>: Check out the code and design of this landing page. <a href="https://codepen.io/glizzykingdreko" target="_blank">[CodePen]</a><br><br>
<span onclick="handleMenuClick('B')">[B] Back</span>`,
    2: `My Experiences:<br><br>
- <strong>Deutsche Bank: SDE <2022-present></strong> <br>
- <strong>Deutsche Bank: Software Intern <2 months></strong><br>
- <strong>JK Fabrics: Web Developer<8 months></strong><br><br>
<span onclick="handleMenuClick('B')">[B] Back</span>`,
    
};

function handleMenuClick(menuKey) {
    if (menuKey in menus && currentMenu !== menuKey) {
        isDeleting = true;
        typeDeleteAnimation(() => {
            currentMenu = menuKey;
            currentText = menus[menuKey];
            index = 0;
            typeDeleteAnimation();
        });
    } else if ((menuKey === "B" || menuKey === "b") && currentMenu !== "main") {
        isDeleting = true;
        typeDeleteAnimation(() => {
            currentMenu = "main";
            currentText = menus.main;
            index = 0;
            typeDeleteAnimation();
        });
    }
}
function typeDeleteAnimation(callback) {
    let speed = 7; // default typing speed
    let deleteSpeed = 3; // default deletion speed

    if (currentMenu === "1" || currentMenu === "3") {
        speed = 1; // Makes the typing faster for "Who is glizzy".
        deleteSpeed = 1; // Makes the deletion faster for "Who is glizzy". Adjust as needed.
    }

    if (isDeleting && typingElement.innerHTML !== "") {
        if (currentText.charAt(index - 1) === ">") {
            const openTagIndex = currentText.lastIndexOf("<", index);
            const tagName = currentText.substring(
                openTagIndex + 1,
                currentText.indexOf(" ", openTagIndex)
            );
            const startTagIndex = currentText.lastIndexOf(
                `</${tagName}>`,
                index
            );
            index = startTagIndex;
        } else {
            index--;
        }
        currentText = currentText.slice(0, index);
        typingElement.innerHTML = currentText;

        setTimeout(() => typeDeleteAnimation(callback), deleteSpeed);
    } else if (isDeleting) {
        isDeleting = false;
        if (callback) callback();
    } else if (!isDeleting && index < currentText.length) {
        if (currentText.charAt(index) === "<") {
            if (currentText.substr(index, 4) === "<br>") {
                const br = document.createElement("br");
                typingElement.appendChild(br);
                index += 4;
            } else {
                const closingTagIndex = currentText.indexOf(">", index);
                const tagName = currentText
                    .substring(index + 1, closingTagIndex)
                    .split(" ")[0];
                const endTagIndex =
                    currentText.indexOf(`</${tagName}>`, index) +
                    `</${tagName}>`.length;
                const outerHTML = currentText.substring(index, endTagIndex);
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = outerHTML;
                const childElement = tempDiv.firstChild;

                if (tagName === "a") {
                    childElement.target = "_blank";
                    speed = 1; // Faster typing for <a> tag
                } else if (tagName === "span") {
                    childElement.onclick = function () {
                        const menuKey = childElement
                            .getAttribute("onclick")
                            .replace("handleMenuClick('", "")
                            .replace("')", "");
                        handleMenuClick(menuKey);
                    };
                    speed = 1; // Faster typing for <span> tag
                }

                typingElement.appendChild(childElement);
                index = endTagIndex;
            }
        } else {
            typingElement.innerHTML += currentText.charAt(index);
            index++;
        }

        setTimeout(typeDeleteAnimation, speed);
    }
}

function handleUserInput(event) {
    const key = event.key;
    if (key in menus && currentMenu !== key) {
        isDeleting = true;
        typeDeleteAnimation(() => {
            currentMenu = key;
            currentText = menus[key];
            index = 0;
            typeDeleteAnimation();
        });
    } else if ((key === "B" || key === "b") && currentMenu !== "main") {
        isDeleting = true;
        typeDeleteAnimation(() => {
            currentMenu = "main";
            currentText = menus.main;
            index = 0;
            typeDeleteAnimation();
        });
    }
}

document.addEventListener("keydown", handleUserInput);

// Initialize the typing animation with the main menu on page load
currentText = menus.main;
typeDeleteAnimation();
