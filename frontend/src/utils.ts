export function getBase64StringFromDataURL(dataURL: any) {
    return dataURL.replace("data:", "").replace(/^.+,/, "")
}
