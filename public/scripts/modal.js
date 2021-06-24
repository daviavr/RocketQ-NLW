export default function Modal(){

    const modalWrapper = document.querySelector('.modal-wrapper')
    const cancelButton = document.querySelector(".button.cancel")


    cancelButton.addEventListener("click", close)

    function open(){
        // Funcionalidade: abrir a modal
        modalWrapper.classList.add("active")
    }
    function close(){
        // Funcionalidade: fechar a modal
        modalWrapper.classList.remove("active")
    }

    return{
        open,
        close
    }
}