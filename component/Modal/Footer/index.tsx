
interface IModelRoot {
  children: React.ReactNode
}
const Footer = ({children}: IModelRoot) => {
  return (
    <div className={`flex justify-end gap-4 mt-4`}>
      {children}
    </div>
  )
}

export default Footer
