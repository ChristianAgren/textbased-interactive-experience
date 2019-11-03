const observer = new MutationObserver(listenToPhases)

inputButton.addEventListener('click', parseUserInput)
window.addEventListener('keypress', parseUserInput)
document.addEventListener('DOMContentLoaded', loadItems)
observer.observe(listenPhaseOne, config)
observer.observe(listenPhaseTwo, config)
observer.observe(listenPhaseThree, config)
observer.observe(listenPhaseFour, config)