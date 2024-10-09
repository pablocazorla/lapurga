const minVolume = 0.1;
const maxVolume = 0.6;

class TextBox {
  constructor(idNode) {
    this.textBox = document.querySelector(`#${idNode}`);
    this.textBoxInner = document.querySelector(`#${idNode} .textbox-inner`);
    this.textBoxWait = document.querySelector(`#${idNode} .textbox-wait`);
    this.audio = new Audio("/audio/keyboard.mp3");
    this.volume = 0.5;
    this.timerWait = null;
  }
  clear() {
    this.textBoxInner.innerHTML = "";
    this.textBoxWait.innerHTML = "";
    clearInterval(this.timerWait);
    return this;
  }
  show() {
    this.textBox.style.display = "inline-block";
    return this;
  }
  hide() {
    this.textBox.style.display = "none";
    return this;
  }
  fill(text) {
    this.textBoxInner.innerHTML = text;
    return this;
  }
  write(text, cb) {
    this.clear();
    const textArray = text.split("");

    const length = textArray.length;
    let str = "";
    let index = 0;

    let timer = setInterval(() => {
      if (index < length) {
        let letter = textArray[index];
        letter = letter.replace("|", "<br/>");
        letter = letter.replace("*", "<u>");
        letter = letter.replace("+", "</u>");
        str += letter;
        this.textBoxInner.innerHTML = str;
        // this.audio.play();
        const audio = new Audio("/audio/keyboard.mp3");
        audio.volume = Math.random() * (maxVolume - minVolume) + minVolume;
        audio.play();
        index++;
      } else {
        clearInterval(timer);
        if (cb) {
          cb();
        }
      }
    }, 90);
    return this;
  }
  wait() {
    let index = 0;
    const steps = ["&nbsp;&nbsp;&nbsp;", ".&nbsp;&nbsp;", "..&nbsp;", "..."];
    this.textBoxWait.innerHTML = steps[index];

    this.timerWait = setInterval(() => {
      if (index <= 3) {
        this.textBoxWait.innerHTML = steps[index];
        index++;
      } else {
        index = 0;
        this.textBoxWait.innerHTML = steps[index];
      }
    }, 300);
    return this;
  }
  fadeOut(cb) {
    this.textBox.classList.add("fade-out");

    const tempFunc = () => {
      this.clear();
      this.textBox.classList.remove("fade-out");
      if (cb) {
        cb();
      }
      this.textBox.removeEventListener("animationend", tempFunc);
    };

    this.textBox.addEventListener("animationend", tempFunc);
  }
}

export default TextBox;
