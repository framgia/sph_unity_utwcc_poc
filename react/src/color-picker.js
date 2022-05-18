const colorPicker = () => {
  const colorChange = (e, unityContext, setColorValue) => {
    const color = e.target.value;
    setColorValue(color);
    unityContext.send('Scaler', 'UpdateObjectColor', color);
  }

  return { colorChange }
}

export default colorPicker;