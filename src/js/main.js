import TextBox from "./textBox";

window.addEventListener("load", function () {
  let step = 0;
  let isFullScreen = false;
  const textBox = new TextBox("textbox");
  const textBoxBtn = new TextBox("textbox-btn");
  //

  const setStep = (val) => {
    step = val;

    // STEP 0
    if (step === 0) {
      // FULLSCREEN
      const dimmerFullScreen = document.getElementById("dimmer-full-screen");
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
        if (isFullScreen) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
      });
      textBox.fill("Acércate").wait();
      /* textBox.write("Hello from Astro!|sadsad *sadasdas+ sadsadsad", () => {
    console.log("LISTO");
  }); */
    }

    if (step === 1) {
      console.log("pasamos al 1");
      textBox.write(
        "Para participar en la Purga,|sube una *foto con tu rostro+.",
        () => {
          textBoxBtn.show().write("click aquí");
        }
      );
      textBoxBtn.textBox.addEventListener("click", () => {
        textBoxBtn.fadeOut(() => {
          textBoxBtn.hide();
        });
        textBox.fadeOut(() => {
          setStep(2);
        });
      });
    }
    if (step === 2) {
      console.log("pasamos al 2: Cargamos la imagen");
      // Cargamos la imagen
      textBox.write(
        "*Un momento+:|Estamos averiguando|quién eres y dónde vives|",
        () => {
          textBox.wait();
          setStep(3);
        }
      );
    }
    if (step === 3) {
      console.log("pasamos al 3: evento carga imagen");
    }
  };

  // INIT *************************************
  setStep(0);
});
