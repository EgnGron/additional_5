module.exports = function check(str, bracketsConfig) {

  function countNumberOfMatches(string, character) {
    const specialСharacters = "[\\^$.|?*+()"
    const found = specialСharacters.indexOf(character)
    const regExpString = (found == -1) ? character : "\\"+character+""
    const countValue = string.match(new RegExp(regExpString, 'g'))
    return (countValue == null) ? 0 : countValue.length
  }

  function isEvenNumber(number) {
    if ( number & 1 ) {
      return false
    } 
    return true
  }

  var tags = {}
  var stack = []
  var tagEnum = Object.freeze({"open":1, "close":2, "dual":3})

  var dataIsEvenNumber = true
  bracketsConfig.forEach(element => {
    const elementOpen = element[0]
    const elementClose = element[1]

    var countOpen = countNumberOfMatches(str, elementOpen)
    var countClose = countNumberOfMatches(str, elementClose)

    if (elementOpen == elementClose) {
      if (!isEvenNumber(countOpen)) {
        dataIsEvenNumber = false
      }
      tags[elementOpen] = { oppositeElement: elementClose, tagDetail: tagEnum.dual , wasUsed: false}
    } else {
      if (countOpen != countClose) {
        dataIsEvenNumber = false
      }
      tags[elementOpen] = { oppositeElement: elementClose, tagDetail: tagEnum.open, wasUsed: false}
      tags[elementClose] = { oppositeElement: elementOpen, tagDetail: tagEnum.close, wasUsed: false}
    }
  });

  if (dataIsEvenNumber == false) {
    return false
  }

  for (let index = 0; index < str.length; index++) {
    const element = str[index];
    const tagDescription = tags[element]
    if (tagDescription != "undefined") {
      if ((tagDescription.tagDetail == tagEnum.open || tagDescription.tagDetail == tagEnum.dual) && !tagDescription.wasUsed) {
        tagDescription.wasUsed = (tagDescription.tagDetail == tagEnum.dual) ? true : tagDescription.wasUsed
        stack.push(element)
      } else {
        tagDescription.wasUsed = (tagDescription.tagDetail == tagEnum.dual) ? false : tagDescription.wasUsed
        const topElement = stack.pop()
        if (stack.length != 0) {
          if (topElement != tagDescription.oppositeElement) {
            return false
          }
        }
      }
    }
  }

  if (stack.length > 0) {
    return false
  }

  return true
}