import TextBox from "./textBox";
import Photo from "./photo";

window.addEventListener("load", function () {
  let step = 0;
  let isFullScreen = false;
  let photoId = "halloween/gquukcgkzyzhsuicggca";
  const dimmerFullScreen = document.getElementById("dimmer-full-screen");
  const widget = document.querySelector("#upload-widget");
  //
  const bgMusic = new Audio("/audio/bg-music.mp3");
  bgMusic.volume = 0.4;
  const showMusic = new Audio("/audio/show.mp3");
  showMusic.volume = 0.8;
  //
  const textBox = new TextBox("textbox");
  const textBoxBtn = new TextBox("textbox-btn");
  const photo = new Photo("photo-container");
  //

  const setStep = (val) => {
    step = val;

    // STEP 0
    if (step === 0) {
      // FULLSCREEN

      window.addEventListener("fullscreenchange", () => {
        if (document.fullscreenElement) {
          isFullScreen = true;
          dimmerFullScreen.style.display = "none";
          setTimeout(() => {
            textBox.fadeOut(() => {
              setStep(1);
            });
          }, 600);
        } else {
          isFullScreen = false;
        }
      });
      dimmerFullScreen.addEventListener("click", function () {
        if (!isFullScreen) {
          document.documentElement.requestFullscreen();
        }
        bgMusic.play();
      });
      textBox.fill("Acércate").wait();
    }

    if (step === 1) {
      textBox.write(
        "Para participar en la Purga,|sube una *foto con tu rostro+.",
        () => {
          textBoxBtn.show().write("click aquí");
        }
      );

      widget.addEventListener("clduploadwidget:success", (e) => {
        photoId = e?.detail?.info?.public_id || "";

        textBoxBtn.fadeOut(() => {
          textBoxBtn.hide();
        });
        textBox.fadeOut(() => {
          setStep(2);
        });
      });
    }
    if (step === 2) {
      textBox.write(
        "*Un momento+:||Estamos averiguando|quién eres y dónde vives|",
        () => {
          textBox.wait();
          setTimeout(() => {
            photo.readyMessage();
          }, 1000);
        }
      );
      // Cargamos la imagen
      photo.load(photoId).onLoad(() => {
        setStep(3);
      });
    }
    if (step === 3) {
      textBox.clear();
      photo.show();
      bgMusic.pause();
      showMusic.play();
      setTimeout(() => {
        setStep(4);
      }, 7000);
    }
    if (step === 4) {
      const nowDate = new Date();
      const halloweenDate = new Date("Nov 01, 2024 00:00:00");
      const msUntilHalloween = halloweenDate.getTime() - nowDate.getTime();

      const daysUntilHalloween = Math.floor(
        msUntilHalloween / (1000 * 60 * 60 * 24)
      );

      const days = Math.max(daysUntilHalloween, 1);

      const countStr = `${
        days === 1 ? "del día" : "los " + days + " días"
      } de vida que te quedan`;
      textBox.write(
        `*Solicitud recibida+:||Te purgaremos de este mundo|el día 31 de Octubre de 2024 a las 11:59 pm.||Disfruta ${countStr}.`
      );
    }
  };

  // INIT *************************************
  setStep(0);
});
