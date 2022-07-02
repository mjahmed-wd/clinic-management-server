const queryNullCheck = (prop: any, value: any) => {
    return (value === null || value === undefined || value === "") ? {} : { [prop]: value };
}
export {
    queryNullCheck
};