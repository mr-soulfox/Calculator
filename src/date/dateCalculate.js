//pegando local de resultado
const boxResult = document.getElementById('boxResult');

//conversor de string para number e calcular a data
function dateCalculate() {
    //pegando valores
    const dateLeft = document.getElementById('left').value
    const dateRight = document.getElementById('right').value

    //limpando resultado
    if (boxResult.value == 'Mesmo dia') {
        boxResult.value = ''
    }

    //converte e calcula apenas se os dois valores tiverem preenchidos
    if (dateLeft != '' && dateRight!= '') {

        let arrayLeftString = dateLeft.split('-')
        let arrayRightString = dateRight.split('-')

        let arrayLeft = []
        let arrayRight = []

        let p = 0

        for (let i = 0; i <= arrayLeftString.length * 2; i++) {
            if (i <= 2 && i >= 0) {

                arrayLeft.push(parseInt(arrayLeftString[i]))

            } else if (i >= 3 && i <= 5) {

                arrayRight.push(parseInt(arrayRightString[p]))

                p++

            }
        }

        //parte do calculo
        for (let i = 0; i <= arrayRight.length - 1; i++) {

            if (i == 0) {

                var year = Math.abs(arrayLeft[i] - arrayRight[i])

            } else if (i == 1) {

                if (year != 0 && arrayLeft[i] != arrayRight[i] && arrayLeft[i] > 11) {

                    var month = Math.abs(((arrayLeft[i] + arrayRight[i]) - 12))

                } else {

                    var month = Math.abs(arrayLeft[i] - arrayRight[i])

                }

            } else if (i == 2) {

                var day = Math.abs(arrayRight[i] - arrayLeft[i])

            }

        }

        if (isNaN(year) == false || isNaN(month) == false || isNaN(day) == false) {

            if (day == 0 && month == 0 && year == 0) {

                boxResult.value = 'Mesmo dia'

            } else {
                boxResult.value = `Dia: ${day}; Mês: ${month}; Ano: ${year}`
            }

        }

    }
}