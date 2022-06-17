const emailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const phoneRegExp = /^[\+]{0,1}380([0-9]{9})$/

export function useValidation() {

  const validateName = async (event) => {
    const lengthName = event.target.value.length
    return lengthName >= 2 && lengthName <= 60
  }

  const validateEmail = async (event) => {
    return emailRegExp.test(event.target.value)
  }

  const validatePhone = async (event) => {
    return phoneRegExp.test(event.target.value)
  }

  const validatePhoto = async (event) => {

    const photoExceedsSizeLimit = event.target.files[0]?.size < 5e+6

    return new Promise((resolve) => {
      let img = new Image()
      img.src = URL.createObjectURL(event.target?.files[0])
      img.onload = () => {
        const photoExceedsDimensionsLimit = img.width >= 70 && img.height >= 70;

        resolve(photoExceedsSizeLimit && photoExceedsDimensionsLimit)
      }
    })
  }

  return {
    validateName,
    validateEmail,
    validatePhone,
    validatePhoto,
  }
}