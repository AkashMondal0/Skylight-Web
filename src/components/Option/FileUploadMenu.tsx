import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const FileUploadMenu = ({
    children,
    data
}: {
    children: React.ReactNode,
    data: {
        label: string
        onClick: () => void
    }[]
}) => {
    return <DropdownMenu>
        <DropdownMenuTrigger>
            {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent className='mx-1'>
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {data.map((item, index) => { return <DropdownMenuItem key={index} onClick={item.onClick}>{item.label}</DropdownMenuItem> })}
        </DropdownMenuContent>
    </DropdownMenu>
}

export { FileUploadMenu }