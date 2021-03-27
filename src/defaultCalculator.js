//pega o valor que esta no display
const display = document.getElementById("display")

//pegando o local das mensagens de erro
const localMenssageError = document.getElementById('localMenssageError')

//ativando função quando alguem aperta qualquer tecla 
document.addEventListener('keydown', keyboard)

//criando lista do log e a lista de removidos do log
let logList = []
let removedListLog = []

//função para escrever dentro do input para não deixar o calculate poluido de comandos
function writeInInput(value) {

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

    } else if (value == '+' || value == '-' || value == 'x' || value == '÷' || value == '%' || value == '^' || value == '√' || value == '.') {

        //condicional bloqueando o uso indevido dos simbolos
        if (lastItem == '+' || lastItem == '-' || lastItem == 'x' || lastItem == '÷' || lastItem == '%' || lastItem == '/' || lastItem == '^' || lastItem == '√' || lastItem == '.') {

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

            localMenssageError.innerText = 'Não adicione dois negativos seguidos'
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
            
        } else if (lastItem == undefined || lastItem == '+' || lastItem == '÷' || lastItem == 'x' || lastItem == '^') {
            
            display.value += '-'

            //caso tudo certo ele coloca no input
        }

    } else if (value == '/') {

        if (lastItem == '+' || lastItem == '-' || lastItem == 'x' || lastItem == '÷' || lastItem == undefined) {

            display.value += '1/'

        } else {

            localMenssageError.innerText = 'Fração indevida'
            localMenssageError.style.color = 'darkred'
            //não permite a pessoa fazer uma fração indevida
        }

    }else {


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

    //loop para trocar todos os dimbolos basicos
    for (let i = 0; i < (displayValue.length - 1); i++) {

        displayValue = displayValue.replace('x','*')
        displayValue = displayValue.replace('÷','/')
        displayValue = displayValue.replace('^','**')

    }
    
    //caso seja calculo de porcentagem 
    if (displayValue.search('%') != -1) {

        for (let i = 0; i < (displayValue.length - 1); i++) {

            displayValue = displayValue.replace('%', '')
            displayValue = displayValue.replace(' de ', '-')
    
        }

        let position = displayValue.length

        let arrayOnlyNumber = displayValue.split('-', position)

        let porcent = Number(arrayOnlyNumber[0])
        let number = Number(arrayOnlyNumber[1])

        let result = (porcent * number) / 100

        //se tudo certo, mostra o resultado dentro do input
        const display = document.getElementById('display')
        display.value = result

    } else if (displayValue.search('√') != -1) {

        let position = displayValue.search('√')

        let arrayOnlyNumber = displayValue.split('', position)

        let result = Math.pow(arrayOnlyNumber[0], 0.5)

        if (result == 'NaN') {
            localMenssageError.innerText = 'A √ não permite numeros negativos'
            localMenssageError.style.color = 'darkred'
        } else {
            //se tudo certo, mostra o resultado dentro do input
            const display = document.getElementById('display')
            display.value = result
        }

    } else if (displayValue.search('%') == -1) {

        //metodo para fazer o calculo mesmo sendo string (recomendo que não utilize muito, só em casos especificos)
        let result = eval(displayValue.toString())

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

//função para compatibilidade com o teclado
function keyboard(keydownEvent) {
    
    let eventKeyCode = keydownEvent.keyCode

    //switch para enviar pra função um determinado valor conforme a tecla pressionada, utiliza o codigo ASCII pra saber o codigo da tecla
    switch (eventKeyCode) {

        //para aparecer o resultado
        case 13: 
            calculate('result')
            break
        
        //para apagar o input completo
        case 67:
            calculate('ce-c')
            break
        
        //para remover um caracter
        case 8:
            calculate('remove')
            break

        //para divisão
        case 193:
            calculate('÷')
            break
        case 111:
            calculate('÷')
            break
        
        //para multiplicação
        case 106:
            calculate('x')
            break
        
        //para subtração
        case 189:
            calculate('-')
            break
        case 109:
            calculate('-')
            break
        
        //para adição
        case 107:
            calculate('+')
            break
        
        //negativo 
        case 78:
            calculate('negative')
            break
        
        //para adicionar .
        case 190:
            calculate('.')
            break
        case 188:
            calculate('.')
            break
        
        //para açoes especiais
        case 80:
            calculate('%')
            break
        case 70:
            calculate('/')
            break
        case 69:
            calculate('^')
            break
        case 81:
            calculate('√')
            break
        
        
        //adicionando numeros não pelo numpad
        case 48:
            calculate('0') 
            break
        case 49:
            calculate('1')
            break
        case 50:
            calculate('2')
            break
        case 51:
            calculate('3')
            break
        case 52:
            calculate('4')
            break
        case 53:
            calculate('5')
            break
        case 54:
            calculate('6')
            break
        case 55:
            calculate('7')
            break
        case 56:
            calculate('8')
            break
        case 57:
            calculate('9')
            break

        //adicionado pelo numpad
        case 96:
            calculate('0') 
            break
        case 97:
            calculate('1')
            break
        case 98:
            calculate('2')
            break
        case 99:
            calculate('3')
            break
        case 100:
            calculate('4')
            break
        case 101:
            calculate('5')
            break
        case 102:
            calculate('6')
            break
        case 103:
            calculate('7')
            break
        case 104:
            calculate('8')
            break
        case 105:
            calculate('9')
            break
        
        //tecla extra
        case 46:
            var key = prompt('digite a senha')
            
            if (key == '?') {

                console.log('Tecla extra: "Você gosta mesmo de digitar, vira escritor"')

            } else {

                console.log('ERROU!!!!!')

            }
            break

        default:
            null
    }

}

//função do log
function log(calc) {
    //pegando log
    const log = document.getElementById('log')

    if ((logList.length - 1) >= 13) {

        //lista com os valores já removidos do log visivel
        removedListLog = logList

        //apagando lista
        logList = []

        //adicionando o ultimo valor colocado no array
        logList.push(removedListLog[removedListLog.length - 1])

        //adicionando na lista
        logList.push(calc)

        log.innerHTML = logList[0] + '<br/>' + calc + '<br/>'

    } else {

        //adicionando na lista
        logList.push(calc)

        log.innerHTML += calc + '<br/>'
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

        //chamando função para escrever
        writeInInput(value)

        //caso esteja vazio ele informa o erro
    } else if (displayValue == '' || Number(displayValue.replace(',', '.')) == 'NaN') {

        localMenssageError.innerText = 'Nenhuma operação adicionada'
        localMenssageError.style.color = 'darkred'

    } else if (lastItem == '+' || lastItem == '-' || lastItem == 'x' || lastItem == '÷' || lastItem == '%' || lastItem == '/' || lastItem == '^' || lastItem == '.') {

        localMenssageError.innerText = 'Operação não fechada'
        localMenssageError.style.color = 'darkred'

    } else {
        //chamando função para calcular
        calculateDisplay(displayValue)

        //chamando função para adicionar valor do display
        log(displayValue)

    }
}

//fim