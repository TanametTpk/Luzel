import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  TableCell,
  TableRow,
} from "@/components/ui/table"

export default function StatRow({
    name, // will be a page or nested layout
  }: {
    name: string
  }) {
  return (
    <TableRow>
        <TableCell className="font-semibold">
          {name}
        </TableCell>
        <TableCell>
            <Label htmlFor="ori-unit" className="sr-only">
              Original Unit
            </Label>
            <Input
            id="ori-unit"
            type="number"
            defaultValue="100"
            />
        </TableCell>
        <TableCell>
            <Label htmlFor="add-unit" className="sr-only">
              Unit
            </Label>
            <Input
            id="add-unit"
            type="number"
            defaultValue="1"
            />
        </TableCell>
    </TableRow>
  )
}