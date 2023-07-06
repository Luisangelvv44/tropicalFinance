import { find, update } from '@/db/db.ts'

let tableName = "configuration"

export const saveAction = async (data: ConfigurationModel) => {
    if (!data.id) data.id = Date.now();
    return await update(tableName, data.id, data)
}

export const getAction = async (filters: any) => {
    return await find(tableName, filters)
}

export interface ConfigurationModel {
    id: any,
    name: string,
    salary: number,
    cunts: number,
    savings: number,
}