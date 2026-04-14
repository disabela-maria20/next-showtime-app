interface NewsDescriptionProps {
  children: React.ReactNode
}

const Description = ({ children }: NewsDescriptionProps) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default Description
