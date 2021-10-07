document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    run();
}
document.addEventListener("backbutton", onBackKeyDown, false);
function onBackKeyDown() {
    // Handle the back button
    navigator.app.exitApp();
}


function run() {
//    localStorage.setItem('glob_server', glob_server);

    

    $('img').click(function () {
        window.location.href = 'home.html';
    });

    var pesan = getParameterByName('pesan');

    if (pesan == null || pesan.length < 1) {

    } else {

        setTimeout(function () {
            $('#myModal').modal('show');

        }, 500);
    }

}