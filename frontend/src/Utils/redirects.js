// eslint-disable-next-line import/prefer-default-export
export function goToHome(duration) {
  setTimeout(() => {
    window.location.replace("http://zavrsni.udruga-liberato.hr");
  }, duration * 1000);
}
