'use client' // Os componentes de erro precisam ser Client Components

import { useEffect } from 'react'

export default function ErroApp({
  erroDetectado,
  tenteNovamente,
}: {
  erroDetectado: Error & { detalhes?: string }
  tenteNovamente: () => void
}) {
  useEffect(() => {
    // Reporte o erro para um serviço de log, se necessário
    console.error(erroDetectado)
  }, [erroDetectado])

  return (
    <div>
      <h2>Ops! Algo não saiu como esperávamos.</h2>
      <button onClick={() => tenteNovamente()}>Tentar novamente</button>
    </div>
  )
}