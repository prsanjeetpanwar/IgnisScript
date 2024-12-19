import React from 'react'
import { Blocks } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='text-white  relative border-t bg-gray-800/50 mt-40'>
      <div className='absolute inset-x-0 -top-px h-px
      bg-gradient-to-r from bg-transparent via-gray-900 to-transparent
      '>
        <div className='max-w-7xl mx-auto px-4 py-8'>
              <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
                <div className='flex items-center gap-2 to-gray-400'>
            <Blocks className='size-5'/>
            <span>Built for developers, by prsanjeet panwar</span>
                </div>
                <div className='flex items-center gap-6'>
                  <Link href='/support' className='to-gray-400 hover:text-gray-300
                  transition-colors
                  '>
                  Support
                  </Link>
                  <Link href="/privacy" className="text-gray-400 hover:text-gray-300 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-gray-300 transition-colors">
              Terms
            </Link>
                </div>

              </div>
        </div>
        
        </div>
    </footer>
  )
}

export default Footer
