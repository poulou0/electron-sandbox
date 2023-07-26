const replaceText = (selector, text) => {
  const element = document.getElementById(selector)
  if (element) element.innerText = text
}

for (const dependency of ['chrome', 'node', 'electron']) {
  replaceText(`${dependency}-version`, window.versions[dependency]())
}

document.getElementById('username').innerText = window.env.username;

(async () => {
  const response = await window.toolkit.ping()
  alert(response) // prints out 'pong' and the userInfo
})()
