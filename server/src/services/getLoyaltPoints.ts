import axios from "axios"

interface GetLoyaltPointsResponse {
    data: any[],
    ganhos: number,
    resgatados: number,
    saldo: number
}
export default async function getLoyaltPoints(cpf: string): Promise<GetLoyaltPointsResponse | null>  {
    return axios.post(`https://www.sistema.brotasecoresort.com.br/api/pontos/${cpf}`, {}, {
    headers: {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiMTQ4MTJjYThmZGZmN2EwN2FlZjAzYTQ1MGEyOTBmMjYzODE3NDA1MDA0M2RjNDQwYmIzM2RiZWRlYTNhYzI5ZmYyYTY3Yzk1YTRlNWQzNDAiLCJpYXQiOjE3MDM1OTQ1NjEsIm5iZiI6MTcwMzU5NDU2MSwiZXhwIjoxNzM1MjE2OTYxLCJzdWIiOiIxMyIsInNjb3BlcyI6W119.nX3WQEhwe9b3Wi1Uc_r4k-LdXJwr0QMBLW2pNQENspvNE2ApsLik7a5mXJWbbkL5aZiJmcHyv_bEvySMi5UXeffu6pWW8rNeMLq6Cisubxrkj7SYDp0Ki_LbT4pNLu_BXJHjCn6epeE9uk5XWXANfQe1JSgJyRWWxj2V3m6SUiVpX846c9F0DHKE0kIrMnLyEkP_2YeHkBf2I8-nI_8OnJrIsjkUYovb0KQcXGn1S6n9-qpmcnNM2i2j7yXhPB1qQ--HY5cxp1ET9dDDAPNrLsScsNvWbZYDWatk4w5NnwbwUJoDZ-qiVH8Q9vi-MoeTY47lIcTZANY40rwwGjutjfQjD-wc6JhzOHv2WjPWsetI9eUQyyiGqoBb7QMUikHya4-Ui1iNE5RYGx-Sjm7ZKdV1qvxE-mKykxIucRu1KVeoj8Gf2VYj2hToWV-cnXjeDBoQx2APqfGA2AxUHk5h_pbzyFQfL1sA7bvlTIJ2bBIRYpKIfzAya4PQNVHAsVOs7It6V76_xLz02ROPvZLgFZEYy0EfKW1GLxnz3m4Eco_1gLL1wNkvB4vpRmCPv9PPcb4XHabjAYKnELs9nRbdmkxo39q9kIOdZwZ6-dpAqNFM4bW7SzxerTMtmLWGslo8jiTASdmsCK6Rgbxk12QxR9tS-GtbBY73CPFmpC_slyE"
    }
    })
    .then( res => res.data)
    .catch( err => null)
}


