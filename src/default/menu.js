//função para mostrar o menu
function menu(visibility) {

    //pegando elementos
    const menu = document.getElementById('menu')
    const menuButton = document.getElementById('menuButton')

    //condição para mostrar ou não
    if (visibility == 'hidden') {

        menu.style.visibility = 'visible'
        menuButton.style.visibility = 'hidden'

    } else if (visibility == 'visible') {

        menu.style.visibility = 'hidden'
        menuButton.style.visibility = 'visible'

    }
}