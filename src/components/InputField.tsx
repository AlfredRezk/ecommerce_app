'use client'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
import { EyeOff, Eye } from 'lucide-react'

interface formInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any
  label: string
  type?: 'text' | 'password' | 'email' | 'number'
  placeholder?: string
  name: string
  disabled?: boolean
  className?: string
}

export default function InputField({
  form,
  label,
  type = 'text',
  placeholder,
  name,
  disabled,
}: formInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='relative'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              disabled={disabled}
              type={
                type === 'password'
                  ? showPassword
                    ? 'text'
                    : 'password'
                  : type
              }
            />
          </FormControl>

          <Button
            size='sm'
            className='rounded-full bg-transparent text-foreground-muted hover:bg-transparent flex justify-center items-center absolute top-7 right-2 cursor-pointer'
            onClick={() => setShowPassword((prev) => !prev)}
            type='button'
          >
            {type === 'password' && showPassword && <EyeOff size={20} />}
            {type === 'password' && !showPassword && <Eye size={20} />}
          </Button>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
