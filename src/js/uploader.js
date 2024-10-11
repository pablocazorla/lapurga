class Uploader {
  constructor(idNode) {
    this.widget = document.getElementById(idNode);
    this.photoId = "";

    this.widget.addEventListener("clduploadwidget:success", (e) => {
      this.photoId = e?.detail?.info?.public_id || "";
    });
  }
  onUpload(cb) {
    this.widget.addEventListener("clduploadwidget:success", () => {
      cb();
    });
    return this;
  }
}
export default Uploader;
