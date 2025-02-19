export const convertArrayToObj = (arr)=>{
    return Object.fromEntries(arr.map(item => {
        const key = Object.keys(item)[0];
        const value = item[key];
        return [key, value];
    }));
}