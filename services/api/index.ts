import axios from "axios"

export async function getUserLocation() {
    const res = await axios.get(`http://ip-api.com/json/`)
    return res.data
}