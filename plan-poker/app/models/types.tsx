export interface CollectionCard {
  idCollectionCard: string; // ID da coleção de cartas
  nrCard: number; // Número da carta
  qtHour: number; // Quantidade de horas
  qtDay: number; // Quantidade de dias
}

export interface User {
  id: string;
  name: string;
  vote?: number; // Opcional, caso o usuário ainda não tenha votado
}

export interface ActiveUser {
  idUser: string;
  idRoom: string;
  nrVote: number | null;
  nmUser: string | string[] | null;
}

export interface Pages {
  title: string;
  component: string;
}
