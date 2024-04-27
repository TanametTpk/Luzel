import { create } from 'zustand'

type PlayerStore = {
  name: string
  race: string

  hp: number
  mana: number

  str: number
  vit: number
  dex: number
  agi: number
  int: number
  
  atk: number
  rdc: number
  acc: number
  def: number
  spd: number
  mag: number

  reduceCriticalDifficulty: number

  setName: (newName: string) => void
  setRace: (newRace: string) => void

  setStr: (value: number) => void
  setVit: (value: number) => void
  setDex: (value: number) => void
  setAgi: (value: number) => void
  setInt: (value: number) => void
}

const increase = (value: number, every: number, increaseBy: number): number => {
    return Math.floor(value/ every) * increaseBy;
}

const useStore = create<PlayerStore>()((set) => ({
  name: "player1",
  race: "Human",

  hp: 0,
  mana: 0,

  str: 0,
  vit: 0,
  dex: 0,
  agi: 0,
  int: 0,
  
  atk: 0,
  rdc: 0,
  acc: 0,
  def: 0,
  spd: 0,
  mag: 0,

  // using for cache value
  reduceCriticalDifficulty: 0,

  setName: (newName) => set((state) => ({ name: newName })),
  setRace: (newRace) => set((state) => ({ race: newRace})),

  setStr: (value) => set((state) => ({ str: value, atk: increase(value, 2, 1)})),
  setVit: (value) => set((state) => ({ vit: value, hp: increase(value, 2, 1), rdc: increase(value, 4, 1)})),
  setDex: (value) => set((state) => ({ dex: value, acc: increase(value, 2, 1), reduceCriticalDifficulty: increase(value, 4, 1)})),
  setAgi: (value) => set((state) => ({ agi: value, spd: value, def: increase(value, 2, 1)})),
  setInt: (value) => set((state) => ({ int: value, mana: increase(value, 2, 1), mag: increase(value, 2, 1)})),
}))

export default useStore