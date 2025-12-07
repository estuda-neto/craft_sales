import Link from "next/link";
import Image from "next/image";
import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full text-white bg-gray-700 body-font">
      <div
        className="container flex flex-col flex-wrap px-5 py-24 mx-auto md:items-center lg:items-start md:flex-row md:flex-no-wrap">
        <div className="shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
          <Link href="https://github.com/estuda-neto" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center md:justify-start">
            <Image src="/default/logo_develop.png" width={64} height={64} alt="Logo do desenvolvedor" className=" w-24 h-24 md:w-32 md:h-32 rounded-lg grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-110" />
          </Link>
          <p className="mt-2 text-sm text-gray-500">Design, Code and Ship!</p>
          <div className="mt-4">
            <span className="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-start">
              <Link href={"#"} className="text-gray-500 cursor-pointer hover:text-gray-700">
                <FacebookIcon color="#6A7282" size={24} />
              </Link>
              <Link href={"#"} className="ml-3 text-gray-500 cursor-pointer hover:text-gray-700">
                <XIcon color="#6A7282" size={24} />
              </Link>
              <Link href={"#"} className="ml-3 text-gray-500 cursor-pointer hover:text-gray-700">
                <InstagramIcon color="#6A7282" size={24} />
              </Link>
              <Link href={"#"} className="ml-3 text-gray-500 cursor-pointer hover:text-gray-700">
                <LinkedinIcon color="#6A7282" size={24} />
              </Link>
            </span>
          </div>
        </div>
        <div className="flex flex-wrap grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
          <div className="w-full px-4 lg:w-1/4 md:w-1/2">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">About</h2>
            <nav className="mb-10 list-none">
              <li className="mt-3">
                <a className="text-gray-500 cursor-pointer hover:text-gray-900">Company</a>
              </li>
              <li className="mt-3">
                <a className="text-gray-500 cursor-pointer hover:text-gray-900">Careers</a>
              </li>
              <li className="mt-3">
                <a className="text-gray-500 cursor-pointer hover:text-gray-900">Blog</a>
              </li>
            </nav>
          </div>
          <div className="w-full px-4 lg:w-1/4 md:w-1/2">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">Support</h2>
            <nav className="mb-10 list-none">
              <li className="mt-3">
                <a className="text-gray-500 cursor-pointer hover:text-gray-900">Contact Support</a>
              </li>
              <li className="mt-3">
                <a className="text-gray-500 cursor-pointer hover:text-gray-900">Help Resources</a>
              </li>
              <li className="mt-3">
                <a className="text-gray-500 cursor-pointer hover:text-gray-900">Release Updates</a>
              </li>
            </nav>
          </div>
          <div className="w-full px-4 lg:w-1/4 md:w-1/2">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">Platform
            </h2>
            <nav className="mb-10 list-none">
              <li className="mt-3">
                <a className="text-gray-500 cursor-pointer hover:text-gray-900">Terms &amp; Privacy</a>
              </li>
              <li className="mt-3">
                <a className="text-gray-500 cursor-pointer hover:text-gray-900">Pricing</a>
              </li>
              <li className="mt-3">
                <a className="text-gray-500 cursor-pointer hover:text-gray-900">FAQ</a>
              </li>
            </nav>
          </div>
          <div className="w-full px-4 lg:w-1/4 md:w-1/2">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">Contact</h2>
            <nav className="mb-10 list-none">
              <li className="mt-3">
                <a className="text-gray-500 cursor-pointer hover:text-gray-900">Send a Message</a>
              </li>
              <li className="mt-3">
                <a className="text-gray-500 cursor-pointer hover:text-gray-900">Request a Quote</a>
              </li>
              <li className="mt-3">
                <a className="text-gray-500 cursor-pointer hover:text-gray-900">+123-456-7890</a>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-gray-800">
        <div className="container px-5 py-4 mx-auto">
          <p className="text-sm text-gray-700 capitalize xl:text-center">© 2025 All rights reserved </p>
        </div>
      </div>
    </footer>
  );
};
