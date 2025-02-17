import { OverridableStringUnion } from "@mui/types";
import { AlertColor } from "@mui/material";
import { AlertPropsColorOverrides } from "@mui/material";
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

export interface ModalEnterRoomProps {
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
}
export interface AlertProps {
  title?: string;
  message?: string;
  route?: string;
  severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
  color: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
}

export interface IMenuItem {
  title: string;
  path: string;
  show: boolean;
  modal?: string;
}
