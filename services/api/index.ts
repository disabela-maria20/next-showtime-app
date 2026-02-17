'use client'; 

import axios from "axios"

export async function getUserLocation() {
    const res = await axios.get(`https://ipinfo.io/json`)
    return res.data
}