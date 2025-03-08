import { Loader2Icon } from "lucide-react"
import React from 'react'

function loading() {
  return (
      <div className="flex h-screen w-fill items-center justify-center">
          <Loader2Icon size={30} className="animate-spin storke-primary" />
    </div>
  )
}

export default loading