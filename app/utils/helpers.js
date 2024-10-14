const stringToBoolean = (string) => {
  if (string === undefined || string === null) {
    return false
  }

  return string.toLowerCase() === 'true'
}

export { stringToBoolean }
