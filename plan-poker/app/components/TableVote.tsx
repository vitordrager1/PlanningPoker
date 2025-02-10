"use client";
import { useRouter } from "next/navigation";
import updateActiveUsersRoom from "@/services/rooms/rooms-firebase";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Box,
  Typography,
  Input,
  TextField,
} from "@mui/material";
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../../services/firebase";
import { useEffect, useState } from "react";

export default function TableVote() {}
