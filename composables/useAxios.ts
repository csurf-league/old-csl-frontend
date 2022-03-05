// useAxios()
export default function () {
    let { $axios } = useNuxtApp()
    return $axios()
}
