import { useSelector } from "react-redux"

function HomePage() {
  const theme=useSelector((state)=>state.settings.darkMode);
  return (
    <div className={`${!theme?"bg-zinc-900":"bg-zinc-50"} h-full`}></div>
  )
}

export default HomePage