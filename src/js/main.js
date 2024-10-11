import FullscreenControl from "./fullscreen-control";
import Photo from "./photo";
import TextBox from "./textBox";
import Uploader from "./uploader";
import MusicControl from "./music-control";
import Card from "./card";
import { getEndText } from "./textUtils";

window.addEventListener("load", function () {
  //
  const fullscreenControl = new FullscreenControl("dimmer-full-screen");
  const textBox = new TextBox("textbox");
  const textBoxBtn = new TextBox("textbox-btn");
  const photo = new Photo("photo-container");
  const uploader = new Uploader("upload-widget");
  const musicControl = new MusicControl();
  const card = new Card("card-container");
  //

  const setStep = (step) => {
    // STEP 0
    if (step === 0) {
      // FULLSCREEN
      fullscreenControl.isFullScreenTest(
        () => {
          fullscreenControl.hide();
          setStep(1);
        },
        () => {
          textBox.fill("Acércate").wait();
          fullscreenControl.onClick(() => {
            musicControl.playBgMusic();
            setTimeout(() => {
              textBox.fadeOut(() => {
                setStep(1);
              });
            }, 600);
          });
        }
      );
    }

    // STEP 1
    if (step === 1) {
      textBox.write(
        "Para participar en la Purga,|sube una *foto con tu rostro+.",
        () => {
          textBoxBtn.show().write("click aquí");
        }
      );

      uploader.onUpload(() => {
        textBoxBtn.fadeOut(() => {
          textBoxBtn.hide();
        });
        textBox.fadeOut(() => {
          setStep(2);
        });
      });
    }

    // STEP 2
    if (step === 2) {
      textBox.write(
        "*Un momento+:||Estamos averiguando|quién eres y dónde vives|",
        () => {
          textBox.wait();
          setTimeout(() => {
            photo.setReadyMessage();
          }, 1000);
        }
      );
      photo.load(uploader.photoId).onLoad(() => {
        setStep(3);
      });
    }

    // STEP 3
    if (step === 3) {
      textBox.clear();
      photo.show();
      musicControl.playShowPhotoMusic();
      setTimeout(() => {
        setStep(4);
      }, 7000);
    }

    // STEP 4
    if (step === 4) {
      const endText = getEndText();
      textBox.write(
        `*Solicitud recibida+:||Te purgaremos de este mundo|el día 31 de Octubre de 2024 a las 11:59 pm.||${endText}.`,
        () => {
          card.showButton().draw(photo);
        }
      );
    }

    // STEP 5
    if (step === -1) {
      const endText = getEndText();
      textBox.write(`A`, () => {
        card.showButton().draw(photo);
      });
    }
  };

  // INIT *************************************
  setStep(0);
});
