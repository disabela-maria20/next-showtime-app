

interface IModelTitleProps {
  children: React.ReactNode
}
const ModelTitle = ({ children }: IModelTitleProps) => {
  return <h2 className={"text-xl md:text-3xl font-bold text-white pb-4"}>{children}</h2>
}

export default ModelTitle
