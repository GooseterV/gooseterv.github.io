async function crackEgg(eggstate) {
    let egg = document.getElementsByClassName("egg")[0];
    let egghealth = parseInt(egg.getAttribute("data-health"));
    if (egghealth >= 15) {
        egg.style = "animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;"
        await new Promise(resolve => setTimeout(resolve, 820));
        egg.style = ""
        egg.setAttribute("data-health", `${parseInt(egg.getAttribute("data-health"))-1}`)
    }
    if (egghealth === 0)  {
        egg.style = "animation: shake 75ms cubic-bezier(.36,.07,.19,.97) infinite;"
        await new Promise(resolve => setTimeout(resolve, 3500));
        egg.style = ""
        
        egg.style.display = "none"
        document.getElementsByClassName("main-box-redirect")[0].style = ""
        await new Promise(resolve => setTimeout(resolve, 1000));
        document.location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        egg.id = "egg-cracked"
        
    }
    if (egghealth <= 5) {
        egg.style = "animation: shake 0.25s cubic-bezier(.36,.07,.19,.97) both;"
        await new Promise(resolve => setTimeout(resolve, 250));
        egg.style = ""
        egg.setAttribute("data-health", `${parseInt(egg.getAttribute("data-health"))-1}`)
        egg.id = "egg-bigcrack"
    }
    if (egghealth <= 14 && egghealth > 5 && egghealth != 0) {
        egg.style = "animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;"
        await new Promise(resolve => setTimeout(resolve, 500));
        egg.style = ""
        egg.setAttribute("data-health", `${parseInt(egg.getAttribute("data-health"))-1}`)
        egg.id = "egg-smallcrack"
    }
}