import React from 'react'
import {Input} from "@heroui/react";
import {Button} from "@heroui/react";

export default function Register() {
  return (
  
    <div className="my-10">
       <div className="w-2/3 mx-auto grid grid-cols-2 gap-4">
         <Input validate="bordered" className='col-span-2' label="Name" type="name" />
         <Input validate="bordered" className='col-span-2' label="Email" type="email" />
         <Input validate="bordered" className='col-span-1' label="Password" type="password" />
         <Input validate="bordered" className='col-span-1' label="Confirm-Password" type="password" />
         <Input validate="bordered" className='col-span-2' label="Phone" type="tel" />
         <Button className='col-col-span-2' color="primary">Register</Button> 

       </div>
      </div>

  )
}
