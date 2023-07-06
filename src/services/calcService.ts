import { find, save, update, remove, findById } from "@/db/db";

let tableName = "calcs";

export const getCalcs = async () => {
    let calcs = await find(tableName, {})
    return transformData(calcs.data)
}

export const findCalcById = async (id: any) => {
    let calc = await findById(tableName, id)
    return transformData([calc.data])
}

export const filterCalcs = async (filters: any) => {
    return await find(tableName, filters)
}

export interface calcsModel {
    id?: any,
    title: string,
    spend: boolean,
    recurrent: boolean,
    cost: number,
    dayOfMonthRecurrent?: number,
}

export class Calc {

    id = Date.now()
    title = ''
    spend = true
    recurrent = false
    cost = 0
    dayOfMonthRecurrent = 1

    constructor(title: string, spend: boolean, recurrent: boolean, cost: number, dayOfMonthRecurrent: number,) {
        this.title = title
        this.spend = spend
        this.recurrent = recurrent
        this.cost = cost
        this.dayOfMonthRecurrent = dayOfMonthRecurrent
    }

    async save() {
        let dataSerialized = this.serializer()
        let res = await save(tableName, dataSerialized)
        return transformData(res)
    }

    async update({ title = this.title, spend = this.spend, recurrent = this.recurrent, 
        cost = this.cost, dayOfMonthRecurrent = this.dayOfMonthRecurrent }) {

        this.title = title
        this.spend = spend
        this.recurrent = recurrent
        this.cost = cost
        this.dayOfMonthRecurrent = dayOfMonthRecurrent

        let dataSerialized = this.serializer()
        let res = await update(tableName, this.id, dataSerialized)
        return transformData(res)
    }

    async remove() {
        let res = await remove(tableName, this.id)
        return transformData(res)
    }

    setId(id: any) {
        this.id = id
    }

    serializer() {
        return {
            id: this.id,
            title: this.title,
            spend: this.spend,
            recurrent: this.recurrent,
            cost: this.cost,
            dayOfMonthRecurrent: this.dayOfMonthRecurrent,
        }
    }
}

const transformData = (data: Array<any>) => {
    return data.map((calc: calcsModel) => {
        let doc = new Calc(calc.title, calc.spend, calc.recurrent, calc.cost, calc.dayOfMonthRecurrent || 0)
        doc.setId(calc.id)
        return doc
    })
}