import type { MouseEventHandler } from 'react'

interface SpeakButtonProps {
  label: string
  hanziLabel?: string
  onClick: MouseEventHandler<HTMLButtonElement>
  className?: string
  icon?: 'speak' | 'slow'
  iconOnly?: boolean
}

const SpeakerIcon = ({ slow = false }: { slow?: boolean }) => {
  return (
    <span className="relative inline-flex h-4 w-4 items-center justify-center">
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="h-4 w-4 fill-none stroke-current"
        strokeWidth="1.6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <path d="M3 8.2h3.3L10.4 5v10l-4.1-3.2H3z" />
        <path d="M13 7.1c1.1.8 1.8 2 1.8 3.1s-.7 2.3-1.8 3.1" />
        {!slow ? (
          <path d="M15.1 5.4c1.7 1.2 2.9 2.9 2.9 4.8s-1.2 3.6-2.9 4.8" />
        ) : null}
      </svg>
      {slow ? (
        <span className="absolute -bottom-1.5 -right-1.5 text-[8px] font-semibold leading-none">
          ½
        </span>
      ) : null}
    </span>
  )
}

export const SpeakButton = ({
  label,
  hanziLabel = '讀',
  onClick,
  className,
  icon = 'speak',
  iconOnly = false
}: SpeakButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={iconOnly ? label : undefined}
      title={label}
      className={`inline-flex items-center justify-center text-[11px] uppercase tracking-[0.22em] text-[#24384f] transition ${iconOnly ? 'bg-transparent px-1.5 py-1.5 hover:text-[#8c2f22]' : 'border border-[#30455f] bg-[#f7eedf] px-3 py-2 hover:bg-[#24384f] hover:text-[#f5ead9]'} ${className ?? ''}`}
    >
      {iconOnly ? (
        <SpeakerIcon slow={icon === 'slow'} />
      ) : (
        <span className="flex items-center gap-2">
          <span>{hanziLabel}</span>
          <span>{label}</span>
        </span>
      )}
    </button>
  )
}
