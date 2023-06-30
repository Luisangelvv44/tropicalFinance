import { Storage } from '@ionic/storage';

let store = new Storage();
await store.create();

export async function save(table: string, data: any) {
    let rows = await store.get(table);
    if (!rows || !rows.length) { rows = [] }
    rows.push(data)
    return await store.set(table, rows);
}

export async function saveList(table: string, datas: Array<any>) {
    let rows = await store.get(table);
    if (!rows || !rows.length) { rows = [] }
    rows = [...rows, ...datas]
    return await store.set(table, rows);
}

export async function find(table: string, filters: any) {
    let rows = await store.get(table);
    if (rows && rows.length) {
        for (const filter in filters) {
            rows = rows.filter((row: any) => row[filter] == filters[filter])
        }
    }
    return buildMessage("find", rows || [])
}

export async function findById(table: string, id: any) {
    let rows = await store.get(table);
    let doc = {}
    if (rows && rows.length) {
        doc = rows.find((row: any) => row.id == id)
    }
    return buildMessage('find', doc || {})
}

export async function update(table: string, id: any, updateData: any) {
    let doc = (await findById(table, id)).data
    await remove(table, id)
    for (const updateField in updateData) {
        doc[updateField] = updateData[updateField]
    }
    return await save(table, doc)
}

export async function findAndUpdate(table: string, filters: any, updateData: any) {
    let rows = (await find(table, filters)).data
    let removeIds: Array<any> = []
    for (const updateField in updateData) {
        rows = rows.map((row: any) => {
            removeIds.push(row.id)
            row[updateField] = updateData[updateField]
            return row;
        })
    }
    await removeList(table, removeIds)
    return await saveList(table, rows)
}

export async function remove(table: string, id: any) {
    let rows = (await find(table, {})).data
    rows = rows.filter((row: any) => row.id != id)
    return await store.set(table, rows);
}

export async function removeList(table: string, ids: Array<any>) {
    let rows = (await find(table, {})).data
    rows = rows.filter((row: any) => !ids.includes(row.id))
    return await store.set(table, rows);
}

function buildMessage(id: string, data: any) {
    const message: any = {
        'save': 'Guardado con éxito.',
        'find': 'Datos encontrados.',
    }

    return {
        message: message[id],
        status: 200,
        success: true,
        data
    }   
}