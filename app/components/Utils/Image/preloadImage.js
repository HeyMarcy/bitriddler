export default (imageSrc, onLoad) => {
  let img = new Image();
  img.src = imageSrc;
  img.onload = onLoad;
}
