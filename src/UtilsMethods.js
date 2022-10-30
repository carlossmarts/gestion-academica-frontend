export function getCurrentDate(separator = "/") {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date < 10 ? `0${date}` : `${date}`}`;
}

export function descargar(file, fileName) {
    console.log(JSON.stringify(file + " TEST"))
    const aElement = document.createElement('a');
    aElement.setAttribute('download', fileName);
    const href = URL.createObjectURL(new Blob(file, {type: "application/pdf"}));
    aElement.href = href;
    aElement.setAttribute('target', '_blank');
    aElement.click();
    URL.revokeObjectURL(href);
};