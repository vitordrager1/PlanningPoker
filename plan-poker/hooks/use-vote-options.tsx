//USO PARA CLIENT SERVER
// import { useEffect, useState } from "react";
// import { db } from "@/services/firebase";
// import { collection, getDocs } from "firebase/firestore";

// // Hook para obter as opções de voto do Firestore
// export function useVoteOptions() {
//   const [voteOptions, setVoteOptions] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchVoteOptions = async () => {
//       try {
//         const snapshot = await getDocs(collection(db, "voteOptions"));
//         const voteOptions = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setVoteOptions(voteOptions);
//       } catch (error) {
//         console.error("Erro ao buscar voteOptions:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVoteOptions();
//   }, []);

//   return { voteOptions, loading };
// }

import { useEffect, useState } from "react";

export default function useVoteOptions() {
  const [voteOptions, setVoteOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/firebase/vote-options")
      .then((res) => res.json())
      .then((data) => setVoteOptions(data))
      .finally(() => setLoading(false));
  }, []);

  return { voteOptions, loading };
}
