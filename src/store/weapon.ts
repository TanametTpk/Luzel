import { create } from 'zustand'

type WeaponStore = {
  atk: number
  rdc: number
  acc: number
  def: number
  spd: number
  mag: number
  crit: number

  setAtk: (value: number) => void
  setRdc: (value: number) => void
  setAcc: (value: number) => void
  setDef: (value: number) => void
  setSpd: (value: number) => void
  setMag: (value: number) => void
  setCrit: (value: number) => void
}

const useStore = create<WeaponStore>()((set) => ({
  atk: 0,
  rdc: 0,
  acc: 0,
  def: 0,
  spd: 0,
  mag: 0,
  crit: 0,

  setAtk: (value) => set((state) => ({ atk: value,})),
  setRdc: (value) => set((state) => ({ rdc: value})),
  setAcc: (value) => set((state) => ({ acc: value})),
  setDef: (value) => set((state) => ({ def: value})),
  setSpd: (value) => set((state) => ({ spd: value})),
  setMag: (value) => set((state) => ({ mag: value})),
  setCrit: (value) => set((state) => ({ crit: value})),
}))

export default useStore