import { handleMonthDates } from "./handle-month-dates";

export function handlePrompt(fileContent: string) {
    return `
  - Primeiro de tudo, formate esse conteúdo: ${ fileContent };

  - Depois, você deve separar TODOS os dias de missa da comunidade São José, apenas, que se encaixam nessas datas: ${ handleMonthDates() }

  - Em seguida, com base nesses dias, você deve se comportar como o coordenador da comunidade, e montar uma escala com os servidores para os dias de missa;
 
  - Nessa escala, você deve seguir esse modelo: 
      Escala do mês da comunidade São José {nome do mês que esta no conteúdo do arquivo} (utilize CAPS LOCK)

        - {dia do mês} - {nome do dia do da semana} ({horário da missa}) 
          - Nome 1
          - Nome 2
          ... , 
      com os seguintes nomes: ['Matheus', 'Wilton', 'João', 'Caio', 'Rillary', 'Cadu', 'Diana', 'Ana Laura', 'Emanuelly', 'Carlos Henrique', 'Lourdes', 'Valentina', 'Nichollas', 'Laura', 'Daniel']; colocando 5 nomes por dia;

  - Priorize o seguinte: 
    - O Matheus, o João e a Laura, SEMPRE aos sábados, e o Wilton às quartas; 
    - Os demais podem ser mais distribuídos, mas tente não repetir a mesma pessoa em datas consecutivas;
 
  - Não é necessário colocar Wilton e Matheus no mesmo dia.

  - João, Caio e Rillary NÃO podem estar no mesmo dia;

  - NÃO deixe faltar nomes na distribuição, e seja inclusivo.

  - NÃO deixe de colocar a Valentina, Laura e Lourdes, em algum dia. Mas elas não podem estar no mesmo dia. Intercale ela entre os dias

  - Como exemplo, você pode se basear nesse modelo que você já fez em testes anteriores: 
      Escala do m�s da comunidade S�o Jos� JUNHO

      - 1, S�bado (19h) 
          - Matheus
          - Ana Laura
          - Laura
          - Carlos Henrique
          - Rillary

      - 5, Quarta (19h) 
          - Wilton
          - Cadu
          - Valentina
          - Nichollas
          - Emanuelly

      - 8, S�bado (19h) 
          - Matheus
          - Jo�o
          - Maria Vitória
          - Daniel
          - Lourdes

      - 12, Quarta (19h) 
          - Wilton
          - Diana
          - Nichollas
          - Valentina
          - Caio

      - 15, S�bado (19h) 
          - Matheus
          - Rillary
          - Laura
          - Diana
          - Ana Laura

      - 19, Quarta (19h) 
          - Wilton
          - Lourdes
          - Cadu
          - Emanuelly
          - Carlos Henrique

      - 22, S�bado (19h) 
          - Matheus
          - Caio
          - Maria Vitória
          - Valentina
          - Nichollas

      - 26, Quarta (19h) 
          - Wilton
          - Lourdes
          - Ana Laura
          - Emanuelly
          - Carlos Henrique

      - 29, S�bado (19h) 
          - Matheus
          - Rillary
          - Laura
          - Daniel
          - Nichollas

      Observa��o: Foram utilizados todos os nomes fornecidos, priorizando as especifica��es mencionadas, com o cuidado de n�o repetir a mesma pessoa em datas seguidas.
`
} 