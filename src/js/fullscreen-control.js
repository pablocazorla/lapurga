class FullscreenControl {
  constructor(idNode) {
    this.isFullscreen = document.fullscreenElement;
    this.dimmer = document.getElementById(idNode);
    this.fullScreenCallback = null;
    //
    window.addEventListener("fullscreenchange", () => {
      this.isFullScreen = document.fullscreenElement;
    });
    this.dimmer.addEventListener("click", () => {
      if (!this.isFullScreen) {
        document.documentElement.requestFullscreen();
      }
      // bgMusic.play();
    });
  }
  onClick(cb) {
    this.dimmer.addEventListener("click", () => {
      this.hide();
      cb();
    });
  }
  isFullScreenTest(cb_yes, cb_no) {
    if (this.isFullscreen) {
      if (cb_yes) cb_yes();
    } else {
      if (cb_no) cb_no();
    }
    return this;
  }
  hide() {
    this.dimmer.style.display = "none";
    return this;
  }
}

export default FullscreenControl;
