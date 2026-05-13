import type { ButtonHTMLAttributes, HTMLAttributes, PropsWithChildren } from 'react'

const merge = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(' ')

export const ScreenShell = ({
  children,
  className
}: PropsWithChildren<{ className?: string }>) => (
  <div
    className={merge(
      'mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-8',
      className
    )}
  >
    <div className="flex flex-1 flex-col gap-4">{children}</div>
    <footer className="mt-2 px-1 text-center text-[10px] uppercase tracking-[0.2em] text-[#7b746b]">
      創建者 / Created by{' '}
      <a
        href="https://github.com/jeremyrayjewell"
        target="_blank"
        rel="noreferrer"
        className="text-[#5b6f84] underline decoration-[#8d8374] underline-offset-2 transition hover:text-[#24384f]"
      >
        JRJ
      </a>{' '}
      2026
    </footer>
  </div>
)

export const Panel = ({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
  <div
    className={merge(
      'border border-[#30455f] bg-[#f7eedf] text-[#241f1a]',
      className
    )}
    {...props}
  >
    {children}
  </div>
)

export const ActionButton = ({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={merge(
      'inline-flex min-h-12 items-center justify-center border border-[#8c2f22] bg-[#8c2f22] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#f5ead9] transition hover:bg-[#24384f] hover:border-[#24384f] disabled:cursor-not-allowed disabled:opacity-40',
      className
    )}
    {...props}
  />
)
