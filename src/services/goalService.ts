import { find, remove, save } from '@/db/db.ts'

let tableName = "goals"

export const getGoals = async () => {
    return await find(tableName, {})
}

export const removeGoals = async (id: any) => {
    return await remove(tableName, id)
}

export const saveGoals = async (title: string, cost: number) => {
    return await save(tableName, { id: Date.now(), title, cost })
}

export const formatGoals = (goal: any, freeMoney: number) => {
    goal["time"] = Math.ceil(Number(goal.cost) / freeMoney)
    return goal
}