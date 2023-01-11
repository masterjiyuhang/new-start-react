function reddenPage() {
  alert('浏览器插件启动了111' + Math.random(1000))

  const randomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }

  document.body.style.backgroundColor = randomColor()
}

function logTabsForWindows(windowInfoArray) {
  console.log(windowInfoArray)
  for (const windowInfo of windowInfoArray) {
    console.log(`Windowwsss: ${windowInfo.id}`)
    console.log(windowInfo.tabs.map((tab) => tab.url))
  }
}

function onError(error) {
  console.error(`Error: ${error}`)
}

chrome.action.onClicked.addListener((tab) => {
  chrome.windows
    .getAll({
      populate: true,
      windowTypes: ['normal']
    })
    .then(logTabsForWindows, onError)
  if (!tab.url.includes('chrome://')) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: reddenPage
    })
  }
})
