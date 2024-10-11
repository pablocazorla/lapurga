import { getCldImageUrl } from "astro-cloudinary/helpers";

const numOfImages = 2;

class Photo {
  constructor(idNode) {
    this.container = document.querySelector(`#${idNode}`);
    this.dimmer = document.querySelector(`#${idNode}-dimmer`);
    this.photoWrap = document.querySelector(`#${idNode} .photo-wrap`);
    this.photoOriginal = document.querySelector(`#${idNode} .photo-original`);
    this.photoOriginalUrl = "";
    this.photoDead = document.querySelector(`#${idNode} .photo-dead`);
    this.photoDeadUrl = "";
    this.imagesLoaded = 0;
    this.isReadyMessage = false;
  }
  load(publicId) {
    this.photoOriginalUrl = getCldImageUrl({
      src: publicId,
      crop: {
        width: 600,
        height: 600,
        type: "thumb",
        source: true,
      },
    });

    this.photoDeadUrl = getCldImageUrl({
      src: publicId,
      crop: {
        width: 600,
        height: 600,
        type: "thumb",
        source: true,
      },
      replace: [
        "face",
        "dead zombie face with closed eyes;preserve-geometry_true",
      ],
    });

    this.photoOriginal.addEventListener("load", () => {
      this.imagesLoaded++;
    });
    this.photoOriginal.addEventListener("error", () => {
      console.log("Error photo original");
      this.imagesLoaded++;
    });
    this.photoOriginal.src = this.photoOriginalUrl;
    //
    this.photoDead.addEventListener("load", () => {
      this.imagesLoaded++;
    });
    this.photoDead.addEventListener("error", () => {
      console.log("Error photo dead");
      this.imagesLoaded++;
    });
    this.photoDead.src = this.photoDeadUrl;

    return this;
  }
  onLoad(cb) {
    let timer = setInterval(() => {
      if (this.imagesLoaded === numOfImages && this.isReadyMessage) {
        clearInterval(timer);
        cb();
      }
    });
    return this;
  }

  setReadyMessage() {
    this.isReadyMessage = true;
    return this;
  }
  show() {
    this.photoWrap.classList.add("show");
    this.photoDead.classList.add("show");
    this.dimmer.classList.add("show");
  }
}

export default Photo;
