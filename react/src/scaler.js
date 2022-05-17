const scaler = () => {
  const adjustScale = (e, unityContext) => {
    const size = Number(e.target.value);
    unityContext.send('Scaler', 'UpdateObjectScale', size);
  }

  return { adjustScale }
}

export default scaler;