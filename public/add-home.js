const addHome = document.querySelector('.add-home');
const addHomeBtn = addHome.querySelector('.add-home__btn');
const addHomeClose = addHome.querySelector('.close');

let addHomeEvent;

function showInstallPrompt(){
    addHome.classList.add("show");
}

window.addEventListener('beforeinstallprompt', function(e) {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    addHomeEvent = e;
    // Update UI notify the user they can add to home screen
    showInstallPrompt();
})

addHomeBtn.addEventListener("click", function(){
    addHomeEvent.prompt();
    addHomeEvent.userChoice.then(function(choiceResult) {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the Add to Home screen prompt');
        } else {
            console.log('User dismissed the Add to Home screen prompt');
        }
        addHome.classList.remove("show");
    });
}, {once: true});


addHomeClose.addEventListener('click', () => {
    addHome.classList.remove('show');
})