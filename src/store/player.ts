import { create } from 'zustand'

type PlayerStore = {
  name: string
  race: string

  maxHP: number
  hp: number
  maxMana: number
  mana: number
  lifePoint: number

  str: number
  vit: number
  dex: number
  agi: number
  int: number

  str2: number
  vit2: number
  dex2: number
  agi2: number
  int2: number
  
  atk: number
  rdc: number
  acc: number
  def: number
  spd: number
  mag: number

  crit: number

  setName: (newName: string) => void
  setRace: (newRace: string) => void

  setHP: (value: number) => void
  setMana: (value: number) => void
  setLifePoint: (value: number) => void

  setStr: (value: number) => void
  setVit: (value: number) => void
  setDex: (value: number) => void
  setAgi: (value: number) => void
  setInt: (value: number) => void

  setStr2: (value: number) => void
  setVit2: (value: number) => void
  setDex2: (value: number) => void
  setAgi2: (value: number) => void
  setInt2: (value: number) => void
}

const increase = (value: number, every: number, increaseBy: number): number => {
    return Math.floor(value/ every) * increaseBy;
}

// TODO - this is god object, you should extract to
// stat, ability -> this two thing can stay in weapon and ammor too
// then we get all base, weapon, ammor then sum in this class

// TODO - create handler about max hp and max mana

// TODO - for more advance we can create readable file config to easy manipulate the stat calculation as designer
// but this is over engineering, So this is (Optional)
const useStore = create<PlayerStore>()((set) => ({
  name: "player1",
  race: "Human",

  maxHP: 1,
  hp: 1,
  maxMana: 1,
  mana: 1,
  lifePoint: 4,

  // setter value
  str: 0,
  vit: 0,
  dex: 0,
  agi: 0,
  int: 0,

  str2: 0,
  vit2: 0,
  dex2: 0,
  agi2: 0,
  int2: 0,
  
  // pre calculate value
  atk: -2,
  rdc: 0,
  acc: 0,
  def: 0,
  spd: 0,
  mag: -2,
  crit: 0,

  setName: (newName) => set((state) => ({ name: newName })),
  setRace: (newRace) => set((state) => ({ race: newRace})),

  setHP: (value) => set((state) => ({ hp: value,})),
  setMana: (value) => set((state) => ({ mana: value})),
  setLifePoint: (value) => set((state) => ({ lifePoint: value})),

  setStr: (value) => set((state) => ({ str: value, atk: increase(value + state.str2, 2, 1)})),
  setVit: (value) => set((state) => ({ vit: value, hp: increase(value + state.vit2, 2, 1), rdc: increase(value + state.vit2, 4, 1)})),
  setDex: (value) => set((state) => ({ dex: value, acc: increase(value + state.dex2, 2, 1), crit: increase(value + state.dex2, 4, 1)})),
  setAgi: (value) => set((state) => ({ agi: value, spd: value + state.agi2, def: increase(value + state.agi2, 2, 1)})),
  setInt: (value) => set((state) => ({ int: value, mana: increase(value + state.int2, 2, 1), mag: increase(value + state.int2, 2, 1)})),

  setStr2: (value) => set((state) => ({ str2: value, atk: increase(value + state.str, 2, 1)})),
  setVit2: (value) => set((state) => ({ vit2: value, hp: increase(value + state.vit, 2, 1), rdc: increase(value + state.vit, 4, 1)})),
  setDex2: (value) => set((state) => ({ dex2: value, acc: increase(value + state.dex, 2, 1), crit: increase(value + state.dex, 4, 1)})),
  setAgi2: (value) => set((state) => ({ agi2: value, spd: value + state.agi, def: increase(value + state.agi, 2, 1)})),
  setInt2: (value) => set((state) => ({ int2: value, mana: increase(value + state.int, 2, 1), mag: increase(value + state.int, 2, 1)})),
}))

export default useStore