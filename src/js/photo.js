import { getCldImageUrl } from "astro-cloudinary/helpers";

const numOfImages = 2;

class Photo {
  constructor(idNode) {
    this.container = document.querySelector(`#${idNode}`);
    this.dimmer = document.querySelector(`#${idNode}-dimmer`);
    this.photoWrap = document.querySelector(`#${idNode} .photo-wrap`);
    this.photoOriginal = document.querySelector(`#${idNode} .photo-original`);
    this.photoDead = document.querySelector(`#${idNode} .photo-dead`);
    this.imagesLoaded = 0;
    this.isReadyMessage = false;
  }
  load(publicId) {
    const urlOriginal = getCldImageUrl({
      src: publicId,
      crop: {
        width: 600,
        height: 600,
        type: "thumb",
        source: true,
      },
    });

    const urlDead = getCldImageUrl({
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

    /*     const urlDead =
      "https://res.cloudinary.com/cazu/image/upload/e_gen_replace:from_face;to_dead%20zombie%20face%20with%20closed%20eyes;preserve-geometry_true/c_thumb,w_600,h_600,g_auto/f_auto/q_auto/v1/halloween/hj1hs2982s7ga5bqpces?_a=BBGABlXg0"; */

    this.photoOriginal.addEventListener("load", () => {
      this.imagesLoaded++;
    });
    this.photoOriginal.addEventListener("error", () => {
      console.log("Error photo original");
      this.imagesLoaded++;
    });
    this.photoOriginal.src = urlOriginal;
    //
    this.photoDead.addEventListener("load", () => {
      this.imagesLoaded++;
    });
    this.photoDead.addEventListener("error", () => {
      console.log("Error photo dead");
      this.imagesLoaded++;
    });
    this.photoDead.src = urlDead;

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

  readyMessage() {
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
