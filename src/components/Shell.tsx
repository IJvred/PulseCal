import { PropsWithChildren } from 'react'
export default function Shell({ children }: PropsWithChildren) {
  return (
    <div className="h-screen w-screen grid grid-cols-[260px_1fr] grid-rows-[56px_1fr] gap-3 p-3 bg-bg text-ink">
      {children}
    </div>
  )
}
