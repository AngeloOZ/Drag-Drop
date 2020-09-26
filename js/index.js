const form = document.getElementById('form-files');
const fileInput = document.getElementById('inputFiles')
const btnSelectFiles = document.getElementById('btn-select-files')
const dragZone = document.getElementById('drag-zone');
const dragZoneInformation = document.getElementById('drag-zone-information');

btnSelectFiles.addEventListener('click', ()=> fileInput.click())

dragZone.addEventListener('dragover', e=>{
    e.preventDefault();
})
dragZone.addEventListener('drop', e =>{
    e.preventDefault();
    dragZone.classList.add('active')
    console.log(e.dataTransfer);
    const files = e.dataTransfer.files; 
    for (const file of files) {
        const fileReader = new FileReader();
        const fileUploaded = createContentFile(file)
        dragZone.appendChild(fileUploaded);
        fileReader.readAsDataURL(file);
        progressUploadFile(fileReader, fileUploaded)
        uploadFinishFile(fileReader, fileUploaded, files);
    }
})
fileInput.addEventListener('change', e=>{
    dragZone.classList.add('active');
    const files = e.target.files;
    for (const file of files) {
        const fileReader = new FileReader();
        const fileUploaded = createContentFile(file);
        dragZone.appendChild(fileUploaded);
        fileReader.readAsDataURL(file);
        progressUploadFile(fileReader,fileUploaded);
        uploadFinishFile(fileReader, fileUploaded, files);
    }
})


function createContentFile(file){
    const fileUpload = document.createElement('DIV')
    fileUpload.classList.add('file-upload');
    fileUpload.innerHTML = `
        <img alt="">
        <p class="file-name">${file.name}</p>
        <span class="progress"></span>
    `;
    return fileUpload;
}
function progressUploadFile(fileReader, div){
    fileReader.addEventListener('progress', e=>{
        const progress = Number.parseInt(e.loaded * 100 / e.total);
        div.querySelector('.progress').style.width = `${progress}%`;
        div.querySelector('.progress').textContent = `${progress}%`;
    })
}
function uploadFinishFile(fileReader,div, files){
    fileReader.addEventListener('load', e =>{
        setTimeout(()=>{
            div.querySelector('.progress').style.width = `0%`;
            div.querySelector('.progress').textContent = '';
            div.querySelector('img').setAttribute('src',e.target.result)
            fileInput.files = files;
        },1000)
    })
}