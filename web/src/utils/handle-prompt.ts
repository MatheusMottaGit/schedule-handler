import { handleMonthDates } from "./handle-month-dates";

export function handlePrompt(fileContent: string) {
  return `
      - Primeiro de tudo, formate esse conteúdo: ${fileContent};

      - Depois, você deve separar TODOS os dias de missa da comunidade São José, apenas, que se encaixam nessas datas: ${handleMonthDates()}

      - Em seguida, você deve se comportar como o coordenador da comunidade, e montar uma escala com os servidores para os dias de missa;
    
      - Nessa escala, você deve seguir esse modelo: 
          Escala do mês da comunidade São José {nome do mês que esta no conteúdo do arquivo} (utilize CAPS LOCK)

            - {dia do mês} - {nome do dia do da semana} ({horário da missa}) 
              - Nome 1
              - Nome 2
              ... , 
          com os seguintes nomes: ['Matheus', 'Wilton', 'João', 'Caio', 'Rillary', 'Cadu', 'Diana', 'Ana Laura', 'Emanuelly', 'Carlos Henrique', 'Lourdes', 'Valentina', 'Nichollas', 'Laura', 'Daniel']; colocando 5 nomes por dia;

      - Como coordenador, você DEVE seguir as seguintes regras: 
        - Matheus, o João e a Laura, SEMPRE aos sábados, e o Wilton às quartas; 
        - Os demais podem ser mais distribuídos, mas tente não repetir a mesma pessoa em datas consecutivas;
        - Não é necessário colocar Wilton e Matheus no mesmo dia;
        - João, Caio e Rillary NÃO podem estar no mesmo dia;
        - NÃO deixe faltar nomes na distribuição;
        - NÃO deixe de colocar a Valentina e Lourdes, em algum dia. Mas elas não podem estar no mesmo dia. Intercale elas entre os dias;
        - Retorne APENAS a escala feita;
`;
}
