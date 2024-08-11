export const CirclePlus = (className?: string) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-plus"><circle cx={12} cy={12} r={10} /><path d="M8 12h8" /><path d="M12 8v8" /></svg>
export const EllipsisVertical = (className?: string) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-ellipsis-vertical ${className}`}><circle cx={12} cy={12} r={1} /><circle cx={12} cy={5} r={1} /><circle cx={12} cy={19} r={1} /></svg>
export const EllipsisHorizontal = (className?: string) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
    strokeLinecap="round" strokeLinejoin="round" className={"lucide lucide-ellipsis" + className}>
    <circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} />
</svg>