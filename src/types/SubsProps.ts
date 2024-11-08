type SubscriptionProps = {
    id: number;              // Unikalny identyfikator subskrypcji
    name: string;            // Nazwa subskrypcji (np. "Miesięczna subskrypcja")
    description: string;     // Opis subskrypcji (np. co obejmuje, jakie korzyści)
    price: number;           // Cena subskrypcji w jednostkach waluty (np. 20,99)
    duration: string;        // Czas trwania subskrypcji (np. '1 miesiąc', '3 miesiące')
    img: string;             // Ścieżka do obrazka subskrypcji (np. obrazek przedstawiający plan subskrypcyjny)
    benefits: string[];      // Lista korzyści/subskrypcji (np. dostęp do ekskluzywnych treści)
  };
  
  export default SubscriptionProps;
  