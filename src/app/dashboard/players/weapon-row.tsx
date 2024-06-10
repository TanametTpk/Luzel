import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import useWeaponStore from "@/store/weapon"

interface Stat {
    [key: string]: StatHandler;
  }
  
  interface StatHandler {
    value: number;
    onChange: (value: number) => void
  }

export default function WeaponStatRow({
    name, // will be a page or nested layout
  }: {
    name: string
  }) {

  const {
    atk,
    rdc,
    acc,
    def,
    spd,
    mag,
    crit,

    setAtk,
    setRdc,
    setAcc,
    setDef,
    setSpd,
    setMag,
    setCrit
  } = useWeaponStore()

  const stats: Stat = {
    "Atk": {
        value: atk,
        onChange: setAtk,
        },
    "Rdc": {
        value: rdc,
        onChange: setRdc,
    },
    "Acc": {
        value: acc,
        onChange: setAcc,
    },
    "Def": {
        value: def,
        onChange: setDef,
    },
    "Spd": {
        value: spd,
        onChange: setSpd,
    },
    "Mag": {
        value: mag,
        onChange: setMag,
    },
    "Crit": {
        value: crit,
        onChange: setCrit,
    }
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
    </TableRow>
  )
}