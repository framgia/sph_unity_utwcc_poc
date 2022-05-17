const colorPicker = () => {
  const colorChange = (e, unityContext) => {
    const color = e.target.value;
    unityContext.send('Scaler', 'UpdateObjectColor', color);
  }

  return { colorChange }
}

export default colorPicker;