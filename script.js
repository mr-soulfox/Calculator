//pegando o local das mensagens de erro
const localMenssageError = document.getElementById('localMenssageError')

//função para escrever dentro do input para não deixar o calculate poluido de comandos
function writeInInput(value) {
    //pega o valor que esta no display
    const display = document.getElementById("display")

    //pegando ultimo valor digitado
    let displayValue = display.value
    let arrayDisplayValue = displayValue.split('')
    let lastItem = arrayDisplayValue[arrayDisplayValue.length - 1]

    if (value == 'ce-c') {

        //remove tudo
        display.value = ''

    } else if (value == 'remove') {

        //remove o ultimo valor adicionado
        let displayValue = display.value
        let arrayDisplayValue = displayValue.split('')
        let itemRemoved = arrayDisplayValue.pop()

        display.value = arrayDisplayValue.join('')

    } else if (value == '+' || value == '-' || value == 'x' || value == '÷' || value == '%' || value == '/' || value == '^' || value == '√' || value == ',') {

        //condicional bloqueando o uso indevido dos simbolos
        if (lastItem == '+' || lastItem == '-' || lastItem == 'x' || lastItem == '÷' || lastItem == '%' || lastItem == '/' || lastItem == '^' || lastItem == '√' || lastItem == ',') {

            localMenssageError.innerText = 'Não adicione simbolos seguidos'
            localMenssageError.style.color = 'darkred'

            //não permite simbolos antes da adição de um numero no input
        } else if (lastItem == undefined) {

            localMenssageError.innerText = 'Adicione um numero antes'
            localMenssageError.style.color = 'darkred'

            //não permite mais de 16 caracteres no input
        }  else if (arrayDisplayValue.length >= 16) {

            localMenssageError.innerText = 'Permitido apenas 16 caracteres'
            localMenssageError.style.color = 'darkred'

            //não permite novas operaçoes apos o %
        } else if (displayValue.search('de') != -1) {

            localMenssageError.innerText = 'Apos o % não da pra fazer mais operaçoes'
            localMenssageError.style.color = 'darkred'

            //se tudo certo ele coloca no input
        }  else if (lastItem == '√') {

            localMenssageError.innerText = 'Apos o √ não da pra fazer mais operaçoes'
            localMenssageError.style.color = 'darkred'

            //não deixa a pessoa fazer outra operação apos o √
        } else {
            
            display.value = arrayDisplayValue.join('') + value

        }

        
        //serve para deixar um numero negativo
    } else if (value == 'negative') {

        //condicional bloquando o uso indevido do negative e do %
        //não permite adicionar o simbolo - duas vezes seguidas
        if (lastItem == '-') {

            localMenssageError.innerText = 'Não adicione mais de dois simbolos (negativos)'
            localMenssageError.style.color = 'darkred'

            //não permite masi de 16 caracteres no input
        } else if (arrayDisplayValue.length >= 16) {

            localMenssageError.innerText = 'Permitido apenas 16 caracteres'
            localMenssageError.style.color = 'darkred'

            //não permite novas operaçoes apos a operação do %
        } else if (lastItem == '√') {

            localMenssageError.innerText = 'Apos o √ não da pra fazer mais operaçoes'
            localMenssageError.style.color = 'darkred'

            //não deixa a pessoa fazer outra operação apos o √
        } else if (displayValue.search('de') != -1) {

            localMenssageError.innerText = 'Apos o % não da pra fazer mais operaçoes'
            localMenssageError.style.color = 'darkred'
            
            //não permite o usuario adicionar mais de 1 numero negativo por questoes de bugs
        } else if (lastItem != undefined) {

            localMenssageError.innerText = 'Adicione 1 numero negativo no inicio'
            localMenssageError.style.color = 'darkred'

            //caso tudo certo ele coloca no input
        }else {

            display.value += '-'

        }
    } else {


        //deixando a operação pra descobrir porcentagem mais bonito
        if (lastItem == '%') {

            display.value += ' de ' + value

            //não deixando a pessoa fazer outras operaçoes apos a operação de %
        } else if (lastItem == '√') {

            localMenssageError.innerText = 'Apos o √ não da pra fazer mais operaçoes'
            localMenssageError.style.color = 'darkred'

            //não deixa a pessoa fazer outra operação apos o √
        } else if (arrayDisplayValue.length >= 16) {

            localMenssageError.innerText = 'Permitido apenas 16 caracteres'
            localMenssageError.style.color = 'darkred'

            //se tudo correto ele coloca no input
        } else {

            display.value += value

        }
    }
}

//função que serve para efetuar o calculo
function calculateDisplay(displayValue) {

    //trocando todo o basico para ficar em forma aritmetica
    let valueReplaced = displayValue.replace(',', '.')
    valueReplaced = valueReplaced.replace('x','*')
    valueReplaced = valueReplaced.replace('÷','/')
    valueReplaced = valueReplaced.replace('^','**')

    
    //caso seja calculo de porcentagem 
    if (displayValue.search('%') != -1) {
        valueReplaced = valueReplaced.replace('%', '')
        valueReplaced = valueReplaced.replace(' de ', '-')

        let position = valueReplaced.length

        let arrayOnlyNumber = valueReplaced.split('-', position)

        let porcent = Number(arrayOnlyNumber[0])
        let number = Number(arrayOnlyNumber[1])

        let result = (porcent * number) / 100

        //se tudo certo, mostra o resultado dentro do input
        const display = document.getElementById('display')
        display.value = result

    } else if (displayValue.search('√') != -1) {

        let position = valueReplaced.search('√')

        let arrayOnlyNumber = valueReplaced.split('', position)

        let result = Math.sqrt(arrayOnlyNumber[0]).toFixed(2)

        //se tudo certo, mostra o resultado dentro do input
        const display = document.getElementById('display')
        display.value = result

    } else if (displayValue.search('%') == -1) {

            //metodo para fazer o calculo mesmo sendo string (recomendo que não utilize muito, só em casos especificos)
        let result = eval(valueReplaced.toString())

        //verificando se a operação funciono
        if (isNaN(result) == false) {
            
            //se tudo certo, mostra o resultado dentro do input
            const display = document.getElementById('display')

            display.value = result

            //restaurando o local de erros
            localMenssageError.innerText = 'Tudo certo'
            localMenssageError.style.color = 'lightgreen'
        
            //se estiver errado
        }
    } else {

        localMenssageError.innerText = 'Erro interno, consulte o programador'
        localMenssageError.style.color = 'darkred'
    }

}

//função para fazer mostrar o resultado no display
function calculate(value) {
    
    //pegando valor do display
    const displayValue = document.getElementById('display').value

    //pega o ultimo valor adicionado
    let arrayDisplayValue = displayValue.split('')
    let lastItem = arrayDisplayValue[arrayDisplayValue.length - 1]

    //caso não seja um result o valor entregue ele manda pra função que mexe para escrever no input e bloquear atitudes invalidas
    if (value != 'result') {

        //chamando função
        writeInInput(value)

        //caso seja um result ele chama a função pra calcular e depois imprimi isso dentro do input
    } else if (displayValue == '' || Number(displayValue.replace(',', '.')) == 'NaN') {

        localMenssageError.innerText = 'Nenhuma operação adicionada'
        localMenssageError.style.color = 'yellow'

    } else if (lastItem == '+' || lastItem == '-' || lastItem == 'x' || lastItem == '÷' || lastItem == '%' || lastItem == '/' || lastItem == '^' || lastItem == ',') {

        localMenssageError.innerText = 'Operação não fechada'
        localMenssageError.style.color = 'darkred'

    } else {
        //chamando função
        calculateDisplay(displayValue)

    }
}

//fim