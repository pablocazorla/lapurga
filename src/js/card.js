import { getEndText } from "./textUtils";

class Card {
  constructor(idNode) {
    this.btnDownload = document.querySelector(`#textbox-btn-download`);
    this.container = document.querySelector(`#${idNode}`);
    this.canvas = document.querySelector(`#${idNode} .card-canvas`);
    this.btn = document.querySelector(`#${idNode} .card-btn`);
    this.btnClose = document.querySelector(`#${idNode} .card-btn-close`);
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    //
    this.btn.addEventListener("click", () => {
      const url = this.canvas.toDataURL();
      const link = document.createElement("a");
      link.href = url;
      link.download = "certificado de purga.png";
      link.click();
    });
    //
    this.btnDownload.addEventListener("click", () => {
      this.container.classList.add("show");
    });
    this.btnClose.addEventListener("click", () => {
      this.container.classList.remove("show");
    });
  }
  showButton() {
    this.btnDownload.classList.add("show");
    return this;
  }
  draw(photo) {
    const padding = 15;
    const center = 0.5 * this.height;

    //
    const bgImg = new Image();
    bgImg.onload = () => {
      this.ctx.drawImage(bgImg, 0, 0, this.width, this.height);

      this.ctx.strokeStyle = "#30005e";
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(0, 0, this.width, this.height);

      //
      this.ctx.save();
      this.ctx.fillStyle = "#30005e";
      this.ctx.shadowColor = "#5900ac";
      this.ctx.shadowBlur = 20;
      this.ctx.shadowOffsetX = 0;
      this.ctx.shadowOffsetY = 0;
      this.ctx.beginPath();
      this.ctx.ellipse(
        center,
        center,
        center - padding,
        center - padding,
        0,
        0,
        2 * Math.PI
      );
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.restore();

      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        this.ctx.save();
        this.ctx.fillStyle = "#30005e";
        this.ctx.shadowColor = "#5900ac";
        this.ctx.shadowBlur = 20;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        this.ctx.beginPath();
        this.ctx.ellipse(
          center,
          center,
          center - padding,
          center - padding,
          0,
          0,
          2 * Math.PI
        );
        this.ctx.closePath();
        this.ctx.clip();
        this.ctx.globalAlpha = 0.6;
        this.ctx.drawImage(
          img,
          padding,
          padding,
          this.height - 2 * padding,
          this.height - 2 * padding
        );
        this.ctx.restore();
      };
      img.src = photo.photoDeadUrl;

      // Text
      const text_paddingX = 20;
      const text_paddingY = 40;
      const text_height = 30;

      this.ctx.font = "bold 20px Courier New";

      const textX = this.height + text_paddingX;
      let textY = text_paddingY + 5;

      (() => {
        this.ctx.fillStyle = "#00000080";
        const p = 10;

        this.ctx.beginPath();
        this.ctx.roundRect(
          textX - p,
          text_paddingX,
          this.width - textX - text_paddingX,
          text_height + 10,
          8
        );
        this.ctx.closePath();
        this.ctx.fill();
      })();

      this.ctx.fillStyle = "#00d660";
      this.ctx.shadowColor = "#00d660aa";
      this.ctx.shadowBlur = 4;
      this.ctx.shadowOffsetX = 0;
      this.ctx.shadowOffsetY = 0;

      this.ctx.fillText("Certificado de purga", textX, textY);

      textY += text_height + 20;

      this.ctx.fillText("Te purgaremos de este mundo", textX, textY);

      textY += text_height;
      this.ctx.fillText("el día 31 de Octubre de 2025", textX, textY);

      textY += text_height;
      this.ctx.fillText("a las 11:59 pm.", textX, textY);

      const [endText1, endText2] = getEndText().split("vida ");
      textY += text_height * 2;
      this.ctx.fillText(endText1 + "vida", textX, textY);
      textY += text_height;
      this.ctx.fillText(endText2 + ".", textX, textY);
    };
    bgImg.src = "/img/bg-canvas.jpg";
    return this;
  }
}

export default Card;

/*













*/
