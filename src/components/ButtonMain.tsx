import Link from 'next/link'
const ButtonMain = ({ text, icon = null, onClick = null, className = '' }) => {
  return (
    <button onClick={onClick} className={className}>
      {icon && <div>{icon}</div>}
      <Link
        href={'/#'}
        rel="noreferrer noopener"
        className="bg-[#1d1d20] text-white hover:border-zinc-700 border border-transparent rounded-md px-4 py-2"
      >
        {text}
      </Link>
    </button>
  )
}

export default ButtonMain
