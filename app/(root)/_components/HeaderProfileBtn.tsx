import { UserButton } from '@clerk/nextjs'
import { User } from '@clerk/nextjs/server'
import { User2 } from 'lucide-react'
import React from 'react'

const HeaderProfileBtn = () => {
  return (
    <div>
      <UserButton>
        <UserButton.MenuItems>
            <UserButton.Link
            label='Profile'
            labelIcon={<User2 className="size-4"/>}
            href='/profile'
            ></UserButton.Link>
        </UserButton.MenuItems>
      </UserButton>
    </div>
  )
}

export default HeaderProfileBtn
