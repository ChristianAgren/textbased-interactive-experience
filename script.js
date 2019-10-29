const inputButton = document.querySelector('button')

function inputUserAction(e) {
    console.log(e);

    if (e.charCode === 13 || e.type === 'click') {

        let userAction = document.querySelector('input'),
        userActionInput = userAction.value
        
        console.log(userActionInput)
        
        userAction.value = ""
        
        userAction.focus();
    }
}

function updateListElements() {

}

inputButton.addEventListener('click', inputUserAction)
window.addEventListener('keypress', inputUserAction)