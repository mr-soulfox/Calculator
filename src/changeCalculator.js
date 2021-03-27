function changeCalculator() {
    //pegando valor do select
    const value = document.getElementById('typeCalc').value

    //pegando elementos
    const calcElement = document.getElementById('calc')
    const container = document.getElementById('calcContainer')
    const menuButton = document.getElementById('menuButton')
    const menu = document.getElementById('menu')
    const title = document.getElementById('typeCalcTitle')
    const description = document.getElementById('typeCalcDescription')


    const inputs = document.getElementById('inputs')
    const result = document.getElementById('resultContainer')

    if (value == 'date') {
        //sumindo com a interface padrão
        calcElement.style.visibility = 'hidden'
        menuButton.style.visibility = 'hidden'
        menu.style.visibility = 'hidden'


        //mudando o css do container
        container.style.border = '3px solid grey'
        container.style.width = '600px'
        container.style.height = '300px'

        inputs.style.visibility = 'visible'
        result.style.visibility = 'visible'

        //mudando o titulo da pagina
        document.title = 'Calculadora | data'

        //mudando titulo e descrição da Calculadora
        title.innerText = 'Calculadora de datas'
        description.innerText = 'É uma calculadora com a função de mostrar os dias, meses e anos de diferença'

    } else {
        //sumindo com a interface padrão
        calcElement.style.visibility = 'visible'
        menuButton.style.visibility = 'visible'

        //mudando o css do container
        container.style.backgroundColor = '#474444'
        container.style.border = '3px solid black'
        container.style.width = '370px'
        container.style.height = '525px'

        inputs.style.visibility = 'hidden'
        result.style.visibility = 'hidden'

        //mudando o titulo da pagina
        document.title = 'Calculadora | padrão'

        //mudando titulo e descrição da calculadora
        title.innerText = 'Calculadora padrão'
        description.innerText = 'É uma calculadora com as funções padrões'

    }

}