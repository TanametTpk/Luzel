import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Copy, Truck, MoreVertical, CreditCard, ChevronLeft, ChevronRight } from "lucide-react"
import usePlayerStore from "@/store/player"
import useWeaponStore from "@/store/weapon"

interface Ability {
    [key: string]: number;
  }

export default function AsideCard() {
   const {
    atk,
    rdc,
    acc,
    def,
    spd,
    mag
   } = usePlayerStore()

   const [
    weaponAtk,
    weaponRdc,
    weaponAcc,
    weaponDef,
    weaponSpd,
    WeaponMag,
  ] = useWeaponStore((state) => [state.atk, state.rdc, state.acc, state.def, state.spd, state.mag])

   const abilities: Ability = {
    "Atk": atk,
    "Rdc": rdc,
    "Acc": acc,
    "Def": def,
    "Spd": spd,
    "Mag": mag,
  }

  const weaponAbilities: Ability = {
    "Atk": weaponAtk,
    "Rdc": weaponRdc,
    "Acc": weaponAcc,
    "Def": weaponDef,
    "Spd": weaponSpd,
    "Mag": WeaponMag,
  }

  return (
    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
        {/* <Card x-chunk="dashboard-07-chunk-3">
            <CardHeader>
                <CardTitle>Product Status</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="status">Status</Label>
                    <Select>
                    <SelectTrigger id="status" aria-label="Select status">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                </div>
            </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-5">
            <CardHeader>
                <CardTitle>Archive Product</CardTitle>
                <CardDescription>
                Lipsum dolor sit amet, consectetur adipiscing elit.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div></div>
                <Button size="sm" variant="secondary">
                Archive Product
                </Button>
            </CardContent>
        </Card> */}
        <Card
            className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
        >
            <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                        Ability
                    </CardTitle>
                    <CardDescription>Abilities stat of player</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                    <div className="font-semibold">Base</div>
                    <ul className="grid gap-3">
                        {
                            ["Atk", "Rdc", "Acc", "Def", "Spd", "Mag"].map((name, index) =>
                                <li key={index} className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        {name}
                                    </span>
                                    <span>{abilities[name]}</span>
                                </li>
                            )
                    }
                    </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                    <div className="font-semibold">Weapon</div>
                    <ul className="grid gap-3">
                        {
                            ["Atk", "Rdc", "Acc", "Def", "Spd", "Mag"].map((name, index) =>
                                <li key={index} className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        {name}
                                    </span>
                                    <span>{weaponAbilities[name]}</span>
                                </li>
                            )
                    }
                    </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                    <div className="font-semibold">Total</div>
                    <ul className="grid gap-3">
                        {
                            ["Atk", "Rdc", "Acc", "Def", "Spd", "Mag"].map((name, index) =>
                                <li key={index} className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        {name}
                                    </span>
                                    <span>{abilities[name] + weaponAbilities[name]}</span>
                                </li>
                            )
                    }
                    </ul>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}