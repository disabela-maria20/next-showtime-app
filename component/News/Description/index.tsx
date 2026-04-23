interface NewsDescriptionProps {
  children: React.ReactNode
}

const Description = ({ children }: NewsDescriptionProps) => {
  return (
    <div className="flex flex-col gap-2 md:gap-4">
      {children}
    </div>
  )
}

export default Description
