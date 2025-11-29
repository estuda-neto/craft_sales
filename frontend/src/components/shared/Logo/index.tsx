import Link from 'next/link'
import { oleoScript } from '@/src/utils/fonts';

export const Logo = () => (
  <Link href="/" className="flex items-center cursor-pointer">
    <div className="bg-[#7d4c32] rounded-full py-1 px-2">
      <span className={`${oleoScript.className} text-white italic text-lg`}>
        Mercadão
      </span>
    </div>
    <span className={`${oleoScript.className} ml-2 text-black text-lg`}>
      do Artesanado
    </span>
  </Link>
)
