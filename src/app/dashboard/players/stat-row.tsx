import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import usePlayerStore from "@/store/player"
import { Table } from "lucide-react";

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

    str2,
    vit2,
    dex2,
    agi2,
    int2,

    setStr,
    setVit,
    setDex,
    setAgi,
    setInt,

    setStr2,
    setVit2,
    setDex2,
    setAgi2,
    setInt2,
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

  const stats2: Stat = {
    "Str": {
      value: str2,
      onChange: setStr2,
    },
    "Vit": {
      value: vit2,
      onChange: setVit2,
    },
    "Dex": {
      value: dex2,
      onChange: setDex2,
    },
    "Agi": {
      value: agi2,
      onChange: setAgi2,
    },
    "Int": {
      value: int2,
      onChange: setInt2,
    },
  }

  return (
    <TableRow>
        <TableCell className="font-semibold">
          {name}
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
        <TableCell>
            <Label htmlFor="add-unit" className="sr-only">
              Unit2
            </Label>
            <Input
              id="add-unit"
              type="number"
              defaultValue={0}
              value={stats2[name].value}
              onChange={(e) => stats2[name].onChange(Number.parseFloat(e.target.value))}
            />
        </TableCell>
    </TableRow>
  )
}