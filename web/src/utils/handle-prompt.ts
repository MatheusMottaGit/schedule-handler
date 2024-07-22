import { handleMonthDates } from "./handle-month-dates"

export function handlePrompt(fileContent: string) {
  const { monthDates, saturdayDates, wednesdayDates } = handleMonthDates()

  return `
    1. Primeiro de tudo, formate esse conteúdo: ${fileContent}
    2. Depois, você deve separar TODOS os dias de missa da comunidade São José, apenas, que se encaixam nesses dias: ${monthDates}
    3. Em seguida, você deve se comportar como o coordenador da comunidade, e montar uma escala com os servidores para os dias de missa
    4. Como coordenador, você DEVE seguir as seguintes regras: 
      - Os nomes são: Matheus, Wilton, João, Caio, Rillary, Cadu, Daniel, Carlos Henrique, Maria Vitória, Diana, Emanuelly, Maria Vitória, Lourdes, Laura, Valentina, Ana Laura
      - Coloque 5 nomes por dia
      - Se refira aos dias ${wednesdayDates} como quartas-feiras, e ${saturdayDates} como sábados
      - Nos dias de missa deve ter APENAS um responsável, e, o responsável pelos dias ${wednesdayDates} é o Wilton. O responsável pelos dias ${saturdayDates} é o Matheus
      - Logo, o Wilton deve estar nas quartas, e o Matheus aos sábados
      - Uma outra questão: Os nomes João, Caio e Rillary devem acompanhar os responsáveis pelos sábados ou domingos, porém, APENAS UM no dia. Não tem necessidade de estar João, Caio e Rillary ou dois no mesmo dia. Por isso, apenas um
      - Entre os nomes João, Caio e Rillary, eles devem estar nos dias ${saturdayDates} (sábados) também, ou seja, acompanhando o Matheus.
      - Um outro ponto: os nomes Laura, Valentina e Lourdes são as servidoras mais novas. Logo, elas NÃO PODEM estar no mesmo dia, e devem estar acompanhando ou João, ou Caio, ou Rillary. 
      - A Laura deve estar nos dias ${saturdayDates} (sábados), ou seja, acompanhando o Matheus, seguido de João, Caio ou Rillary.
      - A Valentina e Lourdes podem estar em ambos os dias, tanto ${wednesdayDates}, quanto ${saturdayDates}.
      - Os demais nomes Cadu, Daniel, Carlos Henrique, Maria Vitória, Diana, Emanuelly, Maria Vitória, Ana Laura podem ser mais distribuídos
      - Use TODOS os nomes
      - Siga ESTRITAMENTE as regras acima

    5. Nessa escala, você deve seguir esse modelo: 
      Escala do mês da comunidade São José {nome do mês que esta no conteúdo do arquivo} (utilize CAPS LOCK)
        - {dia do mês} - {nome do dia do da semana} ({horário da missa}) 
          - Nome 1
          - Nome 2
          - Nome 3
          - Nome 4
          - Nome 5
    6. Retorne APENAS a escala desenvolvida e nada mais.
  `
}
