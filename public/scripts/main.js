import Modal from './modal.js'

const modal = Modal()

const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal .buttons button')

// Pegar quando o "marcar como concluido" foi clicado, ou seja,
// é necessário pegar todas as classes com o marcador "check", pois 
// é a classe dos botões ""

const checkButtons = document.querySelectorAll(".actions a.check")

checkButtons.forEach(button => {
    //Event listener será colocado aqui
    button.addEventListener("click", handleClick)
})



const deleteButton = document.querySelectorAll(".actions a.delete")

deleteButton.forEach(button => {
    button.addEventListener("click", (event) => handleClick(event, false))
})

function handleClick(event, check = true){
    event.preventDefault()
    const text = check ? "Marcar como lida" : "Excluir"

    modalTitle.innerHTML= `${text} esta pergunta`
    modalDescription.innerHTML = `Tem certeza que dejesa ${text.toLowerCase()} esta pergunta?`
    modalButton.innerHTML= `Sim, ${text}`

    check? modalButton.classList.remove("red") : modalButton.classList.add("red")

    modal.open()
}