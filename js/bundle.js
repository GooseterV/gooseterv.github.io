async function sleep(ms) {
	await new Promise(resolve => setTimeout(resolve, ms));
}
async function crackEgg(eggstate) {
	let egg = document.getElementsByClassName("egg")[0];
	let egghealth = parseInt(egg.getAttribute("data-health"));
	if (egghealth >= 15) {
		egg.style = "animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;"
		await sleep(820)
		egg.style = ""
		egg.setAttribute("data-health", `${parseInt(egg.getAttribute("data-health"))-1}`)
	}
	if (egghealth === 0) {
		egg.style = "animation: shake 75ms cubic-bezier(.36,.07,.19,.97) infinite;"
		await new Promise(resolve => setTimeout(resolve, 3000));
		egg.style = ""
		egg.firstElementChild.id = "egg-cracked"
		//egg.firstElementChild.src = "src/egg_cracked.png"
		egg.style.display = "none"
		await sleep(750);
		egg.style.display = "none"
		egg.firstElementChild.display = "none"
		egg.firstElementChild.src = ""
		document.getElementsByClassName("main-box-redirect")[0].style = ""
		await sleep(100)
		document.location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"


	}
	if (egghealth < 0) {
		egg.firstElementChild.display = "none"
		egg.firstElementChild.src = ""
	}
	if (egghealth <= 5 && egghealth > 0 && egghealth != 0) {
		egg.style = "animation: shake 0.25s cubic-bezier(.36,.07,.19,.97) both;"
		await sleep(250)
		egg.style = ""
		egg.setAttribute("data-health", `${parseInt(egg.getAttribute("data-health"))-1}`)
		egg.firstElementChild.src = "src/egg_crack2.png"
		egg.firstElementChild.id = "egg-bigcrack"
	}
	if (egghealth <= 14 && egghealth > 5 && egghealth != 0) {
		egg.style = "animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;"
		await sleep(500)
		egg.style = ""
		egg.setAttribute("data-health", `${parseInt(egg.getAttribute("data-health"))-1}`)
		egg.firstElementChild.id = "egg-smallcrack"
		egg.firstElementChild.src = "src/egg_crack1.png"
	}
}

async function debug() {
	const v = {
		"gapi": null,
		"gfonts": null,
		"cloudflare": null
	};
	await fetch("https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js").then(
		(res) => {
			if (res.status != 200) {
				v.gapi = false;
			} else if (res.status === 200) {
				v.gapi = true;
			};
		});
	await fetch("https://fonts.googleapis.com/css2?family=Baloo+Bhai+2&family=Noto+Sans+JP&family=Red+Hat+Display&family=Quicksand:wght@600&display=swap").then(
		(res) => {
			if (res.status != 200) {
				v.gfonts = false;
			} else if (res.status === 200) {
				v.gfonts = true;
			};
		});
	await fetch("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css").then(
		(res) => {
			if (res.status != 200) {
				v.cloudflare = false;
			} else if (res.status === 200) {
				v.cloudflare = true;
			};
		});
	return v
}

class Business {
    constructor(name) {
		// starting year is 1929
		// setting the name of business for future reference
		this.name = name;
		// amount of money owned
		this.money = 0.00;
		// monthly income
		this.income = 28.5;
		// monthly expenses
		this.expenses = 15.00;
		// banked money
		this.bank = 100.00;
		// yearly bank interest
		this.interest = 6.1;
		// current round
		this.currentRound = 0;
		// To-Do
		// purchasing system for supplies & 'upgrades' 
		// inflation system
		// 'wildcards' - random things that happen such as; "you got polio", "your business went bankrupt"
		// , "you found a mysterious package containing $100"

	};

	depositCash(cash) {
		if (this.money < cash) {
			throw "Error: Tried to deposit more money than business owns.";
		} else if (this.money >= cash) {
			this.money -= cash;
			this.bank += cash;
			return (this.money, this.bank)
		};
	};
	withdrawCash(cash) {
		if (this.bank < cash) {
			throw "Error: Tried to withdraw more money than business has in bank.";
		} else if (this.bank >= cash) {
			this.bank -= cash;
			this.money += cash;
			return (this.money, this.bank)
		};
	};

	claimSalary() {
		factory.money += this.income;
		return factory.money;
	};
	
	gainInterest() {
		this.bank += ((this.bank/ 100) * this.interest).toFixed(2);
	};

	advanceRound() {
		this.currentRound += 1;
		if (this.currentRound % 128 === 0) {
			this.gainInterest();
		};
		if (this.currentRound % 30 === 0) {
			this.claimSalary();
		};
	};
	
};

