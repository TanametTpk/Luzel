"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  PlusCircle,
  Upload,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import StatRow from "./stat-row"
import SideCard from "./aside-card"
import { Progress } from "@/components/ui/progress"
import usePlayerStore from "@/store/player"
import useWeaponStore from "@/store/weapon"
import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import WeaponStatRow from "./weapon-row"

export default function Dashboard() {
  const {
    name,
    race,
    hp,
    mana,
    dex,
    acc,
    atk,
    crit,
    mag,
    setName,
  } = usePlayerStore()

  const [
    weaponAtk,
    weaponRdc,
    weaponAcc,
    weaponDef,
    weaponSpd,
    WeaponMag,
    WeaponCrit
  ] = useWeaponStore((state) => [state.atk, state.rdc, state.acc, state.def, state.spd, state.mag, state.crit])
  const [ourAtk, setOurAtk] = useState<number>(0)
  const [ourAcc, setOurAcc] = useState<number>(0)
  const [ourMag, setOurMag] = useState<number>(0)
  const [ourMagAtk, setOurMagAtk] = useState<number>(0)
  const [ourMagAcc, setOurMagAcc] = useState<number>(0)
  const [ourCrit, setOurCrit] = useState<number>(0)
  const [ourMagCritRate, setOurMagCritRate] = useState<number>(0)
  const [otherDef, setOtherDef] = useState<number>(0)
  const [otherRdc, setOtherRdc] = useState<number>(0)
  const [otherMacDef, setOtherMacDef] = useState<number>(0)
  const [otherMacRdc, setOtherMacRdc] = useState<number>(0)
  const [isModalOpen, setOpenModal] = useState<boolean>(false)
  const [attackResult, setAttackResult] = useState<boolean>(false)
  const [critResult, setCritResult] = useState<boolean>(false)
  const [attackDMG, setAttackDMG] = useState<number>(0)
  const [successRate, setSuccessRate] = useState<number>(0)
  const [critRate, setCritRate] = useState<number>(0)

  const calculateAttack = () => {
    let chanceUnit = acc + ourAcc + weaponAcc - otherDef;
    let critChance = (1 + crit + WeaponCrit + ourCrit) * 0.05
    critChance = Math.max(0, Math.min(critChance, 1))
    let isCrit = Math.random() < critChance
    let baseDmg = atk + weaponAtk + ourAtk
    if (isCrit) baseDmg *= 2

    let dmg = baseDmg - otherRdc;
    let hitChance = 0.5 + chanceUnit * 0.05;
    hitChance = Math.max(0, Math.min(hitChance, 1))

    setSuccessRate(Math.round(hitChance * 100))
    setCritRate(Math.round(critChance * 100))
    setAttackResult(isCrit || Math.random() < hitChance)
    setCritResult(isCrit)
    setAttackDMG(dmg)
    setOpenModal(true)
  }

  const calculateSpellAttack = () => {
    let chanceUnit = mag + ourMag + ourMagAcc - otherMacDef;
    let critChance = (1 + crit + ourMagCritRate) * 0.05
    critChance = Math.max(0, Math.min(critChance, 1))
    let isCrit = Math.random() < critChance
    let baseDmg = mag + ourMag + ourMagAtk
    if (isCrit) baseDmg *= 2

    let dmg = baseDmg - otherMacRdc;
    let hitChance = 0.5 + chanceUnit * 0.05;
    hitChance = Math.max(0, Math.min(hitChance, 1))

    setSuccessRate(Math.round(hitChance * 100))
    setCritRate(Math.round(critChance * 100))
    setAttackResult(isCrit || Math.random() < hitChance)
    setCritResult(isCrit)
    setAttackDMG(dmg)
    setOpenModal(true)
  }

  return (
    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
      <div className="flex items-center gap-4">
        {/* <Button variant="outline" size="icon" className="h-7 w-7">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button> */}
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Player Info
        </h1>
        {/* <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant="outline" size="sm">
            Discard
          </Button>
          <Button size="sm">Save Player</Button>
        </div> */}
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          {/* <Card x-chunk="dashboard-07-chunk-0">
            <CardHeader>
              <CardTitle className="flex gap-2">
                <div>{name}</div>
                <Badge variant="outline" className="ml-auto sm:ml-0">
                  {race}
                </Badge>
              </CardTitle>
              <CardDescription>
                Player Information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    className="w-full"
                    defaultValue="player1"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                <Card x-chunk="dashboard-01-chunk-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        HP
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{hp}</div>
                      <p className="text-xs text-muted-foreground">
                        Health Point
                      </p>
                    </CardContent>
                  </Card>

                  <Card x-chunk="dashboard-01-chunk-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        MP
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{mana}</div>
                      <p className="text-xs text-muted-foreground">
                        Mana Point
                      </p>
                    </CardContent>
                  </Card>

                  <Card x-chunk="dashboard-01-chunk-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Gold
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">20</div>
                      <p className="text-xs text-muted-foreground">
                      We are rich
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-3">
                  <Card x-chunk="dashboard-05-chunk-1">
                    <CardHeader className="pb-2">
                      <CardDescription>EXP</CardDescription>
                      <CardTitle className="text-4xl">1/2</CardTitle>
                    </CardHeader>
                    <CardFooter>
                      <Progress value={25} aria-label="25% increase" />
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card> */}
          <Card x-chunk="dashboard-07-chunk-1">
            <CardHeader>
              <CardTitle>Attribute</CardTitle>
              <CardDescription>
                Attributes stat of player
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Type</TableHead>
                    <TableHead>Unit1</TableHead>
                    <TableHead>Unit2</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {["Str", "Vit", "Dex", "Agi", "Int"].map((value: string, index: number) =>
                    <StatRow name={value} key={index} />
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card x-chunk="dashboard-07-chunk-1">
            <CardHeader>
              <CardTitle>Equipment Stat</CardTitle>
              <CardDescription>
              Equipment stat of player
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Type</TableHead>
                    <TableHead>Unit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {["Atk", "Rdc", "Acc", "Def", "Spd", "Mag", "Crit"].map((value: string, index: number) =>
                    <WeaponStatRow name={value} key={index} />
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card x-chunk="dashboard-07-chunk-2">
            <CardHeader>
              <CardTitle>Battle Helper (Physical)</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <div className="grid gap-6 sm:grid-cols-3">
                <div className="grid gap-3">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger
                      id="category"
                      aria-label="Select category"
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="electronics">
                        Electronics
                      </SelectItem>
                      <SelectItem value="accessories">
                        Accessories
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="subcategory">
                    Subcategory (optional)
                  </Label>
                  <Select>
                    <SelectTrigger
                      id="subcategory"
                      aria-label="Select subcategory"
                    >
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="t-shirts">T-Shirts</SelectItem>
                      <SelectItem value="hoodies">Hoodies</SelectItem>
                      <SelectItem value="sweatshirts">
                        Sweatshirts
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div> */}
              <Table>
                <TableHeader>
                  <TableRow>
                      <TableHead className="w-[100px]">Type</TableHead>
                      <TableHead>Unit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                  <TableRow>
                    <TableCell className="font-semibold">
                     buff atk
                    </TableCell>
                    <TableCell>
                        <Label htmlFor="add-unit" className="sr-only">
                          Unit
                        </Label>
                        <Input
                          id="add-unit"
                          type="number"
                          defaultValue={0}
                          value={ourAtk}
                          onChange={(e) => setOurAtk(Number.parseFloat(e.target.value))}
                        />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">
                      buff acc
                    </TableCell>
                    <TableCell>
                        <Label htmlFor="add-unit" className="sr-only">
                          Unit
                        </Label>
                        <Input
                          id="add-unit"
                          type="number"
                          defaultValue={0}
                          value={ourAcc}
                          onChange={(e) => setOurAcc(Number.parseFloat(e.target.value))}
                        />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">
                      buff crit
                    </TableCell>
                    <TableCell>
                        <Label htmlFor="add-unit" className="sr-only">
                          Unit
                        </Label>
                        <Input
                          id="add-unit"
                          type="number"
                          defaultValue={0}
                          value={ourCrit}
                          onChange={(e) => setOurCrit(Number.parseFloat(e.target.value))}
                        />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">
                      target&apos;s def
                    </TableCell>
                    <TableCell>
                        <Label htmlFor="add-unit" className="sr-only">
                          Unit
                        </Label>
                        <Input
                          id="add-unit"
                          type="number"
                          defaultValue={0}
                          value={otherDef}
                          onChange={(e) => setOtherDef(Number.parseFloat(e.target.value))}
                        />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">
                      target&apos;s rdc
                    </TableCell>
                    <TableCell>
                        <Label htmlFor="add-unit" className="sr-only">
                          Unit
                        </Label>
                        <Input
                          id="add-unit"
                          type="number"
                          defaultValue={0}
                          value={otherRdc}
                          onChange={(e) => setOtherRdc(Number.parseFloat(e.target.value))}
                        />
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableFooter>
                  <div className="flex items-center justify-center pt-4">
                    <Button size="sm" onClick={calculateAttack}>
                      Calculate
                    </Button>
                  </div>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>

          <Card x-chunk="dashboard-07-chunk-2">
            <CardHeader>
              <CardTitle>Battle Helper (Spell)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                      <TableHead className="w-[100px]">Type</TableHead>
                      <TableHead>Unit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                  <TableRow>
                    <TableCell className="font-semibold">
                     buff total Mag
                    </TableCell>
                    <TableCell>
                        <Label htmlFor="add-unit" className="sr-only">
                          Unit
                        </Label>
                        <Input
                          id="add-unit"
                          type="number"
                          defaultValue={0}
                          value={ourMag}
                          onChange={(e) => setOurMag(Number.parseFloat(e.target.value))}
                        />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">
                     buff mag atk
                    </TableCell>
                    <TableCell>
                        <Label htmlFor="add-unit" className="sr-only">
                          Unit
                        </Label>
                        <Input
                          id="add-unit"
                          type="number"
                          defaultValue={0}
                          value={ourMagAtk}
                          onChange={(e) => setOurMagAtk(Number.parseFloat(e.target.value))}
                        />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">
                     buff mag acc
                    </TableCell>
                    <TableCell>
                        <Label htmlFor="add-unit" className="sr-only">
                          Unit
                        </Label>
                        <Input
                          id="add-unit"
                          type="number"
                          defaultValue={0}
                          value={ourMagAcc}
                          onChange={(e) => setOurMagAcc(Number.parseFloat(e.target.value))}
                        />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">
                      buff crit
                    </TableCell>
                    <TableCell>
                        <Label htmlFor="add-unit" className="sr-only">
                          Unit
                        </Label>
                        <Input
                          id="add-unit"
                          type="number"
                          defaultValue={0}
                          value={ourMagCritRate}
                          onChange={(e) => setOurMagCritRate(Number.parseFloat(e.target.value))}
                        />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">
                    target&apos;s def
                    </TableCell>
                    <TableCell>
                        <Label htmlFor="add-unit" className="sr-only">
                          Unit
                        </Label>
                        <Input
                          id="add-unit"
                          type="number"
                          defaultValue={0}
                          value={otherMacDef}
                          onChange={(e) => setOtherMacDef(Number.parseFloat(e.target.value))}
                        />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">
                      target&apos;s rdc
                    </TableCell>
                    <TableCell>
                        <Label htmlFor="add-unit" className="sr-only">
                          Unit
                        </Label>
                        <Input
                          id="add-unit"
                          type="number"
                          defaultValue={0}
                          value={otherMacRdc}
                          onChange={(e) => setOtherMacRdc(Number.parseFloat(e.target.value))}
                        />
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableFooter>
                  <div className="flex items-center justify-center pt-4">
                    <Button size="sm" onClick={calculateSpellAttack}>
                      Calculate
                    </Button>
                  </div>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </div>
        <Dialog open={isModalOpen} modal defaultOpen={isModalOpen} onOpenChange={(value) => setOpenModal(value)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader/>
            <div className="grid gap-4 py-4 justify-center items-center text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                Attack {attackResult ? "Successed" : "Failed"} (rate:{successRate}%, crit:{critRate}%)
              </h3>
              <p className="text-sm text-muted-foreground">
                You attack with {attackResult ? attackDMG : 0}{critResult ? " Critical!" : ""}
              </p>
              <Button className="mt-4" onClick={()=> setOpenModal(false)}>OK</Button>
            </div>
            <DialogFooter/>
          </DialogContent>
        </Dialog>

        <SideCard />
      </div>
      <div className="flex items-center justify-center gap-2 md:hidden">
        <Button variant="outline" size="sm">
          Discard
        </Button>
        <Button size="sm">Save Product</Button>
      </div>
    </div>
  )
}