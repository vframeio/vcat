import session from '../session'
import { store } from '../store'
import { imageUrl } from '../util'

export const getSavedUrls = () => {
  const saved = getSavedFromStore()
  return Object.keys(saved).sort().map(key => {
    const { verified, hash, frames } = saved[key]
    return Object.keys(frames).map(frame => (frames[frame] && imageUrl(verified, hash, frame))).filter(url => !!url)
  }).reduce((a, b) => ((b && b.length) ? a.concat(b) : a), [])
}

export const getSavedCount = saved => {
  saved = saved || getSavedFromStore()
  return Object.keys(saved).sort().map(key => {
    const { frames } = saved[key]
    return Object.keys(frames).filter(frame => frames[frame]).filter(f => !!f).length
  }).reduce((a, b) => (a + b), 0)
}

export const getSavedFromStore = () => store.getState().review.saved
export const getCountFromStore = () => store.getState().review.count || 0

export const getSaved = () => {
  try {
    return JSON.parse(session('saved')) || {}
  } catch (e) {
    console.log('error getting saved!', e)
    return {}
  }
}

export const setSaved = (saved) => {
  try {
    session('saved', JSON.stringify(saved))
  } catch (e) {
    console.log('error setting saved!', e)
  }
}
