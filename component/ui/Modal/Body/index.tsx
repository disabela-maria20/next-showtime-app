import { useEffect } from 'react'

interface IModelBodyProps {
  children: React.ReactNode
  setOpen(): void
  className?: string
}

const Body: React.FC<IModelBodyProps> = ({
  children,
  setOpen,
  className
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [setOpen])

  return (
    <div className={`bg-neutral-800 rounded p-8 ${className}`}>
      {children}
      <button
        className={`absolute top-0 right-0 bg-transparent border-0 p-2 cursor-pointer`}
        onClick={setOpen}
        aria-label="Fechar"
      >
        <i className="pi pi-times text-white"></i>
      </button>
    </div>
  )
}

export default Body
