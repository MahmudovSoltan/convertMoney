import axiosInstance from "./axiosInstance";

export const getAllCurrency = async () => {
    try {
        const response = await axiosInstance.get("/Currency/Supported")
        console.log(response);
        
        return response.data
    } catch (error) {
        console.log(error);

    }
}
interface IParams {
    From:string,
    To:string,
    Amount:number
}
export const convertCurrency = async (params:IParams)=>{
    try{
        const response = await axiosInstance.get(`/Currency/Convert`,{
            params:params
        })

        return response.data
    }catch(err){
        console.log(err);
        throw new Error("xeta bas verdi")
        
    }
}