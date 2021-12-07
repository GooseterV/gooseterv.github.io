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
		egg.firstElementChild.display = "none";
		egg.firstElementChild.src = "";
	};
	if (egghealth <= 5 && egghealth > 0 && egghealth != 0) {
		egg.style = "animation: shake 0.25s cubic-bezier(.36,.07,.19,.97) both;";
		await sleep(250);
		egg.style = "";
		egg.setAttribute("data-health", `${parseInt(egg.getAttribute("data-health"))-1}`);
		egg.firstElementChild.src = "src/egg_crack2.png";
		egg.firstElementChild.id = "egg-bigcrack";
	};
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
		this.money = 50.00;
		// monthly income
		this.income = 694.75;
		// monthly expenses - WATER AND POWER (FIXED EXPENSES)
		this.fixedBill = 125.00;
		// monthly expenses - PURCHASED THINGS (VARIABLE EXPENSES)
		this.varBill = 0.00;
		// banked money
		this.bank = 100.00;
		// semi-annual bank interest
		this.interest = 4.37;
		// current round
		this.currentRound = 0;
		// business loans
		this.loans = [

		];
		// tier of equipment, higher tier makes more money
		this.equipmentTier = 1;
		// employees of business
		this.employees = [

		];
		// any debt caused by not having enough money
		this.debt = 0.00;
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
		this.money += this.income;
		return this.money;
	};
	
	gainInterest() {
		this.bank += parseFloat(((this.bank/ 100) * this.interest).toFixed(2));
	};
	
	payBill() {
		const total = (this.varBill + this.fixedBill);
		if (total <= this.money) {
			this.money -= total;
		} else if (total > this.money) {
			this.debt += total;
			throw "Error: Not enouugh money to pay bills."
		};
	};

	advanceRound() {
		this.currentRound += 1;
		if (this.loans.length > 0) {
			for (let loan of this.loans) {
				loan.days += 1;
				loan.interest = parseFloat((0.1 * loan.days).toFixed(2));
				loan.amount += parseFloat(((loan.amount/100) * loan.interest).toFixed(2));
				loan.amount = parseFloat(loan.amount.toFixed(2))
			};
		};
		if (this.employees.length > 0) {
			for (let employee of this.employees) {
				employee.daysWorked += 1;
			};
		};
		if (this.currentRound % 128 === 0) {
			this.gainInterest();
		};
		if (this.currentRound % 30 === 0) {
			this.claimSalary();
			this.payAllEmployees();
		};
	};
	
	takeLoan(amount) {
		if (this.loans.length < 3 && amount <= this.income) {
			this.loans.push({
				"amount":parseFloat(amount.toFixed(2)),
				"grossAmount":parseFloat(amount.toFixed(2)),
				"id":[...Array(16)].map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
				// interest per day of loan
				"interest":0.00,
				"paid":false,
				// how many days in you are on the loan, interest increases based on this
				"days":0
			});
			this.money += amount;
			this.money = parseFloat(this.money.toFixed(2))
		} else if (this.loans.length >= 3) {
			throw "Error: You can only have 3 loans at a time.";
		} else if (amount > this.income) {
			throw "Error: You cannot take a loan for more money than you make.";
		};
	};
	
	payLoan(id) {
		for (let loan of this.loans) {
			if (Object.values(loan).includes(id) && this.money >= loan.amount) {
				this.loans.pop(this.loans.indexOf(loan)-1);
				this.money -= loan.amount;
				this.money = parseFloat(this.money.toFixed(2))
				loan.paid = true;
			} else if (!(Object.values(loan).includes(id))) {
				throw "Error: invalid loan id.";
			} else if (this.money < loan.amount) {
				throw "Error: you do not have enough money to pay for this loan!";
			};
		};
		
	};
	payAllLoans() {
		for (let loan of this.loans) {
			this.payLoan(loan.id);
		};
	};

	hireEmployee() {
		const wage = parseFloat((Math.random() * (29.36 - 15.72) + 14.78).toFixed(2));
		this.employees.push({
			"id":[...Array(12)].map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
			"wage":wage,
			// amoutn of days employee has worked
			"daysWorked":0
		});
	};
	payEmployee(id) {
		for (let employee of this.employees) {
			if (Object.values(employee).includes(id) && this.money >= employee.wage) {
				this.money -= employee.wage;
				this.money = parseFloat(this.money.toFixed(2))
			} else if (!(Object.values(employee).includes(id))) {
				throw "Error: Invalid employee id.";
			} else if (this.money < employee.wage) {
				this.debt += employee.wage;
				this.debt = parseFloat(this.debt.toFixed(2))
				throw "Error: Not enough money to pay employee.";
			};
		};
	};
	payAllEmployees() {
		for (let employee of this.employees) {
			this.payEmployee(employee.id);
		};
	};
	payDebt() {
		if (this.money >= this.debt) {
			this.money -= this.debt;
			this.money = parseFloat(this.money.toFixed(2))
		} else if (this.money < this.debt) {
			throw "Error: Not enough money to pay debt";
		};
	};
};

