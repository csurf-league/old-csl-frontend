import { browserStorage } from '.'

const HISTORY_MAX_LEN = 10
const LOCAL_HISTORY_KEY = 'localHistoryKey'

const localCache = {
  addHistory: (o: any) => {
    const arrHis = browserStorage.getItem(LOCAL_HISTORY_KEY)
      ? JSON.parse(browserStorage.getItem(LOCAL_HISTORY_KEY))
      : []

    if (arrHis.length >= HISTORY_MAX_LEN) {
      arrHis.splice(0, 1)
    }
    if (arrHis.map((i: any) => i.name).includes(o.name)) {
      arrHis.splice(arrHis.map((i: any) => i.name).indexOf(o.name), 1)
    }
    arrHis.push(o)
    browserStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(arrHis))
  },
  deleteHistory: (index: any) => {
    const arrHis = browserStorage.getItem(LOCAL_HISTORY_KEY)
      ? JSON.parse(browserStorage.getItem(LOCAL_HISTORY_KEY))
      : []
    arrHis.splice(index, 1)
    browserStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(arrHis))
  },
  getAllHistory: () => {
    return browserStorage.getItem(LOCAL_HISTORY_KEY) ? JSON.parse(browserStorage.getItem(LOCAL_HISTORY_KEY)) : []
  },
}

export default localCache
