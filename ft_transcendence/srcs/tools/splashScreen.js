function fadeOutLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.style.opacity = '0';
  
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 250); 

}

function spashScreen() {

    let loaded = false;
    let minimumTimeMet = false;
  
    setTimeout(() => {
      minimumTimeMet = true;
      if (loaded) fadeOutLoadingScreen();
    }, 1000);
  
    window.onload = function () {
      loaded = true;
      if (minimumTimeMet) fadeOutLoadingScreen();
    };
  };

export { spashScreen }