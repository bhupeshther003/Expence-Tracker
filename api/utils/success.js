export const createSuccess=(statusCode,successMessage)=>{
    const successObj={
        status:statusCode,
        message:successMessage
    }
    return successObj;
}