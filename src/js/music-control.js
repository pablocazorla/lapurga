class MusicControl {
  constructor() {
    this.bgMusic = new Audio("/audio/bg-music.mp3");
    this.bgMusic.volume = 0.4;
    this.showPhotoMusic = new Audio("/audio/show.mp3");
    this.showPhotoMusic.volume = 0.8;
  }
  playBgMusic() {
    this.bgMusic.play();
  }
  playShowPhotoMusic() {
    this.bgMusic.pause();
    this.showPhotoMusic.play();
  }
}
export default MusicControl;
