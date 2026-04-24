
interface IModelContentProps {
  children: React.ReactNode
}

const ModelContent = ({ children }: IModelContentProps) => {
  return <div className="text-white">{children}</div>
}

export default ModelContent
