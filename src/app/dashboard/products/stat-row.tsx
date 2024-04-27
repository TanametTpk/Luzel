import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import usePlayerStore from "@/store/player"

interface Stat {
  [key: string]: StatHandler;
}

interface StatHandler {
  value: number;
  onChange: (value: number) => void
}

export default function StatRow({
    name, // will be a page or nested layout
  }: {
    name: string
  }) {

  const {
    str,
    vit,
    dex,
    agi,
    int,

    setStr,
    setVit,
    setDex,
    setAgi,
    setInt,
  } = usePlayerStore()

  const stats: Stat = {
    "Str": {
      value: str,
      onChange: setStr,
    },
    "Vit": {
      value: vit,
      onChange: setVit,
    },
    "Dex": {
      value: dex,
      onChange: setDex,
    },
    "Agi": {
      value: agi,
      onChange: setAgi,
    },
    "Int": {
      value: int,
      onChange: setInt,
    },
  }

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
              defaultValue={0}
              value={stats[name].value}
              onChange={(e) => stats[name].onChange(Number.parseFloat(e.target.value))}
            />
        </TableCell>
    </TableRow>
  )
}