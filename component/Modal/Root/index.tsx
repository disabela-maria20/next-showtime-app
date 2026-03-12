interface IModelRoot {
  children: React.ReactNode
}

const Root = ({ children }: IModelRoot) => {
  return <section className="fixed top-0 left-0 w-full h-full z-50 bg-black/50 flex justify-center items-center">{children}</section>
}

export default Root
