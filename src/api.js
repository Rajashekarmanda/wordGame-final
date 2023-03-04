export const apiCallFetchData = async () => {

    const response = await fetch("https://words.dev-apis.com/word-of-the-day")
  
    const data = await response.json()
  
    const {word} = data

    return word

  
  }

  export const apiCallValidWord = async (correctWordIs) => {

    const url = "https://words.dev-apis.com/validate-word"

    const options = {

        method: "POST",

        body: JSON.stringify({word: correctWordIs})
    }

    const response = await fetch(url,options)

    const result = await response.json()

    const {validWord} =  result

    // console.log(validWord)

    return validWord
  }

  



export default {apiCallFetchData,apiCallValidWord}