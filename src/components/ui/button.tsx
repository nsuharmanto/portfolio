import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { HTMLMotionProps } from 'framer-motion';
import * as React from 'react';


import { cn } from '@/lib/utils';



const buttonVariants = cva(
  'flex justify-center items-center shrink-0 disabled:pointer-events-none disabled:opacity-50 cursor-pointer outline-none disabled:text-neutral-800',
  {
    variants: {
      variant: {
        default:
          "w-full mt-2 rounded-lg bg-white py-3 font-semibold text-black shadow transition-all " +
          "hover:bg-[radial-gradient(circle_at_90%_10%,_#9436A7_10%,_#662474_50%,_#321139_100%)] " +
          "hover:text-white hover:shadow-lg",
      },
      size: {
        default: 'h-11 px-10.5',
        icon: 'h-11 w-11 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonProps = HTMLMotionProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  if (asChild) {
    // Kirim hanya props HTML standar ke Slot
    const htmlProps = { ...props } as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <Slot
        data-slot='button'
        className={cn(buttonVariants({ variant, size, className }))}
        {...htmlProps}
      />
    );
  }
  return (
    <motion.button
  data-slot='button'
  className={cn(buttonVariants({ variant, size, className }))}
  whileHover={{
    scale: 1.03,
    boxShadow: '0 8px 40px 0 rgba(76,29,149,0.35), 0 1.5px 6px 0 rgba(0,0,0,0.15)',
    y: -2,
  }}
  whileTap={{ scale: 0.98, y: 0 }}
  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
  {...props}
/>
  );
}

export { Button, buttonVariants };