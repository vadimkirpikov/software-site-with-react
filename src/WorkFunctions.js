import ClipboardJS from "clipboard";
import hljs from "highlight.js";

export function showVerticalMenu() {
    document.getElementById("menu-button").classList.toggle("open");
    document.getElementById("vertical-menu").classList.toggle("show");
}
export function visitTelegram() {
    document.location.href = "https://t.me/+qce_aMn5dRk1NGIy";
}
export function visitVk() {
    document.location.href = "https://t.me/+qce_aMn5dRk1NGIy";
}
export function setClipboardButton(){
    let codeSnippets = document.querySelectorAll('pre');
    console.log(codeSnippets.length)
    let index = 1;
    codeSnippets.forEach(function (codeSnippet)
    {
        let copyButton = document.createElement('button');
        copyButton.classList.toggle("copy-button");
        copyButton.textContent = "копировать";
        copyButton.id = index.toString();
        index+=1;
        codeSnippet.parentNode.insertBefore(copyButton, codeSnippet);
        let cbp = new ClipboardJS(copyButton, {
            target: function(trigger) {
                return trigger.nextElementSibling;
            }
        });
        cbp.on('success', function(e) {
            e.clearSelection();
            let cbs = document.getElementsByClassName('copy-button');
            for (let i = 0; i<cbs.length; i++) {
                let el = cbs[i];
                el.textContent = 'копировать';
            }
            copyButton.textContent = 'скопировано';
        });
    });
}
export function RemoveClipBoardButtons() {
    const copyButtons = document.querySelectorAll('.copy-button');
    copyButtons.forEach(function (copyButton) {
        copyButton.remove();
    })
}
export function makeMark(index) {
    let dropdowns = document.getElementsByClassName("item");
    for (let i = 0; i < dropdowns.length; i++) {
        let el = dropdowns[i];
        if (el.classList.contains("selected")) {
            el.classList.remove("selected");
        }

    }
    document.getElementById(index).classList.toggle("selected");
}
function clearCode() {
    let codes = document.querySelectorAll('code');
    codes.forEach(function (code) {
        code.removeAttribute('data-highlighted');
    });
    codes.forEach(function(code) {
        code.innerHTML = code.textContent;
        code.classList.forEach(function (cls){
            if (cls.includes('hljs')) {
                code.classList.remove(cls);
            }
            else if (!cls.includes('language')) {
                code.classList.remove(cls);
            }
        });
    });
}
export function ClearFullCode() {
    clearCode();
    clearCode();
}
export function changeTheme(theme) {
    if (theme === 'light') {
        setActiveTheme('dark');
    }
    else {
        setActiveTheme('light');
    }
}
export function setActiveTheme(theme) {
    let darkThemeLink = document.getElementById("dark-theme");
    let lightThemeLink = document.getElementById("light-theme");
    darkThemeLink.disabled = (theme === 'light');
    lightThemeLink.disabled = (theme === 'dark');
    // if (theme === "dark") {
    //     document.getElementById("toggleSwitch").classList.add("on");
    // }
    // else {
    //     document.getElementById("toggleSwitch").classList.remove("on");
    // }
    localStorage.setItem("theme", theme);
    hljs.highlightAll();
}
export function loadTheme() {
    let currentTheme = localStorage.getItem("theme");
    if (!currentTheme) {
        setActiveTheme('dark');
    }
    else {
        setActiveTheme(currentTheme);
    }
}
export function switchTheme() {
    ClearFullCode();
    changeTheme(localStorage.getItem("theme"));
}
